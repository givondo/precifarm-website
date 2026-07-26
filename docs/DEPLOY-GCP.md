# Deploy to Google Cloud (precifarm.com)

**Canonical hosting:** Google Cloud Run + Cloud SQL. Netlify and Vercel are **deprecated** for PreciFarm.

| Service | Cloud Run name | Public URL |
|---|---|---|
| Booking website | `precifarm-website` | `https://precifarm.com` |
| Ticketing CMS / API | `precifarm-cms` | `https://api.precifarm.com` |

**Compute region:** **`europe-west1`** (Belgium) — required for custom domain mappings (`africa-south1` does not support domain mapping).  
**Database / Artifact Registry:** **`africa-south1`** (Johannesburg — closest to Kenya).

---

## Architecture

```text
Hostinger (registrar)
  └── DNS → Cloud Run domain mappings
        ├── precifarm.com      → precifarm-website
        ├── www.precifarm.com  → precifarm-website
        └── api.precifarm.com  → precifarm-cms
              └── Cloud SQL PostgreSQL (bookings, payments, analytics)
```

Website env: `CMS_API_URL=https://api.precifarm.com/api`

CMS env: `MPESA_CALLBACK_URL=https://api.precifarm.com/api/v1/payments/mpesa/callback`

---

## Prerequisites

