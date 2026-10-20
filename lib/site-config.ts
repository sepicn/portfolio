const vercelProduction =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelProduction ? `https://${vercelProduction}` : "https://sepic.me"),
  name: "Nikola Šepić",
  email: "sepicnikola@gmail.com",
  phone: "+381 63 7624 555",
  phoneHref: "tel:+381637624555",
  github: "https://github.com/sepicn",
  linkedin: "https://www.linkedin.com/in/sepicn/",
  location: { city: "Belgrade", country: "RS" },
} as const;

export const navItems = [
  { key: "projects", href: "/projects" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
