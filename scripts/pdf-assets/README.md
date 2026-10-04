# PDF build assets (future home)

Large figure packs and render JPEGs used only by `npm run pdf:*` should live here — **not** under `public/downloads/`, except for shipped PDF/HTML outputs.

Today, generators still stage copies into `public/downloads/{modenergy,modenergy-design,...}` so in-browser HTML downloads keep working. Phase 2 follow-up:

1. Point `generate-*-pdf.mjs` scripts at `scripts/pdf-assets/` for inputs.
2. Keep only `precifarm-*.pdf` and companion `.html` in `public/downloads/`.
3. Run `npm run pdf:all` before release if copy or figures change.
