# Website pivot cleanup (reference)

**Status:** Inventory for maintainers — not a deploy checklist.

Precifarm’s public website is **EV charging + modular energy** (Canon v3). Passenger seat booking was retired **31 August 2026**.

## Retired surface area

| Was | Now |
|-----|-----|
| `/book`, booking APIs | 301 → `/charging`; APIs removed from website |
| `/network` | 301 → `/hub` (Charging Hub map) |
| Coach / route booking guides | 301 → `/guides` |
| Fleet-first homepage | Home → charging scenarios + hub |

See redirects in `next.config.ts`.

## Where “home → highway” lives today

- Copy: `lib/brand-messaging.ts`, `lib/charging.ts`, `lib/home-products.ts`
- UI: `/`, `/charging`, `/hub`, `/charging/engineering`
- Docs: `docs/channels/website.md`, `docs/ev-charging/`

## Canon

Public copy must not present planned corridors, hubs or software as live traction. See [Canon](../../docs/CANON.md) in the ecosystem docs repo.
