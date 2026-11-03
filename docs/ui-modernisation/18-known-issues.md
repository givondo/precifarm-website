# 18 Known issues

| ID | Issue | Decision |
|---|---|---|
| K1 | `/hub` markers fail axe target-size at the default zoom because nearby hubs overlap | Accepted under WCAG 2.5.8's equivalent-control exception: the hub list offers the same selection with full-size targets. Revisit with marker clustering when the map is reworked |
| K2 | The worked example's pending steps fade to 25 % opacity while the animation runs, which fails contrast for about five seconds | Transitional state only; reduced-motion visitors see the full result at once |
| K3 | Core Web Vitals not measured; this sandbox cannot reach the live site or its third-party assets | Measure on a Cloud Run preview with Lighthouse CI and in Search Console field data |
| K4 | Build needs Google Fonts at build time | Normal on Cloud Build. Self-hosting through `next/font/local` would remove the dependency; optional |
| K5 | Claims R1 to R4 in 00 are out of step with 1 and 2 Nov decisions | Waiting on David; fix in PRECIFARM_MASTER and regenerate |
| K6 | Contact and survey routes lack rate limiting (S-2) | Next security task |
