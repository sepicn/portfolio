import Image from "next/image";

const art: Record<string, string> = {
  web: "/images/drawings/obj-web.webp",
  "google-ads": "/images/drawings/obj-ads.webp",
  "meta-ads": "/images/drawings/obj-meta.webp",
  seo: "/images/drawings/obj-seo.webp",
};

export function ServiceArt({
  id,
  size = 120,
  dark = false,
  priority = false,
  className = "",
}: {
  id: string;
  size?: number;
  dark?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={art[id]}
        alt=""
        fill
        priority={priority}
        sizes={`${size * 2}px`}
        className={`object-contain ${dark ? "brightness-[1.15] hue-rotate-180 invert" : ""}`}
      />
    </div>
  );
}
