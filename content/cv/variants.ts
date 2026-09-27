import type { Localized } from "../i18n";

/**
 * One-page, role-specific CVs built by scripts/build-cv-variants.mjs.
 *
 * Rules these follow (recruiters skim a CV in 6 to 8 seconds, and ATS parsers read it first):
 *  - one page, one column, standard section names, no tables or text boxes in the DOCX
 *  - the headline and summary carry the keywords of the role
 *  - bullets start with a verb, fit on one or two lines and end in a concrete result
 *  - only public numbers: percentages and counts of my own work, never client spend
 *    or conversion counts
 */

export type SectionId = "summary" | "skills" | "experience" | "projects" | "education";

export type CvJob = {
  /** Id from content/data/experience.ts: dates, company and location come from there. */
  id: string;
  role?: Localized;
  stack: string;
  bullets: { sr: string[]; en: string[] };
};

export type CvProject = {
  title: string;
  stack: string;
  line: Localized;
  link: string;
};

export type CvVariant = {
  id: string;
  /** Used in the file name: Nikola_Sepic_<file>_CV_EN.pdf */
  file: string;
  label: Localized;
  headline: Localized;
  summary: Localized;
  skills: { label: Localized; items: string }[];
  order: SectionId[];
  jobs: CvJob[];
  projects: CvProject[];
  educationNote?: Localized;
};

// ---------------------------------------------------------------------------
// Bullets, written once and picked per role. Every number here is public.

const b = {
  mtChatbot: {
    sr: "Napravio chatbot za pacijente koji odgovara na pitanja i zakazuje termin, sa promenljivim AI provajderom.",
    en: "Built a patient chatbot that answers questions and books appointments, with a switchable AI provider.",
  },
  mtConsent: {
    sr: "Uveo daljinsko potpisivanje saglasnosti: šalter šalje dokument na tablet, a potpis se vezuje za nalog.",
    en: "Shipped remote consent signing: the front desk sends a document to a tablet and the signature attaches to the order.",
  },
  mtI18n: {
    sr: "Vodim i18n platforme od ~400 hiljada linija koda na 5 jezika, sa lokalizovanim URL-ovima.",
    en: "Own i18n for a ~400k-line platform in 5 languages with localized URLs.",
  },
  seo: {
    sr: "Podigao Semrush Site Health sa 90% na 98% za nedelju dana: greške 6 → 0, upozorenja −87%.",
    en: "Raised Semrush Site Health from 90% to 98% in one week: errors 6 → 0, warnings down 87%.",
  },
  seoHow: {
    sr: "Uveo SSR za blog i prodavnicu, hreflang i canonical za 5 jezika, JSON-LD, HSTS i llms.txt.",
    en: "Moved the blog and shop to SSR and added hreflang, canonical, JSON-LD, HSTS and llms.txt across 5 languages.",
  },
  dForms: {
    sr: "Kao UI developer u timu od dva developera, redizajnirao 40+ formi u TMS-u u modularne višestepene wizard-e.",
    en: "As the UI developer on a two-developer team, redesigned 40+ TMS forms into modular multi-step wizards.",
  },
  dMap: {
    sr: "Napravio živu Leaflet mapu pošiljke sa stanicama, lokacijom kamiona i ETA po stanici (Rails 7, Hotwire).",
    en: "Built a live Leaflet shipment map with stops, truck location and ETA per stop (Rails 7, Hotwire).",
  },
  dScreens: {
    sr: "Standardizovao Safety, Invoicing i Fuel ekrane u grid prikaze i modale; 101 commit kroz Jira i code review.",
    en: "Rebuilt the Safety, Invoicing and Fuel screens as standard grids and modals; 101 commits via Jira and code review.",
  },
  fPlatform: {
    sr: "Razvijam klijentsku platformu IT Expert (Nuxt 4, Laravel 12): portal, kalkulator cene, pretplate, Raiffeisen plaćanja.",
    en: "Develop the IT Expert client platform (Nuxt 4, Laravel 12): portal, price calculator, subscriptions, Raiffeisen payments.",
  },
  fSites: {
    sr: "Isporučio 3 sajta za firme u Nuxt-u 4 sa GTM-om tek posle pristanka; slike smanjio sa ~8 MB na ispod 120 KB.",
    en: "Delivered 3 business sites in Nuxt 4 with consent-gated GTM; cut images from ~8 MB to under 120 KB.",
  },
  fAds: {
    sr: "Vodim 8 Google Ads Search kampanja i Meta Ads za privatnu bolnicu, uz GA4 i GTM merenje konverzija.",
    en: "Manage 8 Google Ads Search campaigns and Meta Ads for a private hospital, with GA4 and GTM conversion tracking.",
  },
  fNegatives: {
    sr: "Iz izveštaja o pretragama izdvojio 370+ negativnih ključnih reči; označio klikove i do 19× skuplje od proseka.",
    en: "Built 370+ negative keywords from search term reports and flagged clicks costing up to 19× the average.",
  },
  fShare: {
    sr: "Analizom izgubljenog udela prikaza pokazao da kampanje sa do 54% nižom cenom konverzije imaju najviše prostora.",
    en: "Used lost impression share analysis to show that campaigns with up to 54% lower cost per conversion had the most room.",
  },
} satisfies Record<string, Localized>;

