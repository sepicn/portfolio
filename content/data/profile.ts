import type { Localized, LocalizedList } from "../i18n";

export const profile = {
  name: "Nikola Šepić",
  firstName: "Nikola",
  title: {
    sr: "Full-stack web developer i digitalni marketing",
    en: "Full-stack web developer and digital marketing",
  } satisfies Localized,
  cvTitle: {
    sr: "Full-Stack Web Developer | Google Ads, Meta Ads, SEO",
    en: "Full-Stack Web Developer | Google Ads, Meta Ads, SEO",
  } satisfies Localized,
  location: { sr: "Beograd, Srbija", en: "Belgrade, Serbia" } satisfies Localized,
  email: "sepicnikola@gmail.com",
  phone: "+381 63 7624 555",
  phoneHref: "tel:+381637624555",
  website: "https://sepic.me",
  github: "https://github.com/sepicn",
  linkedin: "https://www.linkedin.com/in/sepicn/",
  photo: "/images/nikola.webp",
  summary: {
    sr: "Gradim web aplikacije i sajtove, a zatim im dovodim klijente kroz Google Ads, Meta Ads i SEO. Više od godinu i po dana isporučujem na produkcionim sistemima: platformi privatne bolnice od oko 400 hiljada linija koda u Nuxt-u i Laravelu, redizajnu interfejsa TMS sistema američke logističke firme u .NET-u i portalu za praćenje pošiljki u Rails-u. Za istu bolnicu vodim osam Google Ads kampanja, a tehnički SEO je Semrush Site Health podigao sa 90% na 98% za nedelju dana. Lične projekte gradim u Next.js-u sa TypeScript-om. Diplomirao sam informacione tehnologije na Singidunumu 2024.",
    en: "I build web apps and websites, then bring them customers through Google Ads, Meta Ads and SEO. For more than a year and a half I have shipped on production systems: a ~400k-line private hospital platform in Nuxt and Laravel, the UI redesign of a US logistics company's TMS in .NET, and a shipment tracking portal in Rails. For the same hospital I run eight Google Ads campaigns, and my technical SEO took Semrush Site Health from 90% to 98% in one week. My personal projects are Next.js with TypeScript. I graduated in Information Technology from Singidunum University in 2024.",
  } satisfies Localized,
  cvSummary: {
    sr: "Web developer sa više od godinu i po dana rada na produkcionim sistemima (Nuxt i Laravel, .NET MVC, Rails) koji za privatnu bolnicu vodi i digitalni marketing: osam Google Ads kampanja, Meta Ads, GA4, GTM i tehnički SEO koji je Semrush Site Health podigao sa 90% na 98%. Najjači u front-end sloju: TypeScript, React i Next.js, Vue i Nuxt, Tailwind. Tražim medior front-end ili full-stack poziciju, uz otvorenost za freelance.",
    en: "Web developer with more than a year and a half on production systems (Nuxt and Laravel, .NET MVC, Rails) who also runs digital marketing for a private hospital: eight Google Ads campaigns, Meta Ads, GA4, GTM, and technical SEO that raised Semrush Site Health from 90% to 98%. Strongest on the front end: TypeScript, React and Next.js, Vue and Nuxt, Tailwind. Looking for a mid-level front-end or full-stack role, open to freelance work.",
  } satisfies Localized,
  availability: {
    sr: "Dostupan za freelance projekte i stalno zaposlenje, Beograd ili remote.",
    en: "Available for freelance projects and full-time roles, Belgrade or remote.",
  } satisfies Localized,
  /** Client-facing availability for the home and contact pages; job-seeking stays on /about and /cv. */
  openFor: {
    sr: "Primam nove projekte, uživo u Beogradu ili remote.",
    en: "Taking on new projects, in person in Belgrade or remote.",
  } satisfies Localized,
};

export type SkillLevel = "daily" | "solid" | "working";

export type SkillGroup = {
  id: string;
  label: Localized;
  skills: { name: string; level: SkillLevel; note?: Localized }[];
};

