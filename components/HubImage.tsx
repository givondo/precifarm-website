import SiteImage from "@/components/SiteImage";
import { hubImages, type HubImageKey } from "@/lib/vehicles";

type HubImageProps = {
  variant: HubImageKey;
  className?: string;
  aspectClass?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

export default function HubImage({
  variant,
  className = "",
  aspectClass = "aspect-[4/3]",
  width = 1200,
  height = 800,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  fill = false,
}: HubImageProps) {
  const photo = hubImages[variant];

  if (fill) {
    return (
      <SiteImage
        src={photo.image}
        alt={photo.imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${photo.objectPosition} ${className}`}
      />
    );
  }

  return (
    <SiteImage
      src={photo.image}
      alt={photo.imageAlt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={`w-full object-cover ${aspectClass} ${photo.objectPosition} ${className}`}
    />
  );
}
