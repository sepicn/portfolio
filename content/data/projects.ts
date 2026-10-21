import type { Localized, LocalizedList } from "../i18n";

export type ProjectKind = "client" | "personal" | "maintenance" | "saas";

export type Project = {
  slug: string;
  title: string;
  client?: string;
  kind: ProjectKind;
  featured: boolean;
  year: string;
  role: Localized;
  tagline: Localized;
  seoTitle?: Localized;
  description: Localized;
  summary: Localized;
  did: LocalizedList;
  hard: Localized;
  stack: string[];
  links: { live?: string; repo?: string };
  image?: string;
  logo?: string;
  gallery?: string[];
  team: Localized;
  scale: Localized;
  impact: LocalizedList;
  accent: "pink" | "cyan" | "violet" | "sun" | "yellow";
};

export const projects: Project[] = [
  {
    slug: "medical-time",
    seoTitle: {
      sr: "Medical Time: sajt i Google Ads za bolnicu",
      en: "Medical Time: hospital website and Google Ads",
    },
    logo: "/images/clients/medical-time.webp",
    description: {
      sr: "Studija slučaja: Medical Time, platforma privatne bolnice od ~400k linija koda na pet jezika, Site Health 90% → 98% za nedelju i osam Google Ads kampanja.",
      en: "Case study: Medical Time, a ~400k-line private hospital platform in five languages, Site Health from 90% to 98% in a week and eight Google Ads campaigns.",
    },
    gallery: [
      "/images/projects/gallery/medical-time-2.webp",
      "/images/projects/gallery/medical-time-m.webp",
    ],
    team: {
      sr: "Razvoj, SEO i oglašavanje",
      en: "Development, SEO and ads",
    },
    scale: {
      sr: "~400k linija koda, 5 jezika, 779 URL-ova",
      en: "~400k lines of code, 5 languages, 779 URLs",
    },
    impact: {
      sr: [
        "Sajt, merenje i oglase vodi jedna osoba, bez čekanja između developera i agencije.",
        "Site Health 98% bez ijedne greške, a zatim rast organskog saobraćaja i upita.",
        "Najbolje kampanje imaju i do 54% nižu cenu konverzije od proseka naloga.",
      ],
      en: [
        "One person owns the site, tracking and ads, so nothing waits on a hand-off.",
        "Site Health at 98% with zero errors, followed by growth in organic traffic and inquiries.",
        "The best campaigns run up to 54% below the account-average cost per conversion.",
      ],
    },
    title: "Medical Time",
    client: "Medical Time Hospital, Beograd",
    kind: "client",
    featured: true,
    year: "2025-2026",
    role: {
      sr: "Developer i digitalni marketing",
      en: "Developer and digital marketing",
    },
    tagline: {
      sr: "Platforma privatne bolnice na pet jezika, plus Google Ads kampanje koje donose upite.",
      en: "A private hospital platform in five languages, plus Google Ads campaigns that bring in inquiries.",
    },
    summary: {
      sr: "Nova platforma privatne bolnice, oko 400 hiljada linija koda u Nuxt-u, Laravel-u i Flutter-u. Moj deo su javni sajt, prevodi i SEO. Paralelno vodim Google Ads i Meta Ads naloge bolnice.",
      en: "A new platform for a private hospital, about 400k lines of code in Nuxt, Laravel and Flutter. I own the public site, translations and SEO, and I run the hospital's Google Ads and Meta Ads accounts.",
    },
    did: {
      sr: [
        "Podigao Semrush Site Health sa 90% na 98% za nedelju dana, greške sa 6 na 0.",
        "Vodim osam Google Ads kampanja, sa 370+ negativnih ključnih reči iz izveštaja o pretragama.",
        "Postavio prevode i lokalizovane URL-ove za pet jezika, sa hreflang i canonical pravilima.",
        "Napravio plaćanje karticom preko Raiffeisen banke: sačuvane kartice, pretplate i predračuni.",
      ],
      en: [
        "Raised Semrush Site Health from 90% to 98% in one week, errors from 6 to 0.",
        "Run eight Google Ads campaigns, with 370+ negative keywords from search term reports.",
        "Set up translations and localized URLs for five languages, with hreflang and canonical rules.",
        "Built card payments through Raiffeisen bank: saved cards, subscriptions and pro-forma invoices.",
      ],
    },
    hard: {
      sr: "Canonical URL-ovi blog postova čuvali su se u bazi, pa je posle promene slugova Google indeksirao duple stranice. Sada se canonical uvek izvodi iz trenutne rute, a stari slugovi vode na nove preko 301.",
      en: "Blog canonical URLs were stored in the database, so after slugs changed Google indexed duplicate pages. Now the canonical always comes from the current route, and old slugs 301 to the new ones.",
    },
    stack: [
      "Nuxt",
      "Vue",
      "TypeScript",
      "Laravel",
      "MySQL",
      "Flutter",
      "GTM",
      "GA4",
      "Google Ads",
      "Meta Ads",
    ],
    links: { live: "https://www.medicaltime.rs" },
    image: "/images/projects/medical-time.webp",
    accent: "pink",
  },
  {
    slug: "kafe",
    title: "Kafe",
    kind: "saas",
    featured: true,
    year: "2026",
    seoTitle: {
      sr: "Kafe: SaaS za restorane, POS i fiskalizacija",
      en: "Kafe: restaurant SaaS, POS and fiscal receipts",
    },
    description: {
      sr: "Studija slučaja: Kafe, SaaS za restorane u Srbiji. Back-office, POS, ekran za kuhinju, rad bez interneta i fiskalni račun bez dupliranja. Django, Next.js, Flutter.",
      en: "Case study: Kafe, a restaurant SaaS for Serbia. Back office, POS, kitchen display, work without internet and fiscal receipts that never duplicate. Django, Next.js, Flutter.",
    },
    role: {
      sr: "Arhitektura, odluke i pregled koda; implementacija uz AI agente",
      en: "Architecture, decisions and code review; implementation with AI agents",
    },
    tagline: {
      sr: "Moj SaaS za restorane: kasa, kuhinja i back-office koji rade i bez interneta.",
      en: "My SaaS for restaurants: POS, kitchen display and back office that work offline.",
    },
    summary: {
      sr: "Kafe pokriva ceo dan lokala: meni, zalihe, smene, kasu, kuhinju i fiskalni račun po srpskim pravilima. Pravljen je za restorane i kafiće u Srbiji. Arhitekturu i odluke sam doneo ja, pregledao sam svaku izmenu, a kod sam pisao uz AI agente.",
      en: "Kafe covers a venue's whole day: menu, stock, shifts, POS, kitchen and fiscal receipts under Serbian rules. It is built for restaurants and cafés in Serbia. The architecture and decisions are mine, I reviewed every change, and I built it with AI agents.",
    },
    did: {
      sr: [
        "Napravio Island Mode: bez interneta lokal i dalje prima porudžbine i izdaje fiskalne račune.",
        "Odvojio podatke firmi PostgreSQL row-level security-jem koji aplikacija ne može da zaobiđe.",
        "Dodao AI uvoz faktura i menija preko Claude API-ja, uz obavezan pregled čoveka.",
        "Pokrio sistem sa 2.265 Python testova, plus Vitest, Playwright i testovi opterećenja.",
      ],
      en: [
        "Built Island Mode: without internet the venue still takes orders and issues fiscal receipts.",
        "Kept business data apart with PostgreSQL row-level security the app cannot bypass.",
        "Added AI import of invoices and menus through the Claude API, with human review.",
        "Covered it with 2,265 Python tests, plus Vitest, Playwright and load tests.",
      ],
    },
    hard: {
      sr: "Fiskalni uređaj odgovara i do 30 sekundi, a odgovor može da se izgubi: ponovo poslat račun je duplikat, neposlat je izgubljen pazar. Zato se zahtev prvo trajno upiše sa svojim ključem, pa se tek onda zove uređaj. Nepoznat ishod se rešava po tom ključu i račun se nikad ne šalje dvaput.",
      en: "A fiscal device can take up to 30 seconds to answer, and the answer can get lost: resending risks a duplicate, not sending loses the sale. So the request is stored first with its own key, then the device is called. An unknown outcome is resolved by that key and never sent twice.",
    },
    stack: [
      "Django",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Flutter",
      "Python",
      "Redis",
      "Docker",
    ],
    links: {},
    image: "/images/projects/kafe.webp",
    gallery: [
      "/images/projects/gallery/kafe-pos.webp",
      "/images/projects/gallery/kafe-kds.webp",
      "/images/projects/gallery/kafe-pos-floor.webp",
      "/images/projects/gallery/kafe-shifts.webp",
      "/images/projects/gallery/kafe-menu-analysis.webp",
      "/images/projects/gallery/kafe-m.webp",
    ],
    team: {
      sr: "Ja i AI agenti, ja odlučujem",
      en: "Me and AI agents, I decide",
    },
    scale: {
      sr: "138 commitova za 21 radni dan, 2.265 testova",
      en: "138 commits in 21 working days, 2,265 tests",
    },
    impact: {
      sr: [
        "Ceo sistem na jednom ugovoru: podaci, offline rad, fiskalizacija i više aplikacija.",
        "32 arhitektonske odluke zapisane kao ADR, pa se zna zašto je šta urađeno.",
        "Rad sa AI agentima uz jasna pravila i pregled svakog koraka.",
      ],
      en: [
        "One contract for the whole system: data, offline work, fiscal receipts and several apps.",
        "32 decisions written down as ADRs, so it is clear why things were done.",
        "AI agents under clear rules, with a review of every step.",
      ],
    },
    accent: "violet",
  },
  {
    slug: "makaze",
    title: "Makaze",
    kind: "saas",
    featured: true,
    year: "2026",
    seoTitle: {
      sr: "Makaze: softver za frizerske salone",
      en: "Makaze: software for hair salons",
    },
    description: {
      sr: "Studija slučaja: Makaze, softver za salone u Srbiji. Kalendar bez duplih termina, IPS depozit, fiskalni račun i online zakazivanje. Go, React, Astro, PostgreSQL.",
      en: "Case study: Makaze, salon software for Serbia. A calendar with no double bookings, IPS deposits, fiscal receipts and online booking. Go, React, Astro, PostgreSQL.",
    },
    role: {
      sr: "Arhitektura, odluke i pregled koda; implementacija uz AI agente",
      en: "Architecture, decisions and code review; implementation with AI agents",
    },
    tagline: {
      sr: "Softver za frizerske salone: kalendar, kasa sa fiskalnim računom i online zakazivanje.",
      en: "Software for hair salons: a calendar, a till with fiscal receipts and online booking.",
    },
    summary: {
      sr: "Makaze je softver za frizerske salone i barbershopove u Srbiji. Salon radi u PWA sa kalendarom i kasom, a klijent sam zakazuje i plaća depozit preko IPS-a. Arhitekturu i odluke sam doneo ja, a kod sam pisao uz AI agente.",
      en: "Makaze is software for hair salons and barbershops in Serbia. The salon works in a PWA with a calendar and a till, and clients book online and pay a deposit through IPS. The architecture and decisions are mine, and I built it with AI agents.",
    },
    did: {
      sr: [
        "Napisao Go API sa 11 modula i 111 operacija u OpenAPI ugovoru.",
        "Zaštitio kalendar od duplih termina EXCLUDE ograničenjem u bazi, nad salonom, frizerom i vremenom.",
        "Napravio IPS depozit kao mašinu sa osam stanja i HMAC proverom webhook-a.",
        "Napisao 120 Go testova sa pravim Postgres-om i 7 Playwright tokova.",
      ],
      en: [
        "Wrote a Go API with 11 modules and 111 operations in an OpenAPI contract.",
        "Blocked double bookings in the database with an EXCLUDE constraint over salon, stylist and time.",
        "Built IPS deposits as an eight-state machine with HMAC-checked webhooks.",
        "Wrote 120 Go tests against a real Postgres and 7 Playwright flows.",
      ],
    },
    hard: {
      sr: "Dva klijenta mogu da kliknu isti termin u istoj sekundi, a usluga ima faze u kojima je frizer slobodan. Provera u kodu tu nije dovoljna, pa duple termine sprečava sama baza. Test sa 8 istovremenih zahteva potvrđuje da prolazi tačno jedan.",
      en: "Two clients can click the same slot in the same second, and a service has phases when the stylist is free. A check in code is not enough, so the database itself blocks double bookings. A test with 8 simultaneous requests confirms exactly one gets through.",
    },
    stack: ["Go", "React", "TypeScript", "Astro", "PostgreSQL", "OpenAPI", "Tailwind"],
    links: {},
    image: "/images/projects/makaze.webp",
    gallery: [
      "/images/projects/gallery/makaze-checkout.webp",
      "/images/projects/gallery/makaze-booking.webp",
      "/images/projects/gallery/makaze-appointment.webp",
      "/images/projects/gallery/makaze-m.webp",
    ],
    team: {
      sr: "Ja i AI agenti, ja odlučujem",
      en: "Me and AI agents, I decide",
    },
    scale: {
      sr: "57 commitova, 11 modula, 111 API operacija",
      en: "57 commits, 11 modules, 111 API operations",
    },
    impact: {
      sr: [
        "Tvrde probleme rešavam na nivou baze, gde kod sam nije dovoljan.",
        "Plaćanja i fiskalni računi ne mogu da se izgube ni dupliraju.",
        "Jedan OpenAPI ugovor drži studio, sajt i server usklađenim.",
      ],
      en: [
        "Hard problems solved at the database level, where code alone is not enough.",
        "Payments and fiscal receipts can neither get lost nor duplicate.",
        "One OpenAPI contract keeps the studio, site and server in step.",
      ],
    },
    accent: "cyan",
  },
  {
    slug: "logistics-tms",
    seoTitle: {
      sr: "Logistics TMS: UI za softver kamionske logistike",
      en: "Logistics TMS: UI for a trucking logistics TMS",
    },
    description: {
      sr: "Studija slučaja: redizajn interfejsa TMS sistema za kamionsku logistiku u .NET MVC. Tamni režim, nova navigacija i 40+ formi pretvorenih u vođene korake.",
      en: "Case study: redesigning the interface of a trucking logistics TMS in .NET MVC. Dark mode, new navigation and 40+ data entry forms turned into guided steps.",
    },
    team: {
      sr: "Tim od dva developera, ja na UI-ju",
      en: "Two developers, me on the UI",
    },
    scale: {
      sr: "101 moj commit, 40+ formi u koracima, 12 .NET projekata",
      en: "101 commits of mine, 40+ step forms, 12 .NET projects",
    },
    impact: {
      sr: [
        "Dispečeri i bezbednosni tim unose podatke kroz 40+ vođenih formi umesto dugih ekrana.",
        "Iste forme rade u modalu i na punoj strani, bez dve verzije ekrana.",
        "Tamni režim i nova navigacija pokrivaju ceo sistem.",
      ],
      en: [
        "Dispatch and safety enter data through 40+ guided forms instead of long scrolling screens.",
        "The same forms work in a modal and on a full page, with no duplicate screens.",
        "Dark mode and the new navigation cover the whole system.",
      ],
    },
    image: "/images/projects/logistics-tms.webp",
    gallery: [
      "/images/projects/gallery/logistics-tms-2.webp",
      "/images/projects/gallery/logistics-tms-3.webp",
      "/images/projects/gallery/logistics-tms-m.webp",
    ],
    title: "Logistics TMS",
    client: "Logistics company, SAD",
    kind: "client",
    featured: true,
    year: "2025-2026",
    role: {
      sr: "Front-end developer (redizajn UI-ja)",
      en: "Front-end developer (UI redesign)",
    },
    tagline: {
      sr: "Redizajn TMS-a američke logističke firme, sa 40+ formi pretvorenih u vođene korake.",
      en: "A UI redesign of a US trucking company's TMS, with 40+ forms turned into guided steps.",
    },
    summary: {
      sr: "Logistics TMS je sistem za upravljanje transportom firme Logistics company iz SAD-a: dispečeri, flota, vozači, bezbednost i računovodstvo. Od oktobra 2025. do jula 2026. redizajnirao sam interfejs, kroz 101 commit u Razor pogledima, CSS-u i JavaScript-u. Backend su radile kolege iz tima.",
      en: "Logistics TMS is the transport management system of Logistics company, a US trucking company: dispatch, fleet, drivers, safety and accounting. From October 2025 to July 2026 I redesigned its interface in 101 commits across Razor views, CSS and JavaScript. My teammates built the back end.",
    },
    did: {
      sr: [
        "Pretvorio 40+ formi za unos u vođene korake, uključujući šest bezbednosnih formi.",
        "Izdvojio logiku koraka u jedno zajedničko jezgro, pa svaka forma opisuje samo svoje korake.",
        "Napravio novu prijavu, navigaciju, kontrolnu tablu i tamni režim za ceo sistem.",
        "Dodao maske sa proverom za SSN, EIN i telefon, da nepotpun broj ne može da se sačuva.",
      ],
      en: [
        "Turned 40+ data entry forms into guided steps, including six safety forms.",
        "Moved the step logic into one shared core, so each form only describes its steps.",
        "Built new sign-in, navigation, dashboard and dark mode for the whole system.",
        "Added validated input masks for SSN, EIN and phone, so incomplete numbers cannot be saved.",
      ],
    },
    hard: {
      sr: "Iste forme se otvaraju i same i iz drugih formi, a logika koraka je živela u svakoj formi posebno. Otvorena iz druge forme, forma je padala na ravan prikaz bez koraka. Koraci, validacija i navigacija izvučeni su u zajedničko jezgro, a poslednji commit tog niza uklonio je 42 linije i dodao 9.",
      en: "The same forms open on their own and from inside other forms, and the step logic lived in each form separately. Opened from another form, a form fell back to a flat layout. Steps, validation and navigation moved into a shared core, and the last commit in that series removed 42 lines and added 9.",
    },
    stack: [
      "ASP.NET Core MVC",
      "Razor",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "SQL Server",
      "Azure",
    ],
    links: {},
    accent: "cyan",
  },
  {
    slug: "shipment-tracking",
    seoTitle: {
      sr: "Shipment Tracking: praćenje pošiljki na mapi",
      en: "Shipment Tracking: live shipment tracking portal",
    },
    description: {
      sr: "Studija slučaja: portal za praćenje pošiljki u Rails. Leaflet mapa sa rutom po putevima, status svake stanice i redizajn ekrana, u 20 mojih commit-a.",
      en: "Case study: a shipment tracking portal in Rails. A Leaflet map with road routing, a status for every stop and redesigned screens, in 20 commits of mine.",
    },
    team: {
      sr: "Drugi developer na aplikaciji, ja na UI-ju",
      en: "Another developer on the app, me on the UI",
    },
    scale: {
      sr: "20 mojih commit-a, mapa od ~700 linija",
      en: "20 commits of mine, a ~700-line map",
    },
    impact: {
      sr: [
        "Kupci sami vide gde je pošiljka i kada stiže, uz procenu za svaku stanicu.",
        "Ruta prati puteve, a ne pravu liniju preko karte.",
        "Novi korisnik dobija pozivnicu i sam postavlja lozinku.",
      ],
      en: [
        "Customers see where a shipment is and when it arrives, with an ETA per stop.",
        "The route follows roads, not a straight line across the map.",
        "A new user gets an invitation and sets their own password.",
      ],
    },
    image: "/images/projects/shipment-tracking.webp",
    gallery: [
      "/images/projects/gallery/shipment-tracking-2.webp",
      "/images/projects/gallery/shipment-tracking-3.webp",
      "/images/projects/gallery/shipment-tracking-m.webp",
    ],
    title: "Shipment Tracking",
    client: "Logistics company, SAD",
    kind: "client",
    featured: true,
    year: "2025",
    role: { sr: "Front-end developer", en: "Front-end developer" },
    tagline: {
      sr: "Živa mapa pošiljki za kupce američke logističke firme, sa statusom svake stanice.",
      en: "A live shipment map for a US logistics company's customers, with a status for every stop.",
    },
    summary: {
      sr: "Portal na kome kupci firme Logistics company prate svoje pošiljke. Aplikaciju u Rails-u pravi drugi developer, a ja sam od maja do oktobra 2025, u 20 commit-a, preuzeo izgled i ponašanje ekrana. Najveći deo mog posla je mapa od oko 700 linija.",
      en: "A portal where Logistics company customers follow their shipments. Another developer builds the Rails app, and from May to October 2025 I took over how the screens look and behave, in 20 commits. The biggest piece of my work is a ~700-line map.",
    },
    did: {
      sr: [
        "Napravio mapu pošiljke u Leaflet-u, sa markerima za utovar, istovar i javljanja kamiona.",
        "Povezao rutu po putevima preko OSRM-a, sa isprekidanom linijom ako rutiranje ne uspe.",
        "Izveo status svake stanice iz stvarnog vremena dolaska i odlaska.",
        "Redizajnirao listu i detalje pošiljke u kartice, sa 30+ novih SVG ikona.",
      ],
      en: [
        "Built the shipment map in Leaflet, with markers for pickup, delivery and truck check-ins.",
        "Added road routing through OSRM, with a dashed fallback line if routing fails.",
        "Derived each stop's status from actual arrival and departure times.",
        "Redesigned the shipment list and detail pages as cards, with 30+ new SVG icons.",
      ],
    },
    hard: {
      sr: "Lokalno je mapa radila, a u produkciji su nestale sve ikone markera: Rails dodaje otisak u ime fajla, pa putanja upisana u JavaScript nije postojala. Rešenje je bilo da view prosledi stvarne putanje iz asset helper-a kao Stimulus vrednosti.",
      en: "The map worked locally, but in production every marker icon vanished: Rails fingerprints file names, so the path hardcoded in JavaScript did not exist. The fix was to have the view pass the real paths from the asset helper as Stimulus values.",
    },
    stack: ["Rails", "Hotwire", "Stimulus", "Tailwind", "Leaflet", "OSRM", "PostgreSQL"],
    links: {},
    accent: "violet",
  },
  {
    slug: "itexpert",
    seoTitle: {
      sr: "IT Expert: sajt i platforma web agencije",
      en: "IT Expert: site and platform for a web agency",
    },
    logo: "/images/clients/itexpert.webp",
    description: {
      sr: "Studija slučaja: sajt i platforma agencije IT Expert u Nuxt i Laravel. Portali, prodavnica, tiketi, pet jezika i plaćanje karticom sa 133 testa.",
      en: "Case study: the IT Expert agency site and platform in Nuxt and Laravel. Portals, a shop, tickets, five languages and card billing covered by 133 tests.",
    },
    gallery: [
      "/images/projects/gallery/itexpert-2.webp",
      "/images/projects/gallery/itexpert-m.webp",
    ],
    team: {
      sr: "Pod brendom IT Expert",
      en: "Under the IT Expert brand",
    },
    scale: {
      sr: "Nuxt + Laravel, 5 jezika, 133 testa",
      en: "Nuxt + Laravel, 5 languages, 133 tests",
    },
    impact: {
      sr: [
        "Agencija vodi klijente, prodaju, podršku i dokumente na jednom mestu.",
        "Kupac unese karticu jednom, a pretplata se obnavlja sama.",
        "Svaki put kojim ide novac pokriven je testom.",
      ],
      en: [
        "The agency runs clients, sales, support and documents in one place.",
        "A customer enters a card once, and the subscription renews itself.",
        "Every path money takes is covered by a test.",
      ],
    },
    image: "/images/projects/itexpert.webp",
    title: "IT Expert",
    client: "IT Expert, Beograd",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Developer (zajednički brend)", en: "Developer (shared brand)" },
    tagline: {
      sr: "Platforma web agencije na pet jezika, sa naplatom karticom pokrivenom sa 133 testa.",
      en: "A web agency platform in five languages, with card billing covered by 133 tests.",
    },
    summary: {
      sr: "IT Expert je brend preko kog me klijenti mogu angažovati. Napravio sam javni sajt itexpert.rs u Nuxt-u i platformu u Nuxt-u i Laravel-u, sa portalima, prodavnicom, tiketima i pretplatama. Sajt je postao šablon za sajtove Mango i Stanke Enterijer.",
      en: "IT Expert is a brand clients can hire me through. I built the public site itexpert.rs in Nuxt and a platform in Nuxt and Laravel, with portals, a shop, tickets and subscriptions. The site became the template for the Mango and Stanke Enterijer sites.",
    },
    did: {
      sr: [
        "Napravio alat koji preko PageSpeed Insights API-ja ocenjuje bilo koji sajt.",
        "Napravio portale za klijente i četiri uloge zaposlenih, sa dozvolama po ulozi.",
        "Uveo sačuvane kartice i automatsku obnovu pretplata preko Raiffeisen banke.",
        "Pokrio naplatu sa 133 testa: 121 PHPUnit i 12 Vitest.",
      ],
      en: [
        "Built a tool that scores any website through the PageSpeed Insights API.",
        "Built portals for clients and four staff roles, with per-role permissions.",
        "Added saved cards and automatic subscription renewal through Raiffeisen bank.",
        "Covered billing with 133 tests: 121 PHPUnit and 12 Vitest.",
      ],
    },
    hard: {
      sr: "Obnova ne sme da naplati isti period dvaput, a zakazani zadatak koji se pokrene dvaput šalje dve ispravne naplate. Zato svaki ciklus ima svoj ključ sa unique indeksom, pa drugi pokušaj odbija baza. Novi period se uvek računa od kraja prethodnog, da kupac ne gubi dan.",
      en: "Renewal must never charge the same period twice, and a scheduled job that runs twice sends two valid charges. So every billing cycle has its own key with a unique index, and the database rejects the second attempt. The new period always starts at the end of the last one, so the customer never loses a day.",
    },
    stack: [
      "Nuxt",
      "Laravel",
      "MySQL",
      "@nuxtjs/i18n",
      "Raiffeisen",
      "PageSpeed Insights API",
      "PHPUnit",
      "Vitest",
    ],
    links: { live: "https://itexpert.rs" },
    accent: "cyan",
  },
  {
    slug: "prostor-izmedju",
    seoTitle: {
      sr: "Prostor Između: WordPress e-magazin od nule",
      en: "Prostor Između: WordPress magazine from scratch",
    },
    logo: "/images/clients/prostor-izmedju.webp",
    description: {
      sr: "Studija slučaja: e-magazin o psihologiji na WordPress-u, dizajniran i napravljen od nule u maju 2026. Četiri rubrike, newsletter, Yoast SEO i CLS 0.",
      en: "Case study: a psychology e-magazine on WordPress, designed and built from scratch in May 2026. Four sections, a newsletter, Yoast SEO and zero layout shift.",
    },
    gallery: [
      "/images/projects/gallery/prostor-izmedju-2.webp",
      "/images/projects/gallery/prostor-izmedju-m.webp",
    ],
    team: {
      sr: "Sam, dizajn i izrada",
      en: "Solo, design and build",
    },
    scale: {
      sr: "4 rubrike, 70+ tekstova",
      en: "4 sections, 70+ articles",
    },
    impact: {
      sr: [
        "Redakcija objavljuje bez developera.",
        "Google od prvog dana ima sitemap i strukturirane podatke za svaki tekst.",
        "Stranica se ne pomera dok se učitava: CLS 0 na telefonu.",
      ],
      en: [
        "The editors publish without a developer.",
        "Google has had a sitemap and structured data for every article since day one.",
        "The page does not shift while loading: CLS 0 on a phone.",
      ],
    },
    image: "/images/projects/prostor-izmedju.webp",
    title: "Prostor Između",
    client: "prostorizmedju.rs",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Dizajn i izrada", en: "Design and build" },
    tagline: {
      sr: "E-magazin o psihologiji koji sam dizajnirao i napravio od nule.",
      en: "A psychology e-magazine I designed and built from scratch.",
    },
    summary: {
      sr: "Prostor između je e-magazin o psihologiji, odnosima i svakodnevnom životu. Dizajnirao sam ga i napravio u maju 2026, na WordPress-u sa Elementor-om, bez kupljenog šablona. Danas ima više od 70 tekstova u četiri rubrike.",
      en: "Prostor između is an e-magazine about psychology, relationships and everyday life. I designed and built it in May 2026 on WordPress with Elementor, without a bought template. It now has more than 70 articles in four sections.",
    },
    did: {
      sr: [
        "Dizajnirao izgled od nule: krem pozadina, bordo i roze akcent, font Be Vietnam Pro.",
        "Napravio šablone za članak, rubriku i početnu, pa novi tekst odmah dobija ceo izgled.",
        "Podesio Yoast SEO: sitemap-ovi, Open Graph i JSON-LD za svaki tekst.",
        "Prebacio slike u WebP, sa lenjim učitavanjem ispod prvog ekrana.",
      ],
      en: [
        "Designed the look from scratch: cream background, burgundy and pink accents, Be Vietnam Pro.",
        "Built templates for articles, sections and the home page, so new posts get the full layout.",
        "Set up Yoast SEO: sitemaps, Open Graph and JSON-LD for every article.",
        "Served images as WebP, with lazy loading below the first screen.",
      ],
    },
    hard: {
      sr: "Elementor lako napravi težak sajt, a magazin živi od velikih fotografija. Držao sam malo widget-a, slike u WebP-u i članke u zajedničkim šablonima. Lighthouse za početnu daje CLS 0 i 100 za najbolje prakse.",
      en: "Elementor makes heavy sites easy, and a magazine lives on big photos. I kept the widget count low, images in WebP and articles in shared templates. Lighthouse gives the home page a CLS of 0 and 100 for best practices.",
    },
    stack: ["WordPress", "Elementor Pro", "Yoast SEO", "PHP"],
    links: { live: "https://prostorizmedju.rs" },
    accent: "sun",
  },
  {
    slug: "mango",
    seoTitle: {
      sr: "Mango: sajt za poslastičarnicu u Zemunu",
      en: "Mango: website for a Zemun pastry shop",
    },
    logo: "/images/clients/mango.webp",
    description: {
      sr: "Studija slučaja: sajt poslastičarnice Mango od 2024. do danas, u Nuxt-u. Cenovnik sa filterima, GTM tek posle pristanka, kontakt zaštićen od botova.",
      en: "Case study: the Mango pastry shop site from 2024 to today, in Nuxt. A filterable price list, GTM only after consent and contact details hidden from bots.",
    },
    gallery: [
      "/images/projects/gallery/mango-2.webp",
      "/images/projects/gallery/mango-m.webp",
    ],
    team: {
      sr: "Pod brendom IT Expert",
      en: "Under the IT Expert brand",
    },
    scale: {
      sr: "2 verzije, 9 stranica, 32 kolača",
      en: "2 versions, 9 pages, 32 cakes",
    },
    impact: {
      sr: [
        "Kupac vidi sve kolače sa cenama i zove jednim dodirom.",
        "Analitika radi tek posle pristanka, a kontakt nije laka meta za botove.",
        "Lighthouse posle marta 2026: 91, 100, 100 i 100.",
      ],
      en: [
        "A customer sees every cake with its price and calls with one tap.",
        "Analytics runs only after consent, and contacts are no easy target for bots.",
        "Lighthouse after March 2026: 91, 100, 100 and 100.",
      ],
    },
    image: "/images/projects/mango.webp",
    title: "Mango poslastičarnica",
    client: "Mango, Zemun",
    kind: "client",
    featured: false,
    year: "2024-2026",
    role: { sr: "Ceo sajt (sa IT Expert)", en: "Whole site (with IT Expert)" },
    tagline: {
      sr: "Sajt poslastičarnice u Zemunu: cenovnik od 32 kolača i poziv jednim dodirom.",
      en: "A Zemun pastry shop site: a price list of 32 cakes and one-tap calling.",
    },
    summary: {
      sr: "Mango je butik poslastičarnica u Zemunu, a sajt joj pravim od 2024, kroz dve verzije. U martu 2026. sam ga napravio iznova u Nuxt-u: devet stranica, cenovnik sa filterima, analitika tek posle pristanka i kontakt zaštićen od botova.",
      en: "Mango is a boutique pastry shop in Zemun, and I have built its site since 2024, across two versions. In March 2026 I rebuilt it in Nuxt: nine pages, a filterable price list, analytics only after consent and contact details hidden from bots.",
    },
    did: {
      sr: [
        "Napravio cenovnik od 32 kolača sa filterima po vrsti i dugmetom za poziv.",
        "Podesio da se GTM učita tek kada kupac uključi analitiku.",
        "Sakrio telefon i mejl od botova, a formu zaštitio reCAPTCHA-om i proverom na serveru.",
        "Smanjio fotografije kolača na 15 do 89 KB, uz posebnu verziju za telefon.",
      ],
      en: [
        "Built a price list of 32 cakes with filters by type and a call button.",
        "Made GTM load only after the customer turns analytics on.",
        "Hid the phone and email from bots, and protected the form with reCAPTCHA and a server check.",
        "Cut cake photos to 15 to 89 KB, with a separate version for phones.",
      ],
    },
    hard: {
      sr: "Brend boje roze, krem i bordo nisu prošle Lighthouse proveru kontrasta. Nisam menjao brend, nego sam svaku boju tamnio samo koliko treba da pređe prag. Uz kritični CSS i samo četiri fonta unapred, Lighthouse je pokazao 91, 100, 100 i 100.",
      en: "The brand's pink, cream and burgundy failed the Lighthouse contrast check. I kept the brand and darkened each colour only as far as it needed to pass. With critical CSS and only four preloaded fonts, Lighthouse showed 91, 100, 100 and 100.",
    },
    stack: ["Nuxt", "Vue", "TypeScript", "Pinia", "@nuxtjs/i18n", "reCAPTCHA", "GTM"],
    links: { live: "https://mangoposlasticarnica.rs" },
    accent: "yellow",
  },
  {
    slug: "vuk-studio",
    seoTitle: {
      sr: "Vuk Studio: sajt muzičkog studija u Beogradu",
      en: "Vuk Studio: website for a Belgrade music studio",
    },
    logo: "/images/clients/vuk-studio.webp",
    description: {
      sr: "Studija slučaja: sajt muzičkog i video studija Vuk u Beogradu. Istraživanje ključnih reči, šest stranica u Nuxt, LocalBusiness i FAQPage podaci.",
      en: "Case study: the site of Vuk, a Belgrade music and video studio. Keyword research, six Nuxt pages, LocalBusiness and FAQPage data, deployed to GitHub Pages.",
    },
    gallery: [
      "/images/projects/gallery/vuk-studio-2.webp",
      "/images/projects/gallery/vuk-studio-m.webp",
    ],
    team: {
      sr: "Pod brendom IT Expert",
      en: "Under the IT Expert brand",
    },
    scale: {
      sr: "Statičan Nuxt, 6 stranica, brief u 7 delova",
      en: "Static Nuxt, 6 pages, a 7-part brief",
    },
    impact: {
      sr: [
        "Svaka stranica cilja svoju grupu lokalnih pretraga.",
        "Pitanja o ceni dobijaju iskren odgovor umesto izmišljenog cenovnika.",
        "Rebrending završen za jedan dan, jer je brief unapred rešio pitanja.",
      ],
      en: [
        "Each page targets its own group of local searches.",
        "Price questions get an honest answer instead of a made-up price list.",
        "Rebrand done in one day, because the brief settled the questions up front.",
      ],
    },
    image: "/images/projects/vuk-studio.webp",
    title: "Vuk Studio",
    client: "Muzički studio Vuk, Beograd",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Ceo sajt (sa IT Expert)", en: "Whole site (with IT Expert)" },
    tagline: {
      sr: "Sajt muzičkog i video studija, spreman za lokalnu pretragu i rebrendiran za jedan dan.",
      en: "A music and video studio site, ready for local search and rebranded in one day.",
    },
    summary: {
      sr: "Vuk je muzički i video studio iz Beograda. Sajt je nastao u junu 2026. na osnovi našeg sajta za Stanke Enterijer. Napisao sam brief u sedam delova, a ceo rebrending sa šest stranica završen je za jedan dan.",
      en: "Vuk is a Belgrade music and video studio. The site was built in June 2026 on top of our Stanke Enterijer site. I wrote a seven-part brief, and the whole rebrand with six pages was done in one day.",
    },
    did: {
      sr: [
        "Istražio ključne reči iz stvarnih srpskih pretraga, oglasa i sajtova konkurencije.",
        "Isplanirao frazu, H1, naslov i opis za svih šest stranica.",
        "Dodao LocalBusiness JSON-LD na početnu i FAQPage sa pet pitanja na Kontakt.",
        "Postavio GitHub Actions objavu statičnih stranica na GitHub Pages.",
      ],
      en: [
        "Researched keywords from real Serbian searches, classifieds and competitor sites.",
        "Planned the phrase, H1, title and description for all six pages.",
        "Added LocalBusiness JSON-LD on the home page and FAQPage with five questions on Contact.",
        "Set up a GitHub Actions deploy of the static pages to GitHub Pages.",
      ],
    },
    hard: {
      sr: "Ljudi najčešće traže „snimanje pesme cena“, a studio ne objavljuje cenovnik. Izmišljena cena bi donela razočarane pozive, pa ta fraza dobija pitanje u FAQ-u sa iskrenim odgovorom, bez brojeva koje studio nije potvrdio.",
      en: "People most often search for the price of recording a song, and the studio publishes no price list. A made-up price would bring disappointed calls, so that phrase gets an FAQ question with an honest answer and no unconfirmed numbers.",
    },
    stack: ["Nuxt", "Vue", "JSON-LD", "GitHub Actions", "GitHub Pages"],
    links: { live: "https://vuk-studio.rs" },
    accent: "violet",
  },
  {
    slug: "stanke-enterijer",
    seoTitle: {
      sr: "Stanke Enterijer: sajt za molera u Beogradu",
      en: "Stanke Enterijer: site for a Belgrade painter",
    },
    description: {
      sr: "Studija slučaja: sajt molerske firme Stanke Enterijer u Nuxt. Tri stranice za lokalnu pretragu, poziv jednim dodirom i Lighthouse 90+ na telefonu.",
      en: "Case study: a Nuxt site for Stanke Enterijer, a Belgrade house painter. Three pages for local search, one-tap calling and Lighthouse 90+ on mobile.",
    },
    team: {
      sr: "Pod brendom IT Expert",
      en: "Under the IT Expert brand",
    },
    scale: {
      sr: "3 stranice, statičan build",
      en: "3 pages, static build",
    },
    impact: {
      sr: [
        "Posetilac sa telefona je uvek jedan dodir od poziva.",
        "Lighthouse na telefonu: 90+ u sve četiri kategorije.",
        "Bez servera i baze, pa hosting ne košta.",
      ],
      en: [
        "A visitor on a phone is always one tap from a call.",
        "Lighthouse on a phone: 90+ in all four categories.",
        "No server or database, so hosting costs nothing.",
      ],
    },
    image: "/images/projects/stanke-enterijer.webp",
    title: "Stanke Enterijer",
    client: "Stanke Enterijer, Beograd",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Ceo sajt (sa IT Expert)", en: "Whole site (with IT Expert)" },
    tagline: {
      sr: "Sajt molerske firme iz Beograda: poziv jednim dodirom i Lighthouse 90+ na telefonu.",
      en: "A site for a Belgrade house painter: one-tap calling and Lighthouse 90+ on mobile.",
    },
    summary: {
      sr: "Stanke Enterijer je molerska firma iz Beograda. Ljudi takav posao traže na telefonu i žele odmah da pozovu, pa sam napravio kratak, brz sajt sa pozivom na svakom ekranu. Tri statične stranice u Nuxt-u, na GitHub Pages.",
      en: "Stanke Enterijer is a Belgrade house-painting business. People look for this work on a phone and want to call straight away, so I built a short, fast site with a call on every screen. Three static Nuxt pages on GitHub Pages.",
    },
    did: {
      sr: [
        "Napravio kontakt bez forme: poziv, WhatsApp i Viber, uz dugme za poziv pri dnu ekrana.",
        "Smanjio hero sliku sa 45 na 3,1 KB prelaskom na WebP.",
        "Sveo font na srpsku latinicu u jednom woff2 fajlu.",
        "Prepisao sajt u ravne stranice sa jednim CSS fajlom u HTML-u.",
      ],
      en: [
        "Built contact with no form: call, WhatsApp and Viber, plus a sticky call button.",
        "Cut the hero image from 45 to 3.1 KB by moving to WebP.",
        "Cut the font down to Serbian Latin in one woff2 file.",
        "Rewrote the site as flat pages with one CSS file inlined in the HTML.",
      ],
    },
    hard: {
      sr: "Šablon je bio pravljen za veće sajtove, sa dvadesetak CSS fajlova koji se učitavaju dok se skroluje. Za tri stranice to je bio višak, a CSS ubačen u toku rada na telefonu kasni za prvim prikazom. Zato sam sajt prepisao u ravne stranice sa jednim CSS fajlom i jednim fontom.",
      en: "The template was made for bigger sites, with about twenty CSS files loaded while you scroll. For three pages that was too much, and CSS injected at runtime arrives after the first paint on a phone. So I rewrote the site as flat pages with one CSS file and one font.",
    },
    stack: ["Nuxt", "Vue", "CSS", "GitHub Actions", "GitHub Pages"],
    links: { live: "https://stanke-enterijer.rs" },
    accent: "sun",
  },
  {
    slug: "nst-print-mill",
    seoTitle: {
      sr: "NST: sajt za štampu i glodanje metala u Next.js",
      en: "NST: site for a dental metal print and mill lab",
    },
    description: {
      sr: "Studija slučaja: statičan Next.js sajt za firmu koja štampa i gloda metal za zubne laboratorije. 3D presek krunice iz Blendera i Lighthouse 90+ na telefonu.",
      en: "Case study: a static Next.js site for a firm that prints and mills metal for dental labs. A 3D crown cross-section from Blender and Lighthouse 90+ on mobile.",
    },
    team: {
      sr: "Sam",
      en: "Solo",
    },
    scale: {
      sr: "Statičan sajt, rotacija od 72 frejma, 5 dana",
      en: "Static site, a 72-frame turntable, 5 days",
    },
    impact: {
      sr: [
        "Laboratorije na prvom ekranu vide šta firma radi, umesto stock fotografije.",
        "Lighthouse: 90+ za performanse, 100 za pristupačnost i SEO.",
        "Bez servera i baze, na besplatnom hostingu.",
      ],
      en: [
        "Dental labs see what the company makes on the first screen, not a stock photo.",
        "Lighthouse: 90+ for performance, 100 for accessibility and SEO.",
        "No server or database, on free hosting.",
      ],
    },
    image: "/images/projects/nst-print-mill.webp",
    title: "NST Print and Mill Centar",
    client: "NST Print and Mill Centar, Beograd",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Ceo sajt", en: "Whole site" },
    tagline: {
      sr: "Sajt za 3D štampu i glodanje metala za zubne laboratorije, sa presekom krunice iz Blendera.",
      en: "A site for metal 3D printing and milling for dental labs, with a Blender crown cross-section.",
    },
    summary: {
      sr: "NST iz Beograda 3D štampa i gloda metal za zubotehničke laboratorije. Sajt sam napravio sam, od dizajna do objave, za pet dana: statičan Next.js na GitHub Pages. Početna je izgrađena oko preseka krunice koji se na skrol razmiče sloj po sloj.",
      en: "NST in Belgrade 3D prints and mills metal for dental labs. I built the site alone, from design to launch, in five days: static Next.js on GitHub Pages. The home page is built around a crown cross-section that spreads apart layer by layer as you scroll.",
    },
    did: {
      sr: [
        "Renderovao slojeve preseka iz Blendera kao providne WebP slike iz iste kamere.",
        "Napravio rotaciju od 72 frejma koja se vrti sama, mišem ili prstom.",
        "Dodao JSON-LD za firmu i svaku uslugu, sa canonical-om na svakoj stranici.",
        "Postavio GitHub Actions objavu za github.io podfolder i sopstveni domen.",
      ],
      en: [
        "Rendered the cross-section layers from Blender as transparent WebP from one camera.",
        "Built a 72-frame turntable that spins on its own or by mouse and finger.",
        "Added JSON-LD for the company and each service, with a canonical on every page.",
        "Set up a GitHub Actions deploy for a github.io subfolder and a custom domain.",
      ],
    },
    hard: {
      sr: "Traka od 72 frejma bila je široka 27.360 piksela, a WebP ide najviše do 16.383. Zato je složena u mrežu 12 puta 6. Model je presečen na pola, pa je silueta lutala 36 piksela; skripta sada centrira svaki frejm.",
      en: "A 72-frame strip was 27,360 pixels wide, and WebP stops at 16,383. So it is laid out as a 12 by 6 grid. The model is cut in half, so the silhouette wandered by 36 pixels; a script now centres every frame.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Blender", "JSON-LD", "GitHub Pages"],
    links: { live: "https://itimers.github.io/newsolutionsteam/" },
    accent: "pink",
  },
  {
    slug: "olimp",
    seoTitle: {
      sr: "SC Olimp: održavanje sajta sportskog centra",
      en: "SC Olimp: sports centre website maintenance",
    },
    logo: "/images/clients/olimp.webp",
    description: {
      sr: "Studija slučaja: oko dve godine održavam WordPress sajt javnog sportskog centra Olimp na Zvezdari. Ćirilica i latinica, vesti, cenovnici i javne nabavke.",
      en: "Case study: for about two years I have maintained the WordPress site of Olimp, a public sports centre in Zvezdara. Two scripts, news, price lists and tenders.",
    },
    gallery: [
      "/images/projects/gallery/olimp-2.webp",
      "/images/projects/gallery/olimp-m.webp",
    ],
    team: {
      sr: "Sam, spoljni saradnik",
      en: "Solo, external associate",
    },
    scale: {
      sr: "Javni sportski centar, WordPress, 2 pisma",
      en: "Public sports centre, WordPress, 2 scripts",
    },
    impact: {
      sr: [
        "Posetioci nalaze važeće cene, vesti i javne nabavke.",
        "Zaposleni šalju sve izmene jednoj osobi.",
        "Sajt iz 2018. radi na istom dizajnu, sa ažurnim sadržajem.",
      ],
      en: [
        "Visitors find current prices, news and public tenders.",
        "Staff send every change to one person.",
        "A 2018 site still runs on its original design, with current content.",
      ],
    },
    image: "/images/projects/olimp.webp",
    title: "Sportski centar Olimp",
    client: "SC Olimp, Zvezdara",
    kind: "maintenance",
    featured: false,
    year: "2024-2026",
    role: {
      sr: "Održavanje sajta (spoljni saradnik)",
      en: "Website maintenance (external associate)",
    },
    tagline: {
      sr: "Oko dve godine održavam sajt javnog sportskog centra na Zvezdari, na ćirilici i latinici.",
      en: "For about two years I have kept a public sports centre's site current, in Cyrillic and Latin.",
    },
    summary: {
      sr: "Olimp je javni sportski centar na Zvezdari. Sajt nisam pravio: postoji od 2018. na WordPress-u. Oko dve godine ga održavam kao spoljni saradnik, da bude tačan i da radi na ćirilici i latinici.",
      en: "Olimp is a public sports centre in Zvezdara. I did not build the site: it has run on WordPress since 2018. I have maintained it for about two years as an external associate, keeping it accurate and working in Cyrillic and Latin.",
    },
    did: {
      sr: [
        "Ažuriram cenovnik bazena, vesti i stranice objekata i programa.",
        "Objavljujem javne nabavke i dokumente onako kako ih centar pripremi.",
        "Proveravam svaku izmenu i na ćirilici i na latinici.",
        "Ažuriram WordPress, temu i dodatke, uz pregled glavnih stranica posle svakog.",
      ],
      en: [
        "Update the pool price list, news and facility and programme pages.",
        "Publish tenders and documents exactly as the centre prepares them.",
        "Check every change in both Cyrillic and Latin.",
        "Update WordPress, the theme and plugins, checking the main pages after each.",
      ],
    },
    hard: {
      sr: "Na nasleđenom sajtu najveći rizik je ažuriranje: novija verzija dodatka lako promeni stranicu koju niko nije dirao godinama. Zato ne menjam dizajn bez razloga, radim u postojećim šablonima i posle svakog ažuriranja prolazim glavne stranice u oba pisma.",
      en: "On an inherited site the biggest risk is an update: a newer plugin can easily change a page nobody has touched in years. So I leave the design alone, work inside the existing templates and check the main pages in both scripts after every update.",
    },
    stack: ["WordPress", "WPBakery", "LayerSlider", "PHP", "MySQL"],
    links: { live: "https://www.scolimp.rs" },
    accent: "cyan",
  },
  {
    slug: "job-application-tracker",
    seoTitle: {
      sr: "Job Application Tracker: Kanban u Next.js",
      en: "Job Application Tracker: Kanban in Next.js",
    },
    description: {
      sr: "Studija slučaja: Kanban tabla za prijave za posao u Next.js. Server Actions, MongoDB, Better Auth i prevlačenje kartica koje se vraća ako server odbije.",
      en: "Case study: a Kanban board for job applications in Next.js. Server Actions, MongoDB, Better Auth and drag and drop that rolls back if the server says no.",
    },
    gallery: [
      "/images/projects/gallery/job-application-tracker-1.webp",
      "/images/projects/gallery/job-application-tracker-2.webp",
      "/images/projects/gallery/job-application-tracker-3.webp",
      "/images/projects/gallery/job-application-tracker-m.webp",
    ],
    team: {
      sr: "Sam",
      en: "Solo",
    },
    scale: {
      sr: "24 commit-a, ~5.8k linija",
      en: "24 commits, ~5.8k lines",
    },
    impact: {
      sr: [
        "Najnoviji Next.js u aplikaciji koja radi, sa bazom i prijavom.",
        "Bezbednost od početka: Zod, provera vlasnika, limiti, CSP i HSTS.",
        "Svaka ispravka ima commit koji objašnjava uzrok.",
      ],
      en: [
        "The latest Next.js in a working app with a database and sign-in.",
        "Security from the start: Zod, owner checks, rate limits, CSP and HSTS.",
        "Every fix has a commit that explains the cause.",
      ],
    },
    image: "/images/projects/job-application-tracker.webp",
    title: "Job Application Tracker",
    kind: "personal",
    featured: true,
    year: "2026",
    role: { sr: "Sve", en: "Everything" },
    tagline: {
      sr: "Kanban tabla za traženje posla: prevuci prijavu iz „poslato“ u „intervju“.",
      en: "A Kanban board for the job hunt: drag an application from sent to interview.",
    },
    summary: {
      sr: "Kanban tabla na kojoj se prijava za posao prevlači kroz kolone dok napreduje. Napravio sam je sam za pet dana u Next.js-u, sa MongoDB bazom i Better Auth prijavom. Svaki potez je optimističan, a ako server odbije, tabla se vraća.",
      en: "A Kanban board where a job application moves through columns as it progresses. I built it alone in five days in Next.js, with MongoDB and Better Auth sign-in. Every move is optimistic, and if the server refuses, the board rolls back.",
    },
    did: {
      sr: [
        "Napravio prevlačenje između i unutar kolona, sa Escape-om koji vraća tablu.",
        "Dodao Zod validaciju svake server akcije i env promenljivih, plus CSP i HSTS.",
        "Ograničio zahteve za reset i verifikaciju na tri po satu.",
        "Promenio primarnu boju da kontrast pređe AA prag: sa 2,97:1 na 5,17:1.",
      ],
      en: [
        "Built drag and drop between and within columns, with Escape to restore the board.",
        "Added Zod validation on every server action and env variable, plus CSP and HSTS.",
        "Limited reset and verification requests to three per hour.",
        "Changed the primary colour to pass AA contrast: from 2.97:1 to 5.17:1.",
      ],
    },
    hard: {
      sr: "Server akcija odbija potez tako što vrati grešku, a ne baci izuzetak, pa catch blok nikad nije video odbijanje. Kartica je ostajala u novoj koloni, a baza je čuvala staru. Sada se snimak table vraća u oba slučaja, a korisnik dobija poruku.",
      en: "The server action refused a move by returning an error, not throwing, so the catch block never saw it. The card stayed in its new column while the database kept the old one. Now the board snapshot is restored in both cases, and the user sees a message.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Better Auth",
      "dnd-kit",
      "Zod",
      "Tailwind",
    ],
    links: {
      live: "https://job-application-tracker-two-rust.vercel.app",
      repo: "https://github.com/sepicn/job-application-tracker",
    },
    accent: "cyan",
  },
  {
    slug: "gymai",
    seoTitle: {
      sr: "GymAI: AI plan treninga, React i Express",
      en: "GymAI: AI training planner, React + Express",
    },
    description: {
      sr: "Studija slučaja: GymAI od šest odgovora pravi nedeljni plan treninga. React, Express, Prisma na Neon bazi, AI izlaz proveren Zod-om i 44 testa.",
      en: "Case study: GymAI turns six answers into a weekly training plan. React, Express, Prisma on Neon Postgres, AI output checked with Zod, and 44 tests.",
    },
    image: "/images/projects/gymai.webp",
    gallery: [
      "/images/projects/gallery/gymai-onboarding.webp",
      "/images/projects/gallery/gymai-plan.webp",
      "/images/projects/gallery/gymai-plan-day.webp",
    ],
    team: {
      sr: "Sam",
      en: "Solo",
    },
    scale: {
      sr: "21 commit, 44 testa, bundle sa 1.183 na 545 kB",
      en: "21 commits, 44 tests, bundle from 1,183 to 545 kB",
    },
    impact: {
      sr: [
        "LLM kao nepouzdan izvor: šema pre baze, rezervni model kad jedan padne.",
        "API ne veruje klijentu: korisnik dolazi iz potpisanog tokena.",
        "Početno preuzimanje manje za 54%.",
      ],
      en: [
        "The LLM treated as unreliable: a schema before the database, a fallback model on failure.",
        "An API that does not trust the client: the user comes from a signed token.",
        "Initial download cut by 54%.",
      ],
    },
    title: "GymAI",
    kind: "personal",
    featured: false,
    year: "2026",
    role: { sr: "Sve", en: "Everything" },
    tagline: {
      sr: "AI pravi nedeljni plan treninga iz šest pitanja, a svaki odgovor se proverava pre baze.",
      en: "An AI writes a weekly training plan from six questions, every reply checked before the database.",
    },
    summary: {
      sr: "Korisnik odgovori na šest pitanja, a model preko OpenRouter-a vrati ceo nedeljni program treninga. Napravio sam aplikaciju sam, u 21 commit-u: React na frontu, Express API i Neon Postgres kroz Prisma-u.",
      en: "The user answers six questions, and a model on OpenRouter returns a full weekly training program. I built the app alone in 21 commits: React on the front, an Express API and Neon Postgres through Prisma.",
    },
    did: {
      sr: [
        "Proverio Zod-om i ulaz korisnika i izlaz modela pre baze.",
        "Napravio generisanje kroz listu modela, sa ponovnim pokušajem i timeout-om od 90 sekundi.",
        "Vezao svaki upit za korisnika iz potpisanog tokena; tuđi plan vraća 404.",
        "Smanjio početno preuzimanje sa 1.183 na 545 kB i napisao 44 testa.",
      ],
      en: [
        "Validated both user input and model output with Zod before the database.",
        "Built generation across a list of models, with retries and a 90-second timeout.",
        "Scoped every query to the user from a signed token; someone else's plan returns 404.",
        "Cut the initial download from 1,183 to 545 kB and wrote 44 tests.",
      ],
    },
    hard: {
      sr: "Modeli vraćaju JSON sa viškom teksta, markdown ogradama ili pogrešnim brojem dana. Parser izvuče JSON, Zod odbaci sve van šeme, a provera broja dana odluči da li ide sledeći pokušaj. Početno preuzimanje palo je za 54% kad se auth UI učitao tek kada zatreba.",
      en: "Models return JSON with extra text, markdown fences or the wrong number of days. The parser pulls out the JSON, Zod rejects anything off-schema, and a day count check decides whether to retry. The initial download dropped by 54% once the auth UI loaded only when needed.",
    },
    stack: [
      "React",
      "Vite",
      "Tailwind",
      "Express",
      "Prisma",
      "Neon",
      "Zod",
      "OpenRouter",
      "Vitest",
    ],
    links: { repo: "https://github.com/sepicn/gym-planner" },
    accent: "sun",
  },
  {
    slug: "launchhub",
    seoTitle: {
      sr: "LaunchHub: Next.js platforma za proizvode",
      en: "LaunchHub: Next.js product launch board",
    },
    description: {
      sr: "Studija slučaja: LaunchHub, mesto za prijavu i glasanje za nove proizvode. Next.js sa keširanim komponentama, Clerk organizacije, Neon Postgres i Drizzle.",
      en: "Case study: LaunchHub, a place to submit and vote on new products. Next.js with cached components, Clerk organizations, Neon Postgres and Drizzle ORM.",
    },
    gallery: [
      "/images/projects/gallery/launchhub-2.webp",
      "/images/projects/gallery/launchhub-m.webp",
    ],
    team: {
      sr: "Sam",
      en: "Solo",
    },
    scale: {
      sr: "22 commit-a, ~2.6k linija",
      en: "22 commits, ~2.6k lines",
    },
    impact: {
      sr: [
        "Full-stack Next.js sa prijavom, bazom i tokom odobravanja.",
        "Statični delovi stižu odmah, a samo korisnički deo čeka server.",
      ],
      en: [
        "Full-stack Next.js with sign-in, a database and an approval flow.",
        "Static parts arrive at once, and only the user's part waits for the server.",
      ],
    },
    image: "/images/projects/launchhub.webp",
    title: "LaunchHub",
    kind: "personal",
    featured: false,
    year: "2025",
    role: { sr: "Sve", en: "Everything" },
    tagline: {
      sr: "Mesto za prijavu, glasanje i odobravanje novih proizvoda, u stilu Product Hunt-a.",
      en: "A place to submit new products, vote and approve, Product Hunt style.",
    },
    summary: {
      sr: "Autor prijavi proizvod, admin ga odobri, a posetioci glasaju. Napravio sam ga sam za sedam dana u Next.js-u, sa Clerk prijavom, Neon Postgres bazom i keširanim komponentama.",
      en: "An author submits a product, an admin approves it, and visitors vote. I built it alone in seven days in Next.js, with Clerk sign-in, Neon Postgres and cached components.",
    },
    did: {
      sr: [
        "Keširao liste i stranice proizvoda, uz revalidaciju posle glasanja i admin akcija.",
        "Napravio glasanje sa useOptimistic: broj se menja odmah, a server ga potvrdi.",
        "Napravio admin panel u kome svaka akcija proverava ulogu na serveru.",
        "Dodao Zod validaciju prijave: http(s) link i najviše 10 tagova.",
      ],
      en: [
        "Cached product lists and pages, revalidating after votes and admin actions.",
        "Built voting with useOptimistic: the count changes at once, the server confirms it.",
        "Built an admin panel where every action checks the role on the server.",
        "Added Zod validation on submissions: an http(s) link and at most 10 tags.",
      ],
    },
    hard: {
      sr: "Clerk ne pravi organizacije sam, a svaki proizvod mora da ima jednu. Proxy pri prvom ulasku napravi ličnu organizaciju ako je nema. Dugme za nalog stoji u posebnoj Suspense granici, pa ostatak stranice ostaje keširan.",
      en: "Clerk does not create organizations on its own, and every product needs one. On first sign-in the proxy creates a personal organization if there is none. The account button sits in its own Suspense boundary, so the rest of the page stays cached.",
    },
    stack: ["Next.js", "React", "Clerk", "Neon", "Drizzle", "Zod", "shadcn/ui"],
    links: {
      live: "https://launchhub-five.vercel.app",
      repo: "https://github.com/sepicn/launchhub",
    },
    accent: "pink",
  },
  {
    slug: "echo",
    seoTitle: {
      sr: "Echo: realtime chat koji se sam briše",
      en: "Echo: self-destructing realtime chat",
    },
    description: {
      sr: "Studija slučaja: Echo, anonimna soba za dvoje koja se sama briše posle deset minuta. Next.js, Elysia API, Upstash Redis sa TTL-om i realtime događaji.",
      en: "Case study: Echo, an anonymous room for two that deletes itself after ten minutes. Next.js, an Elysia API, Upstash Redis with TTL and realtime events.",
    },
    team: {
      sr: "Sam",
      en: "Solo",
    },
    scale: {
      sr: "17 commit-a za dva dana, 4 realtime događaja",
      en: "17 commits in two days, 4 realtime events",
    },
    impact: {
      sr: [
        "Realtime i podaci sa rokom trajanja bez sopstvenog servera.",
        "Tipiziran API od servera do klijenta, bez ručnih tipova.",
        "Za dva dana od praznog repoa do verzije na Vercel-u.",
      ],
      en: [
        "Realtime and expiring data without running my own server.",
        "A typed API from server to client, with no hand-written types.",
        "Two days from an empty repo to a live version on Vercel.",
      ],
    },
    image: "/images/projects/echo.webp",
    gallery: [
      "/images/projects/gallery/echo-home.webp",
      "/images/projects/gallery/echo-m.webp",
    ],
    title: "Echo",
    kind: "personal",
    featured: false,
    year: "2025",
    role: { sr: "Sve", en: "Everything" },
    tagline: {
      sr: "Anonimna soba za dvoje koja se sama obriše posle deset minuta.",
      en: "An anonymous room for two that deletes itself after ten minutes.",
    },
    summary: {
      sr: "Chat bez naloga i bez istorije: otvoriš sobu, pošalješ link jednoj osobi, a posle deset minuta ne ostaje ništa. Napravio sam ga sam za dva dana, na Next.js-u, Elysia API-ju i Upstash Redis-u.",
      en: "A chat with no account and no history: open a room, send the link to one person, and after ten minutes nothing is left. I built it alone in two days on Next.js, an Elysia API and Upstash Redis.",
    },
    did: {
      sr: [
        "Ograničio sobu na dve osobe preko tokena u httpOnly kolačiću.",
        "Dodao četiri realtime događaja: poruka, kucanje, pročitano i uništi.",
        "Napravio odbrojavanje od stvarnog preostalog vremena na serveru.",
        "Proverio Zod-om svaku poruku i svaki događaj.",
      ],
      en: [
        "Limited each room to two people with a token in an httpOnly cookie.",
        "Added four realtime events: message, typing, read and destroy.",
        "Built a countdown from the real time left on the server.",
        "Validated every message and event with Zod.",
      ],
    },
    hard: {
      sr: "Soba mora da nestane cela, u isto vreme. Zato svaki novi ključ u Redis-u dobija preostali rok sobe, a ne svojih deset minuta, pa ništa ne preživi sobu. Kad soba istekne, obe strane idu na početnu sa porukom.",
      en: "A room has to disappear entirely, all at once. So every new Redis key gets the room's remaining expiry, not its own ten minutes, and nothing outlives the room. When it expires, both sides go to the home page with a note.",
    },
    stack: [
      "Next.js",
      "Elysia",
      "Eden Treaty",
      "Upstash Redis",
      "Upstash Realtime",
      "TanStack Query",
      "Zod",
    ],
    links: { repo: "https://github.com/sepicn/echo" },
    accent: "violet",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const clientProjects = projects.filter(
  (p) => p.kind === "client" || p.kind === "maintenance",
);
export const personalProjects = projects.filter((p) => p.kind === "personal");
