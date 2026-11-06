import StageLabel, { type StageKind } from "@/components/interior/StageLabel";
import SiteImage from "@/components/SiteImage";

/** Image in a rounded frame: silver studio backdrop for cut-outs, full bleed for scenes. */
export default function MediaFrame({
  src,
  alt,
  fit = "cover",
  aspect = "aspect-[4/3]",
  caption,
  stage,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  aspect?: string;
  caption?: string;
  stage?: StageKind;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative w-full overflow-hidden rounded-2xl ${aspect} ${fit === "contain" ? "bg-[#eef0f2]" : "bg-forest-900"}`}>
        <SiteImage src={src} alt={alt} fill sizes={sizes} priority={priority} className={fit === "contain" ? "object-contain p-6 sm:p-8" : "object-cover"} />
        {stage ? <StageLabel kind={stage} tone="dark" className="absolute left-3 top-3 backdrop-blur" /> : null}
      </div>
      {caption ? <figcaption className="mt-2.5 text-xs leading-relaxed text-forest-500">{caption}</figcaption> : null}
    </figure>
  );
}
