# Precifarm website — deploy to precifarm.com

**Production hosting:** [Google Cloud Run](./DEPLOY-GCP.md)

Netlify and Vercel are **deprecated**. Use [`DEPLOY-GCP.md`](./DEPLOY-GCP.md) for all deployment steps.

## Quick reference

| Item | Value |
|---|---|
| Platform | Google Cloud Run |
| Service region | `europe-west1` (domain mappings require this region) |
| Image registry | `africa-south1-docker.pkg.dev/.../precifarm/website` |
| Service | `precifarm-website` |
| Domain | `precifarm.com`, `www.precifarm.com` |
| CMS URL | `CMS_API_URL=https://api.precifarm.com/api` |
| DNS | Hostinger (`ns1.dns-parking.com`, `ns2.dns-parking.com`) |

## Deploy

```powershell
gcloud builds submit --config cloudbuild.yaml
gcloud run services update precifarm-website --region europe-west1 `
  --set-env-vars="CMS_API_URL=https://api.precifarm.com/api"
```

`cloudbuild.yaml` builds images in `africa-south1` Artifact Registry and deploys to `europe-west1` Cloud Run.

## Verify

- Home + `#book` booking flow
- `/download` app page
- `GET /api/cms/health` when CMS is live

## APK download

After EAS build, from the mobile app repo:

```bash
npm run publish:apk -- ./precifarm.apk
```

Commit or upload `public/downloads/precifarm.apk` before deploy, or set `NEXT_PUBLIC_APP_APK_URL`.

See also: [UI design system](./UI.md)
