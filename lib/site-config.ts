export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sepic.me",
  name: "Nikola Šepić",
  email: "sepicnikola@gmail.com",
  phone: "+381 63 7624 555",
  phoneHref: "tel:+381637624555",
  github: "https://github.com/sepicn",
  linkedin: "https://www.linkedin.com/in/sepicn/",
  location: { city: "Belgrade", country: "RS" },
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "cv", href: "/cv" },
  { key: "contact", href: "/contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
