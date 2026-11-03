import type { CSSProperties } from "react";

type LogoMarkVariant = "default" | "onDark";

type PrecifarmLogoMarkProps = {
  className?: string;
  showBackground?: boolean;
  size?: number;
  style?: CSSProperties;
  variant?: LogoMarkVariant;
};

const palettes: Record<
  LogoMarkVariant,
  { bg: string; stroke: string; strokeWidth: number }
> = {
  default: {
    bg: "#EEF7F2",
    stroke: "#1F6F4A",
    strokeWidth: 3.15,
  },
  onDark: {
    bg: "rgba(126, 192, 157, 0.14)",
    stroke: "#7EC09D",
    strokeWidth: 3.15,
  },
};

/** Chevron mark — matches mobile app icon / favicon aesthetic */
export default function PrecifarmLogoMark({
  className = "h-8 w-8",
  showBackground = true,
  size = 32,
  style,
  variant = "default",
}: PrecifarmLogoMarkProps) {
  const palette = palettes[variant];
  const strokeWidth = palette.strokeWidth * (size / 32);

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {showBackground && (
        <rect
          x="1.5"
          y="1.5"
          width="29"
          height="29"
          rx="7.5"
          fill={palette.bg}
        />
      )}
      <path
        d="M9.75 20.75 16 10.75 22.25 20.75"
        stroke={palette.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
