import SiteImage from "@/components/SiteImage";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/** Product shot — plain image, no overlay (homepage and inner pages). */
export default function ProductPhoto({
  src,
  alt,
  width = 800,
  height = 600,
  sizes = "(max-width: 640px) 100vw, 33vw",
  className = "mx-auto aspect-[4/3] w-full max-w-sm object-contain",
  priority = false,
}: Props) {
  return (
    <SiteImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