const both = (...items: Localized[]) => ({
  sr: items.map((i) => i.sr),
  en: items.map((i) => i.en),
});

// ---------------------------------------------------------------------------
// Projects, one line each.

const p = {
  tracker: {
    title: "Job Application Tracker",
    stack: "Next.js 16, MongoDB, Better Auth",
    line: {
      sr: "Kanban sa optimističnim prevlačenjem i Zod validacijom na svakoj serverskoj akciji.",
      en: "Kanban board with optimistic drag and drop and Zod validation on every server action.",
    },
    link: "github.com/sepicn/job-application-tracker",
  },
  gymai: {
    title: "GymAI",
    stack: "React 19, Express 5, Prisma",
    line: {
      sr: "AI nedeljni plan treninga: Zod provera odgovora, fallback modeli, rate limit, 44 testa.",
      en: "AI weekly training plans: Zod-checked output, model fallback, rate limits, 44 tests.",
    },
    link: "github.com/sepicn/gym-planner",
  },
  launchhub: {
    title: "LaunchHub",
    stack: "Next.js 16, Clerk, Drizzle",
    line: {
      sr: "Glasanje za nove proizvode u stilu Product Hunt-a, sa admin odobravanjem.",
      en: "Product Hunt-style voting with an admin approval flow.",
    },
    link: "github.com/sepicn/launchhub",
  },
  echo: {
    title: "Echo",
    stack: "Next.js 15, Elysia, Upstash Redis",
    line: {
      sr: "Realtime chat soba za dvoje koja se sama briše posle 10 minuta.",
      en: "Realtime chat room for two that deletes itself after 10 minutes.",
    },
    link: "github.com/sepicn/echo",
  },
  portfolio: {
    title: "sepic.me",
    stack: "Next.js 16, React Three Fiber, GSAP",
    line: {
      sr: "Portfolio kao 3D soba, dvojezičan, WCAG AA, Playwright i Vitest testovi.",
      en: "Portfolio built as a 3D room, bilingual, WCAG AA, Playwright and Vitest tests.",
    },
    link: "sepic.me",
  },
  medicaltime: {
    title: "medicaltime.rs",
    stack: "Nuxt 4, Laravel 12",
    line: {
      sr: "Bolnička platforma na 5 jezika: SEO, GA4 i GTM merenje, Google Ads i Meta Ads.",
      en: "Hospital platform in 5 languages: SEO, GA4 and GTM tracking, Google Ads and Meta Ads.",
    },
    link: "medicaltime.rs",
  },
  mango: {
    title: "Mango poslastičarnica",
    stack: "Nuxt 4, SSR",
    line: {
      sr: "Sajt sa 4 teme, GTM tek posle pristanka i brzim slikama na mobilnom.",
      en: "Site with 4 themes, consent-gated GTM and fast images on mobile.",
    },
    link: "mangoposlasticarnica.rs",
  },
  vuk: {
    title: "Vuk Studio",
    stack: "Nuxt 4, static",
    line: {
      sr: "LocalBusiness i FAQ strukturirani podaci za lokalnu pretragu od prvog dana.",
      en: "LocalBusiness and FAQ structured data for local search from day one.",
    },
    link: "vuk-studio.rs",
  },
  prostor: {
    title: "Prostor Između",
    stack: "WordPress",
    line: {
      sr: "E-magazin o psihologiji: rubrike, newsletter, ceo sajt sam.",
      en: "Psychology e-magazine: sections and newsletter, whole site built solo.",
    },
    link: "prostorizmedju.rs",
  },
} satisfies Record<string, CvProject>;