/**
 * Levels are honest, not marketing:
 *  daily   = used every week on production work for a year or more
 *  solid   = shipped real features with it, comfortable without hand holding
 *  working = used on a project, can read and extend, would not call myself an expert
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: { sr: "Front-end", en: "Front-end" },
    skills: [
      { name: "TypeScript", level: "daily" },
      { name: "JavaScript (ES2023)", level: "daily" },
      { name: "React", level: "daily" },
      { name: "Next.js", level: "daily" },
      { name: "Vue", level: "daily" },
      { name: "Nuxt", level: "daily" },
      { name: "Tailwind CSS", level: "daily" },
      { name: "HTML, CSS, responsive layout", level: "daily" },
      { name: "Razor views (.NET MVC)", level: "solid" },
      { name: "Hotwire (Turbo, Stimulus)", level: "working" },
      { name: "Three.js, React Three Fiber", level: "working" },
      { name: "GSAP, Motion", level: "working" },
    ],
  },
  {
    id: "backend",
    label: { sr: "Back-end i baze", en: "Back-end and databases" },
    skills: [
      { name: "Node.js, Express", level: "solid" },
      { name: "Laravel (PHP)", level: "solid" },
      { name: "REST API design", level: "solid" },
      { name: "PostgreSQL, MySQL", level: "solid" },
      { name: "MongoDB, Mongoose", level: "solid" },
      { name: "Prisma, Drizzle", level: "solid" },
      { name: "Ruby on Rails", level: "working" },
      { name: "ASP.NET Core (C#)", level: "working" },
      { name: "Redis (Upstash)", level: "working" },
      { name: "Auth: Better Auth, Clerk, Sanctum, Devise", level: "solid" },
    ],
  },
  {
    id: "marketing",
    label: { sr: "Digitalni marketing", en: "Digital marketing" },
    skills: [
      { name: "Google Ads (Search, Performance Max)", level: "daily" },
      { name: "Meta Ads (Facebook, Instagram)", level: "daily" },
      { name: "Google Analytics 4", level: "daily" },
      { name: "Google Tag Manager", level: "daily" },
      { name: "Technical SEO (Semrush, Search Console)", level: "daily" },
      { name: "Structured data (JSON-LD), hreflang", level: "solid" },
      { name: "Click fraud protection (ClickCease)", level: "solid" },
      { name: "Landing page conversion", level: "solid" },
    ],
  },
  {
    id: "tools",
    label: { sr: "Alati i praksa", en: "Tools and practice" },
    skills: [
      { name: "Git, GitHub, pull requests, code review", level: "daily" },
      { name: "Jira", level: "solid" },
      { name: "Vercel, GitHub Actions CI", level: "solid" },
      { name: "Vitest, Playwright", level: "solid" },
      { name: "Zod validation", level: "solid" },
      { name: "i18n (next-intl, @nuxtjs/i18n)", level: "daily" },
      { name: "Accessibility (WCAG AA, axe)", level: "solid" },
      { name: "Blender (glTF pipeline)", level: "working" },
      { name: "Docker, Azure App Service", level: "working" },
    ],
  },
];

export const education = [
  {
    school: {
      sr: "Univerzitet Singidunum, Beograd",
      en: "Singidunum University, Belgrade",
    },
    degree: {
      sr: "Diplomirani inženjer informacionih tehnologija (BSc)",
      en: "BSc in Information Technology",
    } satisfies Localized,
    period: "2020 – 2024",
    notes: {
      sr: [
        "Programiranje, baze podataka, web razvoj, sistemska administracija i mreže.",
        "Timski projekti sa podelom uloga i prezentacijama rezultata.",
      ],
      en: [
        "Programming, databases, web development, system administration and networking.",
        "Team projects with defined roles and presented results.",
      ],
    } satisfies LocalizedList,
  },
];

export const certificates = [
  {
    title: "React: The Complete Guide",
    org: "Udemy",
    year: 2024,
    url: "https://www.udemy.com/certificate/UC-3ca34e42-31e6-4d29-8154-88f64ff55dab/",
  },
  {
    title: "The Complete JavaScript Course",
    org: "Udemy",
    year: 2023,
    url: "https://www.udemy.com/certificate/UC-e1cfe864-8575-428c-811e-7f8016015130/",
  },
  {
    title: "Build Responsive Real-World Websites with HTML and CSS",
    org: "Udemy",
    year: 2023,
    url: "https://www.udemy.com/certificate/UC-dd4630f5-8d19-45d1-aea7-c53aac5a9dd9/",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    org: "freeCodeCamp",
    year: 2023,
    url: "https://www.freecodecamp.org/certification/sepicnikola/javascript-algorithms-and-data-structures",
  },
  {
    title: "Responsive Web Design",
    org: "freeCodeCamp",
    year: 2023,
    url: "https://www.freecodecamp.org/certification/sepicnikola/responsive-web-design",
  },
];

export const languages = [
  { name: { sr: "Srpski", en: "Serbian" }, level: { sr: "maternji", en: "native" } },
  {
    name: { sr: "Engleski", en: "English" },
    level: { sr: "tečno (C1)", en: "fluent (C1)" },
  },
  {
    name: { sr: "Španski", en: "Spanish" },
    level: { sr: "osnovno (A2)", en: "basic (A2)" },
  },
];

export const personal = {
  sr: "Van posla: knjige, mačka, teretana i duge šetnje po Beogradu. Synthwave mi je stalno u slušalicama, otuda i ova soba.",
  en: "Outside work: books, my cat, the gym and long walks around Belgrade. Synthwave is always in my headphones, which is where this room comes from.",
} satisfies Localized;
