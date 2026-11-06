// Usage: node scripts/qa/home-sections.cjs <port> <outdir>. Element screenshots of every homepage block above the footer (header hidden after the first capture).
/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');
(async () => {
  const [port, out] = process.argv.slice(2);
  require('fs').mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const meta = {};
  for (const w of [390, 768, 1024, 1440]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(600);
    const all = await p.$$('header, main > div > *');
    const blocks = [];
    for (const el of all) { const bb = await el.boundingBox(); if (bb && bb.height > 0 && bb.width > 0) blocks.push(el); }
    meta[w] = [];
    for (let i = 0; i < blocks.length; i++) {
      const id = await blocks[i].evaluate((el) => el.tagName.toLowerCase() + (el.getAttribute('aria-labelledby') ? '#' + el.getAttribute('aria-labelledby') : el.className ? '.' + String(el.className).split(' ')[0] : ''));
      const f = `${out}/${w}-${String(i).padStart(2, '0')}.png`;
      if (i === 1) await p.addStyleTag({ content: 'header.site-header{visibility:hidden !important}' });
      await blocks[i].screenshot({ path: f });
      meta[w].push(id);
    }
    await ctx.close();
  }
  require('fs').writeFileSync(`${out}/meta.json`, JSON.stringify(meta, null, 1));
  await b.close();
})();
