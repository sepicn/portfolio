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
      sr: "Pravim sajtove i web aplikacije za firme iz Beograda i vodim kampanje koje im dovode klijente. Deo poslova ide preko brenda IT Expert, gde me klijenti takođe mogu naći.",
      en: "I build websites and web apps for Belgrade businesses and run the campaigns that bring them customers. Part of the work comes through the IT Expert brand, another place where clients can find me.",
    },
    bullets: {
      sr: [
        "Vodim osam Google Ads Search kampanja i Meta Ads za Medical Time, privatnu bolnicu u Beogradu, uz GA4 i GTM merenje konverzija, consent mode i ClickCease zaštitu od lažnih klikova.",
        "Iz izveštaja o terminima pretrage izdvojio 370+ negativnih ključnih reči (fraza i tačno podudaranje) i uveo limit cene po kliku tamo gde su pojedinačni klikovi bili i 19 puta skuplji od proseka.",
        "Analizom udela prikaza izgubljenog zbog ranga i zbog budžeta pokazao da dve kampanje sa najnižom cenom konverzije (do 54% ispod proseka naloga) imaju najviše prostora za rast, i preraspodelio budžet ka njima.",
        "Podigao Semrush Site Health na medicaltime.rs sa 90% na 98% za nedelju dana: greške 6 → 0, upozorenja −87%. SSR za blog i prodavnicu, hreflang i canonical za pet jezika, JSON-LD, HSTS, llms.txt.",
        "Gradim IT Expert platformu na pet jezika (Nuxt, Laravel): korisnički portal, paketi sa kalkulatorom cene, pretplate, fakture, predračuni i Raiffeisen plaćanja, a naplatu pokriva 133 automatska testa.",
        "Isporučio sajtove za Mango poslastičarnicu (cookie consent, GTM tek posle pristanka, kontakt zaštićen od botova), Vuk Studio i Stanke Enterijer u Nuxt-u; poslednja dva su statični sajtovi na GitHub Pages, sa lokalnim SEO-om.",
      ],
      en: [
        "Manage eight Google Ads Search campaigns and Meta Ads for Medical Time, a private hospital in Belgrade, with GA4 and GTM conversion tracking, consent mode and ClickCease click fraud protection.",
        "Mined search term reports for 370+ phrase and exact match negative keywords, and set CPC caps where single clicks cost up to 19 times the average.",
        "Analyzed impression share lost to rank versus budget, showed that the two campaigns with the lowest cost per conversion (up to 54% below the account average) had the most room to grow, and moved budget towards them.",
        "Raised the Semrush Site Health of medicaltime.rs from 90% to 98% in one week: errors 6 → 0, warnings −87%. Server-side rendering for the blog and shop, hreflang and canonical across five languages, JSON-LD, HSTS, llms.txt.",
        "Build the IT Expert platform in five languages (Nuxt, Laravel): customer portal, packages with a price calculator, subscriptions, invoices, pro-forma invoices and Raiffeisen payments, with billing covered by 133 automated tests.",
        "Shipped the websites for Mango pastry shop (cookie consent, GTM only after consent, contact details hidden from bots), Vuk Studio and Stanke Enterijer in Nuxt; the last two are static sites on GitHub Pages with local SEO.",
      ],
    },
    stack: [
      "Nuxt",
      "Vue",
      "Laravel",
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
    start: "2025-02",
    end: null,
    kind: "contract",
    summary: {
      sr: "Platforma privatne bolnice od oko 400 hiljada linija koda u Nuxt-u i Laravelu 12: javni sajt na pet jezika, portali za deset uloga zaposlenih, online zakazivanje, prodavnica, video konsultacije i mobilna aplikacija.",
      en: "A private hospital platform of about 400 thousand lines of code in Nuxt and Laravel: a public site in five languages, portals for ten staff roles, online booking, a shop, video consultations and a mobile app.",
    },
    bullets: {
      sr: [
        "Vodim i18n platforme od ~400 hiljada linija koda: pet jezika (sr, en, ru, de, tr) sa lokalizovanim URL slugovima. Pre nove platforme, od februara 2025, radio sam stranice usluga i prevode starog sajta na sedam stranih jezika.",
        "Napravio chatbot na javnom sajtu koji odgovara na pitanja pacijenata i zakazuje termin, sa promenljivim AI provajderom.",
        "Uveo daljinsko potpisivanje saglasnosti: šalter šalje dokument na tablet, potpis stiže nazad i vezuje se za nalog i pre nego što nalog pacijenta postoji.",
        "Proširio kalendar zakazivanja i priloge na nalozima, grupisane u kartonu pacijenta, sa ograničenjem veličine fajla usklađenim sa produkcionim serverom.",
        "Izradio interne analize fiskalizacije i integracije sa državnim e-zdravljem: šta obavezuje odmah, a šta još nema API.",
      ],
      en: [
        "Own i18n for a ~400k-line platform: five languages (sr, en, ru, de, tr) with localized URL slugs. Before the new platform, from February 2025, I built service pages and translations of the old site into seven foreign languages.",
        "Built the public-site chatbot that answers patient questions and books an appointment, with a switchable AI provider.",
        "Added remote consent signing: the front desk sends a document to a tablet, the signature comes back and attaches to the order even before the patient account exists.",
        "Extended the booking calendar and order attachments grouped in the patient record, with file size limits matched to what the production server accepts.",
        "Wrote the internal analyses of fiscalization and the state e-health integration: what is mandatory now and what has no API yet.",
      ],
    },
    stack: [
      "Nuxt",
      "Vue",
      "TypeScript",
      "Laravel",
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
      sr: "Bio sam zadužen za kompletan UI dva sistema logističke firme iz SAD: Meridian TMS, back-office za dispečere, flotu, bezbednost i računovodstvo u .NET MVC, i Delta Tracking, portal na kome kupci prate pošiljke, u Rails.",
      en: "I owned the entire UI for two systems at a US logistics company: Meridian TMS, the back office for dispatch, fleet, safety and accounting in .NET MVC, and Delta Tracking, a customer shipment tracking portal in Rails.",
    },
    bullets: {
      sr: [
        "Kao UI developer u timu od dva developera, redizajnirao svih 40 i više Add/Edit formi u TMS-u u modularne višestepene wizard-e (Truck, Equipment, Driver, Customer, Division, Load, Safety) sa doslednim sekcijama, statusima i responsive ponašanjem.",
        "Prebacio Safety modul (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check) na grid stranice sa horizontalnim skrolom i standardizovanim akcijama.",
        "Redizajnirao Invoicing i Fuel Transactions ekrane, modale za faktoring kompanije i driver statement-e; 101 commit u Razor, CSS i JavaScript sloju.",
        "Na Delta Tracking portalu napravio interaktivnu Leaflet mapu pošiljke sa stanicama, živom lokacijom kamiona i statusima po lokaciji, i redizajnirao admin i customer stranice u brend bojama.",
      ],
      en: [
        "As the UI developer on a two-developer team, redesigned all 40+ Add/Edit forms in the TMS into modular multi-step wizards (Truck, Equipment, Driver, Customer, Division, Load, Safety) with consistent sections, status blocks and responsive behaviour.",
        "Moved the Safety module (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check) to grid pages with horizontal scroll and standardized actions.",
        "Redesigned the Invoicing and Fuel Transactions screens, factoring company modals and driver statements; 101 commits across the Razor, CSS and JavaScript layer.",
        "On Delta Tracking, built the interactive Leaflet shipment map with stops, live truck location and per-location status labels, and redesigned the admin and customer pages in brand colours.",
      ],
    },
    stack: [
      "ASP.NET Core MVC",
      "Razor",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Rails",
      "Hotwire",
      "Tailwind",
      "Leaflet",
    ],
  },
];
