import Image, { type ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "unoptimized"> & {
  src: string;
};

/** Local images use the Next.js optimizer; remote URLs load directly to avoid Wikimedia rate limits. */
export default function SiteImage({ src, ...props }: SiteImageProps) {
  const isRemote = src.startsWith("http://") || src.startsWith("https://");
  return <Image src={src} unoptimized={isRemote} {...props} />;
}