1. [Google Cloud account](https://console.cloud.google.com) with billing enabled
2. [gcloud CLI](https://cloud.google.com/sdk/docs/install) installed and logged in
3. Domain **precifarm.com** on Hostinger (you already have this)
4. GitHub repos: `givondo/precifarm-website`, `givondo/precifarm-cms`

```powershell
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

---

## 1. One-time GCP setup

```powershell
$PROJECT = "YOUR_PROJECT_ID"
$REGION = "africa-south1"

gcloud services enable run.googleapis.com artifactregistry.googleapis.com `
  cloudbuild.googleapis.com sqladmin.googleapis.com secretmanager.googleapis.com `
  compute.googleapis.com

gcloud artifacts repositories create precifarm `
  --repository-format=docker --location=$REGION `
  --description="PreciFarm containers"

gcloud auth configure-docker "$REGION-docker.pkg.dev"
```

### Cloud SQL (PostgreSQL)

```powershell
gcloud sql instances create precifarm-db `
  --database-version=POSTGRES_15 --tier=db-f1-micro --region=$REGION

gcloud sql databases create precifarm --instance=precifarm-db

gcloud sql users create precifarm_app --instance=precifarm-db --password="STRONG_PASSWORD_HERE"
```

Note the instance connection name: `PROJECT:REGION:precifarm-db`

For Cloud Run → Cloud SQL, use the Cloud SQL Auth Proxy connector or connect via public IP + authorized networks during setup. Production: attach Cloud SQL to Cloud Run:

```powershell
gcloud run deploy precifarm-cms ... `
  --add-cloudsql-instances=PROJECT:africa-south1:precifarm-db
```

`DATABASE_URL` format (via Unix socket on Cloud Run):

```text
postgresql://precifarm_app:PASSWORD@/precifarm?host=/cloudsql/PROJECT:africa-south1:precifarm-db
```

Run migrations after first CMS deploy:

```powershell
# From CMS repo, with Cloud SQL proxy or direct connection
npm run db:push
npm run db:seed
```

---

## 2. Secrets (CMS)

Store production values in Secret Manager — never commit them.

```powershell
echo -n "false" | gcloud secrets create precifarm-demo-payment --data-file=-
echo -n "postgresql://..." | gcloud secrets create precifarm-database-url --data-file=-
echo -n "YOUR_KEY" | gcloud secrets create precifarm-mpesa-consumer-key --data-file=-
echo -n "YOUR_SECRET" | gcloud secrets create precifarm-mpesa-consumer-secret --data-file=-
echo -n "YOUR_PASSKEY" | gcloud secrets create precifarm-mpesa-passkey --data-file=-
echo -n "YOUR_SHORTCODE" | gcloud secrets create precifarm-mpesa-shortcode --data-file=-
echo -n "https://api.precifarm.com/api/v1/payments/mpesa/callback" | gcloud secrets create precifarm-mpesa-callback-url --data-file=-
echo -n "sandbox" | gcloud secrets create precifarm-mpesa-environment --data-file=-
```

Grant Cloud Run access:

```powershell
$PROJECT_NUMBER = gcloud projects describe $PROJECT --format="value(projectNumber)"
gcloud projects add-iam-policy-binding $PROJECT `
  --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" `
  --role="roles/secretmanager.secretAccessor"
```

---

## 3. Deploy CMS first

From **`Ticketing and Payment CMS`** repo:

```powershell
cd "C:\Users\DAVID\Desktop\Ticketing and Payment CMS"
gcloud builds submit --config cloudbuild.yaml
```

Or manual:

```powershell
docker build -t africa-south1-docker.pkg.dev/$PROJECT/precifarm/cms:latest .
docker push africa-south1-docker.pkg.dev/$PROJECT/precifarm/cms:latest
gcloud run deploy precifarm-cms `
  --image africa-south1-docker.pkg.dev/$PROJECT/precifarm/cms:latest `
  --region europe-west1 --allow-unauthenticated --port 8080 `
  --add-cloudsql-instances=$PROJECT:africa-south1:precifarm-db `
  --set-secrets=DATABASE_URL=precifarm-database-url:latest,...
```

Verify: `https://SERVICE-URL.run.app/api/v1/health`

Map domain (must use **`europe-west1`** — not supported in `africa-south1`):

```powershell
gcloud run domain-mappings create --service precifarm-cms --domain api.precifarm.com --region europe-west1
```

---

## 4. Deploy website

From **`website`** repo:

```powershell
cd C:\Users\DAVID\Desktop\kenya-ebus-ecosystem\website
gcloud builds submit --config cloudbuild.yaml
```

Set CMS URL on the website service:

```powershell
gcloud run services update precifarm-website --region europe-west1 `
  --set-env-vars="CMS_API_URL=https://api.precifarm.com/api"
```

Map domains:

```powershell
gcloud run domain-mappings create --service precifarm-website --domain precifarm.com --region europe-west1
gcloud run domain-mappings create --service precifarm-website --domain www.precifarm.com --region europe-west1
```

**Status (2026-07-26):** All three mappings exist in `europe-west1`. Hostinger DNS configured; pending **Google Search Console domain verification** for SSL.

---

## 5. Hostinger DNS (leave Netlify)

**Abandon Netlify nameservers.** In Hostinger → **precifarm.com** → **DNS / Nameservers**:

### 5a. Switch nameservers

1. Change from Netlify (`dns1.p03.nsone.net`, `dns2.p03.nsone.net`, …) to **Hostinger nameservers** (shown on the same page — typically `ns1.dns-parking.com` / `ns2.dns-parking.com` or `ns1.hostinger.com` / `ns2.hostinger.com`).
2. Wait 5–30 minutes for the switch to propagate.

### 5b. Verify domain ownership (Google)

Before SSL and routing work, Google must verify you own `precifarm.com`:

1. Open [Cloud Run → Domain mappings](https://console.cloud.google.com/run/domains?project=skilled-orbit-460722-h9) (region **europe-west1**).
2. Click **`precifarm.com`** → **Verify** (or use [Search Console](https://search.google.com/search-console/welcome)).
3. Copy the **TXT** record Google gives you.
4. In Hostinger → **DNS / Nameservers** → **DNS records** → add:

| Type | Name | Value |
|---|---|---|
| TXT | `@` | *(paste Google verification string)* |

Verifying the apex domain (`precifarm.com`) also covers `www` and `api` subdomains.

### 5c. Point DNS to Cloud Run

Add these records in Hostinger (standard Cloud Run / Google Hosted values):

**Apex (`precifarm.com`) — A records**

| Type | Name | Value |
|---|---|---|
| A | `@` | `216.239.32.21` |
| A | `@` | `216.239.34.21` |
| A | `@` | `216.239.36.21` |
| A | `@` | `216.239.38.21` |

**Apex — AAAA records**

| Type | Name | Value |
|---|---|---|
| AAAA | `@` | `2001:4860:4802:32::15` |
| AAAA | `@` | `2001:4860:4802:34::15` |
| AAAA | `@` | `2001:4860:4802:36::15` |
| AAAA | `@` | `2001:4860:4802:38::15` |

**Subdomains — CNAME records**

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `ghs.googlehosted.com` |
| CNAME | `api` | `ghs.googlehosted.com` |

**Keep existing subdomain (optional):**

| Type | Name | Value |
|---|---|---|
| CNAME | `iv` | *(from Vercel → Domains → iv.precifarm.com)* |

Remove any old Netlify A/CNAME records for `@`, `www`, or `api` after adding the above.

SSL certificates are provisioned automatically by Google (15–60 minutes after DNS + verification).

---

## 6. Verify

- `https://precifarm.com` — booking website
- `https://precifarm.com/#book` — seat booking
- `https://precifarm.com/download` — app download
- `https://api.precifarm.com/api/v1/health` — CMS health JSON
- M-Pesa STK in sandbox with `DEMO_PAYMENT=false`

---

## 7. CI/CD (optional)

Connect Cloud Build to GitHub:

1. Cloud Console → **Cloud Build** → **Triggers**
2. Create trigger on `main` for `givondo/precifarm-cms` → `cloudbuild.yaml`
3. Create trigger on `main` for `givondo/precifarm-website` → `cloudbuild.yaml`

Deploy CMS before website on each release.

---

## Local Docker test

```powershell
cd website
docker build -t precifarm-website:local .
docker run -p 8080:8080 -e CMS_API_URL=http://host.docker.internal:3002/api precifarm-website:local
```

Open <http://localhost:8080/#book>.

---

## Abandon Netlify / Vercel

| Platform | Action |
|---|---|
| **Netlify** | Remove `precifarm.com` from all Netlify sites; delete or archive projects |
| **Vercel** | Remove `precifarm.com` domain; account already suspended |
| **Hostinger** | Stop using Netlify nameservers; point DNS to Google |

Delete local `.netlify` folders. Do not use `netlify.toml` — removed from this repo.

---

## Cost estimate (small prod)

| Resource | Approx. monthly |
|---|---:|
| Cloud Run (2 services, low traffic) | $5–20 |
| Cloud SQL db-f1-micro | $7–15 |
| Secret Manager | < $1 |
| **Total** | **~$15–40** |

Scale up `db-custom` tier and Cloud Run memory when route-one goes live.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| 502 on Cloud Run | Check logs: `gcloud run services logs read precifarm-website --region europe-west1` |
| CMS DB connection fails | Verify `--add-cloudsql-instances` and `DATABASE_URL` socket format |
| Domain SSL pending | Wait for managed cert; confirm DNS records at Hostinger |
| Booking uses demo store | Set `CMS_API_URL` on website Cloud Run service |
| M-Pesa callback fails | `MPESA_CALLBACK_URL` must be public `https://api.precifarm.com/...` |

See also: [`../../docs/infrastructure/gcp-deployment.md`](../../docs/infrastructure/gcp-deployment.md)
