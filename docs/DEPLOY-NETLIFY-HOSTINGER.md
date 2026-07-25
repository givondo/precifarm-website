# Deploy to Netlify + Hostinger DNS (precifarm.com)

Domain **precifarm.com** is registered on **Hostinger**. Netlify hosts the site; Hostinger only needs DNS records pointing to Netlify.

## 1. Fix Netlify build settings

In Netlify → **Site configuration → Build & deploy → Build settings**, confirm:

| Setting | Website (`precifarm-website`) | CMS (`precifarm-cms`) |
|---------|------------------------------|-------------------------|
| Branch | `main` | `main` |
| Base directory | *(leave empty)* | *(leave empty)* |
| Build command | `npm run build` | `npm run build:netlify` |
| Publish directory | **Leave empty** (Netlify auto-detects Next.js) |

**Do not** set Publish directory to `.next` — that breaks Next.js on Netlify.

`netlify.toml` in each repo sets the build command. If the UI overrides it, clear **Publish directory** and save.

## 2. Environment variables

### Website (`givondo/precifarm-website`)

Site settings → Environment variables:

```
CMS_API_URL=https://YOUR-CMS-SITE.netlify.app/api
```

(Use your CMS Netlify URL after step 3 succeeds.)

### CMS (`givondo/precifarm-cms`)

Add from CMS `.env.example` (production values only in Netlify UI, never commit):

```
DEMO_PAYMENT=false
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_PASSKEY=...
MPESA_SHORTCODE=...
MPESA_CALLBACK_URL=https://YOUR-CMS-SITE.netlify.app/api/v1/payments/mpesa/callback
MPESA_ENVIRONMENT=production
```

## 3. Deploy order

1. Deploy **CMS** first → note URL e.g. `https://precifarm-cms.netlify.app`
2. Set website `CMS_API_URL` to that URL + `/api`
3. Deploy **website** → note URL e.g. `https://precifarm-website.netlify.app`
4. Connect **precifarm.com** to the website site (step 4)

## 4. Hostinger DNS → Netlify

### Option A — Netlify nameservers (easiest SSL)

1. Netlify → website site → **Domain management** → **Add domain** → `precifarm.com`
2. Netlify shows nameservers (e.g. `dns1.p03.nsone.net`, …)
3. **Hostinger** → Domains → `precifarm.com` → **DNS / Nameservers**
4. Choose **Change nameservers** → enter Netlify’s nameservers → Save
5. Wait up to 24–48 hours (often &lt; 1 hour)
6. In Netlify, enable **HTTPS** (Let’s Encrypt auto)

Also add `www.precifarm.com` in Netlify; it will suggest a CNAME or redirect.

### Option B — Keep Hostinger DNS (manual records)

1. Netlify → add custom domain `precifarm.com` → choose **Configure manually**
2. Netlify shows required records. In **Hostinger** → DNS Zone:

| Type | Name | Value |
|------|------|--------|
| **A** | `@` | `75.2.60.5` |
| **CNAME** | `www` | `YOUR-SITE-NAME.netlify.app` |

(Use the exact values Netlify displays — IPs can change.)

3. Remove old A/CNAME records pointing to Netlify Astro site or other hosts if they conflict.
4. Wait for DNS propagation, then verify SSL in Netlify.

## 5. Verify

- `https://precifarm.com` — booking website
- `https://precifarm.com/#book` — seat booking
- `https://precifarm.com/download` — app download page
- `https://YOUR-CMS.netlify.app/api/v1/health` — CMS health JSON

## Common build failures

| Error | Fix |
|-------|-----|
| Publish directory `.next` invalid | Clear Publish directory in Netlify UI |
| Node version | `.node-version` = 20 in repo |
| CMS build / port script | CMS uses `build:netlify` (no local port kill) |
| Plugin conflict | Removed pinned `@netlify/plugin-nextjs` — Netlify uses OpenNext automatically |

## CMS note (serverless)

Netlify runs the CMS as serverless functions. File-based booking data under `data/` **does not persist** across deploys on Netlify. For production, add `DATABASE_URL` (PostgreSQL) or use Railway/Render for the CMS long term.