const freelanceDev: Localized = {
  sr: "Freelance web developer",
  en: "Freelance Web Developer",
};

const midSkills: CvVariant["skills"] = [
  {
    label: { sr: "Jezici", en: "Languages" },
    items: "TypeScript, JavaScript, PHP, C#, SQL",
  },
  {
    label: { sr: "Front-end", en: "Front-end" },
    items: "React 19, Next.js 16, Vue 3, Nuxt 4, Tailwind CSS, HTML, CSS",
  },
  {
    label: { sr: "Back-end", en: "Back-end" },
    items:
      "Node.js, Express, Laravel 12, ASP.NET Core 8, Rails 7, REST APIs, Auth (Better Auth, Clerk, Sanctum)",
  },
  {
    label: { sr: "Baze i alati", en: "Data and tools" },
    items:
      "PostgreSQL, MySQL, MongoDB, Redis, Prisma, Drizzle, Git, Jira, Vitest, Playwright, GitHub Actions, Docker",
  },
];

const midJobs: CvJob[] = [
  {
    id: "medicaltime",
    stack: "Nuxt 4, Vue 3, TypeScript, Laravel 12, MySQL",
    bullets: both(b.mtChatbot, b.mtConsent, b.mtI18n, b.seo),
  },
  {
    id: "delta",
    stack: "ASP.NET Core 8 MVC, Razor, Rails 7, Hotwire, Leaflet",
    bullets: both(b.dForms, b.dMap, b.dScreens),
  },
];

