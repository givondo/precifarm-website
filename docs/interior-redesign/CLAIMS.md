# Claims for David to confirm

Collected from the four workstreams and integration, duplicates merged. The pages publish none of these as fact: where a figure was missing it is left out or marked "quoted after survey", "not published" or "proposed". Each item says where it shows up.

## Engineering

1. **Pulse+ supply voltage.** The register says 415 V; `lib/programme-pages.ts` and the Agent product library (`lib/agent/products.ts`) say 400 V.
2. **Pulse rating in the Agent library.** It says "7 kW AC"; the register says "32 A single phase: up to 7.4 kW".
3. **Pulse+ PP-03 wording.** "11 kW and 7.4 kW single-phase modes" reads as 11 kW single-phase. Pages follow the FAQ: 11 kW on three-phase cars, 7.4 kW single-phase.
4. **Pulse+ load sharing.** Nothing published beyond "divides the available current per phase", including any minimum current per car. The site planner does not model one.
5. **Breaker and cable size for Pulse and Pulse+.** Not published. The Agent's protection tool applies a 1.25 continuous factor and gives 50 A for Pulse and 40 A per Pulse+ unit, which is more conservative than most charger manuals, so pages do not show a breaker size.
6. **Pulse mounting.** Height, fixings, weight, cable entry and a pedestal option are not published. The wall drawing reads 384 x 264 x 118 mm as height x width x depth; confirm the order.
7. **Agent battery tool.** `sizeBattery` still defaults to 2.56 kWh described as the retired "Precifarm Energy Module". The demo overrides it; the tool description needs fixing.
8. **ARC tiers.** No kW rating is approved for ARC 120, 240/360 or 600+. Dispenser and bay counts per tier (1/2, 2/4, 3/6, 4/8) and the sign labels were read from the renders.
9. **ARC dispenser.** Per-connector power, whether both cables charge at once, cable length, IP rating and the certification route for the enclosure. Does the first site's certified OEM charger sit inside the ARC dispenser or use the OEM's own unit?
10. **ARC cable exits.** "Improved upper cable exit points" are not in any render. Kenyan site renders for the tiers do not exist (the R03 scenes are generic dusk forecourts).
11. **ARC billing meters.** Where per-session meters sit and who approves them for per-kWh billing.
12. **Boda Hub cabinet.** Dimensions, door size, weight, IP rating, pack capacity, charge time per bay. Which battery make the first site uses and how compatibility will be validated. Offline swaps that sync later are shown as design intent.
13. **Wireless research model.** The research page publishes an illustrative two-coil efficiency curve before bench data (k 0.25 at 100 mm, sigma 100 mm, alignment window +/-100 mm, Q 50 to 500), clearly labelled as a simulation; confirm you are content with that. Living-object protection and EMC show as targets with no register entries.
14. **Training scope.** The curriculum is DC-focused, but T2 is required for the AC Pulse and Pulse+ tracks.

## Commercial

15. **Pulse price split.** "From KES 79,000" covers charger and standard install together; no hardware-only or install-only price exists. Optional site work has no price ranges.
16. **Lipa Pole Pole.** Deposit, term and total cost are not published (only "from KES 3,300/month").
17. **Free survey.** Confirm it is free for every home survey and for highway site hosts.
18. **Quote structure.** Engineering says quotes list hardware, installation and site work separately; confirm that applies to every quote.
19. **Fuel comparison.** The basis of "about KES 1,000 a day in fuel" is not published.
20. **Daily top-up.** The FAQ says about 10 kWh; the charging-time page says about 12 kWh.
21. **Pulse+.** Release date, price and certification are not published (the page says so).
22. **First ARC site.** Location, OEM make, date and price per kWh. The "about 30 minutes" charge time in existing copy has no register id.
23. **Boda Hub pricing.** Pay by energy with a daily cap (HD-039) has working figures (KES 85/kWh, KES 400/day) that are not on the site; fleet accounts have none.

## Operational and status

24. **Boda Hub stage.** The register says pilot; the homepage card and pages say In development. The "under 5 minutes" swap is marked illustrative in the register (BH-12).
25. **Partner swap sites.** Is any partner-run swap site operating today, and where?
26. **Rider app.** Swap screen copy says riders identify with "your Precifarm app". Does a rider app exist?
27. **Named partner listings.** Shell, TotalEnergies, Two Rivers, Naivas, Tuskys, Bamburi, Kenyatta University, Thika Road Mall and KenolKobil have no agreement on record. They are hidden from the Charging Hub finder and not named on location pages until their ids are added to `confirmedPartnerIds`, or they are deleted.
28. **Planned locations.** Are the nine planned Precifarm sites approved? Their coordinates are town or district centres. Eldoret and Kitui are named "Engineering" hubs but have the role "Planned Corridor location".
29. **Training.** Has any cohort run? Venue, cohort size, certificate validity and the five-day figures. The pages say the certificate is issued by Precifarm and is not a government licence or accredited qualification (no accreditation is stated anywhere).
30. **Careers.** Are the three openings current? `datePosted` is the build date on every build.
31. **Existing service statements.** Three-year aftersale care on every Pulse, one-day installation, and "teams in five cities" (the contact data lists six hub cities).
32. **Market claim.** "Roam and M-KOPA bikes are a large share of registrations" has no source.
33. **Android.** Does a packaged Android build exist to share "on request"? No APK is published, so the Download page has no Android button.
34. **OpenCode on the Download page.** It is the only download (a config file); it sends prompts to DeepSeek with the user's key and has no calculation kernel. Keep it on a cloud-only page?
35. **Fair-use wording.** The Agent chat limit is 20 requests per 10 minutes per address; confirm the public wording.
36. **Partner commitments removed from /partners.** 24/7 monitoring, contracted uptime, three-year aftersale, certified crews, T1 to T3 crew tiers, CHAdeMO support and "owns and operates". Confirm or reinstate any that are true. Also: installer onboarding steps and whether lead referral is active.
37. **Engineering material.** The design-basis PDF still shows electric buses; the engineering FAQ's solar yield and storage example are existing copy, not register figures.
38. **Dates and progress.** Agent roadmap dates (Q1 to Q3 2027) and research progress percentages are existing copy; re-confirm at the Q1 2027 review.
39. **Shared FAQ data (`lib/charging-faqs.ts`, shown on the homepage).** Says Precifarm "operates" charging, "live sites are labelled live", public DC "around 60 kWh in 30 minutes", USSD and SMS support, and names EVChaja and ChargeNet as partners. Left unchanged because the homepage is frozen above the footer: say which to correct.
40. **"We maintain and repair packs in the field"** in the sustainability structured-data FAQ: true today, or a plan?
41. **ARC canopy renders.** Used only on the ARC page for the tier configurations; confirm this exception to the no-canopy rule for the homepage.
