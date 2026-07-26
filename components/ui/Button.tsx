import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark" | "accent";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-charge-600 text-white hover:bg-charge-500 active:scale-[0.98]",
  secondary: "border border-border bg-white text-forest-900 hover:bg-muted active:scale-[0.98]",
  ghost: "text-forest-700 hover:bg-muted active:scale-[0.98]",
  dark: "bg-charge-600 text-white hover:bg-charge-500 active:scale-[0.98]",
  accent: "bg-charge-600 text-white hover:bg-charge-500 active:scale-[0.98]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "rounded-lg px-4 py-2 text-sm font-medium",
  md: "rounded-xl px-5 py-3 text-sm font-semibold",
  lg: "rounded-xl px-6 py-3.5 text-sm font-semibold",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    type = "button",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
});

export default Button;
