# Precifarm website — deploy to precifarm.com

## GitHub

Repository: `givondo/precifarm-website` (after push)

## Vercel (recommended for Next.js)

1. Import `givondo/precifarm-website` at [vercel.com/new](https://vercel.com/new)
2. Add environment variable:

   ```
   CMS_API_URL=https://YOUR-CMS-HOST/api
   ```

   Use your live CMS URL (Vercel/Railway deploy of `precifarm-cms`).

3. Deploy, then add domain **precifarm.com** and **www.precifarm.com** in Vercel → Project → Settings → Domains.

### Move precifarm.com from Netlify (current Astro solar site)

The domain currently points to **Netlify** (`givondo/Precifarm` Astro repo).

To switch to this booking website:

1. Deploy this project on Vercel first (verify on `*.vercel.app` URL).
2. In **Vercel** → Domains → add `precifarm.com` — Vercel shows required DNS records.
3. In your DNS provider (Netlify Domains or registrar), update:
   - `A` record for `@` → Vercel IP, **or**
   - `CNAME` for `www` → `cname.vercel-dns.com`
4. Remove or repoint Netlify custom domain after Vercel SSL is active.
5. Keep the old solar site at a subdomain (e.g. `solar.precifarm.com`) if still needed.

## APK download

After EAS build, run from mobile app repo:

```bash
npm run publish:apk -- ./precifarm.apk
```

Commit or upload `public/downloads/precifarm.apk` before deploy, or host APK on CDN and set `NEXT_PUBLIC_APP_APK_URL`.

## Verify

- Home + `#book` booking flow
- `/download` app page
- M-Pesa STK when CMS is live (`GET /api/cms/health`)
