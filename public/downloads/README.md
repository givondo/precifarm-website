# APK downloads

Static Android builds are served from this folder at `/downloads/precifarm.apk`.

## Publish a new build

From the **Precifarm Mobile App** repo after an EAS build:

```bash
npm run publish:apk -- path/to/precifarm.apk
# or
npm run publish:apk -- --from-eas "https://expo.dev/artifacts/eas/…"
```

Expected files:

| File | Purpose |
|------|---------|
| `precifarm.apk` | Latest build (linked from `/download`) |
| `precifarm-1.0.0.apk` | Versioned archive |

APK files are gitignored. Deploy the website (e.g. Vercel) with the APK present in this folder, or set `NEXT_PUBLIC_APP_APK_URL` to an external CDN URL.

See `Precifarm Mobile App/docs/APK_RELEASE.md` for the full release checklist.