export const variants: CvVariant[] = [
  {
    id: "fullstack-mid",
    file: "FullStack_Mid",
    label: {
      sr: "Full-stack developer (medior)",
      en: "Full-stack developer (mid-level)",
    },
    headline: {
      sr: "Full-Stack Developer | TypeScript · Next.js · Nuxt · Laravel · Node.js",
      en: "Full-Stack Developer | TypeScript · Next.js · Nuxt · Laravel · Node.js",
    },
    summary: {
      sr: "Full-stack developer sa 1,5 godinom na produkcionim sistemima: bolnička platforma od ~400 hiljada linija koda (Nuxt 4, Laravel 12), TMS za logistiku iz SAD (ASP.NET Core 8) i portal za praćenje pošiljki (Rails 7). Funkcionalnost vodim od interfejsa preko REST API-ja do baze.",
      en: "Full-stack developer with 1.5 years on production systems: a ~400k-line hospital platform (Nuxt 4, Laravel 12), a US logistics TMS (ASP.NET Core 8) and a shipment tracking portal (Rails 7). I take features from the UI through REST APIs to the database.",
    },
    skills: midSkills,
    order: ["summary", "skills", "experience", "projects", "education"],
    jobs: [
      ...midJobs,
      {
        id: "freelance",
        role: {
          sr: "Freelance full-stack developer",
          en: "Freelance Full-Stack Developer",
        },
        stack: "Nuxt 4, Laravel 12, MySQL",
        bullets: both(b.fPlatform, b.fSites),
      },
    ],
    projects: [p.tracker, p.gymai, p.launchhub],
  },
  {
    id: "fullstack-junior",
    file: "FullStack_Junior",
    label: { sr: "Junior full-stack developer", en: "Junior full-stack developer" },
    headline: {
      sr: "Junior Full-Stack Developer | React · Next.js · Node.js · TypeScript",
      en: "Junior Full-Stack Developer | React · Next.js · Node.js · TypeScript",
    },
    summary: {
      sr: "Diplomirani inženjer IT-a (Singidunum, 2024) sa 1,5 godinom rada na produkcionim sistemima u Nuxt-u, Laravelu, .NET-u i Rails-u. Rails i .NET naučio na poslu i u oba isporučio UI koji se koristi svaki dan. Full-stack aplikacije pravim u Next.js-u, Express-u i Prisma-i, sa autentifikacijom i testovima.",
      en: "IT graduate (Singidunum University, 2024) with 1.5 years on production systems in Nuxt, Laravel, .NET and Rails. Learned Rails and .NET on the job and shipped UI in both that people use daily. I build full-stack apps in Next.js, Express and Prisma, with auth and tests.",
    },
    skills: [
      {
        label: { sr: "Front-end", en: "Front-end" },
        items:
          "TypeScript, JavaScript, React 19, Next.js 16, Vue 3, Nuxt 4, Tailwind CSS, HTML, CSS",
      },
      {
        label: { sr: "Back-end", en: "Back-end" },
        items:
          "Node.js, Express, REST APIs, Server Actions, Laravel 12, Auth (Better Auth, Clerk)",
      },
      {
        label: { sr: "Baze i alati", en: "Data and tools" },
        items:
          "PostgreSQL, MySQL, MongoDB, Prisma, Drizzle, Git, Jira, Vitest, Playwright, Vercel",
      },
      {
        label: { sr: "Upoznat sa", en: "Familiar with" },
        items: "ASP.NET Core 8 (C#), Ruby on Rails 7, Redis, Docker",
      },
    ],
    order: ["summary", "skills", "projects", "experience", "education"],
    jobs: [
      {
        id: "medicaltime",
        stack: "Nuxt 4, Vue 3, Laravel 12",
        bullets: both(b.mtChatbot, b.mtI18n),
      },
      {
        id: "delta",
        stack: "ASP.NET Core 8 MVC, Rails 7, Leaflet",
        bullets: both(b.dForms, b.dMap),
      },
      {
        id: "freelance",
        role: freelanceDev,
        stack: "Nuxt 4, Laravel 12",
        bullets: both(b.fPlatform),
      },
    ],
    projects: [p.tracker, p.gymai, p.launchhub, p.echo],
  },
  {
    id: "frontend",
    file: "FrontEnd",
    label: { sr: "Front-end developer", en: "Front-end developer" },
    headline: {
      sr: "Front-End Developer | React · Next.js · Vue · TypeScript · Tailwind",
      en: "Front-End Developer | React · Next.js · Vue · TypeScript · Tailwind",
    },
    summary: {
      sr: "Front-end developer sa 1,5 godinom na produkcionom UI-ju. Kao jedini UI developer redizajnirao sam ceo interfejs TMS sistema iz SAD, a danas radim na javnom delu bolničke platforme na 5 jezika. Svakodnevno TypeScript, React, Next.js, Vue i Tailwind, sa fokusom na pristupačnost, performanse i SEO.",
      en: "Front-end developer with 1.5 years on production UI. As the only UI developer I redesigned the whole interface of a US logistics TMS, and I now work on the public site of a 5-language hospital platform. Daily TypeScript, React, Next.js, Vue and Tailwind, with a focus on accessibility, performance and SEO.",
    },
    skills: [
      {
        label: { sr: "Front-end", en: "Front-end" },
        items:
          "TypeScript, JavaScript, React 19, Next.js 16, Vue 3, Nuxt 4, HTML, CSS, Tailwind CSS",
      },
      {
        label: { sr: "UI i podaci", en: "UI and data" },
        items:
          "Responsive design, shadcn/ui, GSAP, Three.js, React Three Fiber, TanStack Query, react-hook-form, Zod",
      },
      {
        label: { sr: "Kvalitet", en: "Quality" },
        items:
          "Accessibility (WCAG AA), Lighthouse, technical SEO, i18n, Vitest, Playwright, code review",
      },
      {
        label: { sr: "Alati", en: "Tools" },
        items: "Git, Jira, Vercel, GitHub Actions, Node.js, REST APIs",
      },
    ],
    order: ["summary", "skills", "experience", "projects", "education"],
    jobs: [
      {
        id: "medicaltime",
        stack: "Nuxt 4, Vue 3, TypeScript, @nuxtjs/i18n",
        bullets: both(b.mtI18n, b.seo, b.mtChatbot),
      },
      {
        id: "delta",
        stack: "Razor, JavaScript, Bootstrap, Rails 7, Hotwire, Tailwind, Leaflet",
        bullets: both(b.dForms, b.dMap, b.dScreens),
      },
      {
        id: "freelance",
        role: {
          sr: "Freelance front-end developer",
          en: "Freelance Front-End Developer",
        },
        stack: "Nuxt 4, Vue 3, Tailwind",
        bullets: both(b.fSites),
      },
    ],
    projects: [p.portfolio, p.tracker, p.launchhub],
  },
  {
    id: "internship",
    file: "Internship",
    label: { sr: "Praksa", en: "Internship" },
    headline: {
      sr: "Web Developer – praksa | React · Next.js · Node.js · TypeScript",
      en: "Web Developer Intern | React · Next.js · Node.js · TypeScript",
    },
    summary: {
      sr: "Diplomirani inženjer IT-a (Singidunum, 2024) koji traži praksu u web razvoju. Iza mene je 1,5 godina ugovornog i freelance rada na produkcionim projektima, pa od prve nedelje mogu da preuzmem prave zadatke dok učim vaš stack i način rada tima.",
      en: "IT graduate (Singidunum University, 2024) looking for a web development internship. I bring 1.5 years of contract and freelance work on production projects, so I can take real tasks from week one while learning your stack and team practices.",
    },
    educationNote: {
      sr: "Programiranje, baze podataka, web razvoj, mreže; timski projekti sa podelom uloga.",
      en: "Programming, databases, web development, networking; team projects with defined roles.",
    },
    skills: [
      {
        label: { sr: "Front-end", en: "Front-end" },
        items:
          "TypeScript, JavaScript, React, Next.js, Vue, Nuxt, Tailwind CSS, HTML, CSS",
      },
      {
        label: { sr: "Back-end i baze", en: "Back-end and data" },
        items: "Node.js, Express, REST APIs, Laravel, PostgreSQL, MySQL, MongoDB, Prisma",
      },
      {
        label: { sr: "Alati", en: "Tools" },
        items: "Git, GitHub, Jira, Vitest, Playwright, Vercel",
      },
    ],
    order: ["summary", "education", "skills", "projects", "experience"],
    jobs: [
      {
        id: "medicaltime",
        stack: "Nuxt 4, Laravel 12",
        bullets: both(b.mtChatbot, b.mtI18n),
      },
      {
        id: "delta",
        stack: "ASP.NET Core 8 MVC, Rails 7",
        bullets: both(b.dForms, b.dMap),
      },
      { id: "freelance", role: freelanceDev, stack: "Nuxt 4", bullets: both(b.fSites) },
    ],
    projects: [p.tracker, p.gymai, p.launchhub],
  },
  {
    id: "web-marketing",
    file: "WebDev_Marketing",
    label: {
      sr: "Web developer i digitalni marketing",
      en: "Web developer and digital marketing",
    },
    headline: {
      sr: "Web Developer & Digital Marketing | Google Ads · Meta Ads · SEO · GA4",
      en: "Web Developer & Digital Marketing | Google Ads · Meta Ads · SEO · GA4",
    },
    summary: {
      sr: "Web developer koji sajtove i pravi i puni. Za privatnu bolnicu vodim 8 Google Ads kampanja i Meta Ads, a tehnički SEO je Semrush Site Health podigao sa 90% na 98% za nedelju dana. Sajtove pravim u Nuxt-u, Next.js-u i Laravelu, sa merenjem konverzija od prvog dana.",
      en: "A web developer who builds sites and fills them. For a private hospital I run 8 Google Ads campaigns and Meta Ads, and my technical SEO raised Semrush Site Health from 90% to 98% in one week. I build in Nuxt, Next.js and Laravel, with conversion tracking from day one.",
    },
    skills: [
      {
        label: { sr: "Oglašavanje", en: "Paid media" },
        items:
          "Google Ads (Search, Performance Max), Meta Ads, negative keywords, CPC bidding, impression share, ClickCease",
      },
      {
        label: { sr: "Analitika i SEO", en: "Analytics and SEO" },
        items:
          "GA4, Google Tag Manager, Consent Mode v2, Semrush, Search Console, hreflang, JSON-LD, Lighthouse",
      },
      {
        label: { sr: "Web razvoj", en: "Web development" },
        items:
          "TypeScript, Vue 3, Nuxt 4, React, Next.js, Laravel 12, Tailwind CSS, WordPress",
      },
    ],
    order: ["summary", "skills", "experience", "projects", "education"],
    jobs: [
      {
        id: "freelance",
        role: {
          sr: "Web developer i digitalni marketing",
          en: "Web Developer & Digital Marketing Specialist",
        },
        stack: "Google Ads, Meta Ads, GA4, GTM, Semrush, Nuxt 4, Laravel 12",
        bullets: both(b.fAds, b.fNegatives, b.fShare, b.seo, b.seoHow, b.fSites),
      },
      {
        id: "medicaltime",
        stack: "Nuxt 4, Vue 3, Laravel 12",
        bullets: both(b.mtI18n, b.mtChatbot),
      },
      {
        id: "delta",
        stack: "ASP.NET Core 8 MVC, Rails 7, Leaflet",
        bullets: both(b.dForms, b.dMap),
      },
    ],
    projects: [p.medicaltime, p.mango, p.vuk, p.prostor],
  },
];

