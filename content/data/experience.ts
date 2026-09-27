import type { Localized, LocalizedList } from "../i18n";

export type Experience = {
  id: string;
  role: Localized;
  company: string;
  companyUrl?: string;
  location: Localized;
  start: string; // YYYY-MM
  end: string | null; // null = present
  kind: "freelance" | "contract" | "employment";
  summary: Localized;
  bullets: LocalizedList;
  stack: string[];
};

export const experience: Experience[] = [
  {
    id: "freelance",
    role: {
      sr: "Freelance web developer i digitalni marketing",
      en: "Freelance web developer and digital marketing specialist",
    },
    company: "IT Expert",
    companyUrl: "https://itexpert.rs",
    location: { sr: "Beograd", en: "Belgrade" },
    start: "2025-03",
    end: null,
    kind: "freelance",
    summary: {
      sr: "Sajtovi i web aplikacije za male firme u Beogradu, plus kampanje koje im dovode klijente. Deo poslova radim pod zajedničkim brendom IT Expert sa kolegom Đorđem Stojanovićem.",
      en: "Websites and web apps for small businesses in Belgrade, plus the campaigns that bring them customers. Part of the work runs under the shared IT Expert brand with my colleague Đorđe Stojanović.",
    },
    bullets: {
      sr: [
        "Vodim osam Google Ads Search kampanja i Meta Ads za Medical Time, privatnu bolnicu u Beogradu, uz GA4 i GTM merenje konverzija, consent mode i ClickCease zaštitu od lažnih klikova.",
        "Iz izveštaja o terminima pretrage izdvojio 370+ negativnih ključnih reči (fraza i tačno podudaranje) i predložio limit cene po kliku tamo gde su pojedinačni klikovi bili i 19 puta skuplji od proseka.",
        "Analizom udela prikaza izgubljenog zbog ranga i zbog budžeta pokazao da dve kampanje sa najnižom cenom konverzije (do 54% ispod proseka naloga) imaju najviše prostora za rast, i predložio preraspodelu budžeta.",
        "Podigao Semrush Site Health na medicaltime.rs sa 90% na 98% za nedelju dana: greške 6 → 0, upozorenja −87%. SSR za blog i prodavnicu, hreflang i canonical za pet jezika, JSON-LD, HSTS, llms.txt.",
        "Razvijam IT Expert platformu (Nuxt 4, Laravel 12): korisnički portal, paketi sa kalkulatorom cene, pretplate, fakture i predračuni, Raiffeisen plaćanja.",
        "Izradio sajtove za Mango poslastičarnicu, Vuk Studio i Stanke Enterijer u Nuxt-u 4 sa SSR-om, cookie consent sistemom i GTM-om koji se učitava tek posle pristanka.",
      ],
      en: [
        "Manage eight Google Ads Search campaigns and Meta Ads for Medical Time, a private hospital in Belgrade, with GA4 and GTM conversion tracking, consent mode and ClickCease click fraud protection.",
        "Mined search term reports for 370+ phrase and exact match negative keywords, and recommended CPC caps where single clicks cost up to 19 times the average.",
        "Analyzed impression share lost to rank versus budget, showed that the two campaigns with the lowest cost per conversion (up to 54% below the account average) had the most room to grow, and proposed a budget reallocation.",
        "Raised the Semrush Site Health of medicaltime.rs from 90% to 98% in one week: errors 6 → 0, warnings −87%. Server-side rendering for the blog and shop, hreflang and canonical across five languages, JSON-LD, HSTS, llms.txt.",
        "Develop the IT Expert platform (Nuxt 4, Laravel 12): customer portal, packages with a price calculator, subscriptions, invoices and pro-forma invoices, Raiffeisen payments.",
        "Built the websites for Mango pastry shop, Vuk Studio and Stanke Enterijer in Nuxt 4 with SSR, a cookie consent system and GTM that loads only after consent.",
      ],
    },
    stack: [
      "Nuxt 4",
      "Vue 3",
      "Laravel 12",
      "MySQL",
      "Google Ads",
      "Meta Ads",
      "GA4",
      "GTM",
      "Semrush",
    ],
  },
  {
    id: "medicaltime",
    role: { sr: "Web developer", en: "Web developer" },
    company: "Medical Time Hospital",
    companyUrl: "https://www.medicaltime.rs",
    location: { sr: "Beograd", en: "Belgrade" },
    start: "2025-08",
    end: null,
    kind: "contract",
    summary: {
      sr: "Platforma privatne bolnice: javni sajt na pet jezika, portali za deset uloga zaposlenih, online zakazivanje, prodavnica, video konsultacije i mobilna aplikacija. Nuxt 4 i Laravel 12, oko 400 hiljada linija koda.",
      en: "A private hospital platform: public site in five languages, portals for ten staff roles, online booking, a shop, video consultations and a mobile app. Nuxt 4 and Laravel 12, about 400 thousand lines of code.",
    },
    bullets: {
      sr: [
        "Vodim i18n platforme od ~400 hiljada linija koda: pet jezika (sr, en, ru, de, tr) sa lokalizovanim URL slugovima; najveći deo mojih 165 commit-a je u i18n i javnom delu sajta.",
        "Napravio chatbot na javnom sajtu koji odgovara na pitanja pacijenata i zakazuje termin, sa promenljivim AI provajderom.",
        "Uveo daljinsko potpisivanje saglasnosti: šalter šalje dokument na tablet, potpis stiže nazad i vezuje se za nalog i pre nego što nalog pacijenta postoji.",
        "Proširio kalendar zakazivanja i priloge na nalozima, grupisane u kartonu pacijenta, sa ograničenjem veličine fajla usklađenim sa produkcionim serverom.",
        "Pisao interne izveštaje o fiskalizaciji i integraciji sa državnim e-zdravljem, šta obavezuje odmah, a šta još nema API.",
      ],
      en: [
        "Own i18n for a ~400k-line platform: five languages (sr, en, ru, de, tr) with localized URL slugs; most of my 165 commits are in i18n and the public site.",
        "Built the public-site chatbot that answers patient questions and books an appointment, with a switchable AI provider.",
        "Added remote consent signing: the front desk sends a document to a tablet, the signature comes back and attaches to the order even before the patient account exists.",
        "Extended the booking calendar and order attachments grouped in the patient record, with file size limits matched to what the production server accepts.",
        "Wrote internal reports on fiscalization and the state e-health integration: what is mandatory now and what has no API yet.",
      ],
    },
    stack: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Laravel 12",
      "MySQL",
      "@nuxtjs/i18n",
      "nuxt-security",
    ],
  },
  {
    id: "delta",
    role: { sr: "Front-end developer", en: "Front-end developer" },
    company: "Delta Group Logistics",
    location: { sr: "Remote (SAD)", en: "Remote (USA)" },
    start: "2025-05",
    end: "2026-07",
    kind: "contract",
    summary: {
      sr: "Radio sam kompletan UI za dva sistema logističke firme iz SAD: Meridian TMS, back-office za dispečere, flotu, bezbednost i računovodstvo u .NET 8 MVC, i Delta Tracking, portal na kome kupci prate pošiljke, u Rails 7.",
      en: "I owned the entire UI for two systems at a US logistics company: Meridian TMS, the back office for dispatch, fleet, safety and accounting in .NET 8 MVC, and Delta Tracking, a customer shipment tracking portal in Rails 7.",
    },
    bullets: {
      sr: [
        "Kao jedini UI developer u timu od pet, redizajnirao svih 40 i više Add/Edit formi u TMS-u u modularne višestepene wizard-e (Truck, Equipment, Driver, Customer, Division, Load, Safety) sa doslednim sekcijama, statusima i responsive ponašanjem.",
        "Prebacio Safety modul (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check) na grid stranice sa horizontalnim skrolom i standardizovanim akcijama.",
        "Redizajnirao Invoicing i Fuel Transactions ekrane, modale za faktoring kompanije i driver statement-e; 101 commit u Razor, CSS i JavaScript sloju.",
        "Na Delta Tracking portalu napravio interaktivnu Leaflet mapu pošiljke sa stanicama, živom lokacijom kamiona i statusima po lokaciji, i redizajnirao admin i customer stranice u brend bojama.",
      ],
      en: [
        "As the only UI developer on a team of five, redesigned all 40+ Add/Edit forms in the TMS into modular multi-step wizards (Truck, Equipment, Driver, Customer, Division, Load, Safety) with consistent sections, status blocks and responsive behaviour.",
        "Moved the Safety module (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check) to grid pages with horizontal scroll and standardized actions.",
        "Redesigned the Invoicing and Fuel Transactions screens, factoring company modals and driver statements; 101 commits across the Razor, CSS and JavaScript layer.",
        "On Delta Tracking, built the interactive Leaflet shipment map with stops, live truck location and per-location status labels, and redesigned the admin and customer pages in brand colours.",
      ],
    },
    stack: [
      "ASP.NET Core 8 MVC",
      "Razor",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Rails 7",
      "Hotwire",
      "Tailwind",
      "Leaflet",
    ],
  },
];
