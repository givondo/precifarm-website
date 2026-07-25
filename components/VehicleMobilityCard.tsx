import Image from "next/image";

type VehicleMobilityCardProps = {
  role: string;
  model: string;
  summary: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  /** Tailwind object-position utility, e.g. object-right for wide crops */
  imagePosition?: string;
};

export default function VehicleMobilityCard({
  role,
  model,
  summary,
  image,
  imageAlt,
  featured = false,
  imagePosition = "object-center",
}: VehicleMobilityCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white ${
        featured
          ? "border-charge-500/30 shadow-md shadow-charge-500/10"
          : "border-border shadow-sm"
      }`}
    >
      <div className="relative aspect-[16/9] bg-muted">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover ${imagePosition}`}
        />
      </div>
      <div className={`p-5 ${featured ? "bg-charge-500/5" : ""}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">
          {role}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-forest-900">{model}</h3>
        <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{summary}</p>
      </div>
    </article>
  );
}