/** The CV offered for download on sepic.me/cv: the broad version, dev plus marketing. */
export const siteVariant: CvVariant = {
  id: "site",
  file: "",
  label: { sr: "Opšti CV", en: "General CV" },
  headline: {
    sr: "Full-Stack Web Developer | Next.js · Nuxt · Laravel · Google Ads · SEO",
    en: "Full-Stack Web Developer | Next.js · Nuxt · Laravel · Google Ads · SEO",
  },
  summary: {
    sr: "Full-stack developer sa 1,5 godinom na produkcionim sistemima (Nuxt 4 i Laravel 12, ASP.NET Core 8, Rails 7) i praksom u digitalnom marketingu: 8 Google Ads kampanja za privatnu bolnicu i tehnički SEO koji je Site Health podigao sa 90% na 98%. Najjači u front-endu: TypeScript, React, Next.js, Vue.",
    en: "Full-stack developer with 1.5 years on production systems (Nuxt 4 and Laravel 12, ASP.NET Core 8, Rails 7) and hands-on digital marketing: 8 Google Ads campaigns for a private hospital and technical SEO that raised Site Health from 90% to 98%. Strongest on the front end: TypeScript, React, Next.js, Vue.",
  },
  skills: [
    ...midSkills,
    {
      label: { sr: "Marketing", en: "Marketing" },
      items: "Google Ads, Meta Ads, GA4, Google Tag Manager, technical SEO, Semrush",
    },
  ],
  order: ["summary", "skills", "experience", "projects", "education"],
  jobs: [
    ...midJobs,
    {
      id: "freelance",
      stack: "Nuxt 4, Laravel 12, Google Ads, Meta Ads, GA4, GTM",
      bullets: both(b.fPlatform, b.fAds, b.fNegatives),
    },
  ],
  projects: [p.tracker, p.gymai],
};
