# Deprecated — Netlify deployment

**This guide is obsolete.** PreciFarm hosting moved to Google Cloud.

Use **[DEPLOY-GCP.md](./DEPLOY-GCP.md)** instead.

## Migration checklist

1. Deploy CMS and website to Cloud Run (see DEPLOY-GCP.md)
2. Change Hostinger nameservers **away from Netlify** (`dns1.p03.nsone.net`, …)
3. Point DNS to Cloud Run domain mappings
4. Remove `precifarm.com` from all Netlify projects
5. Delete or archive Netlify sites (`precifarm`, `precifarm-website`, `precifarm-cms`)
6. Remove local `.netlify` folders

Do not use `netlify.toml` — it has been removed from this repository.
