import type { Localized } from "../i18n";

export const home = {
  kicker: { sr: "Full-stack · Google Ads · Beograd", en: "Full-stack · Google Ads · Belgrade" },
  titleBefore: { sr: "Gradim", en: "I build" },
  titleStrike: { sr: "sajtove", en: "websites" },
  titleBlue: { sr: "sisteme", en: "systems" },
  titleAfter: { sr: "i dovodim im korisnike.", en: "and bring them users." },
  who: {
    sr: "Ja sam Nikola, programer iz Beograda. Pravim web aplikacije od baze do ekrana i dovodim im korisnike preko Google Ads-a.",
    en: "I am Nikola, a developer from Belgrade. I build web apps from the database to the screen and bring them users through Google Ads.",
  },
  ctaProjects: { sr: "Pogledaj projekte", en: "See the projects" },
  ctaCv: { sr: "Preuzmi CV (PDF)", en: "Download CV (PDF)" },
  facts: [
    { value: "16", label: { sr: "projekata", en: "projects" } },
    { value: "400k", label: { sr: "linija koda u jednoj platformi", en: "lines of code in one platform" } },
    { value: "5", label: { sr: "jezika na jednoj platformi", en: "languages on one platform" } },
    { value: "−54%", label: { sr: "niža cena konverzije", en: "lower cost per conversion" } },
  ] satisfies { value: string; label: Localized }[],
  projectsTag: { sr: "Projekti", en: "Projects" },
  projectsTitle: { sr: "Na čemu radim", en: "What I work on" },
  projectsLead: {
    sr: "Tri projekta koja najbolje pokazuju kako radim.",
    en: "The three projects that best show how I work.",
  },
  allProjects: { sr: "Svih 16 projekata", en: "All 16 projects" },
  story: { sr: "Cela priča", en: "Full story" },
  processTag: { sr: "Put jednog projekta", en: "How a project goes" },
  processTitle: { sr: "Od ideje do prvih korisnika", en: "From idea to first users" },
  processLead: {
    sr: "Šta pokrivam na jednom projektu.",
    en: "What I cover on a single project.",
  },
  process: [
    {
      title: { sr: "Zahtev", en: "The ask" },
      body: {
        sr: "Sve počne porukom: klijent, poslodavac ili moja ideja.",
        en: "It starts with a message: a client, an employer or my own idea.",
      },
    },
    {
      title: { sr: "Nacrt", en: "The drawing" },
      body: {
        sr: "Arhitektura pre koda: moduli, baza, API.",
        en: "Architecture before code: modules, database, API.",
      },
    },
    {
      title: { sr: "Gradim", en: "Building" },
      body: {
        sr: "Back-end i front-end, od baze do ekrana.",
        en: "Back end and front end, from database to screen.",
      },
    },
    {
      title: { sr: "Puštam", en: "Shipping" },
      body: {
        sr: "Brzina, prevodi, SEO i merenje od prvog dana.",
        en: "Speed, translations, SEO and tracking from day one.",
      },
    },
    {
      title: { sr: "Dovodim ljude", en: "Bringing people" },
      body: {
        sr: "Google Ads, Meta i SEO, uz stalno praćenje.",
        en: "Google Ads, Meta and SEO, monitored continuously.",
      },
    },
  ] satisfies { title: Localized; body: Localized }[],
  processOutro: {
    sr: "Svaki projekat ovde je prošao ovaj put.",
    en: "Every project here went down this road.",
  },
  servicesTag: { sr: "Usluge za firme", en: "Services for businesses" },
  servicesTitle: { sr: "Sajt, oglasi, SEO", en: "Site, ads, SEO" },
  servicesLead: {
    sr: "Za firme, kao freelancer. Cena posle kratkog razgovora.",
    en: "For businesses, as a freelancer. Price after a short call.",
  },
  serviceCards: {
    web: {
      sr: "Next.js, Nuxt ili Laravel. Brzi sajtovi na više jezika.",
      en: "Next.js, Nuxt or Laravel. Fast, multilingual sites.",
    },
    "google-ads": {
      sr: "Search i PMax, uz stalno praćenje cene klika.",
      en: "Search and PMax, with constant CPC monitoring.",
    },
    "meta-ads": {
      sr: "Facebook i Instagram kampanje sa merenjem.",
      en: "Facebook and Instagram campaigns with tracking.",
    },
    seo: {
      sr: "Tehnički SEO, GA4 i GTM. Site Health 90% na 98%.",
      en: "Technical SEO, GA4 and GTM. Site Health 90% to 98%.",
    },
  } satisfies Record<string, Localized>,
  more: { sr: "Više", en: "More" },
  jobsTag: { sr: "Iskustvo", en: "Experience" },
  jobsTitle: { sr: "Gde sam radio", en: "Where I have worked" },
  jobsLead: {
    sr: "Od 2025. na produkcionim sistemima.",
    en: "On production systems since 2025.",
  },
  jobsShort: {
    freelance: {
      sr: "Google Ads i Meta oglasi, sajtovi za lokalne firme.",
      en: "Google Ads and Meta ads, sites for local businesses.",
    },
    medicaltime: {
      sr: "Prevodi na 5 jezika, chatbot za zakazivanje.",
      en: "Translations in 5 languages, a booking chatbot.",
    },
    delta: {
      sr: "40+ formi pretvoreno u korake, mapa pošiljki.",
      en: "40+ forms turned into wizards, a shipment map.",
    },
  } satisfies Record<string, Localized>,
  education: {
    period: "2020 · 2024",
    title: { sr: "Diploma, informacione tehnologije", en: "BSc, Information Technology" },
    place: { sr: "Univerzitet Singidunum, Beograd", en: "Singidunum University, Belgrade" },
    note: {
      sr: "Osnovne studije, plus kursevi za JavaScript i React.",
      en: "Undergraduate studies, plus JavaScript and React courses.",
    },
  },
  now: { sr: "danas", en: "now" },
  skillsTag: { sr: "Veštine", en: "Skills" },
  skillsTitle: { sr: "Šta koristim, i gde", en: "What I use, and where" },
  skillsLead: {
    sr: "Bez ocena od 1 do 5. Uz svaku tehnologiju je projekat gde se vidi.",
    en: "No 1 to 5 ratings. Each technology links to a project that shows it.",
  },
  meTag: { sr: "O meni", en: "About me" },
  meTitle: { sr: "Kad ne kodiram", en: "When I am not coding" },
  meBody: {
    sr: "Knjige, teretana, šetnje po Beogradu i mačka. Dok radim, synthwave.",
    en: "Books, the gym, walks around Belgrade and a cat. Synthwave while I work.",
  },
  meLanguages: {
    sr: "Srpski, engleski (C1), španski učim.",
    en: "Serbian, English (C1), learning Spanish.",
  },
  meTags: {
    sr: ["Knjige", "Teretana", "Mačka", "Synthwave", "Šetnje po Beogradu"],
    en: ["Books", "Gym", "Cat", "Synthwave", "Walks around Belgrade"],
  },
  photoCaption: { sr: "Beograd, 2026.", en: "Belgrade, 2026." },
  contactTag: { sr: "Kontakt", en: "Contact" },
  contactTitle1: { sr: "Pišite", en: "Write" },
  contactTitle2: { sr: "mi.", en: "to me." },
  contactLead: {
    sr: "Recite ukratko šta vam treba. Javljam se brzo.",
    en: "Tell me briefly what you need. I reply quickly.",
  },
};

