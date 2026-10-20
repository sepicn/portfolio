import type { Localized } from "../i18n";

export const home = {
  kicker: { sr: "Full-stack · Google Ads · Beograd", en: "Full-stack · Google Ads · Belgrade" },
  titleBefore: { sr: "Gradim", en: "I build" },
  titleStrike: { sr: "sajtove", en: "websites" },
  titleBlue: { sr: "sisteme", en: "systems" },
  titleAfter: { sr: "i dovodim im korisnike.", en: "and bring them users." },
  who: {
    sr: "Ja sam Nikola, programer iz Beograda. Volim da napravim ceo sistem, od baze do dugmeta na ekranu, a onda da vidim da ga ljudi stvarno koriste. Zato radim i kod i Google Ads. Ispod je kako to izgleda u praksi.",
    en: "I am Nikola, a developer from Belgrade. I like building the whole system, from the database to the button on the screen, and then seeing people actually use it. That is why I do both the code and Google Ads. Below is what that looks like in practice.",
  },
  ctaProjects: { sr: "Pogledaj projekte", en: "See the projects" },
  ctaCv: { sr: "Preuzmi CV (PDF)", en: "Download CV (PDF)" },
  drawingNote: { sr: "Nacrt: Makaze, softver za salone", en: "Drawing: Makaze, salon software" },
  layers: [
    { sr: "PostgreSQL", en: "PostgreSQL" },
    { sr: "Go API, 11 modula", en: "Go API, 11 modules" },
    { sr: "Studio za salon", en: "Salon studio" },
    { sr: "Klijentska aplikacija", en: "Client app" },
  ] satisfies Localized[],
  facts: [
    { value: "16", label: { sr: "projekata, 10 za klijente", en: "projects, 10 for clients" } },
    { value: "400k", label: { sr: "linija koda na platformi Medical Time", en: "lines of code on the Medical Time platform" } },
    { value: "5", label: { sr: "jezika koje održavam na jednoj platformi", en: "languages I maintain on one platform" } },
    { value: "−54%", label: { sr: "cena konverzije na najboljim kampanjama", en: "cost per conversion on the best campaigns" } },
  ] satisfies { value: string; label: Localized }[],
  projectsTag: { sr: "Projekti", en: "Projects" },
  projectsTitle: { sr: "Na čemu radim", en: "What I work on" },
  projectsLead: {
    sr: "Tri projekta na kojima sam najviše naučio. Ostali su na strani Projekti, svaki sa pričom i brojevima.",
    en: "The three projects I learned the most from. The rest are on the Projects page, each with its story and numbers.",
  },
  allProjects: { sr: "Svih 16 projekata", en: "All 16 projects" },
  story: { sr: "Cela priča", en: "Full story" },
  processTag: { sr: "Put jednog projekta", en: "How a project goes" },
  processTitle: { sr: "Od ideje do prvih korisnika", en: "From idea to first users" },
  processLead: {
    sr: "Šta sve pokrivam na jednom projektu, sa primerima iz mog rada.",
    en: "What I cover on a single project, with examples from my own work.",
  },
  process: [
    {
      title: { sr: "Zahtev", en: "The ask" },
      body: {
        sr: "Sve počne porukom: od klijenta, poslodavca ili moje ideje. Kod Makaza: saloni koji termine vode u svesci.",
        en: "It starts with a message: from a client, an employer or my own idea. For Makaze: salons that keep bookings in a notebook.",
      },
    },
    {
      title: { sr: "Nacrt", en: "The drawing" },
      body: {
        sr: "Arhitektura pre koda: moduli, baza, API. Za Makaze je to OpenAPI ugovor iz kog se generiše klijent.",
        en: "Architecture before code: modules, database, API. For Makaze that is an OpenAPI contract the client is generated from.",
      },
    },
    {
      title: { sr: "Gradim", en: "Building" },
      body: {
        sr: "Back-end u Laravelu, Go-u ili Django-u, front-end u Nuxt-u ili Next-u.",
        en: "Back end in Laravel, Go or Django, front end in Nuxt or Next.",
      },
    },
    {
      title: { sr: "Puštam", en: "Shipping" },
      body: {
        sr: "Brzina, prevodi, SEO i merenje od prvog dana. Medical Time: 5 jezika, 779 adresa u sitemap-u.",
        en: "Speed, translations, SEO and tracking from day one. Medical Time: 5 languages, 779 URLs in the sitemap.",
      },
    },
    {
      title: { sr: "Dovodim ljude", en: "Bringing people" },
      body: {
        sr: "Google Ads, Meta i SEO. Na nalogu bolnice najbolje kampanje su do 54% ispod prosečne cene konverzije.",
        en: "Google Ads, Meta and SEO. On the hospital account the best campaigns run up to 54% below the average cost per conversion.",
      },
    },
  ] satisfies { title: Localized; body: Localized }[],
  processOutro: {
    sr: "Svaki projekat ovde je prošao ovaj put, negde ceo, negde samo deo.",
    en: "Every project here went down this road, some of it or all of it.",
  },
  servicesTag: { sr: "Usluge za firme", en: "Services for businesses" },
  servicesTitle: { sr: "Sajt, oglasi, SEO", en: "Site, ads, SEO" },
  servicesLead: {
    sr: "Ovo radim za firme kao freelancer. Cenu dajem kad znam obim posla, obično posle jednog razgovora.",
    en: "This is what I do for businesses as a freelancer. I give a price once I know the scope, usually after one call.",
  },
  serviceCards: {
    web: {
      sr: "Next.js, Nuxt ili Laravel, zavisi šta projekat traži. Sajt za Mango ima 100 na tri od četiri Lighthouse merenja.",
      en: "Next.js, Nuxt or Laravel, depending on what the project needs. The Mango site scores 100 on three of four Lighthouse checks.",
    },
    "google-ads": {
      sr: "Search i PMax. Na nalogu bolnice najviše novca su sačuvale negativne ključne reči i granice za cenu klika.",
      en: "Search and PMax. On the hospital account, negative keywords and CPC caps saved the most money.",
    },
    "meta-ads": {
      sr: "Facebook i Instagram kampanje, trenutno za Medical Time.",
      en: "Facebook and Instagram campaigns, currently for Medical Time.",
    },
    seo: {
      sr: "Tehnički SEO, GA4, GTM i strukturirani podaci. Site Health sa 90% na 98% za nedelju dana.",
      en: "Technical SEO, GA4, GTM and structured data. Site Health from 90% to 98% in one week.",
    },
  } satisfies Record<string, Localized>,
  more: { sr: "Više", en: "More" },
  jobsTag: { sr: "Iskustvo", en: "Experience" },
  jobsTitle: { sr: "Gde sam radio", en: "Where I have worked" },
  jobsLead: {
    sr: "Dva ugovora i freelance u isto vreme, od 2025. Pre toga studije i kursevi.",
    en: "Two contracts and freelance work at the same time, since 2025. Before that, university and courses.",
  },
  jobsShort: {
    freelance: {
      sr: "Vodim 8 Google Ads kampanja i Meta oglase za Medical Time. Napravio sam sajtove za Mango, Vuk Studio i Stanke Enterijer.",
      en: "I run 8 Google Ads campaigns and Meta ads for Medical Time. I built the sites for Mango, Vuk Studio and Stanke Enterijer.",
    },
    medicaltime: {
      sr: "Održavam prevode na 5 jezika, napravio sam chatbot za zakazivanje, radio na fiskalizaciji i e-zdravlju.",
      en: "I maintain translations in 5 languages, built the booking chatbot and worked on fiscalisation and e-health.",
    },
    delta: {
      sr: "Pretvorio sam 40+ formi u korake u Logistics TMS-u. Mapa pošiljki u Rails-u.",
      en: "I turned 40+ forms into step-by-step wizards in Logistics TMS. Shipment map in Rails.",
    },
  } satisfies Record<string, Localized>,
  education: {
    period: "2020 · 2024",
    title: { sr: "Diploma, informacione tehnologije", en: "BSc, Information Technology" },
    place: { sr: "Univerzitet Singidunum, Beograd", en: "Singidunum University, Belgrade" },
    note: {
      sr: "Osnovne studije. Uz njih freeCodeCamp i Udemy kursevi za JavaScript i React.",
      en: "Undergraduate studies, plus freeCodeCamp and Udemy courses in JavaScript and React.",
    },
  },
  now: { sr: "danas", en: "now" },
  skillsTag: { sr: "Veštine", en: "Skills" },
  skillsTitle: { sr: "Šta koristim, i gde", en: "What I use, and where" },
  skillsLead: {
    sr: "Ne ocenjujem sebe od 1 do 5. Pored svake tehnologije su projekti u kojima sam je koristio, pa proverite sami.",
    en: "I do not rate myself from 1 to 5. Next to each technology are the projects I used it on, so you can check for yourself.",
  },
  meTag: { sr: "O meni", en: "About me" },
  meTitle: { sr: "Kad ne kodiram", en: "When I am not coding" },
  meBody: {
    sr: "Čitam, idem u teretanu i šetam po Beogradu. Kod kuće me čeka mačka. Dok radim, uglavnom slušam synthwave.",
    en: "I read, go to the gym and walk around Belgrade. A cat waits for me at home. While I work, it is mostly synthwave in my headphones.",
  },
  meLanguages: {
    sr: "Govorim srpski i engleski (C1), a španski učim.",
    en: "I speak Serbian and English (C1), and I am learning Spanish.",
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
    sr: "Recite ukratko šta vam treba. Ako je posao za mene, javiću se sa predlogom. Ako nije, reći ću vam i to.",
    en: "Tell me briefly what you need. If the work is a fit, I will come back with a proposal. If it is not, I will tell you that too.",
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
          sr: "Platforma bolnice, oko 400 hiljada linija u Nuxt-u i Laravelu. Ja vodim prevode na 5 jezika. Napravio sam chatbot koji zakazuje preglede i potpisivanje saglasnosti na daljinu.",
          en: "A hospital platform, about 400 thousand lines in Nuxt and Laravel. I own translations in 5 languages. I built the chatbot that books appointments and remote consent signing.",
        },
        {
          sr: "Vodim i njihov Google Ads nalog: 8 Search kampanja i 370+ negativnih ključnih reči.",
          en: "I also run their Google Ads account: 8 Search campaigns and 370+ negative keywords.",
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
          sr: "Softver za restorane i kafiće: back-office, kasa, ekran za kuhinju i aplikacija za konobare. Kad padne internet, gateway u lokalu nastavlja da štampa bonove i izdaje fiskalne račune.",
          en: "Software for restaurants and cafés: back office, POS, kitchen display and a staff app. When the internet drops, a gateway in the venue keeps printing tickets and issuing fiscal receipts.",
        },
        {
          sr: "Arhitektura, odluke i pregled koda su moji. Implementaciju radim uz AI agente.",
          en: "The architecture, decisions and code review are mine. I build it with AI agents.",
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
          sr: "Softver za frizerske salone: kalendar, kasa sa fiskalnim računom, depozit preko IPS-a i online zakazivanje za klijente.",
          en: "Software for hair salons: a calendar, a till with fiscal receipts, IPS deposits and online booking for clients.",
        },
        {
          sr: "Go API sa 11 modula. Dupli termin sprečava sama baza, pa ni dva klika u istoj sekundi ne prave problem.",
          en: "A Go API with 11 modules. The database itself blocks double bookings, so even two clicks in the same second cause no trouble.",
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

export type SkillRow ={ name: string; note?: Localized; projects: string[] };

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
];
