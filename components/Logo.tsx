import Link from "next/link";
import PrecifarmLogoMark from "@/components/PrecifarmLogoMark";
import { type LogoSize, resolveLogoMetrics } from "@/lib/logo";

type LogoVariant = "default" | "onDark";

type LogoProps = {
  className?: string;
  /** @deprecated Prefer `size="header" | "footer"` */
  height?: number;
  onClick?: () => void;
  showTagline?: boolean;
  size?: LogoSize;
  variant?: LogoVariant;
};

export default function Logo({
  className = "",
  height,
  onClick,
  showTagline = false,
  size = "header",
  variant = "default",
}: LogoProps) {
  const metrics = resolveLogoMetrics(height ?? size);
  const { mark, word, gap, curveGap, curveStroke } = metrics;
  const onDark = variant === "onDark";
  const curveColor = onDark ? "#93C5FD" : "#2563EB";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 ${className}`}
      style={{ gap }}
      onClick={onClick}
      aria-label="Precifarm home"
    >
      <PrecifarmLogoMark
        className="shrink-0"
        size={mark}
        variant={variant}
        style={{ height: mark, width: mark }}
      />
      <span className="inline-flex min-w-0 flex-col items-stretch leading-none">
        <span
          className="font-display font-bold tracking-[-0.03em]"
          style={{ fontSize: word, lineHeight: 1.1 }}
        >
          <span className={onDark ? "text-white" : "text-forest-900"}>Preci</span>
          <span className={onDark ? "text-charge-300" : "text-charge-600"}>farm</span>
        </span>
        <svg
          viewBox="0 0 100 8"
          className="block w-full shrink-0"
          style={{ marginTop: curveGap, height: Math.max(3, Math.round(word * 0.18)) }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          preserveAspectRatio="none"
        >
          <path
            d="M1 6.5 Q50 1.5 99 6.5"
            stroke={curveColor}
            strokeWidth={curveStroke}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {showTagline && (
          <span
            className={`mt-1.5 font-medium tracking-wide ${
              onDark ? "text-white/55" : "text-forest-500"
            }`}
            style={{ fontSize: Math.max(10, Math.round(word * 0.42)) }}
          >
            Electric transport
          </span>
        )}
      </span>
    </Link>
  );
}