type Feature = { kind: Localized; body: Localized[]; kpis: { value: string; label: Localized }[] };

export const featured: { slug: string; copy: Feature }[] = [
  {
    slug: "medical-time",
    copy: {
      kind: { sr: "Bolnica · klijent", en: "Hospital · client" },
      body: [
        {
          sr: "Bolnička platforma na 5 jezika i njen Google Ads nalog.",
          en: "A hospital platform in 5 languages and its Google Ads account.",
        },
      ],
      kpis: [
        { value: "5", label: { sr: "jezika", en: "languages" } },
        { value: "98%", label: { sr: "Site Health", en: "Site Health" } },
        { value: "−54%", label: { sr: "cena konverzije", en: "cost per conversion" } },
      ],
    },
  },
  {
    slug: "kafe",
    copy: {
      kind: { sr: "Moj SaaS", en: "My SaaS" },
      body: [
        {
          sr: "SaaS za restorane koji radi i kad padne internet.",
          en: "Restaurant SaaS that keeps working when the internet drops.",
        },
      ],
      kpis: [
        { value: "2.265", label: { sr: "Python testova", en: "Python tests" } },
        { value: "25", label: { sr: "Django modula", en: "Django modules" } },
        { value: "32", label: { sr: "zapisane odluke (ADR)", en: "decision records (ADR)" } },
      ],
    },
  },
  {
    slug: "makaze",
    copy: {
      kind: { sr: "Moj SaaS", en: "My SaaS" },
      body: [
        {
          sr: "Softver za salone: kalendar, kasa i online zakazivanje.",
          en: "Salon software: calendar, till and online booking.",
        },
      ],
      kpis: [
        { value: "11", label: { sr: "Go modula", en: "Go modules" } },
        { value: "111", label: { sr: "API operacija", en: "API operations" } },
        { value: "120", label: { sr: "Go testova", en: "Go tests" } },
      ],
    },
  },
];

