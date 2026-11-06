// Usage: node scripts/qa/route-screenshots.cjs <outdir> [widths]. Needs the site on :3100.
/* eslint-disable @typescript-eslint/no-require-imports */
// node shoot.cjs <outdir> [widths]
const { chromium } = require('playwright');
const routes = ["/","/about","/agent","/agent/chat","/careers","/charging","/charging/home","/charging/pulse-plus","/charging/corridor","/charging/boda-hub","/charging/engineering","/contact","/download","/evs","/faq","/guides","/guides/charge-electric-car-at-home-kenya","/hub","/legal","/legal/privacy","/legal/terms","/legal/cookies","/locations","/partners","/research","/research/wireless-ev-charging-policy","/sustainability","/training"];
(async () => {
  const out = process.argv[2]; const widths = (process.argv[3] || "390,768,1024,1440").split(",").map(Number);
  require('fs').mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const report = [];
  for (const w of widths) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    for (const r of routes) {
      const name = (r === "/" ? "home" : r.slice(1).replace(/\//g, "_")) + `-${w}.png`;
      try {
        const res = await p.goto('http://localhost:3100' + r, { waitUntil: 'networkidle', timeout: 45000 });
        await p.waitForTimeout(300);
        const sw = await p.evaluate(() => document.documentElement.scrollWidth);
        await p.screenshot({ path: `${out}/${name}`, fullPage: true });
        report.push(`${w} ${r} ${res.status()} scrollWidth=${sw}`);
      } catch (e) { report.push(`${w} ${r} ERROR ${e.message.split('\n')[0]}`); }
    }
    await ctx.close();
  }
  require('fs').writeFileSync(`${out}/report.txt`, report.join("\n"));
  await b.close();
})();
