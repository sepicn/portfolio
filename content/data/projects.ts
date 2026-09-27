import type { Localized, LocalizedList } from "../i18n";

export type ProjectKind = "client" | "personal" | "maintenance";

export type Project = {
  slug: string;
  title: string;
  client?: string;
  kind: ProjectKind;
  featured: boolean;
  year: string;
  role: Localized;
  tagline: Localized;
  /** Search title of the case study, what was built for whom; the layout appends " | Nikola Šepić", so keep it under ~45 characters. */
  seoTitle?: Localized;
  /** Meta description of the case study page, 140 to 160 characters. */
  description: Localized;
  summary: Localized;
  did: LocalizedList;
  hard: Localized;
  stack: string[];
  links: { live?: string; repo?: string };
  image?: string;
  /** Client logo (public/images/clients), shown as a white silhouette on the tickers. */
  logo?: string;
  /** Extra screenshots for the case study page. "-m" files are phone views. */
  gallery?: string[];
  /** Team shape and how big the thing is, for the facts bar recruiters scan first. */
  team: Localized;
  scale: Localized;
  /** Client projects: what the client got. Personal projects: what it shows about me. One to three lines. */
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
      sr: "Studija slučaja: platforma privatne bolnice Medical Time na pet jezika, Nuxt 4 i Laravel 12, plus Google Ads kampanje koje donose upite i pozive.",
      en: "Case study: the Medical Time private hospital platform in five languages, Nuxt 4 and Laravel 12, plus the Google Ads campaigns that bring in inquiries and calls.",
    },
    gallery: [
      "/images/projects/gallery/medical-time-2.webp",
      "/images/projects/gallery/medical-time-m.webp",
    ],
    team: {
      sr: "Dva developera, platformu vodi Đorđe Stojanović",
      en: "Two developers, platform led by Đorđe Stojanović",
    },
    scale: {
      sr: "~400k linija koda, 5 jezika, 779 URL-ova u sitemap-u, Semrush Site Health 90% → 98%",
      en: "~400k lines of code, 5 languages, 779 URLs in the sitemap, Semrush Site Health 90% → 98%",
    },
    impact: {
      sr: [
        "Bolnica ima jednog čoveka za sajt, merenje i oglase, pa nema čekanja između developera i agencije.",
        "Tehnički SEO: Site Health sa 90% na 98% za nedelju dana, bez ijedne greške u auditu.",
        "370+ negativnih ključnih reči: budžet više ne odlazi na pretrage koje ne donose upite.",
      ],
      en: [
        "The hospital has one person for the site, tracking and ads, so there is no waiting between a developer and an agency.",
        "Technical SEO: Site Health from 90% to 98% in one week, with zero audit errors.",
        "370+ negative keywords: the budget no longer goes to searches that bring no inquiries.",
      ],
    },
    title: "Medical Time",
    client: "Medical Time Hospital, Beograd",
    kind: "client",
    featured: true,
    year: "2025 – 2026",
    role: {
      sr: "Developer i digitalni marketing",
      en: "Developer and digital marketing",
    },
    tagline: {
      sr: "Platforma privatne bolnice na pet jezika, plus kampanje koje donose upite i pozive.",
      en: "A private hospital platform in five languages, plus the campaigns that bring in inquiries and calls.",
    },
    summary: {
      sr: "Javni sajt, online zakazivanje, portali za deset uloga zaposlenih, prodavnica, video konsultacije i mobilna aplikacija. Nuxt 4 na frontu, Laravel 12 pozadi, Flutter za telefon. Platformu je napravio Đorđe Stojanović; ja sam u timu od avgusta 2025 sa 165 commit-a, uglavnom u javnom delu, prevodima i SEO-u, a paralelno vodim Google Ads i Meta Ads naloge bolnice.",
      en: "Public site, online booking, portals for ten staff roles, a shop, video consultations and a mobile app. Nuxt 4 on the front, Laravel 12 behind it, Flutter for the phone. The platform was built by Đorđe Stojanović; I joined in August 2025 and have 165 commits, mostly in the public site, translations and SEO, while also running the hospital's Google Ads and Meta Ads accounts.",
    },
    did: {
      sr: [
        "Semrush Site Health sa 90% na 98% za nedelju dana: greške 6 → 0, upozorenja 1.012 → 129 (−87%).",
        "Prevodi i lokalizovani URL slugovi za sr, en, ru, de i tr, sa hreflang i canonical pravilima; blog i prodavnica prebačeni na SSR da ih Google vidi.",
        "Chatbot na javnom sajtu koji odgovara na pitanja pacijenata i zakazuje termin.",
        "Daljinsko potpisivanje saglasnosti sa šaltera na tablet, uključujući slučaj kada nalog pacijenta još ne postoji.",
        "JSON-LD za Hospital, Physician, MedicalProcedure, FAQ, Article i Product; llms.txt; HSTS i noindex za SPA rute.",
        "GTM kontejner, GA4 konverzije, consent mode i ClickCease zaštita.",
        "Osam Google Ads Search kampanja: 370+ negativnih ključnih reči iz izveštaja o pretragama i analiza udela prikaza koja je pokazala gde budžet ima prostora da raste.",
      ],
      en: [
        "Semrush Site Health from 90% to 98% in one week: errors 6 → 0, warnings 1,012 → 129 (−87%).",
        "Translations and localized URL slugs for sr, en, ru, de and tr, with hreflang and canonical rules; the blog and shop moved to server-side rendering so Google sees them.",
        "A public-site chatbot that answers patient questions and books an appointment.",
        "Remote consent signing from the front desk to a tablet, including the case where the patient account does not exist yet.",
        "JSON-LD for Hospital, Physician, MedicalProcedure, FAQ, Article and Product; llms.txt; HSTS and noindex for SPA routes.",
        "GTM container, GA4 conversions, consent mode and ClickCease protection.",
        "Eight Google Ads Search campaigns: 370+ negative keywords from search term reports and an impression share analysis that showed where budget has room to grow.",
      ],
    },
    hard: {
      sr: "Canonical URL-ovi blog postova su se čuvali u bazi zajedno sa meta podacima, pa je posle promene slugova Google indeksirao duple stranice. Rešenje je bilo da se canonical uvek izvodi iz trenutne rute, a ne iz sačuvanih meta podataka, i da se stari slugovi preusmere sa 301.",
      en: "Blog post canonical URLs were stored in the database alongside meta data, so after slugs changed Google indexed duplicate pages. The fix was to always derive the canonical from the current route rather than saved meta, and to 301 the old slugs.",
    },
    stack: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Laravel 12",
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
    slug: "meridian-tms",
    seoTitle: {
      sr: "Meridian TMS: UI za softver kamionske logistike",
      en: "Meridian TMS: UI for a trucking logistics TMS",
    },
    logo: "/images/clients/delta.webp",
    description: {
      sr: "Studija slučaja: kompletan UI za TMS sistem kamionske logistike u .NET 8 MVC. Dispečeri, flota, bezbednost i računovodstvo u Razor pogledima.",
      en: "Case study: the entire UI of a trucking logistics TMS in .NET 8 MVC. Dispatch, fleet, safety and accounting screens built in Razor views.",
    },
    team: {
      sr: "Tim od 5 developera, ja sam jedini na UI sloju",
      en: "Team of 5 developers, I was the only one on the UI layer",
    },
    scale: {
      sr: "12 projekata u .NET solution-u, 100+ EF migracija, 40+ formi",
      en: "12 projects in the .NET solution, 100+ EF migrations, 40+ forms",
    },
    impact: {
      sr: [
        "Dispečeri rade u jednom doslednom interfejsu: svih 40+ formi su vođeni koraci umesto dugačkih ekrana.",
        "Iste forme rade i u modalu i na punoj strani, pa tim ne održava dve verzije istog ekrana.",
      ],
      en: [
        "Dispatchers work in one consistent interface: all 40+ forms are guided steps instead of long screens.",
        "The same forms work in a modal and on a full page, so the team does not maintain two versions of one screen.",
      ],
    },
    image: "/images/projects/meridian-tms.webp",
    gallery: [
      "/images/projects/gallery/meridian-tms-2.webp",
      "/images/projects/gallery/meridian-tms-3.webp",
      "/images/projects/gallery/meridian-tms-m.webp",
    ],
    title: "Meridian TMS",
    client: "Delta Group Logistics, SAD",
    kind: "client",
    featured: true,
    year: "2025 – 2026",
    role: { sr: "Front-end developer (ceo UI)", en: "Front-end developer (entire UI)" },
    tagline: {
      sr: "Back-office sistem za kamionsku logistiku: dispečeri, flota, bezbednost, računovodstvo.",
      en: "Back-office system for trucking logistics: dispatch, fleet, safety, accounting.",
    },
    summary: {
      sr: "Transport Management System u .NET 8 MVC sa SQL Server bazom, Azure servisima i mobilnim API-jem za vozače. Ja sam radio kompletan UI sloj: Razor pogledi, CSS i JavaScript, u 101 commit-u od oktobra 2025 do jula 2026. Repo je privatan i vlasništvo klijenta, pa ovde nema koda; screenshotovi su sa lokalne instance sa izmišljenim podacima.",
      en: "A Transport Management System in .NET 8 MVC with SQL Server, Azure services and a mobile API for drivers. I owned the entire UI layer: Razor views, CSS and JavaScript, across 101 commits from October 2025 to July 2026. The repo is private and client-owned, so no code here; the screenshots come from a local instance with made-up data.",
    },
    did: {
      sr: [
        "Svih 40 i više Add/Edit formi pretvoreno u višestepene wizard-e: Truck, Equipment, Driver, Customer, Division, Load, Owner Operator, Lease.",
        "Safety modul (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check, Employment Verification) prebačen na grid stranice sa horizontalnim skrolom.",
        "Redizajn Invoicing i Fuel Transactions ekrana, modala za faktoring kompanije i driver statement-e.",
        "Standardizacija status sekcija, redosleda polja, ikona i responsive ponašanja modala kroz ceo sistem.",
      ],
      en: [
        "All 40+ Add/Edit forms turned into multi-step wizards: Truck, Equipment, Driver, Customer, Division, Load, Owner Operator, Lease.",
        "Safety module (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check, Employment Verification) moved to grid pages with horizontal scroll.",
        "Redesign of the Invoicing and Fuel Transactions screens, factoring company modals and driver statements.",
        "Standardized status sections, field order, icons and responsive modal behaviour across the whole system.",
      ],
    },
    hard: {
      sr: "Iste forme se otvaraju i samostalno i iz drugih formi (Truck iz Driver-a, Lease iz Equipment-a). Prvo rešenje je bilo ravna forma kao fallback, što je dalo dva različita iskustva. Na kraju je wizard postao modularan po koracima, pa isti koraci rade i u modalu i na punoj strani.",
      en: "The same forms open both standalone and from inside other forms (Truck from Driver, Lease from Equipment). The first fix was a flat form as a fallback, which gave two different experiences. In the end the wizard became modular per step, so the same steps work in a modal and on a full page.",
    },
    stack: [
      "ASP.NET Core 8 MVC",
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
    slug: "delta-tracking",
    seoTitle: {
      sr: "Delta Tracking: praćenje pošiljki na mapi",
      en: "Delta Tracking: live shipment tracking portal",
    },
    logo: "/images/clients/delta.webp",
    description: {
      sr: "Studija slučaja: portal za praćenje pošiljki na mapi u realnom vremenu, Rails 7.2 sa Hotwire-om, Tailwind-om i Leaflet mapom. Moj deo je ceo UI.",
      en: "Case study: a live shipment tracking portal on a map, Rails 7.2 with Hotwire, Tailwind and Leaflet. My part was the whole front end and redesign.",
    },
    team: { sr: "Tim od 2 developera", en: "Team of 2 developers" },
    scale: {
      sr: "Rails aplikacija sa integracijom McLeod LoadMaster API-ja, CI sa RSpec-om",
      en: "Rails app integrated with the McLeod LoadMaster API, CI with RSpec",
    },
    impact: {
      sr: [
        "Kupci logističke firme sami vide gde je pošiljka i kada stiže, sa procenom dolaska za svaku stanicu.",
      ],
      en: [
        "The logistics company's customers see for themselves where a shipment is and when it arrives, with an ETA for every stop.",
      ],
    },
    image: "/images/projects/delta-tracking.webp",
    gallery: [
      "/images/projects/gallery/delta-tracking-2.webp",
      "/images/projects/gallery/delta-tracking-3.webp",
      "/images/projects/gallery/delta-tracking-m.webp",
    ],
    title: "Delta Tracking",
    client: "Delta Group Logistics, SAD",
    kind: "client",
    featured: true,
    year: "2025",
    role: { sr: "Front-end developer", en: "Front-end developer" },
    tagline: {
      sr: "Portal na kome kupci prate pošiljke na mapi, u realnom vremenu.",
      en: "A portal where customers follow their shipments on a live map.",
    },
    summary: {
      sr: "Rails 7.2 aplikacija sa Hotwire-om i Tailwind-om koja vuče podatke iz McLeod LoadMaster sistema. Kupac vidi listu pošiljki, detalje sa stanicama, poslednje lokacije kamiona i dokaz o isporuci. Moj deo je bio UI: mapa, redizajn stranica, brend boje. Screenshotovi su sa lokalne instance sa izmišljenim podacima.",
      en: "A Rails 7.2 app with Hotwire and Tailwind that pulls data from the McLeod LoadMaster system. A customer sees their shipments, stop details, the truck's latest locations and proof of delivery. My part was the UI: the map, page redesigns, brand colours. The screenshots come from a local instance with made-up data.",
    },
    did: {
      sr: [
        "Interaktivna Leaflet mapa pošiljke sa stanicama, živom lokacijom, poslednjih pet pozicija i ETA po stanici.",
        "Statusi isporuke koji se menjaju prema lokaciji kamiona, uz jasnije labele za kupce.",
        "Redizajn Shipments, admin i customer stranica u kartice sa brend bojama; favicon set i WebP logo.",
      ],
      en: [
        "Interactive Leaflet shipment map with stops, live location, the last five positions and ETA per stop.",
        "Delivery statuses that change with the truck's location, with clearer labels for customers.",
        "Redesign of the Shipments, admin and customer pages into card layouts in brand colours; favicon set and WebP logo.",
      ],
    },
    hard: {
      sr: "Ikone mape su radile lokalno, a nestajale u produkciji, jer Rails asset pipeline menja imena fajlova. Rešenje: putanje do ikona idu kroz asset helper umesto kao statični stringovi u JavaScript-u.",
      en: "Map icons worked locally but vanished in production because the Rails asset pipeline fingerprints file names. Fix: icon paths go through the asset helper instead of static strings in JavaScript.",
    },
    stack: ["Rails 7.2", "Hotwire", "Tailwind", "Leaflet", "PostgreSQL"],
    links: {},
    accent: "violet",
  },
  {
    slug: "itexpert",
    seoTitle: {
      sr: "IT Expert: portal za klijente web agencije",
      en: "IT Expert: client portal for a web agency",
    },
    logo: "/images/clients/itexpert.webp",
    description: {
      sr: "Studija slučaja: platforma web agencije IT Expert u Nuxt 4 i Laravel 12. Portal za klijente, paketi sa kalkulatorom cene, pretplate i fakture.",
      en: "Case study: the IT Expert web agency platform in Nuxt 4 and Laravel 12. Client portal, packages with a price calculator, subscriptions and invoices.",
    },
    gallery: [
      "/images/projects/gallery/itexpert-2.webp",
      "/images/projects/gallery/itexpert-m.webp",
    ],
    team: { sr: "Dva developera, zajednički brend", en: "Two developers, shared brand" },
    scale: {
      sr: "Nuxt 4 + Laravel 12, 5 jezika, plaćanja i pretplate",
      en: "Nuxt 4 + Laravel 12, 5 languages, payments and subscriptions",
    },
    impact: {
      sr: ["Klijenti sami biraju paket, vide cenu u kalkulatoru i plaćaju online, bez razmene mejlova oko ponude."],
      en: ["Clients pick a package, see the price in the calculator and pay online, without emails back and forth about a quote."],
    },
    image: "/images/projects/itexpert.webp",
    title: "IT Expert",
    client: "IT Expert, Beograd",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Developer (zajednički brend)", en: "Developer (shared brand)" },
    tagline: {
      sr: "Platforma web agencije: portal za klijente, paketi, pretplate, fakture.",
      en: "A web agency platform: client portal, packages, subscriptions, invoices.",
    },
    summary: {
      sr: "IT Expert je brend pod kojim Đorđe i ja radimo freelance poslove. Platforma je Nuxt 4 sa i18n na pet jezika i Laravel 12 API: korisnički portal, paketi sa kalkulatorom cene, pretplate, fakture i predračuni, tiketing, chat, editor dokumenata sa PDF izvozom. Poslednje što sam radio je plaćanje.",
      en: "IT Expert is the brand Đorđe and I use for freelance work. The platform is Nuxt 4 with i18n in five languages and a Laravel 12 API: client portal, packages with a price calculator, subscriptions, invoices and pro-forma invoices, ticketing, chat, a document editor with PDF export. Payments were my latest piece.",
    },
    did: {
      sr: [
        "Raiffeisen plaćanja i tok pretplate.",
        "Paketi i kalkulator cene na javnom sajtu.",
        "Portali i tiketing za podršku.",
      ],
      en: [
        "Raiffeisen payments and the subscription flow.",
        "Packages and the price calculator on the public site.",
        "Portals and support ticketing.",
      ],
    },
    hard: {
      sr: "Ista platforma je osnova i za medicaltime.rs, pa svaka promena u zajedničkim komponentama mora da prođe na oba sajta. Držimo se pravila: promena prvo ide u template, pa se povlači u bolnicu.",
      en: "The same platform is the base for medicaltime.rs, so every change in shared components has to pass on both sites. The rule: a change lands in the template first, then gets pulled into the hospital.",
    },
    stack: ["Nuxt 4", "Laravel 12", "MySQL", "@nuxtjs/i18n"],
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
      sr: "Studija slučaja: WordPress e-magazin o psihologiji napravljen od nule. Rubrike, tipografija za čitanje, newsletter i učitavanje članaka bez osvežavanja.",
      en: "Case study: a WordPress e-magazine about psychology built from scratch. Sections, reading typography, a newsletter and articles that load without a refresh.",
    },
    gallery: [
      "/images/projects/gallery/prostor-izmedju-2.webp",
      "/images/projects/gallery/prostor-izmedju-m.webp",
    ],
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "Magazin sa 4 rubrike i newsletter-om",
      en: "Magazine with 4 sections and a newsletter",
    },
    impact: {
      sr: [
        "Magazin sa puno slika ostaje brz na telefonu, a rubrike i newsletter su tu od prvog dana.",
      ],
      en: [
        "An image-heavy magazine stays fast on a phone, with sections and a newsletter from day one.",
      ],
    },
    image: "/images/projects/prostor-izmedju.webp",
    title: "Prostor Između",
    client: "prostorizmedju.rs",
    kind: "client",
    featured: false,
    year: "2025",
    role: { sr: "Ceo sajt", en: "Whole site" },
    tagline: {
      sr: "E-magazin o psihologiji i svakodnevnom životu, sa rubrikama i newsletter-om.",
      en: "An e-magazine about psychology and everyday life, with sections and a newsletter.",
    },
    summary: {
      sr: "WordPress sajt koji sam uradio od nule: struktura rubrika (Psihologija, Lifestyle, Prostor za sebe, Intervju nedelje), tipografija i ritam čitanja, procena vremena čitanja, učitavanje članaka bez osvežavanja, prijava na newsletter, WebP slike.",
      en: "A WordPress site I built from scratch: section structure (Psychology, Lifestyle, Space for yourself, Interview of the week), typography and reading rhythm, reading time estimates, load-more articles without a refresh, newsletter signup, WebP images.",
    },
    did: {
      sr: [
        "Dizajn i izrada u WordPress-u sa Elementor-om.",
        "Kategorije, istaknuti članci, „učitaj još“.",
        "Newsletter i deljenje na Instagram i Facebook.",
      ],
      en: [
        "Design and build in WordPress with Elementor.",
        "Categories, featured stories, load more.",
        "Newsletter and sharing to Instagram and Facebook.",
      ],
    },
    hard: {
      sr: "Elementor lako napravi težak sajt. Držao sam broj widget-a nisko, slike u WebP-u i fontove sa display swap, da magazin sa puno slika ostane brz na telefonu.",
      en: "Elementor makes it easy to build a heavy site. I kept the widget count low, images in WebP and fonts with display swap, so an image-heavy magazine stays fast on a phone.",
    },
    stack: ["WordPress", "Elementor", "PHP"],
    links: { live: "https://prostorizmedju.rs" },
    accent: "sun",
  },
  {
    slug: "mango",
    seoTitle: {
      sr: "Mango: izrada sajta za poslastičarnicu",
      en: "Mango: website for a Belgrade pastry shop",
    },
    logo: "/images/clients/mango.webp",
    description: {
      sr: "Studija slučaja: sajt butik poslastičarnice Mango u Nuxt 4 sa SSR-om. Proizvodi po kategorijama, cenovnik, četiri teme i GTM tek posle pristanka.",
      en: "Case study: the Mango boutique pastry shop site in Nuxt 4 with SSR. Products by category, a price list, four themes and GTM loaded only after consent.",
    },
    gallery: [
      "/images/projects/gallery/mango-2.webp",
      "/images/projects/gallery/mango-m.webp",
    ],
    team: { sr: "Dva developera", en: "Two developers" },
    scale: {
      sr: "SSR sajt, 4 teme, GDPR consent",
      en: "SSR site, 4 themes, GDPR consent",
    },
    impact: {
      sr: [
        "Sajt se učitava brzo i na slabom mobilnom signalu.",
        "Vlasnica ubacuje originalne fotografije, a sajt ih sam smanji sa 8 MB na 60 do 120 KB.",
      ],
      en: [
        "The site loads fast even on a weak mobile signal.",
        "The owner uploads original photos and the site shrinks them from 8 MB to 60 to 120 KB on its own.",
      ],
    },
    image: "/images/projects/mango.webp",
    title: "Mango poslastičarnica",
    client: "Mango, Zemun",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Developer (sa IT Expert)", en: "Developer (with IT Expert)" },
    tagline: {
      sr: "Sajt butik poslastičarnice: proizvodi po kategorijama, cenovnik, galerija.",
      en: "A boutique pastry shop site: products by category, price list, gallery.",
    },
    summary: {
      sr: "Nuxt 4 sa SSR-om, četiri teme (light, dark, emerald, premium), GTM koji se učitava tek posle pristanka na kolačiće, reCAPTCHA na kontakt formi, email i telefon sakriveni od botova.",
      en: "Nuxt 4 with SSR, four themes (light, dark, emerald, premium), GTM that loads only after cookie consent, reCAPTCHA on the contact form, email and phone hidden from bots.",
    },
    did: {
      sr: [
        "Struktura proizvoda i cenovnik.",
        "Cookie consent i GTM posle pristanka.",
        "Optimizacija slika (sharp, tinify).",
      ],
      en: [
        "Product structure and price list.",
        "Cookie consent and GTM after consent.",
        "Image optimization (sharp, tinify).",
      ],
    },
    hard: {
      sr: "Fotografije torti su bile po 8 MB. Cevovod sa sharp-om i tinify-jem ih svodi na 60 do 120 KB bez vidljivog gubitka, a da vlasnica i dalje samo ubaci original.",
      en: "Cake photos came in at 8 MB each. A sharp and tinify pipeline brings them to 60 to 120 KB without visible loss, while the owner still just drops in the original.",
    },
    stack: ["Nuxt 4", "Vue 3", "TypeScript", "GTM"],
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
      sr: "Studija slučaja: brz statičan sajt muzičkog i video studija Vuk Studio u Nuxt 4, sa LocalBusiness i FAQ podacima za lokalnu pretragu u Beogradu.",
      en: "Case study: a fast static site for the Vuk Studio music and video studio in Nuxt 4, with LocalBusiness and FAQ structured data for local search.",
    },
    gallery: [
      "/images/projects/gallery/vuk-studio-2.webp",
      "/images/projects/gallery/vuk-studio-m.webp",
    ],
    team: { sr: "Dva developera", en: "Two developers" },
    scale: { sr: "Statičan Nuxt sajt, 6 stranica", en: "Static Nuxt site, 6 pages" },
    impact: {
      sr: ["Studio je od prvog dana spreman za lokalnu pretragu: brze statične stranice i strukturirani podaci."],
      en: ["The studio was ready for local search from day one: fast static pages and structured data."],
    },
    image: "/images/projects/vuk-studio.webp",
    title: "Vuk Studio",
    client: "Muzički studio Vuk, Beograd",
    kind: "client",
    featured: false,
    year: "2026",
    role: { sr: "Developer (sa IT Expert)", en: "Developer (with IT Expert)" },
    tagline: {
      sr: "Statičan sajt muzičkog i video studija, sa LocalBusiness i FAQ podacima.",
      en: "A static site for a music and video studio, with LocalBusiness and FAQ data.",
    },
    summary: {
      sr: "Nuxt 4 generisan u statične stranice, self-hosted subsetovani fontovi, skrol animacije, strukturirani podaci za lokalnu pretragu. Kontakt preko poziva, WhatsApp-a i Viber-a, bez forme.",
      en: "Nuxt 4 generated to static pages, self-hosted subset fonts, scroll animations, structured data for local search. Contact by call, WhatsApp and Viber, no form.",
    },
    did: {
      sr: [
        "Stranice usluga, galerija, kontakt.",
        "LocalBusiness sa ocenama i FAQPage JSON-LD.",
        "Deploy na GitHub Pages iz Actions-a.",
      ],
      en: [
        "Service pages, gallery, contact.",
        "LocalBusiness with ratings and FAQPage JSON-LD.",
        "Deploy to GitHub Pages from Actions.",
      ],
    },
    hard: {
      sr: "Sajt je nastao rebrendiranjem starijeg koda, pa je najveći posao bio čišćenje: svaki og:url, naslov i mail endpoint koji je ostao od prethodnog brenda.",
      en: "The site came from rebranding older code, so the biggest job was cleanup: every og:url, title and mail endpoint left over from the previous brand.",
    },
    stack: ["Nuxt 4", "Vue 3", "GitHub Pages"],
    links: { live: "https://vuk-studio.rs" },
    accent: "violet",
  },
  {
    slug: "olimp",
    seoTitle: {
      sr: "SC Olimp: održavanje sajta sportskog centra",
      en: "SC Olimp: sports centre website maintenance",
    },
    logo: "/images/clients/olimp.webp",
    description: {
      sr: "Studija slučaja: održavanje WordPress sajta i IT sistema javnog sportskog centra Olimp. Ažuriranja, bezbednost, backup i podrška zaposlenima.",
      en: "Case study: maintaining the WordPress site and IT systems of the Olimp public sports centre. Updates, security, backups and support for the staff.",
    },
    gallery: [
      "/images/projects/gallery/olimp-2.webp",
      "/images/projects/gallery/olimp-m.webp",
    ],
    team: { sr: "Spoljni saradnik", en: "External associate" },
    scale: {
      sr: "Javni sportski centar, ćirilica i latinica",
      en: "Public sports centre, Cyrillic and Latin script",
    },
    impact: {
      sr: ["Sajt i sistem javne ustanove ostaju ažurni, bezbedni i sa backup-om, a zaposleni imaju koga da pozovu."],
      en: ["The public institution's site and systems stay updated, secure and backed up, and the staff have someone to call."],
    },
    image: "/images/projects/olimp.webp",
    title: "Sportski centar Olimp",
    client: "SC Olimp, Zvezdara",
    kind: "maintenance",
    featured: false,
    year: "2025 – 2026",
    role: {
      sr: "Održavanje sistema (spoljni saradnik)",
      en: "System maintenance (external associate)",
    },
    tagline: {
      sr: "Održavanje sajta i sistema javnog sportskog centra.",
      en: "Maintaining the website and systems of a public sports centre.",
    },
    summary: {
      sr: "Nisam radio dizajn. Kao spoljni saradnik održavam WordPress sajt i informatički sistem centra: ažuriranja, bezbednost, backup, sitne izmene sadržaja i pomoć zaposlenima.",
      en: "I did not do the design. As an external associate I maintain the centre's WordPress site and IT systems: updates, security, backups, small content changes and staff support.",
    },
    did: {
      sr: [
        "Ažuriranja i bezbednosne zakrpe.",
        "Backup i oporavak.",
        "Podrška zaposlenima.",
      ],
      en: ["Updates and security patches.", "Backup and recovery.", "Staff support."],
    },
    hard: {
      sr: "Javna ustanova ima stroga pravila o javnim nabavkama i objavama, pa svaka izmena prolazi proveru pre nego što ode na sajt.",
      en: "A public institution has strict rules about procurement notices and publishing, so every change is checked before it goes live.",
    },
    stack: ["WordPress", "PHP", "MySQL"],
    links: { live: "https://www.scolimp.rs" },
    accent: "cyan",
  },
  {
    slug: "job-application-tracker",
    description: {
      sr: "Studija slučaja: Kanban tabla za praćenje prijava za posao u Next.js 16. Server Actions, MongoDB, Better Auth i optimistično prevlačenje kartica.",
      en: "Case study: a Kanban board for tracking job applications in Next.js 16. Server Actions, MongoDB, Better Auth and optimistic drag and drop between columns.",
    },
    gallery: [
      "/images/projects/gallery/job-application-tracker-1.webp",
      "/images/projects/gallery/job-application-tracker-2.webp",
      "/images/projects/gallery/job-application-tracker-3.webp",
      "/images/projects/gallery/job-application-tracker-m.webp",
    ],
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "82 fajla, ~5.8k linija, auth, baza, drag and drop",
      en: "82 files, ~5.8k lines, auth, database, drag and drop",
    },
    impact: {
      sr: [
        "Najnoviji Next.js 16 (cacheComponents, Server Actions) u pravoj aplikaciji, ne u tutorijalu.",
        "Bezbednost od početka: Zod na svakoj akciji, provera vlasnika zapisa, CSP i HSTS.",
      ],
      en: [
        "The latest Next.js 16 (cacheComponents, Server Actions) in a real app, not a tutorial.",
        "Security from the start: Zod on every action, record-owner checks, CSP and HSTS.",
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
      sr: "Next.js 16 sa Server Actions kao jedinim putem za upis, MongoDB kroz Mongoose, Better Auth sa email verifikacijom i Google prijavom, dnd-kit za prevlačenje. Svaka izmena je optimistična i vraća se unazad ako server odbije.",
      en: "Next.js 16 with Server Actions as the only write path, MongoDB through Mongoose, Better Auth with email verification and Google sign-in, dnd-kit for dragging. Every change is optimistic and rolls back if the server rejects it.",
    },
    did: {
      sr: [
        "Prevlačenje između kolona i unutar kolone, sa pregledom mesta gde kartica pada.",
        "Kolone po želji korisnika, statistika raspodele po fazama, tagovi, beleške, plata.",
        "Zod validacija svake server akcije i env promenljivih; CSP i HSTS zaglavlja; svaka izmena proverava vlasnika zapisa.",
      ],
      en: [
        "Drag between and within columns, with a preview of where the card lands.",
        "User-defined columns, stage distribution stats, tags, notes, salary.",
        "Zod validation on every server action and env variable; CSP and HSTS headers; every write checks the record owner.",
      ],
    },
    hard: {
      sr: "Optimistično prevlačenje preko više kolona: ako server odbije, tabla mora da se vrati tačno na prethodno stanje, a ne na neku sredinu. Rešenje je snimak stanja pre akcije i vraćanje celog snimka, ne pojedinačnih kartica.",
      en: "Optimistic drag across several columns: if the server rejects, the board must return to exactly the previous state, not some middle ground. The fix is a snapshot before the action and restoring the whole snapshot, not individual cards.",
    },
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "MongoDB",
      "Better Auth",
      "dnd-kit",
      "Tailwind 4",
    ],
    links: {
      live: "https://job-application-tracker-two-rust.vercel.app",
      repo: "https://github.com/sepicn/job-application-tracker",
    },
    accent: "cyan",
  },
  {
    slug: "gymai",
    description: {
      sr: "Studija slučaja: GymAI pravi nedeljni plan treninga iz šest pitanja. React 19, Express 5, Prisma na Neon bazi i AI odgovor proveren Zod šemom.",
      en: "Case study: GymAI writes a weekly training plan from six questions. React 19, Express 5, Prisma on Neon Postgres and an AI reply validated with Zod.",
    },
    image: "/images/projects/gymai.webp",
    gallery: [
      "/images/projects/gallery/gymai-onboarding.webp",
      "/images/projects/gallery/gymai-plan.webp",
      "/images/projects/gallery/gymai-plan-day.webp",
    ],
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "React + Express monorepo, 44 testa, AI integracija",
      en: "React + Express monorepo, 44 tests, AI integration",
    },
    impact: {
      sr: [
        "Rad sa LLM-ovima u produkciji: validacija izlaza, fallback modeli, rate limit.",
      ],
      en: [
        "Working with LLMs in production: output validation, fallback models, rate limits.",
      ],
    },
    title: "GymAI",
    kind: "personal",
    featured: false,
    year: "2026",
    role: { sr: "Sve", en: "Everything" },
    tagline: {
      sr: "Nedeljni plan treninga koji AI napravi iz šest pitanja.",
      en: "A weekly training plan an AI writes from six questions.",
    },
    summary: {
      sr: "React 19 sa Vite-om na frontu, Express 5 API, Prisma na Neon Postgres bazi, Neon Auth za prijavu. AI ide preko OpenRouter-a sa listom rezervnih modela; odgovor se čisti i proverava Zod šemom pre nego što se sačuva. 44 Vitest testa na serveru.",
      en: "React 19 with Vite on the front, an Express 5 API, Prisma on Neon Postgres, Neon Auth for sign-in. AI goes through OpenRouter with a list of fallback models; the reply is cleaned and checked with a Zod schema before it is saved. 44 Vitest tests on the server.",
    },
    did: {
      sr: [
        "Onboarding u šest koraka i verzionisani planovi.",
        "Limit od 10 generisanja na sat po korisniku.",
        "Fallback kroz više modela sa ponovnim pokušajima.",
      ],
      en: [
        "Six-step onboarding and versioned plans.",
        "A limit of 10 generations per hour per user.",
        "Fallback across several models with retries.",
      ],
    },
    hard: {
      sr: "Modeli vraćaju JSON sa viškom teksta, zarezima na kraju ili poljima koja ne postoje. Parser prvo izvuče JSON blok, pa Zod odbaci sve što ne odgovara šemi; tek onda plan ide u bazu.",
      en: "Models return JSON with extra text, trailing commas or fields that do not exist. The parser extracts the JSON block first, then Zod rejects anything off-schema; only then does the plan go into the database.",
    },
    stack: ["React 19", "Vite", "Express 5", "Prisma", "Neon", "OpenRouter", "Vitest"],
    links: { repo: "https://github.com/sepicn/gym-planner" },
    accent: "sun",
  },
  {
    slug: "launchhub",
    description: {
      sr: "Studija slučaja: LaunchHub, mesto za prijavu i glasanje za nove proizvode u stilu Product Hunt-a. Next.js 16, Clerk, Neon Postgres i Drizzle.",
      en: "Case study: LaunchHub, a Product Hunt style place to submit and vote on new products. Next.js 16, Clerk organizations, Neon Postgres and Drizzle ORM.",
    },
    gallery: [
      "/images/projects/gallery/launchhub-2.webp",
      "/images/projects/gallery/launchhub-m.webp",
    ],
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "64 fajla, ~2.6k linija, Clerk organizacije, Postgres",
      en: "64 files, ~2.6k lines, Clerk organizations, Postgres",
    },
    impact: {
      sr: ["Full-stack Next.js sa pravom autentikacijom i admin tokom."],
      en: ["Full-stack Next.js with real auth and an admin flow."],
    },
    image: "/images/projects/launchhub.webp",
    title: "LaunchHub",
    kind: "personal",
    featured: false,
    year: "2025",
    role: { sr: "Sve", en: "Everything" },
    tagline: {
      sr: "Mesto gde se prijavljuju novi proizvodi, glasa i odobrava, u stilu Product Hunt-a.",
      en: "A place to submit new products, vote and approve, Product Hunt style.",
    },
    summary: {
      sr: "Next.js 16 sa Server Components i Server Actions, Clerk sa organizacijama za prijavu, Neon Postgres kroz Drizzle, shadcn/ui. Admin odobrava ili odbija prijave, posetioci glasaju.",
      en: "Next.js 16 with Server Components and Server Actions, Clerk with organizations for sign-in, Neon Postgres through Drizzle, shadcn/ui. An admin approves or rejects submissions, visitors vote.",
    },
    did: {
      sr: [
        "Prijava proizvoda sa Zod validacijom i react-hook-form.",
        "Pretraga i sortiranje na /explore.",
        "Admin panel sa statistikom.",
      ],
      en: [
        "Product submission with Zod validation and react-hook-form.",
        "Search and sort on /explore.",
        "Admin panel with stats.",
      ],
    },
    hard: {
      sr: "Clerk organizacije se ne prave same za nove korisnike. Middleware (u Next 16 zove se proxy) pravi ličnu organizaciju pri prvom ulasku, pa svaki proizvod ima vlasnika i organizaciju od početka.",
      en: "Clerk organizations are not created automatically for new users. The middleware (called proxy in Next 16) creates a personal organization on first sign-in, so every product has an owner and an organization from the start.",
    },
    stack: ["Next.js 16", "Clerk", "Neon", "Drizzle", "shadcn/ui"],
    links: {
      live: "https://launchhub-five.vercel.app",
      repo: "https://github.com/sepicn/launchhub",
    },
    accent: "pink",
  },
  {
    slug: "echo",
    description: {
      sr: "Studija slučaja: Echo, anonimna soba za dvoje koja se sama briše posle deset minuta. Next.js 15, Elysia API, Upstash Redis i Realtime događaji.",
      en: "Case study: Echo, an anonymous room for two that deletes itself after ten minutes. Next.js 15, an Elysia API, Upstash Redis and realtime events.",
    },
    team: { sr: "Sam", en: "Solo" },
    scale: { sr: "Realtime chat, 28 fajlova", en: "Realtime chat, 28 files" },
    impact: {
      sr: ["Realtime događaji i TTL podaci bez sopstvenog servera."],
      en: ["Realtime events and TTL data without running my own server."],
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
      sr: "Next.js 15 sa Elysia API-jem montiranim u Next rutu i Eden Treaty klijentom za tipizirane pozive. Upstash Redis sa TTL-om čuva poruke, Upstash Realtime šalje događaje: poruka, kucanje, pročitano, uništi. Terminal izgled, JetBrains Mono.",
      en: "Next.js 15 with an Elysia API mounted in a Next route and an Eden Treaty client for typed calls. Upstash Redis with TTL stores messages, Upstash Realtime pushes events: message, typing, read, destroy. Terminal look, JetBrains Mono.",
    },
    did: {
      sr: [
        "Sobe sa odbrojavanjem i ručnim uništenjem.",
        "Indikator kucanja, potvrde čitanja, zvuk.",
        "Pristup sobi kroz httpOnly kolačić i middleware.",
      ],
      en: [
        "Rooms with a countdown and manual destroy.",
        "Typing indicator, read receipts, sound.",
        "Room access through an httpOnly cookie and middleware.",
      ],
    },
    hard: {
      sr: "Kada soba istekne, obe strane moraju da saznaju u istom trenutku, čak i ako je jedna strana bila offline. Redis TTL briše podatke, a poseban „destroy“ događaj i provera na povratku obaveštavaju klijenta.",
      en: "When a room expires, both sides must find out at the same moment, even if one side was offline. Redis TTL removes the data, and a separate destroy event plus a check on reconnect informs the client.",
    },
    stack: [
      "Next.js 15",
      "Elysia",
      "Upstash Redis",
      "Upstash Realtime",
      "TanStack Query",
    ],
    links: { repo: "https://github.com/sepicn/echo" },
    accent: "violet",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const clientProjects = projects.filter((p) => p.kind !== "personal");
export const personalProjects = projects.filter((p) => p.kind === "personal");
