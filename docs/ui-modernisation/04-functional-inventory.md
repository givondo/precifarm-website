# 04 Functional inventory

No form was submitted and no payment was started during this audit.

| Function | Implementation | Notes |
|---|---|---|
| Contact form | `components/ContactForm.tsx` to `POST /api/contact` to CMS | Rate-limited, honeypot, errors announced (`role="alert"`) |
| Home survey | `components/HomeSurveyForm.tsx` to `POST /api/survey` to CMS | Returns 503 with a call-or-email message when the CMS is not configured. Rate-limited, honeypot, errors announced |
| Precifarm Agent chat | `components/agent/AgentChat.tsx` to `POST /api/agent/chat` | DeepSeek V4 Flash by default, OpenRouter when its key is set, optional OpenCode bridge. Per-instance limit: 20 requests per 10 minutes by default |
| Agent demos | `AgentWorkspaceMock`, `AgentExampleDemo` | Scripted animations. Now labelled as examples (see 17) |
| Charging Hub map | `/hub`, Leaflet with CARTO tiles | Markers keyboard-focusable; now named by site |
| M-Pesa | `lib/payment.ts` | Client types and labels for CMS STK flows (demo, sandbox, production). No STK call is made from the public site pages audited |
| Analytics | `components/AnalyticsProvider.tsx`, `/api/analytics/*` | Proxied to CMS |
| Downloads | `/download`, `public/downloads` | APK served with attachment headers |
| SEO | `lib/seo/`, JSON-LD on every page | CMS FAQs can feed homepage schema |

## Security findings

| ID | Finding | Severity | Status |
|---|---|---|---|
| S-1 | JSON-LD was serialised with plain `JSON.stringify` inside `<script>`. CMS-sourced text containing `</script>` could close the tag and inject markup | Medium | Fixed: `<` escaped as `<`; test added; all JSON-LD on five pages re-parsed successfully |
| S-2 | `/api/contact` and `/api/survey` had no rate limiting or bot check | Medium | Fixed: 5 posts per address per 10 minutes, and a hidden honeypot field that is stripped before the CMS sees the body. Limiter shared with the Agent route (`lib/rate-limit.ts`, `lib/form-guard.ts`) |
| S-3 | Agent rate limit is per Cloud Run instance, so it scales with instances | Low | Known; acceptable for early access |
| S-4 | No Content Security Policy (documented in `next.config.ts`) | Low | Planned: nonce-based policy in Report-Only first |
