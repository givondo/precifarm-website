/** Unified Precifarm product visual language — matches PF-MODENERGY-DESIGN renders */

export const productDesign = {
  studioBg: "#f5f5f7",
  accent: "#2563eb",
  accentSoft: "#eff6ff",
  markBg: "#eff6ff",
  cardRadius: "1.75rem",
  logoHorizontal: "/images/precifarm-logo-horizontal.png",
  /** Tailwind classes for product image wells */
  studioWell: "bg-[#f5f5f7]",
  cardShell:
    "overflow-hidden rounded-[1.75rem] border border-border bg-white transition-shadow hover:shadow-lg hover:shadow-black/[0.06]",
} as const;

/** Branding on hardware — subtle embossed wordmark or chevron mark on front panel */
export const productBranding = {
  wordmark: "Precifarm",
  markOnly: "Blue chevron in soft #EFF6FF rounded square",
  placement: "Lower front panel or below glass UI strip — never oversized",
  colors: { prec: "#0a0a0a", farm: "#2563eb", underline: "#2563eb" },
} as const;

export const renderStyleNote =
  "Brushed silver anodized aluminum, matte black Energy Module blocks, black glass UI strips with soft blue #2563eb glow, subtle Precifarm wordmark (Preci black, farm blue) or chevron mark on front panel, Apple-inspired industrial design, #f5f5f7 studio background." as const;
