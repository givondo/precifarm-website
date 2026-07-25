import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  height?: number;
  onClick?: () => void;
};

export default function Logo({ className = "", height = 32, onClick }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} onClick={onClick}>
      <Image
        src="/images/precifarm-logo.png"
        alt="Precifarm"
        width={height * 4}
        height={height}
        className="h-auto w-auto"
        style={{ height, width: "auto" }}
        priority
      />
    </Link>
  );
}
