import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  optional?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, optional, className = "", id, ...props },
  ref
) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <label className="block">
      {label && (
        <span className="text-sm font-medium text-forest-900">
          {label}
          {optional && (
            <span className="ml-1 font-normal text-forest-500">(optional)</span>
          )}
        </span>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`field-input ${label ? "mt-2" : ""} ${className}`}
        {...props}
      />
      {hint && <p className="mt-1.5 text-xs text-forest-500">{hint}</p>}
    </label>
  );
});

export default Input;
