import { productStatusCopy, type ProductStatusKind } from "@/lib/product-status";

type Props = {
  status: ProductStatusKind;
  /** Override visible label (defaults from productStatusCopy) */
  label?: string;
  className?: string;
};

export default function StatusBadge({ status, label, className = "" }: Props) {
  const meta = productStatusCopy[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${meta.className} ${className}`}
    >
      {label ?? meta.label}
    </span>
  );
}
