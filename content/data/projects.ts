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
      sr: "IT Expert: plaćanje karticom i pretplate",
      en: "IT Expert: card billing for an agency platform",
    },
    logo: "/images/clients/itexpert.webp",
    description: {
      sr: "Studija slučaja: u platformi agencije IT Expert (Nuxt 4, Laravel 12) napravio sam sačuvane kartice, automatsku obnovu pretplata i predračune, sa 133 testa.",
      en: "Case study: in the IT Expert agency platform (Nuxt 4, Laravel 12) I built saved cards, automatic subscription renewal and pro-forma invoices, with 133 tests.",
    },
    gallery: [
      "/images/projects/gallery/itexpert-2.webp",
      "/images/projects/gallery/itexpert-m.webp",
    ],
    team: {
      sr: "Dva developera, zajednički brend; osnovu platforme je napravio Đorđe Stojanović",
      en: "Two developers, shared brand; the platform base was built by Đorđe Stojanović",
    },
    scale: {
      sr: "Nuxt 4 + Laravel 12, 5 jezika; deo za naplatu: 91 fajl, 133 testa",
      en: "Nuxt 4 + Laravel 12, 5 languages; billing work: 91 files, 133 tests",
    },
    impact: {
      sr: [
        "Pretplate se obnavljaju same: kupac unese karticu jednom, a ne svakog meseca iznova.",
        "Agencija izdaje predračune iz iste platforme i prima uplatu karticom na njih.",
        "Svaki put kojim ide novac pokriven je testom, pa se naplata može menjati bez straha da će pući u produkciji.",
      ],
      en: [
        "Subscriptions renew on their own: a customer enters a card once, not every month.",
        "The agency issues pro-forma invoices from the same platform and takes card payment on them.",
        "Every path money takes is covered by a test, so billing can change without fear of breaking in production.",
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
      sr: "Platforma web agencije: portali, pretplate, plaćanje karticom, predračuni.",
      en: "A web agency platform: portals, subscriptions, card payments, pro-forma invoices.",
    },
    summary: {
      sr: "IT Expert je brend pod kojim Đorđe Stojanović i ja radimo freelance projekte. Ima dva dela: javni sajt itexpert.rs i platformu na Nuxt 4 i Laravel 12 sa portalima za klijente, korisnike i zaposlene, prodavnicom, tiketima i editorom dokumenata, na pet jezika. Osnovu platforme je napravio Đorđe. Moj prvi deo, u martu 2026, bio je na javnom sajtu: SEO, alat za proveru brzine sajta i kontakt forma. Drugi, u septembru 2026, je ceo tok naplate. Pre toga se pretplata kupovala jednom i posle isticala, predračuna nije bilo, a kartica se nije mogla sačuvati. Gotova naplata iz projekta Medical Time bila je vezana za medicinski domen, pa sam je pisao iznova nad klijentima, pretplatama i proizvodima agencije. Rezultat je jedan commit od 91 fajla sa 133 automatska testa.",
      en: "IT Expert is the brand Đorđe Stojanović and I use for freelance projects. It has two parts: the public site itexpert.rs and a Nuxt 4 and Laravel 12 platform with portals for clients, users and staff, a shop, tickets and a document editor, in five languages. Đorđe built the platform base. My first piece, in March 2026, was on the public site: SEO, a site speed check tool and the contact form. The second, in September 2026, is the whole billing flow. Before it, a subscription was bought once and then expired, there were no pro-forma invoices, and a card could not be saved. The billing code in the Medical Time project was tied to the medical domain, so I rewrote it around the agency's clients, subscriptions and products. The result is one commit across 91 files with 133 automated tests.",
    },
    did: {
      sr: [
        "Sačuvane kartice preko Raiffeisen banke: kupac jednom unese karticu, a sledeće naplate idu bez njega, preko bankinog protokola za plaćanja koja pokreće trgovac.",
        "Automatska obnova pretplata: naplata dan ili dva pre isteka, novi pokušaj posle neuspeha i mejl kupcu na pet jezika kada kartica istekne ili naplata ne prođe.",
        "Predračuni od nule: numeracija, PDF kroz postojeći editor dokumenata i plaćanje karticom. Status „plaćeno“ se izvodi iz uplata, a ne čuva kao posebna kolona koja bi mogla da se razide sa stvarnim stanjem.",
        "Jedan predračun može da ima najviše jedan pokušaj plaćanja koji čeka odgovor banke. Dva brza klika na „Plati“ ne mogu da daju dve naplate: drugi pokušaj odbija unique indeks u bazi, pre nego što išta ode banci.",
        "Ekrani u Nuxt-u za sačuvane kartice, istoriju uplata, pretplate i predračune, za klijenta, korisnika i admina, sa prevodima za sr, en, ru, de i tr.",
        "133 testa: 121 PHPUnit test za kartice, obnovu, predračune i potpise banke, plus 12 Vitest testova na frontu.",
        "Na javnom sajtu: meta i Open Graph podaci, alat koji preko Google PageSpeed Insights API-ja prikazuje ocene performansi, pristupačnosti i SEO-a za bilo koji sajt, kontakt forma sa validacijom i GTM koji se učitava tek posle pristanka na kolačiće.",
      ],
      en: [
        "Saved cards through Raiffeisen bank: a customer enters a card once, and later charges run without them, over the bank's protocol for merchant-initiated payments.",
        "Automatic subscription renewal: a charge a day or two before expiry, a retry after a failure, and an email to the customer in five languages when a card expires or a charge fails.",
        "Pro-forma invoices from scratch: numbering, PDF through the existing document editor and card payment. The paid status is derived from payments rather than stored in a separate column that could drift from reality.",
        "A pro-forma invoice can have at most one payment attempt waiting on the bank. Two quick clicks on Pay cannot produce two charges: a unique index rejects the second attempt before anything reaches the bank.",
        "Nuxt screens for saved cards, payment history, subscriptions and pro-forma invoices, for the client, user and admin, translated into sr, en, ru, de and tr.",
        "133 tests: 121 PHPUnit tests for cards, renewal, invoices and bank signatures, plus 12 Vitest tests on the front end.",
        "On the public site: meta and Open Graph tags, a tool that shows performance, accessibility and SEO scores for any site through the Google PageSpeed Insights API, a validated contact form, and GTM that loads only after cookie consent.",
      ],
    },
    hard: {
      sr: "Obnova ne sme da naplati isti period dvaput. Zaštita od ponovljene poruke banke tu ne pomaže: ako se zakazani zadatak pokrene dvaput, svaka njegova naplata je nova i sasvim ispravna poruka. Zato svaki ciklus naplate ima svoj ključ sa unique indeksom, pa drugi pokušaj odbija baza, a ne pažnja koda. Druga zamka je bio datum. Naplata ide dan ranije, i kad bi se novi period računao od trenutka naplate, kupac bi svakim ciklusom gubio po dan. Period se zato uvek produžava od kraja prethodnog.",
      en: "Renewal must never charge the same period twice. Protection against a repeated bank message does not help here: if the scheduled job runs twice, each of its charges is a new and perfectly valid message. So every billing cycle has its own key with a unique index, and the database, not careful code, rejects the second attempt. The other trap was the date. The charge runs a day early, and if the new period started at the moment of charging, the customer would lose a day every cycle. So the period always extends from the end of the previous one.",
    },
    stack: [
      "Nuxt 4",
      "Laravel 12",
      "MySQL",
      "@nuxtjs/i18n",
      "Raiffeisen",
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
      sr: "Studija slučaja: sajt muzičkog i video studija Vuk u Beogradu. Istraživanje ključnih reči, stranice usluga u Nuxt 4 i LocalBusiness podaci za lokalnu pretragu.",
      en: "Case study: the site of Vuk, a Belgrade music and video studio. Keyword research, Nuxt 4 service pages and LocalBusiness structured data for local search.",
    },
    gallery: [
      "/images/projects/gallery/vuk-studio-2.webp",
      "/images/projects/gallery/vuk-studio-m.webp",
    ],
    team: {
      sr: "Dva developera: ja brief, SEO i stranice usluga, Đorđe Stojanović ostatak i deploy",
      en: "Two developers: me on the brief, SEO and service pages, Đorđe Stojanović on the rest and deploy",
    },
    scale: {
      sr: "Statičan Nuxt sajt, 6 stranica, brief u 7 delova, 41 fajl u mom commit-u",
      en: "Static Nuxt site, 6 pages, a 7-part brief, 41 files in my commit",
    },
    impact: {
      sr: [
        "Studio je od prvog dana spreman za lokalnu pretragu: svaka stranica cilja svoju grupu pretraga, sa naslovom, opisom i strukturiranim podacima.",
        "Pitanja „koliko košta“ dobijaju iskren odgovor u FAQ-u umesto izmišljenog cenovnika.",
        "Glavni deo rebrendinga završen je u jednom danu, jer je brief unapred odgovorio na pitanja o brendu, dizajnu i ključnim rečima.",
      ],
      en: [
        "The studio was ready for local search from day one: each page targets its own group of searches, with a title, description and structured data.",
        "Searches about price get an honest FAQ answer instead of a made-up price list.",
        "The core of the rebrand was done in one day, because the brief answered the brand, design and keyword questions up front.",
      ],
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
      sr: "Muzički i video studio iz Beograda trebao je sajt za ljude koji žele da snime pesmu ili spot. Nismo krenuli od nule: osnova je bio naš Nuxt 4 sajt za firmu koja se bavi krečenjem, sa istom arhitekturom i istim načinom učitavanja CSS-a. Moj deo, u junu 2026, bio je da postavim ceo rebrending i uradim prvi talas stranica. Napisao sam brief u sedam delova (brend i podaci o firmi, arhitektura, dizajn, SEO i ključne reči, stranice, provera pre objave) i u istom commit-u napravio stranice Muzički studio i Video produkcija i novi izgled početne. Đorđe Stojanović je zatim uradio galeriju, kontakt, O nama, fontove, slike i deploy. Sajt se generiše u statične stranice, a kontakt ide preko poziva, WhatsApp-a i Viber-a, bez forme.",
      en: "A Belgrade music and video studio needed a site for people who want to record a song or shoot a video. We did not start from zero: the base was our Nuxt 4 site for a house-painting business, with the same architecture and the same way of loading CSS. My part, in June 2026, was to set up the whole rebrand and build the first wave of pages. I wrote a seven-part brief (brand and business facts, architecture, design, SEO and keywords, pages, pre-launch checks) and in the same commit built the Music studio and Video production pages and the new home page layout. Đorđe Stojanović then did the gallery, contact, About page, fonts, images and deploy. The site is generated as static pages, and contact goes by call, WhatsApp and Viber, with no form.",
    },
    did: {
      sr: [
        "Istraživanje ključnih reči iz stvarnih srpskih pretraga, oglasa i sajtova konkurentskih studija, podeljeno u grupe: brend, snimanje pesme, video produkcija i lokalne odrednice kao Voždovac i Banjica.",
        "Plan po stranici: glavna fraza, H1, naslov od 50 do 60 karaktera i opis od 150 do 160 karaktera za svih šest stranica.",
        "Stranice Muzički studio i Video produkcija, svaka sa svojim naslovom, opisom i FAQ sekcijom sa pitanjima koja ljudi zaista kucaju, kao „Koliko košta snimanje pesme?“.",
        "LocalBusiness JSON-LD sa adresom, radnim vremenom i ocenama; FAQPage podaci za kontakt stranicu opisani u briefu.",
        "Tamna tema sa jednim električno plavim akcentom; zlatna iz logotipa ostaje samo u logotipu.",
        "Sitemap i robots.txt prebačeni sa starog domena na vuk-studio.rs, sa novim rutama i prioritetima.",
      ],
      en: [
        "Keyword research from real Serbian searches, classifieds and competitor studio sites, grouped into brand, song recording, video production and local modifiers such as Voždovac and Banjica.",
        "A per-page plan: primary phrase, H1, a 50 to 60 character title and a 150 to 160 character description for all six pages.",
        "The Music studio and Video production pages, each with its own title, description and an FAQ with questions people actually type, such as how much it costs to record a song.",
        "LocalBusiness JSON-LD with address, opening hours and ratings; FAQPage data for the contact page specified in the brief.",
        "A dark theme with a single electric blue accent; the gold from the logo stays inside the logo only.",
        "Sitemap and robots.txt moved from the old domain to vuk-studio.rs, with the new routes and priorities.",
      ],
    },
    hard: {
      sr: "Ljudi najčešće traže „snimanje pesme cena“, a studiji skoro nikad ne objavljuju cenovnik. Izmišljena cena bi donela klikove i razočarane pozive. Rešenje je bilo da ta fraza dobije pravo pitanje u FAQ-u sa iskrenim odgovorom (cena zavisi od pesme, javite se za okvirnu), bez brojeva koje studio nije potvrdio. Drugi deo posla bilo je čišćenje: kod je došao od firme za krečenje, pa su domen, naslovi, sitemap i robots morali da se prebace do poslednjeg URL-a.",
      en: "People most often search for the price of recording a song, and studios almost never publish a price list. A made-up price would bring clicks and disappointed calls. The fix was to give that phrase a real FAQ question with an honest answer (the price depends on the song, get in touch for an estimate), with no numbers the studio had not confirmed. The other part of the job was cleanup: the code came from a house-painting business, so the domain, titles, sitemap and robots had to move over down to the last URL.",
    },
    stack: ["Nuxt 4", "Vue 3", "JSON-LD", "GitHub Pages"],
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
      sr: [
        "Sajt i sistem javne ustanove ostaju ažurni, bezbedni i sa backup-om, a zaposleni imaju koga da pozovu.",
      ],
      en: [
        "The public institution's site and systems stay updated, secure and backed up, and the staff have someone to call.",
      ],
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
    seoTitle: {
      sr: "GymAI: AI plan treninga, React i Express",
      en: "GymAI: AI training planner, React + Express",
    },
    description: {
      sr: "Studija slučaja: GymAI od šest odgovora pravi nedeljni plan treninga. React 19, Express 5, Prisma na Neon bazi, AI izlaz proveren Zod-om i 44 testa.",
      en: "Case study: GymAI turns six answers into a weekly training plan. React 19, Express 5, Prisma on Neon Postgres, AI output checked with Zod, and 44 tests.",
    },
    image: "/images/projects/gymai.webp",
    gallery: [
      "/images/projects/gallery/gymai-onboarding.webp",
      "/images/projects/gallery/gymai-plan.webp",
      "/images/projects/gallery/gymai-plan-day.webp",
    ],
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "21 commit, React + Express, 44 testa, početni bundle 1.183 → 545 kB",
      en: "21 commits, React + Express, 44 tests, initial bundle 1,183 → 545 kB",
    },
    impact: {
      sr: [
        "Rad sa LLM-om kao sa nepouzdanim izvorom podataka: svaki odgovor prolazi šemu pre baze, a kad jedan model padne, uskače sledeći.",
        "API koji ne veruje klijentu: korisnik se izvodi iz potpisanog tokena, nikad iz tela zahteva.",
        "Performanse merene, ne pretpostavljene: početno preuzimanje manje za 54%.",
      ],
      en: [
        "Treating an LLM as an unreliable data source: every reply passes a schema before the database, and when one model fails the next one steps in.",
        "An API that does not trust the client: the user comes from a signed token, never from the request body.",
        "Performance measured, not assumed: the initial download cut by 54%.",
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
      sr: "Aplikaciju sam napravio sam, od praznog repoa do dokumentacije, u 21 commit-u od avgusta do septembra 2026. Korisnik odgovori na šest pitanja (cilj, iskustvo, broj dana, dužina treninga, oprema, podela treninga) i po želji opiše povredu. Server od toga sastavi prompt, a model preko OpenRouter-a vrati ceo nedeljni program: vežbe, serije, ponavljanja, pauze, RPE, savete za tehniku, zamenske vežbe i pravila progresije. Front je React 19 sa Vite-om i Tailwind-om, API je Express 5, podaci su u Neon Postgres bazi kroz Prisma-u, a prijava ide preko Neon Auth-a. Svako novo generisanje čuva se kao nova verzija, pa se korisnik uvek može vratiti na stari plan.",
      en: "I built it alone, from an empty repo to the docs, in 21 commits from August to September 2026. The user answers six questions (goal, experience, days per week, session length, equipment, training split) and can describe an injury. The server turns that into a prompt, and a model on OpenRouter returns a full weekly program: exercises, sets, reps, rest, RPE, form cues, swap-in alternatives and progression rules. The front end is React 19 with Vite and Tailwind, the API is Express 5, data lives in Neon Postgres through Prisma, and sign-in runs on Neon Auth. Every regeneration is stored as a new version, so the user can always go back to an old plan.",
    },
    did: {
      sr: [
        "Onboarding u šest koraka koji služi i kao forma za izmenu, popunjena trenutnim odgovorima.",
        "Generisanje kroz listu modela, po dva pokušaja sa pauzom, uz timeout od 90 sekundi; ako nijedan plan nema tačan broj dana, vraća se najbliži ispravan umesto greške.",
        "Zod proverava i ulaz korisnika i izlaz modela, pa ništa neispravno ne stiže do baze ni do ekrana.",
        "Server proverava potpis Neon Auth tokena preko JWKS-a i svaki upit vezuje za korisnika iz tokena; tuđi plan vraća običan 404.",
        "Istorija planova i zamenske vežbe koje je model već predlagao, a nisu se prikazivale.",
        "Limit od 10 generisanja na sat po korisniku i globalni limit iznad njega, helmet zaglavlja, CORS samo za poznate adrese.",
        "44 Vitest testa za šeme, proveru tokena i parser odgovora modela; mock-ovan je samo izvor ključeva, a potpis i rok važenja proveravaju se stvarno.",
        "Početno preuzimanje sa 1.183 kB na 545 kB: auth UI se učitava tek kada zatreba.",
      ],
      en: [
        "A six-step onboarding that doubles as the edit form, pre-filled with the current answers.",
        "Generation across a list of models, two attempts each with backoff and a 90-second timeout; if no plan has the exact day count, the closest valid one is returned instead of an error.",
        "Zod checks both the user's input and the model's output, so nothing malformed reaches the database or the screen.",
        "The server verifies the Neon Auth token signature against the JWKS and scopes every query to the token's user; someone else's plan returns a plain 404.",
        "Plan history, and the swap-in exercises the model was already producing but the UI never showed.",
        "A limit of 10 generations per hour per user plus a global cap above it, helmet headers, CORS only for known origins.",
        "44 Vitest tests over the schemas, token checks and the model reply parser; only the key source is mocked, so signature and expiry checks run for real.",
        "Initial download from 1,183 kB to 545 kB: the auth UI loads only when it is needed.",
      ],
    },
    hard: {
      sr: "Modeli vraćaju JSON sa viškom teksta, markdown ogradama, zarezima na kraju ili pogrešnim brojem dana. Parser prvo izvuče JSON blok, Zod odbaci sve što ne odgovara šemi, a provera broja dana odluči da li se ide na sledeći pokušaj. Bundle je bio druga lekcija. Lazy loading ruta uštedeo je samo 19 kB; stvarna težina bila su tri odmah učitana importa Neon auth UI-ja. Kad se sesija počela čitati kroz useSyncExternalStore, a UI provider montirati samo za prijavljene i za /auth rute, početno preuzimanje je palo za 54%.",
      en: "Models return JSON with extra text, markdown fences, trailing commas or the wrong number of days. The parser pulls out the JSON block first, Zod rejects anything off-schema, and a day count check decides whether to move on to the next attempt. The bundle was the second lesson. Route-level lazy loading saved only 19 kB; the real weight was three eager imports of the Neon auth UI. Once the session was read through useSyncExternalStore and the UI provider mounted only for signed-in users and /auth routes, the initial download dropped by 54%.",
    },
    stack: [
      "React 19",
      "Vite",
      "Tailwind 4",
      "Express 5",
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
      sr: "LaunchHub: Next.js 16 platforma za proizvode",
      en: "LaunchHub: Next.js 16 product launch board",
    },
    description: {
      sr: "Studija slučaja: LaunchHub, mesto za prijavu i glasanje za nove proizvode. Next.js 16 sa keširanim komponentama, Clerk organizacije, Neon Postgres i Drizzle.",
      en: "Case study: LaunchHub, a place to submit and vote on new products. Next.js 16 with cached components, Clerk organizations, Neon Postgres and Drizzle ORM.",
    },
    gallery: [
      "/images/projects/gallery/launchhub-2.webp",
      "/images/projects/gallery/launchhub-m.webp",
    ],
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "22 commit-a, 64 fajla, ~2.6k linija, Clerk organizacije, Postgres",
      en: "22 commits, 64 files, ~2.6k lines, Clerk organizations, Postgres",
    },
    impact: {
      sr: [
        "Full-stack Next.js 16 sa pravom prijavom, bazom i tokom odobravanja, ne samo front.",
        "Keširanje po komponentama: statični delovi stranice stižu odmah, a samo ono što zavisi od korisnika čeka server.",
      ],
      en: [
        "Full-stack Next.js 16 with real sign-in, a database and an approval flow, not just a front end.",
        "Per-component caching: static parts of a page arrive at once, and only what depends on the user waits for the server.",
      ],
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
      sr: "Hteo sam da probam novi model keširanja u Next.js 16 na aplikaciji koja ima i javni i zaštićeni deo. LaunchHub je napravljen za sedam dana, u 22 commit-a od 22. do 28. decembra 2025, uz jednu dopunu u septembru 2026. Autor prijavi proizvod sa opisom, linkom i tagovima; proizvod čeka admina, a posle odobrenja se pojavljuje na početnoj i na /explore, gde posetioci glasaju. Stack je Next.js 16 sa Server Components i Server Actions, Clerk za prijavu i organizacije, Neon Postgres kroz Drizzle ORM i shadcn/ui komponente. Uključen je cacheComponents, pa su liste i stranice proizvoda keširane, a dinamični delovi stižu kroz Suspense sa skeletonima.",
      en: "I wanted to try the new caching model in Next.js 16 on an app with both a public and a protected side. LaunchHub was built in seven days, 22 commits from 22 to 28 December 2025, plus one update in September 2026. An author submits a product with a description, link and tags; it waits for an admin, and once approved it shows up on the home page and /explore, where visitors vote. The stack is Next.js 16 with Server Components and Server Actions, Clerk for sign-in and organizations, Neon Postgres through Drizzle ORM, and shadcn/ui. cacheComponents is on, so product lists and pages are cached, and the dynamic parts stream in through Suspense with skeletons.",
    },
    did: {
      sr: [
        "Prijava proizvoda sa react-hook-form i Zod validacijom: http(s) link, ograničena dužina opisa, najviše 10 tagova.",
        "Drizzle šema sa jedinstvenim slug-om i indeksima po statusu i organizaciji; statusi čeka, odobren, odbijen.",
        "„use cache“ na listama i stranicama proizvoda, a revalidatePath posle glasanja i admin akcija da keš ne pokazuje staro stanje.",
        "Glasanje sa useOptimistic: broj se menja odmah, a server ga potvrdi ili vrati.",
        "Pretraga po imenu i sortiranje na /explore.",
        "Početna sa istaknutim proizvodima iz keša i listom nedavno objavljenih koja stiže kroz Suspense, pa hero sekcija ne čeka bazu.",
        "Admin panel sa statistikom, odobravanjem, odbijanjem i brisanjem; svaka akcija proverava admin ulogu na serveru.",
        "Javna stranica prikazuje samo odobrene proizvode i ime autora umesto mejla; sigurnosna zaglavlja i ažurirane zavisnosti.",
      ],
      en: [
        "Product submission with react-hook-form and Zod: an http(s) link, a length limit on the description, at most 10 tags.",
        "A Drizzle schema with a unique slug and indexes on status and organization; statuses pending, approved, rejected.",
        "“use cache” on product lists and pages, plus revalidatePath after votes and admin actions so the cache never shows stale state.",
        "Voting with useOptimistic: the count changes at once, and the server confirms or rolls it back.",
        "Search by name and sorting on /explore.",
        "A home page with featured products served from cache and a recently launched list that streams in through Suspense, so the hero never waits for the database.",
        "An admin panel with stats, approve, reject and delete; every action checks the admin role on the server.",
        "The public page shows only approved products and the author's display name instead of an email; security headers and updated dependencies.",
      ],
    },
    hard: {
      sr: "Clerk organizacije se ne prave same za nove korisnike, a svaki proizvod mora da ima organizaciju. Proxy (tako se middleware zove u Next 16) pri prvom ulasku proveri članstva i, ako ih nema, napravi ličnu organizaciju sa imenom korisnika. Druga zamka je bilo keširanje: kad je cela stranica keširana, dugme za nalog u zaglavlju ne sme da uđe u keš. Zaglavlje zato drži korisnički deo u posebnoj Suspense granici, pa ostatak stranice ostaje statičan.",
      en: "Clerk organizations are not created automatically for new users, and every product needs one. The proxy (what middleware is called in Next 16) checks memberships on first sign-in and, if there are none, creates a personal organization named after the user. The second trap was caching: when the whole page is cached, the account button in the header must stay out of the cache. So the header keeps the user part in its own Suspense boundary, and the rest of the page stays static.",
    },
    stack: ["Next.js 16", "React 19", "Clerk", "Neon", "Drizzle", "Zod", "shadcn/ui"],
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
      sr: "Studija slučaja: Echo, anonimna soba za dvoje koja se sama briše posle deset minuta. Next.js 15, Elysia API, Upstash Redis sa TTL-om i realtime događaji.",
      en: "Case study: Echo, an anonymous room for two that deletes itself after ten minutes. Next.js 15, an Elysia API, Upstash Redis with TTL and realtime events.",
    },
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "17 commit-a za dva dana, 28 fajlova, 4 vrste realtime događaja",
      en: "17 commits in two days, 28 files, 4 realtime event types",
    },
    impact: {
      sr: [
        "Realtime događaji i podaci sa rokom trajanja bez sopstvenog servera: sve radi na Vercel-u i Upstash-u.",
        "Tipiziran API od servera do klijenta bez ručnog pisanja tipova, preko Elysia i Eden Treaty.",
        "Za dva dana od praznog repoa do verzije na Vercel-u koja radi i na telefonu.",
      ],
      en: [
        "Realtime events and expiring data without running my own server: it all runs on Vercel and Upstash.",
        "A typed API from server to client without writing the types by hand, through Elysia and Eden Treaty.",
        "Two days from an empty repo to a version on Vercel that works on a phone.",
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
      sr: "Chat bez naloga i bez istorije: otvorite sobu, pošaljete link jednoj osobi, i posle deset minuta od razgovora ne ostaje ništa. Napravio sam ga sam za dva dana, 28. i 29. decembra 2025, u 17 commit-a. Next.js 15 nosi i front i API: Elysia je montirana u jednu catch-all rutu, a Eden Treaty klijent daje tipizirane pozive bez posebnog SDK-a. Upstash Redis čuva sobu i poruke sa rokom trajanja, Upstash Realtime šalje četiri vrste događaja (poruka, kucanje, pročitano, uništi), a TanStack Query drži stanje na klijentu. Korisničko ime je nasumično, izgled je terminal sa JetBrains Mono fontom.",
      en: "A chat with no account and no history: open a room, send the link to one person, and ten minutes later nothing of the conversation is left. I built it alone in two days, 28 and 29 December 2025, in 17 commits. Next.js 15 carries both the front end and the API: Elysia is mounted in one catch-all route, and the Eden Treaty client gives typed calls without a separate SDK. Upstash Redis stores the room and messages with an expiry, Upstash Realtime pushes four event types (message, typing, read, destroy), and TanStack Query holds client state. The username is random and the look is a terminal in JetBrains Mono.",
    },
    did: {
      sr: [
        "Soba za najviše dve osobe: middleware izda token u httpOnly kolačiću, a treći posetilac dobija poruku da je soba puna.",
        "Odbrojavanje koje kreće od stvarnog preostalog vremena na serveru, plus ručno uništenje sobe uz potvrdu.",
        "Indikator kucanja koji se sam gasi i zvuk za novu poruku kada je tab u pozadini.",
        "Potvrde čitanja preko IntersectionObserver-a: poruka je pročitana kada je bar pola nje na ekranu.",
        "Zod provera svake poruke (do 1.000 karaktera) i svakog događaja.",
        "Anonimno ime kao anonymous-wolf-x7k2p, napravljeno pri prvoj poseti i sačuvano u pregledaču, pa ostaje isto posle osvežavanja.",
        "Mobilni raspored sa fiksnim zaglavljem i poljem za unos i skrolom samo po porukama.",
      ],
      en: [
        "A room for at most two people: middleware issues a token in an httpOnly cookie, and a third visitor is told the room is full.",
        "A countdown that starts from the real time left on the server, plus manual room destroy with a confirmation.",
        "A typing indicator that clears itself and a sound for new messages when the tab is in the background.",
        "Read receipts through IntersectionObserver: a message counts as read when at least half of it is on screen.",
        "Zod validation on every message (up to 1,000 characters) and every event.",
        "An anonymous name such as anonymous-wolf-x7k2p, generated on the first visit and kept in the browser, so it stays the same after a refresh.",
        "A mobile layout with a fixed header and input and scrolling only in the message list.",
      ],
    },
    hard: {
      sr: "Soba mora da nestane cela, u isto vreme. Svaki novi ključ u Redis-u (poruke, potvrde čitanja) zato ne dobija svojih deset minuta, nego preostali rok same sobe, pa ništa ne preživi sobu ni sekundu. Kada soba istekne ili je neko uništi, događaj „uništi“ vodi obe strane na početnu sa porukom, a ko se vrati na stari link, middleware ga preusmeri jer sobe više nema. Na Vercel-u je middleware prvo prestao da radi; problem je bio što mora da stoji u src/ kada aplikacija koristi taj folder.",
      en: "A room has to disappear entirely, all at once. So every new Redis key (messages, read receipts) does not get its own ten minutes but the room's remaining expiry, and nothing outlives the room by even a second. When the room expires or someone destroys it, a destroy event sends both sides to the home page with a note, and anyone who opens the old link is redirected by the middleware because the room is gone. On Vercel the middleware first stopped working; the cause was that it has to live in src/ when the app uses that folder.",
    },
    stack: [
      "Next.js 15",
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
export const clientProjects = projects.filter((p) => p.kind !== "personal");
export const personalProjects = projects.filter((p) => p.kind === "personal");