export type SkillRow = { name: string | Localized; note?: Localized; projects: string[] };

export const skillProof: { group: Localized; rows: SkillRow[] }[] = [
  {
    group: { sr: "Front-end", en: "Front end" },
    rows: [
      { name: "TypeScript", note: { sr: "svakodnevno", en: "daily" }, projects: ["medical-time", "job-application-tracker", "gymai", "launchhub"] },
      { name: "Vue, Nuxt", note: { sr: "svakodnevno", en: "daily" }, projects: ["medical-time", "itexpert", "mango", "vuk-studio"] },
      { name: "React, Next.js", projects: ["makaze", "kafe", "job-application-tracker", "nst-print-mill"] },
      { name: "ASP.NET Razor", projects: ["logistics-tms"] },
      { name: "Rails, Hotwire", projects: ["shipment-tracking"] },
    ],
  },
  {
    group: { sr: "Back-end i baze", en: "Back end and databases" },
    rows: [
      { name: "Laravel", projects: ["medical-time", "itexpert"] },
      { name: "Go", projects: ["makaze"] },
      { name: "Django, Python", projects: ["kafe"] },
      { name: "Node, Express", projects: ["gymai"] },
      { name: "PostgreSQL, MySQL, MongoDB", projects: ["makaze", "kafe", "medical-time", "job-application-tracker"] },
      { name: "Prisma, Drizzle", projects: ["gymai", "launchhub"] },
    ],
  },
  {
    group: { sr: "Marketing", en: "Marketing" },
    rows: [
      { name: "Google Ads", note: { sr: "svakodnevno", en: "daily" }, projects: ["medical-time"] },
      { name: "Meta Ads", projects: ["medical-time"] },
      { name: "Tehnički SEO, JSON-LD", projects: ["medical-time", "vuk-studio", "nst-print-mill"] },
      { name: "GA4, GTM", projects: ["medical-time", "mango"] },
    ],
  },
  {
    group: { sr: "Kvalitet i alati", en: "Quality and tooling" },
    rows: [
      { name: "Vitest, pytest, Playwright", projects: ["kafe", "makaze", "itexpert", "gymai"] },
      { name: "i18n", projects: ["medical-time", "itexpert"] },
      { name: "Blender, Three.js", projects: ["nst-print-mill"] },
      { name: "Docker, GitHub Actions, Vercel", projects: ["kafe", "vuk-studio", "job-application-tracker"] },
    ],
  },
  {
    group: { sr: "AI u radu", en: "AI workflow" },
    rows: [
      { name: "Claude Code, Codex", note: { sr: "svakodnevno", en: "daily" }, projects: ["kafe", "makaze"] },
      { name: { sr: "Paralelni agenti u git worktree-ima", en: "Parallel agents in git worktrees" }, projects: ["kafe", "nst-print-mill"] },
      { name: { sr: "Plan po fazama, ADR, pregled koda", en: "Phased plans, ADRs, code review" }, projects: ["kafe", "makaze"] },
      { name: { sr: "LLM u proizvodu: Claude API, OpenRouter", en: "LLMs in the product: Claude API, OpenRouter" }, projects: ["kafe", "gymai"] },
    ],
  },
];
