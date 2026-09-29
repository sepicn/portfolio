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
      sr: "Studija slučaja: Medical Time, platforma privatne bolnice od ~400k linija koda na pet jezika, Site Health 90% → 98% za nedelju i osam Google Ads kampanja.",
      en: "Case study: Medical Time, a ~400k-line private hospital platform in five languages, Site Health from 90% to 98% in a week and eight Google Ads campaigns.",
    },
    gallery: [
      "/images/projects/gallery/medical-time-2.webp",
      "/images/projects/gallery/medical-time-m.webp",
    ],
    team: {
      sr: "Razvoj, SEO i oglašavanje na jednom mestu",
      en: "Development, SEO and advertising in one place",
    },
    scale: {
      sr: "~400k linija koda, 5 jezika, 779 URL-ova u sitemap-u, Semrush Site Health 90% → 98%",
      en: "~400k lines of code, 5 languages, 779 URLs in the sitemap, Semrush Site Health 90% → 98%",
    },
    impact: {
      sr: [
        "Sajt, merenje i oglase vodi jedna osoba, pa bolnica nema čekanja ni prebacivanja odgovornosti između developera i agencije.",
        "Tehnički SEO: Site Health sa 90% na 98% za nedelju dana, bez ijedne greške u auditu, a posle toga su porasli i organski saobraćaj i broj upita.",
        "370+ negativnih ključnih reči: budžet više ne odlazi na pretrage koje ne donose upite, a najbolje kampanje imaju i do 54% nižu cenu konverzije od proseka naloga.",
      ],
      en: [
        "One person owns the site, tracking and ads, so the hospital never waits on a hand-off between a developer and an agency.",
        "Technical SEO: Site Health from 90% to 98% in one week, with zero audit errors, followed by growth in organic traffic and inquiries.",
        "370+ negative keywords: the budget no longer goes to searches that bring no inquiries, and the best campaigns run up to 54% below the account-average cost per conversion.",
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
      sr: "Platforma privatne bolnice od ~400 hiljada linija koda na pet jezika, plus Google Ads kampanje koje donose upite i pozive.",
      en: "A ~400k-line private hospital platform in five languages, plus the Google Ads campaigns that bring in inquiries and calls.",
    },
    summary: {
      sr: "Na Medical Time-u radim od februara 2025, danas i na razvoju i na oglašavanju. Prvih pet meseci posvetio sam starom sajtu bolnice: prebacio sam ga na noviju verziju Nuxt-a, napravio stranice usluga za hirurgiju, plastičnu hirurgiju, dijagnostiku, infuzije i preglede, sa fotografijama, alt tekstovima i prevodima na sedam stranih jezika. Od jula 2025. gradim novu platformu, danas oko 400 hiljada linija koda: Nuxt na frontu, Laravel pozadi i Flutter za telefon. Ima javni sajt na pet jezika, online zakazivanje, portale za deset uloga zaposlenih, prodavnicu, chat i video konsultacije, predračune i plaćanje karticom. Moj teren su javni sajt, prevodi i SEO, a paralelno vodim Google Ads i Meta Ads naloge bolnice.",
      en: "I have worked on Medical Time since February 2025, and today I handle both its development and its advertising. The first five months went to the hospital's old site: I moved it to a newer version of Nuxt, built service pages for surgery, plastic surgery, diagnostics, infusions and check-ups, with photos, alt text and translations into seven foreign languages. Since July 2025 I have been building a new platform, now about 400 thousand lines of code: Nuxt on the front, Laravel behind it and Flutter for the phone. It has a public site in five languages, online booking, portals for ten staff roles, a shop, chat and video consultations, pro-forma invoices and card payments. My focus is the public site, translations and SEO, and alongside that I run the hospital's Google Ads and Meta Ads accounts.",
    },
    did: {
      sr: [
        "Semrush Site Health sa 90% na 98% za nedelju dana: greške 6 → 0, upozorenja 1.012 → 129 (−87%).",
        "Osam Google Ads Search kampanja: 370+ negativnih ključnih reči iz izveštaja o pretragama i analiza udela prikaza koja je pokazala da kampanje sa i do 54% nižom cenom konverzije od proseka naloga imaju najviše prostora za rast.",
        "Prevodi i lokalizovani URL slugovi za sr, en, ru, de i tr, sa hreflang i canonical pravilima; blog i prodavnica prebačeni na SSR da ih Google vidi.",
        "Chatbot na javnom sajtu koji odgovara na pitanja i zakazuje termin.",
        "Daljinsko potpisivanje saglasnosti sa šaltera na tablet, uključujući slučaj kada korisnički nalog još ne postoji.",
        "Kalendar zakazivanja sa prikazom od tri dana i agendom, uvozom Google termina i više termina u isto vreme.",
        "Plaćanje karticom preko Raiffeisen banke: sačuvane kartice, obnova pretplata i predračuni koji se plaćaju iz profila, na sajtu i u aplikaciji.",
        "JSON-LD za Hospital, Physician, MedicalProcedure, FAQ, Article i Product; llms.txt; HSTS i noindex za SPA rute.",
        "GTM kontejner, GA4 konverzije, consent mode i ClickCease zaštita.",
        "Stari sajt (februar do jul 2025): prelazak na Nuxt, stranice usluga sa fotografijama i dinamičkim alt tekstovima, cenovnik i prevodi na sedam jezika: engleski, nemački, ruski, turski, italijanski, španski i francuski.",
      ],
      en: [
        "Semrush Site Health from 90% to 98% in one week: errors 6 → 0, warnings 1,012 → 129 (−87%).",
        "Eight Google Ads Search campaigns: 370+ negative keywords from search term reports and an impression share analysis showing that the campaigns with up to 54% lower cost per conversion than the account average had the most room to grow.",
        "Translations and localized URL slugs for sr, en, ru, de and tr, with hreflang and canonical rules; the blog and shop moved to server-side rendering so Google sees them.",
        "A public-site chatbot that answers questions and books an appointment.",
        "Remote consent signing from the front desk to a tablet, including the case where the user account does not exist yet.",
        "A booking calendar with a three-day view and an agenda, Google Calendar import and several appointments at the same time.",
        "Card payments through Raiffeisen bank: saved cards, subscription renewal and pro-forma invoices paid from the user's profile, on the site and in the app.",
        "JSON-LD for Hospital, Physician, MedicalProcedure, FAQ, Article and Product; llms.txt; HSTS and noindex for SPA routes.",
        "GTM container, GA4 conversions, consent mode and ClickCease protection.",
        "The old site (February to July 2025): a move to Nuxt, service pages with photos and dynamic alt text, a price list and translations into seven languages: English, German, Russian, Turkish, Italian, Spanish and French.",
      ],
    },
    hard: {
      sr: "Canonical URL-ovi blog postova su se čuvali u bazi zajedno sa meta podacima, pa je posle promene slugova Google indeksirao duple stranice. Rešenje je bilo da se canonical uvek izvodi iz trenutne rute, a ne iz sačuvanih meta podataka, i da se stari slugovi preusmere sa 301.",
      en: "Blog post canonical URLs were stored in the database alongside meta data, so after slugs changed Google indexed duplicate pages. The fix was to always derive the canonical from the current route rather than saved meta, and to 301 the old slugs.",
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
    slug: "meridian-tms",
    seoTitle: {
      sr: "Meridian TMS: UI za softver kamionske logistike",
      en: "Meridian TMS: UI for a trucking logistics TMS",
    },
    logo: "/images/clients/delta.webp",
    description: {
      sr: "Studija slučaja: redizajn interfejsa TMS sistema za kamionsku logistiku u .NET MVC. Tamni režim, nova navigacija i 40+ formi pretvorenih u vođene korake.",
      en: "Case study: redesigning the interface of a trucking logistics TMS in .NET MVC. Dark mode, new navigation and 40+ data entry forms turned into guided steps.",
    },
    team: {
      sr: "Tim od dva developera; ja sam radio redizajn UI-ja",
      en: "A team of two developers; I did the UI redesign",
    },
    scale: {
      sr: "12 projekata u .NET solution-u, 100+ EF migracija, 101 moj commit, 40+ formi u koracima",
      en: "12 projects in the .NET solution, 100+ EF migrations, 101 commits of mine, 40+ step forms",
    },
    impact: {
      sr: [
        "Dispečeri i bezbednosni tim unose podatke kroz 40+ vođenih formi sa istim koracima i istim redosledom polja, umesto kroz duge ekrane koji se skroluju.",
        "Iste forme rade i u modalu i na punoj strani, pa tim ne održava dve verzije istog ekrana.",
        "Tamni režim i nova navigacija pokrivaju ceo sistem, ne samo nove ekrane.",
      ],
      en: [
        "Dispatch and the safety team enter data through 40+ guided forms with the same steps and the same field order, instead of long scrolling screens.",
        "The same forms work in a modal and on a full page, so the team does not maintain two versions of one screen.",
        "Dark mode and the new navigation cover the whole system, not just the new screens.",
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
    role: {
      sr: "Front-end developer (redizajn UI-ja)",
      en: "Front-end developer (UI redesign)",
    },
    tagline: {
      sr: "Redizajn interfejsa TMS-a američke logističke firme: dispečeri, flota, bezbednost i računovodstvo, sa 40+ formi u vođenim koracima.",
      en: "A UI redesign of a US trucking company's TMS: dispatch, fleet, safety and accounting, with 40+ forms turned into guided steps.",
    },
    summary: {
      sr: "Od oktobra 2025. do jula 2026. redizajnirao sam interfejs Meridian TMS-a, sistema za upravljanje transportom američke logističke firme Delta Group Logistics: 101 commit na glavnoj grani, u Razor pogledima, CSS-u i JavaScript-u. U sistemu su na jednom mestu dispečeri, flota, vozači, bezbednost i računovodstvo. Pozadina je .NET MVC sa SQL Server bazom, Azure servisima, mobilnim API-jem za vozače i posebnim servisima za ELD uređaje i gorivo; to su radile kolege iz tima. Posao je išao modul po modul. Prvo prijava, navigacija i kontrolna tabla, zatim flota, korisnici, vozači i divizije, pa tamni režim za ceo sistem. U 2026. su forme prvo složene da stanu na ekran bez skrolovanja, a onda je 40+ formi za unos pretvoreno u vođene korake. Repo je privatan i vlasništvo klijenta, pa ovde nema koda; screenshotovi su sa lokalne instance sa izmišljenim podacima.",
      en: "From October 2025 to July 2026 I redesigned the interface of Meridian TMS, the transport management system of Delta Group Logistics, a US trucking company: 101 commits on the main branch across Razor views, CSS and JavaScript. Dispatch, fleet, drivers, safety and accounting live in one place. The back end is .NET MVC with SQL Server, Azure services, a mobile API for drivers and separate services for ELD devices and fuel; my teammates built that. The work went module by module. First sign-in, navigation and the dashboard, then fleet, users, drivers and divisions, then dark mode for the whole system. In 2026 the forms were first reworked to fit on one screen without scrolling, and then 40+ data entry forms became guided steps. The repo is private and client-owned, so there is no code here; the screenshots come from a local instance with made-up data.",
    },
    did: {
      sr: [
        "40+ formi pretvoreno u vođene korake, među njima: Truck, Equipment, User, Driver, Division, ruta i stanice tereta, Owner Operator, Lease/Rent, Customer, Driver Qualification, Annual Review i šest bezbednosnih formi (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check, Employment Verification).",
        "Zajednička logika koraka izdvojena u jedan form-wizard-core.js, pa svaka forma opisuje samo svoje korake.",
        "Nova prijava, navigacija i kontrolna tabla. Stranice za prijavu dobile su poseban layout, pa se isti kod više ne ponavlja na svakoj stranici.",
        "Tamni režim na svim ekranima, uključujući MVC grid tabele i ekran za prijavu.",
        "Bočni meni koji se skrolovao zamenjen je trakom sa ikonama i podmenijima koji se otvaraju sa strane.",
        "Redizajn modula Truck, Equipment, Programs, Repairs, Users, Drivers i Divisions, a zatim Load, Owner Operator, Customer, fakture, faktoring kompanije, Fuel Transactions i Yard.",
        "Maske za SSN, EIN i broj telefona sa proverom, da nepotpun broj ne može da se sačuva.",
        "Isti raspored u svim formama: posebna sekcija za status, isti redosled polja, ikone i podnaslovi, i modal koji se ne zatvara slučajnim klikom pored njega.",
        "Bezbednosni moduli i faktoring kompanije prebačeni na grid stranice sa horizontalnim skrolom.",
      ],
      en: [
        "40+ forms turned into guided steps, including: Truck, Equipment, User, Driver, Division, load route and stops, Owner Operator, Lease/Rent, Customer, Driver Qualification, Annual Review and six safety forms (DVIR, Clearinghouse, Roadside, Annual Inspection, Background Check, Employment Verification).",
        "The shared step logic lives in one form-wizard-core.js, so each form only describes its own steps.",
        "New sign-in, navigation and dashboard. The auth pages got their own layout, so the same markup is no longer repeated on every page.",
        "Dark mode on every screen, including the MVC grid tables and the sign-in screen.",
        "The scrolling side menu was replaced with an icon rail and flyout submenus.",
        "Redesign of the Truck, Equipment, Programs, Repairs, Users, Drivers and Divisions modules, then Load, Owner Operator, Customer, invoicing, factoring companies, Fuel Transactions and Yard.",
        "Input masks with validation for SSN, EIN and phone numbers, so an incomplete number cannot be saved.",
        "One layout for every form: a dedicated status section, the same field order, icons and subtitles, and a modal that does not close on a stray click outside it.",
        "Safety modules and factoring companies moved to grid pages with horizontal scroll.",
      ],
    },
    hard: {
      sr: "Iste forme se otvaraju i samostalno i iz drugih formi: Truck iz Driver-a, Lease iz Equipment-a, Owner Operator iz Truck-a. Kada su Truck i Equipment prvi put dobili korake, logika je živela u fajlu svake forme. Forma otvorena iz druge forme zato je padala na ravan prikaz bez koraka. To je radilo, ali je korisnik isti posao video na dva načina, zavisno od toga odakle je krenuo. Rešenje je bilo da se koraci, validacija po koraku i navigacija izvuku u zajedničko jezgro, a da svaka forma samo opiše svoje korake. Kada je jezgro bilo gotovo, ravan prikaz je trebalo samo obrisati: poslednji commit u tom nizu uklonio je 42 linije i dodao 9.",
      en: "The same forms open both standalone and from inside other forms: Truck from Driver, Lease from Equipment, Owner Operator from Truck. When Truck and Equipment first got steps, the logic lived in each form's own file. A form opened from another form therefore fell back to a flat layout without steps. It worked, but the user saw the same task two ways depending on where they started. The fix was to pull steps, per-step validation and navigation into a shared core, with each form only describing its own steps. Once the core was done, the flat fallback just had to be deleted: the last commit in that series removed 42 lines and added 9.",
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
    slug: "delta-tracking",
    seoTitle: {
      sr: "Delta Tracking: praćenje pošiljki na mapi",
      en: "Delta Tracking: live shipment tracking portal",
    },
    logo: "/images/clients/delta.webp",
    description: {
      sr: "Studija slučaja: portal za praćenje pošiljki u Rails. Leaflet mapa sa rutom po putevima, status svake stanice i redizajn ekrana, u 20 mojih commit-a.",
      en: "Case study: a shipment tracking portal in Rails. A Leaflet map with road routing, a status for every stop and redesigned screens, in 20 commits of mine.",
    },
    team: {
      sr: "Rad po timovima: Miloš Obradović aplikacija i McLeod integracija, ja UI",
      en: "Work split across teams: Miloš Obradović on the app and McLeod integration, me on the UI",
    },
    scale: {
      sr: "Rails sa McLeod LoadMaster API-jem; moj deo: 20 commit-a, mapa od ~700 linija",
      en: "Rails on the McLeod LoadMaster API; my part: 20 commits, a ~700-line map",
    },
    impact: {
      sr: [
        "Kupci logističke firme sami vide gde je pošiljka i kada stiže, sa novom procenom dolaska za svaku stanicu koja još čeka.",
        "Ruta na mapi prati puteve, pa kupac vidi stvarni put kamiona, a ne pravu liniju preko karte.",
        "Novi korisnik kupca dobija pozivnicu i sam postavlja lozinku, bez ručne pomoći.",
      ],
      en: [
        "The logistics company's customers see for themselves where a shipment is and when it arrives, with an updated ETA for every stop still ahead.",
        "The route on the map follows roads, so a customer sees the truck's real path rather than a straight line across the map.",
        "A new customer user gets an invitation and sets their own password, with no manual help.",
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
      sr: "Živa mapa pošiljki za kupce američke logističke firme, sa rutom po putevima i statusom svake stanice.",
      en: "A live shipment map for a US logistics company's customers, with road routing and a status for every stop.",
    },
    summary: {
      sr: "Delta Group Logistics je kamionska logistika iz SAD-a, a ovaj portal je mesto gde njeni kupci prate svoje pošiljke. Aplikaciju od oktobra 2024. pravi Miloš Obradović: Rails sa Hotwire-om i Tailwind-om, povezana sa McLeod LoadMaster sistemom iz kog dolaze pošiljke, stanice, javljanja kamiona i dokaz o isporuci. Ja sam se priključio u maju 2025. i do oktobra, u 20 commit-a, preuzeo izgled i ponašanje ekrana. U julu sam uradio listu i detalje pošiljke, a zatim mapu od oko 700 linija, najveći pojedinačni deo mog posla. Na jesen su došli statusi po stanicama, kartice za upravljanje kupcima i korisnicima i jedan backend zadatak: pozivnica za nove korisnike. Screenshotovi su sa lokalne instance sa izmišljenim podacima.",
      en: "Delta Group Logistics is a US trucking company, and this portal is where its customers follow their shipments. Miloš Obradović has been building the app since October 2024: Rails with Hotwire and Tailwind, connected to the McLeod LoadMaster system that supplies shipments, stops, truck check-ins and proof of delivery. I joined in May 2025 and by October, in 20 commits, had taken over how the screens look and behave. In July I did the shipment list and detail pages, and then the ~700-line map, the biggest single piece of my work. In the autumn came per-stop statuses, card layouts for managing customers and users, and one back-end task: invitations for new users. The screenshots come from a local instance with made-up data.",
    },
    did: {
      sr: [
        "Mapa pošiljke kao Stimulus kontroler od oko 700 linija: Leaflet sa OpenStreetMap slojem, posebni markeri za utovar, istovar, trenutnu lokaciju i ranija javljanja kamiona, uz listu poslednjih pet pozicija.",
        "Ruta po putevima preko OSRM servisa. Servis prima ograničen broj tačaka, pa se duga ruta deli na delove od po 25 i spaja u jednu liniju; ako rutiranje ne uspe, mapa crta isprekidanu pravu liniju i u oblačiću piše da je to približan put.",
        "Status svake stanice izveden iz stvarnog vremena dolaska i odlaska (čeka, stigao na istovar, isporučeno), a pošiljka je isporučena tek kad su završene sve stanice za istovar. Posle isporuke mapa više ne pokazuje živu lokaciju.",
        "Redizajn liste i detalja pošiljke i admin i customer stranica u kartice sa brend bojama; više od 30 novih SVG ikona, favicon set i WebP logo.",
        "Prijava, registracija i reset lozinke u istom izgledu kao ostatak aplikacije, plus popravljen meni u zaglavlju koji nije reagovao na klik.",
        "Pozivnica: kada admin doda korisnika, on dobija mejl sa linkom za postavljanje lozinke, umesto naloga na koji ne može da se prijavi.",
        "Oznake po ulozi: super admin vidi „Customer“, a admin i korisnici kupca vide „Company“.",
      ],
      en: [
        "The shipment map as a Stimulus controller of about 700 lines: Leaflet with an OpenStreetMap layer, separate markers for pickup, delivery, the current location and earlier truck check-ins, plus a list of the last five positions.",
        "Road routing through the OSRM service. The service accepts a limited number of points, so a long route is split into chunks of 25 and joined into one line; if routing fails, the map draws a dashed straight line and the popup says the path is approximate.",
        "Each stop's status is derived from actual arrival and departure times (pending, arrived at delivery, delivered), and a shipment counts as delivered only when every delivery stop is done. After delivery the map stops showing a live location.",
        "Redesign of the shipment list and detail pages and the admin and customer pages into card layouts in brand colours; more than 30 new SVG icons, a favicon set and a WebP logo.",
        "Sign-in, registration and password reset in the same look as the rest of the app, plus a fix for the header menu that did not respond to clicks.",
        "Invitations: when an admin adds a user, the user gets an email with a link to set a password, instead of an account they cannot sign in to.",
        "Role-based labels: a super admin sees Customer, while a customer's admins and users see Company.",
      ],
    },
    hard: {
      sr: "Mapa je lokalno radila, a u produkciji su nestale sve ikone markera. JavaScript je tražio /assets/pickup.svg kao običan string, a Rails asset pipeline u produkciji dodaje otisak u ime fajla, pa ta adresa nije postojala. Rešenje je bilo da se ikone dodaju u listu za precompile i da view prosledi kontroleru stvarne putanje iz asset helper-a, kao Stimulus vrednosti. Druga zamka je bio status. McLeod za celu pošiljku vraća jedno slovo, D za isporučeno, a kupac sa tri stanice za istovar želi da zna koja je gotova. Zato status sada računa helper iz vremena dolaska i odlaska na svakoj stanici, a ne iz tog jednog slova.",
      en: "The map worked locally, but in production every marker icon vanished. The JavaScript asked for /assets/pickup.svg as a plain string, and in production the Rails asset pipeline fingerprints file names, so that address did not exist. The fix was to add the icons to the precompile list and have the view pass the real paths from the asset helper to the controller as Stimulus values. The other trap was status. McLeod returns one letter for the whole shipment, D for delivered, while a customer with three delivery stops wants to know which one is done. So a helper now works out the status from arrival and departure times at each stop, not from that one letter.",
    },
    stack: [
      "Rails",
      "Hotwire",
      "Stimulus",
      "Tailwind",
      "Leaflet",
      "OSRM",
      "PostgreSQL",
    ],
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
      sr: "Nuxt + Laravel, 5 jezika, 165 komponenti, 50 kontrolera; naplata: 91 fajl, 133 testa",
      en: "Nuxt + Laravel, 5 languages, 165 components, 50 controllers; billing: 91 files, 133 tests",
    },
    impact: {
      sr: [
        "Agencija vodi klijente, prodaju, podršku i dokumente na jednom mestu, umesto u odvojenim alatima.",
        "Pretplate se obnavljaju same: kupac unese karticu jednom, a ne svakog meseca iznova.",
        "Svaki put kojim ide novac pokriven je testom, pa se naplata može menjati bez straha da će pući u produkciji.",
      ],
      en: [
        "The agency runs clients, sales, support and documents in one place instead of separate tools.",
        "Subscriptions renew on their own: a customer enters a card once, not every month.",
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
      sr: "Platforma web agencije na pet jezika: portali, prodavnica, tiketi i naplata karticom pokrivena sa 133 testa.",
      en: "A web agency platform in five languages: portals, a shop, tickets and card billing covered by 133 tests.",
    },
    summary: {
      sr: "IT Expert je brend preko kog me klijenti takođe mogu naći i angažovati. Ima dva dela. Javni sajt itexpert.rs nastao je u martu 2026: statičan Nuxt sa sedam stranica, alatom koji preko Google PageSpeed Insights API-ja ocenjuje bilo koji sajt, kontakt formom, sistemom kolačića i četiri teme. Od njega je napravljen zajednički šablon, na kome su posle nastali sajtovi za Mango i Stanke Enterijer. Drugi deo je platforma, od aprila 2026: Nuxt i Laravel na pet jezika, sa portalima za klijente, korisnike i četiri uloge zaposlenih, prodavnicom, tiketima, chatom, editorom dokumenata, magacinom i pretplatama. U avgustu su na posebnoj grani u deset faza preneti moduli iz platforme Medical Time, bez medicinskih pojmova. U septembru je stigao ceo tok naplate: sačuvane kartice, automatska obnova pretplata i predračuni, u jednom commit-u od 91 fajla sa 133 automatska testa.",
      en: "IT Expert is another place where clients can find and hire me. It has two parts. The public site itexpert.rs was built in March 2026: a static Nuxt site with seven pages, a tool that scores any website through the Google PageSpeed Insights API, a contact form, a cookie system and four themes. It became a shared template, which later carried the Mango and Stanke Enterijer sites. The second part is the platform, started in April 2026: Nuxt and Laravel in five languages, with portals for clients, users and four staff roles, a shop, tickets, chat, a document editor, a warehouse and subscriptions. In August, modules from the Medical Time platform were ported over on a separate branch in ten phases, with the medical terms taken out. September brought the whole billing flow: saved cards, automatic subscription renewal and pro-forma invoices, in one commit of 91 files with 133 automated tests.",
    },
    did: {
      sr: [
        "Javni sajt: početna od 13 sekcija, usluge, paketi, portfolio, O nama i kontakt, statički generisani i objavljeni preko GitHub Actions-a.",
        "Alat za proveru sajta: PageSpeed Insights za telefon ili desktop, ocene za performanse, pristupačnost, najbolje prakse i SEO, sa metrikama i predlozima grupisanim na srpskom.",
        "Kolačići sa izborom po kategoriji i GTM koji se učitava tek posle pristanka; četiri teme (light, dark, emerald, premium) koje se primene pre prvog prikaza, bez bleska.",
        "Portali za klijenta, korisnika i zaposlene (admin, menadžer, podrška, magacioner), sa dozvolama po ulozi i prijavom preko Google naloga.",
        "Prodavnica sa kategorijama, varijantama i paketima, tiketi, chat, magacin i trebovanja; dokumenti se slažu u editoru, izlaze kao PDF i šalju mejlom.",
        "Pet jezika (sr, en, ru, de, tr), a svaka stranica učitava samo svoje prevode. Jedna komponenta za sve tabele: tabela, kartice ili lista, filteri u zaglavlju kolone i beskonačan skrol.",
        "Sačuvane kartice preko Raiffeisen banke i automatska obnova pretplata: naplata dan ili dva pre isteka, novi pokušaj posle neuspeha i mejl kupcu na pet jezika.",
        "Predračuni od nule, sa numeracijom, PDF-om i plaćanjem karticom. Dva brza klika na „Plati“ ne mogu da daju dve naplate, jer drugi pokušaj odbija unique indeks u bazi.",
        "133 testa: 121 PHPUnit test za kartice, obnovu, predračune i potpise banke, plus 12 Vitest testova na frontu.",
      ],
      en: [
        "The public site: a home page of 13 sections, services, packages, portfolio, about and contact, statically generated and deployed through GitHub Actions.",
        "A site check tool: PageSpeed Insights for phone or desktop, scores for performance, accessibility, best practices and SEO, with metrics and suggestions grouped in Serbian.",
        "Cookies with per-category choice and GTM that loads only after consent; four themes (light, dark, emerald, premium) applied before the first paint, with no flash.",
        "Portals for the client, the user and staff (admin, manager, support, warehouse), with per-role permissions and sign-in with a Google account.",
        "A shop with categories, variants and bundles, tickets, chat, a warehouse and requisitions; documents are laid out in an editor, exported as PDF and sent by email.",
        "Five languages (sr, en, ru, de, tr), with each page loading only its own translations. One component for every table: table, cards or list view, filters in the column headers and infinite scroll.",
        "Saved cards through Raiffeisen bank and automatic subscription renewal: a charge a day or two before expiry, a retry after a failure and an email to the customer in five languages.",
        "Pro-forma invoices from scratch, with numbering, PDF and card payment. Two quick clicks on Pay cannot produce two charges, because a unique index in the database rejects the second attempt.",
        "133 tests: 121 PHPUnit tests for cards, renewal, invoices and bank signatures, plus 12 Vitest tests on the front end.",
      ],
    },
    hard: {
      sr: "Obnova ne sme da naplati isti period dvaput. Zaštita od ponovljene poruke banke tu ne pomaže: ako se zakazani zadatak pokrene dvaput, svaka njegova naplata je nova i sasvim ispravna poruka. Zato svaki ciklus naplate ima svoj ključ sa unique indeksom, pa drugi pokušaj odbija baza, a ne pažnja koda. Druga zamka je bio datum. Naplata ide dan ranije, i kad bi se novi period računao od trenutka naplate, kupac bi svakim ciklusom gubio po dan. Period se zato uvek produžava od kraja prethodnog.",
      en: "Renewal must never charge the same period twice. Protection against a repeated bank message does not help here: if the scheduled job runs twice, each of its charges is a new and perfectly valid message. So every billing cycle has its own key with a unique index, and the database, not careful code, rejects the second attempt. The other trap was the date. The charge runs a day early, and if the new period started at the moment of charging, the customer would lose a day every cycle. So the period always extends from the end of the previous one.",
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
    team: { sr: "Sam, dizajn i izrada", en: "Solo, design and build" },
    scale: {
      sr: "4 rubrike, 70+ objavljenih tekstova, 5 sitemap-ova",
      en: "4 sections, 70+ published articles, 5 sitemaps",
    },
    impact: {
      sr: [
        "Redakcija objavljuje bez developera: tekst iz WordPress-a odmah dobija izgled, rubriku, vreme čitanja i povezane tekstove.",
        "Google od prvog dana dobija sitemap i strukturirane podatke za svaki tekst.",
        "Stranica se ne pomera dok se učitava: Lighthouse meri CLS 0 na telefonu.",
      ],
      en: [
        "The editors publish without a developer: a post from WordPress instantly gets its layout, section, reading time and related articles.",
        "Google has had a sitemap and structured data for every article since day one.",
        "The page does not shift while it loads: Lighthouse measures a CLS of 0 on a phone.",
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
      sr: "E-magazin o psihologiji koji sam dizajnirao i napravio od nule, danas sa više od 70 tekstova.",
      en: "A psychology e-magazine I designed and built from scratch, now with more than 70 articles.",
    },
    summary: {
      sr: "Prostor između je e-magazin o psihologiji, odnosima i svakodnevnom životu. Sajt sam dizajnirao i napravio u maju 2026, na WordPress-u sa Elementor-om i Hello temom, bez kupljenog šablona. Tekstovi su podeljeni u četiri rubrike: Psihologija, Lifestyle, Prostor za sebe i Intervju nedelje. Početna počinje karuselom istaknutih tekstova, a ispod su sekcija „Tu negde između“, poslednje objave i mreža članaka sa dugmetom „Učitaj još“. Svaka kartica ima rubriku, procenu vremena čitanja, naslov i uvod. Stranica članka ima datum, rubriku i vreme čitanja na vrhu i blok „Možda će Vas zanimati“ na kraju. Paleta je krem pozadina sa tamnobordo i roze akcentom, a ceo sajt je u fontu Be Vietnam Pro. Magazin od tada redovno izlazi i danas ima više od 70 tekstova.",
      en: "Prostor između is an e-magazine about psychology, relationships and everyday life. I designed and built it in May 2026, on WordPress with Elementor and the Hello theme, without a bought template. Articles sit in four sections: Psychology, Lifestyle, Space for yourself and Interview of the week. The home page opens with a carousel of featured articles, followed by a section called Somewhere in between, the latest posts and a grid of articles with a Load more button. Every card shows the section, a reading time estimate, the title and an excerpt. An article page has the date, section and reading time at the top and a You might also like block at the end. The palette is a cream background with deep burgundy and pink accents, and the whole site is set in Be Vietnam Pro. The magazine has come out regularly since then and now has more than 70 articles.",
    },
    did: {
      sr: [
        "Dizajn od nule: krem pozadina (#F5EFE6), tamnobordo (#6F0C0C) i roze akcent (#CC3366), Be Vietnam Pro za naslove i tekst.",
        "Šabloni u Elementor Theme Builder-u za zaglavlje, podnožje, članak, rubriku i početnu, pa novi tekst dobija ceo izgled bez ručnog slaganja.",
        "Karusel istaknutih tekstova, mreža poslednjih objava i „Učitaj još“ bez osvežavanja stranice.",
        "Procena vremena čitanja na svakoj kartici i u zaglavlju članka.",
        "Prijava na newsletter u podnožju svake stranice, pretraga u zaglavlju i linkovi na Instagram i Facebook.",
        "SEO preko Yoast-a: sitemap za tekstove, stranice, rubrike, oznake i autore, robots.txt, Open Graph i JSON-LD (Article sa autorom, BreadcrumbList, WebSite sa pretragom, Organization).",
        "WebP slike, lenjo učitavanje ispod prvog ekrana i fontovi sa font-display: swap.",
      ],
      en: [
        "Design from scratch: cream background (#F5EFE6), deep burgundy (#6F0C0C) and a pink accent (#CC3366), Be Vietnam Pro for headings and body text.",
        "Elementor Theme Builder templates for the header, footer, article, section archive and home page, so a new post gets the full layout with no manual assembly.",
        "A carousel of featured articles, a grid of the latest posts and Load more without a page refresh.",
        "A reading time estimate on every card and in the article header.",
        "Newsletter signup in the footer of every page, search in the header, and links to Instagram and Facebook.",
        "SEO through Yoast: sitemaps for posts, pages, sections, tags and authors, robots.txt, Open Graph and JSON-LD (Article with author, BreadcrumbList, WebSite with search, Organization).",
        "WebP images, lazy loading below the first screen and fonts with font-display: swap.",
      ],
    },
    hard: {
      sr: "Elementor lako napravi težak sajt, a magazin živi od velikih fotografija. Držao sam broj widget-a nisko, slike u WebP-u, lenjo učitavanje ispod prvog ekrana i članke u zajedničkim šablonima, umesto da se svaki slaže ručno. Lighthouse za početnu daje 100 za najbolje prakse i CLS 0, pa se raspored ne pomera dok slike stižu. Najveća rezerva je LCP na telefonu, a tu bi najviše pomogla manja prva slika u karuselu.",
      en: "Elementor makes it easy to build a heavy site, and a magazine lives on big photos. I kept the widget count low, images in WebP, lazy loading below the first screen and articles in shared templates instead of assembling each one by hand. Lighthouse gives the home page 100 for best practices and a CLS of 0, so the layout stays put while images arrive. The biggest room left is LCP on a phone, where a smaller first carousel image would help most.",
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
    team: { sr: "Pod brendom IT Expert", en: "Under the IT Expert brand" },
    scale: {
      sr: "2 verzije (2024. i 2026.), 9 stranica, 32 kolača u cenovniku, 109 commit-a",
      en: "2 versions (2024 and 2026), 9 pages, 32 cakes in the price list, 109 commits",
    },
    impact: {
      sr: [
        "Kupac na jednoj stranici vidi sve kolače sa cenama, filtrira ih po vrsti i jednim dodirom zove poslastičarnicu.",
        "Analitika radi tek posle pristanka, a telefon i mejl nisu laka meta za botove koji skupljaju kontakte.",
        "Posle prolaza u martu 2026. Lighthouse je beležio 91, 100, 100 i 100.",
      ],
      en: [
        "A customer sees every cake with its price on one page, filters by type and calls the shop with one tap.",
        "Analytics runs only after consent, and the phone number and email are no easy target for bots that harvest contacts.",
        "After the March 2026 pass Lighthouse recorded 91, 100, 100 and 100.",
      ],
    },
    image: "/images/projects/mango.webp",
    title: "Mango poslastičarnica",
    client: "Mango, Zemun",
    kind: "client",
    featured: false,
    year: "2024 – 2026",
    role: { sr: "Ceo sajt (sa IT Expert)", en: "Whole site (with IT Expert)" },
    tagline: {
      sr: "Sajt butik poslastičarnice kroz dve verzije od 2024: cenovnik od 32 kolača sa filterima i poziv jednim dodirom.",
      en: "A boutique pastry shop site across two versions since 2024: a filterable price list of 32 cakes and one-tap calling.",
    },
    summary: {
      sr: "Mango je butik poslastičarnica u Zemunu, a sajt joj pravim od 2024, kroz dve verzije. Prva je bila na Nuxt-u sa SSR-om: pet jezika (srpski, engleski, nemački, ruski i turski), dve teme boja koje prate tamni režim telefona, mega meni, sopstveni slajder, galerija preko celog ekrana i cenovnik sa korpom u Pinia store-u. U februaru 2025. usledili su SEO prolaz, merenje preko GTM-a i prelazak slika na WebP. U martu 2026. sajt je napravljen iznova, na Nuxt-u i zajedničkom šablonu IT Expert-a: devet stranica (početna, O nama, butik, tradicionalni, vegan i sitni kolači, cenovnik, galerija i kontakt), 17 komponenti, cenovnik od 32 kolača, sistem kolačića u kome se ništa ne meri pre pristanka i kontakt zaštićen od botova. Nova verzija je objavljena samo na srpskom, a stare adrese na drugim jezicima vode preusmerenjem 301 na srpske stranice, da se ne izgube postojeći linkovi.",
      en: "Mango is a boutique pastry shop in Zemun, and I have been building its site since 2024, across two versions. The first ran on Nuxt with SSR: five languages (Serbian, English, German, Russian and Turkish), two colour themes that follow the phone's dark mode, a mega menu, a custom slider, a full-screen gallery and a price list with a cart in a Pinia store. February 2025 brought an SEO pass, GTM tracking and a move of all images to WebP. In March 2026 the site was rebuilt on Nuxt and IT Expert's shared template: nine pages (home, about, boutique, traditional, vegan and small cakes, price list, gallery and contact), 17 components, a price list of 32 cakes, a cookie system where nothing is tracked before consent, and contact details hidden from bots. The new version launched in Serbian only, and the old URLs in other languages 301 to the Serbian pages so existing links still work.",
    },
    did: {
      sr: [
        "Cenovnik sa 32 kolača: kartice za filtriranje po vrsti (butik, tradicionalni, vegan, sitni kolači) i modal za svaki kolač sa fotografijom, opisom, cenom i dugmetom za poziv.",
        "Kolačići: prihvati sve, odbij sve ili izbor po kategoriji. GTM se učitava tek kada kupac uključi analitiku.",
        "Telefon je u HTML-u kodiran i dekodira se tek u pretraživaču, mejl se prikazuje posle reCAPTCHA provere, a kontakt forma prolazi reCAPTCHA v2 i proveru na serveru.",
        "Brzina: kritični CSS u zaglavlju stranice, ostatak asinhrono ili tek kada sekcija uđe u ekran; od deset font fajlova unapred se učitavaju četiri, sa podešenim rezervnim fontom da tekst ne skače.",
        "Slike kroz tinify, sa posebnom verzijom širine 480 piksela za telefon; fotografije kolača su danas od 15 do 89 KB.",
        "Naslov, opis i posebna Open Graph slika za svaku od devet stranica, sitemap i robots.txt.",
        "Pristupačnost: tamnije nijanse istih brend boja za kontrast i ispravan redosled naslova.",
        "Verzija iz 2024: pet jezika preko @nuxtjs/i18n, dve teme (mango i rubin) i cenovnik sa korpom.",
      ],
      en: [
        "A price list of 32 cakes: filter tabs by type (boutique, traditional, vegan, small cakes) and a modal for every cake with a photo, description, price and a call button.",
        "Cookies: accept all, reject all or choose by category. GTM loads only once the customer turns analytics on.",
        "The phone number is encoded in the HTML and decoded only in the browser, the email appears after a reCAPTCHA check, and the contact form goes through reCAPTCHA v2 and a server-side check.",
        "Speed: critical CSS in the page head, the rest loaded async or only when a section scrolls into view; four of ten font files are preloaded, with a tuned fallback font so text does not jump.",
        "Images through tinify, with a separate 480 pixel version for phones; cake photos now weigh 15 to 89 KB.",
        "A title, description and its own Open Graph image for each of the nine pages, plus a sitemap and robots.txt.",
        "Accessibility: darker shades of the same brand colours for contrast, and a correct heading order.",
        "The 2024 version: five languages through @nuxtjs/i18n, two themes (mango and rubin) and a price list with a cart.",
      ],
    },
    hard: {
      sr: "Paleta poslastičarnice je topla i svetla: roze, krem i bordo. Baš te boje nisu prošle Lighthouse proveru kontrasta. Nisam hteo da menjam brend, pa sam svaku boju tamnio samo koliko treba da pređe prag: sekundarni tekst sa #7a5c5c na #705252, prigušeni sa #a08080 na #7e5f5f, a oznake sekcija na tamniju nijansu istog akcenta. Teži deo je bilo zaglavlje. Preko fotografije je providno, a posle skrola belo, pa link koji se lepo vidi u jednom stanju nestaje u drugom. Meni zato dobija posebna pravila dok je zaglavlje providno. Sledeći korak je bio kritični put: CSS sekcija izvučen iz zaglavlja u poseban fajl i samo četiri fonta unapred, posle čega je Lighthouse pokazao 91, 100, 100 i 100.",
      en: "The shop's palette is warm and light: pink, cream and burgundy. Those exact colours failed the Lighthouse contrast check. I did not want to change the brand, so I darkened each colour only as far as it needed to pass: secondary text from #7a5c5c to #705252, muted text from #a08080 to #7e5f5f, and section labels to a darker shade of the same accent. The harder part was the header. It is transparent over the photo and white after scrolling, so a link that reads well in one state disappears in the other. The menu therefore gets its own rules while the header is transparent. The next step was the critical path: section CSS moved out of the head into its own file and only four fonts preloaded, after which Lighthouse showed 91, 100, 100 and 100.",
    },
    stack: [
      "Nuxt",
      "Vue",
      "TypeScript",
      "Pinia",
      "@nuxtjs/i18n",
      "reCAPTCHA",
      "GTM",
    ],
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
    team: { sr: "Pod brendom IT Expert", en: "Under the IT Expert brand" },
    scale: {
      sr: "Statičan Nuxt sajt, 6 stranica, 7 sekcija na početnoj, brief u 7 delova",
      en: "Static Nuxt site, 6 pages, 7 home sections, a 7-part brief",
    },
    impact: {
      sr: [
        "Studio je od prvog dana spreman za lokalnu pretragu: svaka stranica cilja svoju grupu pretraga, sa naslovom, opisom i strukturiranim podacima.",
        "Pitanja „koliko košta“ dobijaju iskren odgovor u FAQ-u umesto izmišljenog cenovnika.",
        "Ceo rebrending završen je u jednom danu, jer je brief unapred odgovorio na pitanja o brendu, dizajnu i ključnim rečima.",
      ],
      en: [
        "The studio was ready for local search from day one: each page targets its own group of searches, with a title, description and structured data.",
        "Searches about price get an honest FAQ answer instead of a made-up price list.",
        "The whole rebrand was done in one day, because the brief answered the brand, design and keyword questions up front.",
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
      sr: "Sajt muzičkog i video studija, spreman za lokalnu pretragu od prvog dana i rebrendiran za jedan dan.",
      en: "A music and video studio site, ready for local search from day one and rebranded in a single day.",
    },
    summary: {
      sr: "Vuk je muzički i video studio iz Beograda, za ljude koji žele da snime pesmu ili spot. Sajt je nastao u junu 2026. na osnovi našeg Nuxt sajta za molersku firmu Stanke Enterijer, sa istom arhitekturom i istim načinom učitavanja CSS-a. Prvo sam napisao brief u sedam delova: brend i podaci o firmi, arhitektura, dizajn, SEO i ključne reči, izgled svake stranice, build i provera pre objave. Ceo rebrending je zatim urađen u jednom danu, 25. juna: šest stranica (početna, Muzički studio, Video produkcija, Galerija, O nama i Kontakt), nov izgled, fontovi, logo i automatska objava. Četiri dana kasnije u galeriju su stigle fotografije studija i Instagram reel, a u avgustu sekcija Saradnici na stranici O nama. Sajt se generiše u statične stranice i stoji na GitHub Pages, a kontakt ide preko poziva, WhatsApp-a i Viber-a, bez forme.",
      en: "Vuk is a Belgrade music and video studio for people who want to record a song or shoot a video. The site was built in June 2026 on top of our Nuxt site for Stanke Enterijer, a house-painting business, with the same architecture and the same way of loading CSS. First I wrote a seven-part brief: brand and business facts, architecture, design, SEO and keywords, the layout of each page, build and pre-launch checks. The rebrand was then done in one day, 25 June: six pages (home, Music studio, Video production, Gallery, About and Contact), a new look, fonts, logo and automatic deploys. Four days later studio photos and an Instagram reel arrived in the gallery, and in August a Partners section on the About page. The site is generated as static pages and hosted on GitHub Pages, and contact goes by call, WhatsApp and Viber, with no form.",
    },
    did: {
      sr: [
        "Istraživanje ključnih reči iz stvarnih srpskih pretraga, oglasa i sajtova konkurentskih studija, podeljeno u grupe: brend, snimanje pesme, video produkcija i lokalne odrednice kao Voždovac i Banjica.",
        "Plan po stranici: glavna fraza, H1, naslov od 50 do 60 karaktera i opis od 150 do 160 karaktera za svih šest stranica.",
        "Početna u sedam sekcija: hero sa trakom teksta koja klizi, usluge u bento mreži, razlozi uz kolonu koja stoji dok se skroluje, postupak kao cik-cak linija, galerija do ivice ekrana, utisci i poziv na kraju.",
        "Stranice Muzički studio i Video produkcija, svaka sa svojim naslovom, opisom i FAQ sekcijom sa pitanjima koja ljudi zaista kucaju, kao „Koliko košta snimanje pesme?“.",
        "LocalBusiness JSON-LD sa adresom i radnim vremenom na početnoj i FAQPage podaci sa pet pitanja na stranici Kontakt.",
        "Tamna tema (#0a0d14) sa jednim električno plavim akcentom (#2f7bff); Space Grotesk za naslove i Inter za tekst, oba svedena na slova srpske latinice. Neon efekti i traka napretka skrola su čist CSS i gase se kada korisnik traži manje animacija.",
        "CSS u tri nivoa: globalni, po stranici i po sekciji, koji stiže tek kada sekcija uđe u ekran; cssnano i terser u build-u.",
        "GitHub Actions workflow koji generiše statične stranice i objavljuje ih na GitHub Pages; sitemap i robots.txt prebačeni sa starog domena na vuk-studio.rs.",
      ],
      en: [
        "Keyword research from real Serbian searches, classifieds and competitor studio sites, grouped into brand, song recording, video production and local modifiers such as Voždovac and Banjica.",
        "A per-page plan: primary phrase, H1, a 50 to 60 character title and a 150 to 160 character description for all six pages.",
        "A home page in seven sections: a hero with a sliding text strip, services in a bento grid, reasons next to a column that stays pinned while you scroll, the process as a zigzag line, a gallery that runs to the screen edge, testimonials and a closing call to action.",
        "The Music studio and Video production pages, each with its own title, description and an FAQ with questions people actually type, such as how much it costs to record a song.",
        "LocalBusiness JSON-LD with address and opening hours on the home page, and FAQPage data with five questions on the Contact page.",
        "A dark theme (#0a0d14) with a single electric blue accent (#2f7bff); Space Grotesk for headings and Inter for text, both cut down to the Serbian Latin character set. Neon effects and the scroll progress bar are pure CSS and respect reduced motion.",
        "CSS in three levels: global, per page and per section, which arrives only when the section scrolls into view; cssnano and terser in the build.",
        "A GitHub Actions workflow that generates the static pages and publishes them to GitHub Pages; the sitemap and robots.txt moved from the old domain to vuk-studio.rs.",
      ],
    },
    hard: {
      sr: "Ljudi najčešće traže „snimanje pesme cena“, a studiji skoro nikad ne objavljuju cenovnik. Izmišljena cena bi donela klikove i razočarane pozive. Rešenje je bilo da ta fraza dobije pravo pitanje u FAQ-u sa iskrenim odgovorom (cena zavisi od pesme, javite se za okvirnu), bez brojeva koje studio nije potvrdio. Drugi deo posla bilo je čišćenje: kod je došao od molerske firme, pa su domen, naslovi, sitemap i robots morali da se prebace do poslednjeg URL-a, a stilovi za usluge i portfolio koje studio ne koristi da se izbace.",
      en: "People most often search for the price of recording a song, and studios almost never publish a price list. A made-up price would bring clicks and disappointed calls. The fix was to give that phrase a real FAQ question with an honest answer (the price depends on the song, get in touch for an estimate), with no numbers the studio had not confirmed. The other part of the job was cleanup: the code came from a house-painting business, so the domain, titles, sitemap and robots had to move over down to the last URL, and the styles for services and portfolio pages the studio does not use had to go.",
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
    team: { sr: "Pod brendom IT Expert", en: "Under the IT Expert brand" },
    scale: {
      sr: "3 stranice, 14 commit-a u dva repoa, 2 slike i 1 font, statičan build",
      en: "3 pages, 14 commits across two repos, 2 images and 1 font, static build",
    },
    impact: {
      sr: [
        "Posetilac sa telefona je uvek jedan dodir od poziva, WhatsApp-a ili Viber-a.",
        "Lighthouse na telefonu: 90+ za performanse, pristupačnost, najbolje prakse i SEO.",
        "Sajt nema server ni bazu, pa hosting ne košta i posle objave nema šta da se ažurira.",
      ],
      en: [
        "A visitor on a phone is always one tap away from a call, WhatsApp or Viber.",
        "Lighthouse on a phone: 90+ for performance, accessibility, best practices and SEO.",
        "The site has no server or database, so hosting costs nothing and there is nothing to update after launch.",
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
      sr: "Stanke Enterijer je molerska firma iz Beograda: krečenje, gletovanje, priprema zidova i farbanje stanova, kuća i manjih poslovnih prostora. Ljudi takav posao najčešće traže na telefonu i žele odmah da pozovu, pa je cilj bio kratak sajt koji se brzo otvara i na svakom ekranu nudi poziv. Prvu verziju sam napravio u martu 2026. na Nuxt-u, iz šablona IT Expert-a. U junu sam je prebacio na nov šablon sa komponentama i za nedelju dana očistio: izbacio stranice koje firma ne koristi (usluge, portfolio i paketi) i kontakt formu, prebacio slike u WebP, dodao sitemap, robots.txt i logo. Na kraju sam ceo sajt prepisao u ravne statične stranice, a verziju sa komponentama sačuvao na posebnoj grani. Sajt ima tri stranice (početna, O nama i Kontakt), generiše se u gotov HTML i stoji na GitHub Pages. Kasnije je poslužio kao osnova za sajt Vuk Studija.",
      en: "Stanke Enterijer is a Belgrade house-painting business: wall painting, skim coating, wall preparation and painting for flats, houses and small offices. People usually look for this kind of work on a phone and want to call straight away, so the goal was a short site that opens fast and offers a call on every screen. I built the first version in March 2026 in Nuxt, from the IT Expert template. In June I moved it onto a new component-based template and cleaned it up within a week: I removed the pages the business does not use (services, portfolio and packages) and the contact form, moved images to WebP, and added a sitemap, robots.txt and the logo. Finally I rewrote the whole site as flat static pages and kept the component version on a separate branch. The site has three pages (home, About and Contact), is generated as plain HTML and hosted on GitHub Pages. It later became the base for the Vuk Studio site.",
    },
    did: {
      sr: [
        "Početna u šest sekcija: hero sa potezima četke nacrtanim u SVG-u i CSS gradijentima, šest usluga, zašto baš oni, postupak u četiri koraka, obećanja i poziv na kraju.",
        "Kontakt bez forme: poziv, WhatsApp, Viber i mejl, a na telefonu dugme za poziv stoji pri dnu ekrana dok se skroluje.",
        "Stranica Kontakt sa radnim vremenom, zonom rada i čestim pitanjima; O nama sa pričom firme, vrednostima i onim što klijent može da očekuje.",
        "Naslov, opis, Open Graph i canonical za svaku stranicu; početna cilja „moler Beograd“, uz krečenje, gletovanje i farbanje u naslovu.",
        "Slike iz JPG-a u WebP: fotografija za O nama sa 84,7 na 7,6 KB, hero sa 45 na 3,1 KB.",
        "Inter Variable sveden skriptom na latinicu sa slovima č, ć, đ, š i ž, u jednom woff2 fajlu, bez spoljnog servisa za fontove.",
        "GitHub Actions build na Node-u i objava na GitHub Pages posle svakog push-a.",
      ],
      en: [
        "A home page in six sections: a hero with brush strokes drawn in SVG and CSS gradients, six services, why choose them, a four-step process, promises and a closing call to action.",
        "Contact with no form: call, WhatsApp, Viber and email, and on a phone a call button stays at the bottom of the screen while you scroll.",
        "A Contact page with working hours, service area and common questions; an About page with the business story, values and what a client can expect.",
        "A title, description, Open Graph tags and canonical for each page; the home page targets the Serbian for house painter Belgrade, with painting and skim coating in the title.",
        "Images from JPG to WebP: the About photo from 84.7 to 7.6 KB, the hero from 45 to 3.1 KB.",
        "Inter Variable cut down by a script to Latin with č, ć, đ, š and ž, in a single woff2 file, with no outside font service.",
        "A GitHub Actions build on Node and a GitHub Pages deploy after every push.",
      ],
    },
    hard: {
      sr: "Šablon iz koga je sajt nastao bio je pravljen za veće sajtove: komponente, composable-i, fajlovi sa podacima i dvadesetak malih CSS fajlova koji se učitavaju po sekciji dok se skroluje. Za tri stranice to je bio višak koda i zahteva, a CSS ubačen u toku rada na telefonu kasni za prvim prikazom. Zato sam sajt prepisao u ravne stranice sa jednim CSS fajlom koji build ubacuje direktno u HTML i jednim fontom. Verzija sa komponentama ostala je na posebnoj grani, pa se dva pristupa mogu uporediti. Usput je pukla hidracija: dugme za povratak na vrh i dugme za poziv renderovali su se preko Teleport-a, pa se HTML sa servera nije slagao sa onim u pretraživaču. Rešenje je bilo da se oba prikazuju samo na klijentu.",
      en: "The template the site came from was made for bigger sites: components, composables, data files and about twenty small CSS files loaded per section while you scroll. For three pages that meant extra code and extra requests, and CSS injected at runtime on a phone arrives after the first paint. So I rewrote the site as flat pages with one CSS file the build inlines straight into the HTML, and one font. The component version stayed on a separate branch, so the two approaches can be compared. Along the way hydration broke: the back-to-top button and the call button rendered through a Teleport, so the server HTML did not match the browser's. The fix was to render both on the client only.",
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
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "Statičan sajt, 72 frejma rotacije, bez servera i baze, izrada za pet dana",
      en: "Static site, a 72-frame turntable, no server or database, built in five days",
    },
    impact: {
      sr: [
        "Zubotehničke laboratorije na prvom ekranu vide šta firma radi: presek krunice na implantu, sloj po sloj, umesto stock fotografije.",
        "Lighthouse za početnu: 90+ za performanse na telefonu i na desktopu, 100 za pristupačnost i SEO.",
        "Sajt nema server ni bazu, pa stoji na besplatnom hostingu i posle objave nema šta da se održava.",
      ],
      en: [
        "Dental labs see on the first screen what the company makes: a crown on an implant, layer by layer, instead of a stock photo.",
        "Lighthouse for the home page: 90+ for performance on mobile and desktop, 100 for accessibility and SEO.",
        "The site has no server or database, so it runs on free hosting and needs no upkeep after launch.",
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
      en: "A site for metal 3D printing and milling for dental labs, with a crown cross-section from Blender.",
    },
    summary: {
      sr: "NST Print and Mill Centar iz Beograda 3D štampa kobalt-hrom i titanijum i gloda konstrukcije za zubotehničke laboratorije. Kupci su laboratorije i ordinacije, pa sajt mora da pokaže sam proizvod i jasno kaže kako se radi posao. Sajt sam napravio sam, od dizajna do objave, za pet dana u septembru 2026. To je statičan Next.js sa TypeScript-om i Tailwind-om: build ispisuje gotov HTML koji stoji na GitHub Pages, bez servera i baze. Početna je napravljena oko jednog vizuala: preseka krunice na implantu koji se na skrol razmiče sloj po sloj, sa nazivom materijala uz svaki sloj. Ispod su proizvodni program, fotografije iz proizvodnje, rotacija preseka koja se vrti prstom, deo o materijalima i postupak od fajla do isporuke u četiri koraka. Projekat je pod ugovorom o poverljivosti, pa ovde pokazujem samo početnu stranicu.",
      en: "NST Print and Mill Centar in Belgrade 3D prints cobalt-chrome and titanium and mills frameworks for dental labs. Its customers are labs and dental practices, so the site has to show the product itself and say clearly how the work gets done. I built it alone, from design to launch, in five days in September 2026. It is a static Next.js site with TypeScript and Tailwind: the build writes plain HTML that sits on GitHub Pages, with no server or database. The home page is built around one visual: a cross-section of a crown on an implant that spreads apart layer by layer as you scroll, with the material named next to each layer. Below it come the product range, photos from production, a turntable of the cross-section you can spin with a finger, a section on materials and a four-step process from file to delivery. The project is under a non-disclosure agreement, so I show only the home page here.",
    },
    did: {
      sr: [
        "Hero sa presekom: slojevi renderovani iz Blender-a kao WebP sa providnošću, iz iste ortografske kamere, pa se u stranici samo slažu jedan preko drugog.",
        "Rotacija preseka od 72 frejma koja se vrti sama, a može i mišem i prstom; vertikalni skrol kroz nju i dalje radi na telefonu.",
        "Tipografija za tehničku publiku: Archivo za naslove, Inter za tekst i IBM Plex Mono za oznake i brojeve, na tamnoplavoj paleti.",
        "Sve slike u WebP-u sa zadatim dimenzijama i lenjim učitavanjem ispod prvog ekrana; fontovi sa metrički podešenim rezervnim fontom, pa tekst ne skače.",
        "Metapodaci i canonical za svaku stranicu, jezik sr-RS i JSON-LD: Organization sa kontakt podacima i Service za svaku uslugu.",
        "GitHub Actions deploy koji radi i na github.io podfolderu i na sopstvenom domenu.",
      ],
      en: [
        "A cross-section hero: layers rendered from Blender as WebP with transparency, all from the same orthographic camera, so the page only stacks them.",
        "A 72-frame turntable of the cross-section that spins on its own and can be turned with a mouse or a finger; vertical scrolling through it still works on a phone.",
        "Typography for a technical audience: Archivo for headings, Inter for text and IBM Plex Mono for labels and figures, on a deep navy palette.",
        "Every image in WebP with set dimensions and lazy loading below the first screen; fonts with metric-matched fallbacks, so text does not jump.",
        "Metadata and a canonical URL on every page, sr-RS as the language, and JSON-LD: Organization with contact details and a Service for each offering.",
        "A GitHub Actions deploy that works both in a github.io subfolder and on a custom domain.",
      ],
    },
    hard: {
      sr: "Posle jedne verzije koja je bila prebrza i jedne koja je seckala, rotacija je završila na 72 frejma na 10 fps, 7,2 sekunde po krugu. Tu se pojavio limit formata: 72 frejma po 380 piksela daju traku široku 27.360 piksela, a WebP ide najviše do 16.383. Traka je zato složena u mrežu 12 puta 6, a pomeraj ide po obe ose. Drugi problem je bio što je objekat klizio levo-desno umesto da se okreće u mestu. Model je presečen na pola, pa masa koja ostane kruži oko ose i silueta luta 36 piksela. Skripta sada svakom frejmu meri granice neprovidnog dela i centrira ga, i posle toga je centar na 190 ili 191 piksela u svakom frejmu.",
      en: "After one version that spun too fast and one that looked choppy, the turntable settled at 72 frames at 10 fps, 7.2 seconds per turn. That ran into a format limit: 72 frames of 380 pixels make a strip 27,360 pixels wide, and WebP stops at 16,383. So the strip is laid out as a 12 by 6 grid and the offset moves on both axes. The other problem was that the object slid left and right instead of turning in place. The model is cut in half, so the remaining mass orbits the axis and the silhouette wanders by 36 pixels. A script now measures the opaque bounds of every frame and centres it, and after that the centre sits at 190 or 191 pixels in every frame.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Blender",
      "JSON-LD",
      "GitHub Pages",
    ],
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
    team: { sr: "Sam, kao spoljni saradnik", en: "Solo, as an external associate" },
    scale: {
      sr: "Javni sportski centar, WordPress, ćirilica i latinica, 8 rubrika u meniju",
      en: "Public sports centre, WordPress, Cyrillic and Latin script, 8 menu sections",
    },
    impact: {
      sr: [
        "Posetioci na sajtu nalaze važeće informacije: cenovnik bazena za tekuću godinu, vesti i javne nabavke.",
        "Zaposleni imaju jednu osobu kojoj šalju sve izmene za sajt.",
        "Sajt koji postoji od 2018. i dalje radi na istom dizajnu, sa ažurnim sadržajem.",
      ],
      en: [
        "Visitors find current information on the site: this year's pool price list, news and public tenders.",
        "The staff have one person they send every site change to.",
        "A site that has existed since 2018 still runs on its original design, with current content.",
      ],
    },
    image: "/images/projects/olimp.webp",
    title: "Sportski centar Olimp",
    client: "SC Olimp, Zvezdara",
    kind: "maintenance",
    featured: false,
    year: "2024 – 2026",
    role: {
      sr: "Održavanje sajta (spoljni saradnik)",
      en: "Website maintenance (external associate)",
    },
    tagline: {
      sr: "Oko dve godine održavam sajt javnog sportskog centra na Zvezdari, na ćirilici i latinici.",
      en: "For about two years I have kept a public sports centre's site current, in Cyrillic and Latin.",
    },
    summary: {
      sr: "Sportski centar Olimp je javno preduzeće na Zvezdari, sa bazenima, teniskim terenima, teretanom, sportskom dvoranom, dečijim igralištem i letnjom pozornicom. Sajt nisam dizajnirao ni pravio: postoji od 2018. i radi na WordPress-u sa WPBakery page builder-om i LayerSlider-om. Održavam sajt oko dve godine, kao spoljni saradnik. Posao je da sajt bude tačan i da radi. Nove cene, vesti, dokumenti i objave o nabavkama idu na sajt kada ih centar pošalje, a WordPress, tema i dodaci se ažuriraju tako da se izgled stranica ne promeni. Sajt je primarno na ćirilici, sa prekidačem za latinicu u meniju, pa svaka izmena mora da izgleda dobro u oba pisma. Meni ima osam rubrika: O nama (sa istorijom, putem do centra i upravom), Objekti, Programi, Klub/škola, Cenovnik bazena, Vesti, Javne nabavke i Kontakt.",
      en: "Olimp is a public sports centre in Zvezdara, Belgrade, with pools, tennis courts, a gym, a sports hall, a playground and an open-air stage. I did not design or build the site: it has existed since 2018 and runs on WordPress with the WPBakery page builder and LayerSlider. I have maintained it for about two years as an external associate. The job is to keep the site accurate and working. New prices, news, documents and tender notices go on the site when the centre sends them, and WordPress, the theme and plugins are updated in a way that leaves the pages looking the same. The site is primarily in Cyrillic, with a Latin switch in the menu, so every change has to read well in both scripts. The menu has eight sections: About (with history, directions and management), Facilities, Programmes, Club/school, Pool prices, News, Public tenders and Contact.",
    },
    did: {
      sr: [
        "Ažuriranje sadržaja: cenovnik bazena za 2026. godinu, vesti i stranice objekata, programa i klubova.",
        "Objave u rubrici Javne nabavke i dokumenti u podnožju sajta, onako kako ih centar pripremi.",
        "Provera da svaka izmena radi i na ćirilici i na latinici, u meniju, naslovima i podnožju.",
        "Ažuriranja WordPress-a, teme i dodataka (WPBakery, LayerSlider), uz pregled glavnih stranica posle svakog ažuriranja.",
        "Podrška zaposlenima: sve što treba objaviti ili promeniti ide preko mene.",
      ],
      en: [
        "Content updates: the 2026 pool price list, news and the facility, programme and club pages.",
        "Posts in the Public tenders section and documents in the site footer, exactly as the centre prepares them.",
        "Checking that every change works in both Cyrillic and Latin, in the menu, headings and footer.",
        "Updates to WordPress, the theme and plugins (WPBakery, LayerSlider), with a pass over the main pages after each update.",
        "Support for the staff: anything that needs publishing or changing goes through me.",
      ],
    },
    hard: {
      sr: "Sajt je nasleđen, sa temom i page builder-om iz 2018. i sadržajem na dva pisma. Kod takvog sajta najveći rizik nije nova funkcija nego ažuriranje: novija verzija dodatka lako promeni izgled stranice koju niko nije dirao godinama. Zato ne menjam dizajn ni strukturu bez potrebe, izmene radim u postojećim šablonima, a posle ažuriranja prolazim početnu i glavne rubrike u oba pisma. Javna ustanova ima i svoja pravila o objavama, pa tekstovi o nabavkama i cenama idu na sajt u obliku u kome ih centar pošalje, bez mojih izmena.",
      en: "The site is inherited, with a theme and page builder from 2018 and content in two scripts. On a site like that the biggest risk is not a new feature but an update: a newer plugin version can easily change the look of a page nobody has touched in years. So I do not change the design or structure without a reason, I make changes inside the existing templates, and after updates I go through the home page and main sections in both scripts. A public institution also has its own rules about publishing, so tender notices and prices go on the site in the form the centre sends them, without my edits.",
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
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "24 commit-a, ~5.8k linija, auth, baza, drag and drop",
      en: "24 commits, ~5.8k lines, auth, database, drag and drop",
    },
    impact: {
      sr: [
        "Najnoviji Next.js (cacheComponents, Server Actions) u aplikaciji koja radi, sa bazom i prijavom, a ne u tutorijalu.",
        "Bezbednost od početka: Zod na svakoj akciji, provera vlasnika zapisa, ograničen broj zahteva, CSP i HSTS.",
        "Svaka ispravka u istoriji ima commit koji objašnjava uzrok, a ne samo šta je promenjeno.",
      ],
      en: [
        "The latest Next.js (cacheComponents, Server Actions) in a working app with a database and sign-in, not a tutorial.",
        "Security from the start: Zod on every action, record-owner checks, rate limits, CSP and HSTS.",
        "Every fix in the history has a commit that explains the cause, not just what changed.",
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
      sr: "Tabla sa kolonama Wish List, Applied, Interviewing, Offer i Rejected, na kojoj se prijava za posao prevlači kako napreduje. Uz svaku prijavu stoje firma, pozicija, link oglasa, plata, beleške i tagovi. Napravio sam je sam: 23 commit-a od 31. jula do 4. avgusta 2026, i jedan u septembru koji je pooštrio prijavu i podigao zavisnosti. Next.js sa cacheComponents, Server Actions kao jedini put za upis, MongoDB kroz Mongoose, Better Auth za prijavu mejlom i preko Google-a, dnd-kit za prevlačenje. Svaka izmena na tabli je optimistična: kartica se pomeri odmah, a ako server odbije, tabla se vraća na stanje pre akcije i korisnik dobija poruku. Veći deo tog vremena otišao je na greške koje se ne vide u demo verziji. Svaka je ispravljena posebnim commit-om koji objašnjava uzrok.",
      en: "A board with Wish List, Applied, Interviewing, Offer and Rejected columns, where a job application is dragged along as it moves forward. Each one carries the company, role, job ad link, salary, notes and tags. I built it alone: 23 commits from 31 July to 4 August 2026, plus one in September that tightened sign-in and upgraded dependencies. Next.js with cacheComponents, Server Actions as the only write path, MongoDB through Mongoose, Better Auth for email and Google sign-in, dnd-kit for dragging. Every change on the board is optimistic: the card moves at once, and if the server refuses, the board returns to its state before the action and the user sees a message. Most of that time went into bugs you do not see in a demo. Each got its own commit explaining the cause.",
    },
    did: {
      sr: [
        "Prevlačenje između kolona i unutar kolone, sa jednim mestom veličine kartice koje pokazuje gde će kartica pasti. Escape vraća tablu, a spuštanje na isto mesto ne šalje upis.",
        "Kolone koje korisnik sam dodaje, preimenuje i briše; sve tri akcije prolaze kroz istu proveru vlasnika table.",
        "Pregled iznad table: ukupan broj prijava, koliko ih je stiglo ove nedelje i raspodela po kolonama kao složena traka.",
        "Tamni režim, stranica sa podešavanjima (ime, mejl, lozinka, izgled) i Google prijava koja se pojavljuje samo kada su podešeni ključevi.",
        "Mejlovi za verifikaciju i reset lozinke preko SMTP-a, pa je promena provajdera promena env promenljive, a ne koda.",
        "Zod validacija svake server akcije i env promenljivih; CSP i HSTS zaglavlja; najviše tri zahteva za reset ili verifikaciju na sat.",
        "Primarna boja promenjena iz roze u plavu: beli tekst na roze bio je 2,97:1, ispod AA praga, a na plavoj je 5,17:1. Boje kolona proverene i za daltonizam.",
        "Početna strana, 404, error boundary i skeleton table umesto teksta „Loading...“.",
      ],
      en: [
        "Drag between and within columns, with a single card-sized gap that shows where the card will land. Escape restores the board, and dropping a card where it started sends no write.",
        "Columns the user adds, renames and deletes; all three actions go through the same board-ownership check.",
        "A summary above the board: total applications, how many arrived this week and the split per column as a stacked bar.",
        "Dark mode, a settings page (name, email, password, appearance) and Google sign-in that only appears when its keys are configured.",
        "Verification and password reset emails over SMTP, so switching provider is an env change rather than a code change.",
        "Zod validation on every server action and env variable; CSP and HSTS headers; at most three reset or verification requests per hour.",
        "The primary colour moved from pink to blue: white on the pink was 2.97:1, below the AA threshold, and on the blue it is 5.17:1. Column colours were checked for colour blindness too.",
        "A landing page, a 404 page, an error boundary and a board skeleton instead of a Loading... paragraph.",
      ],
    },
    hard: {
      sr: "Optimistično prevlačenje preko više kolona: ako server odbije, tabla mora da se vrati tačno na prethodno stanje, a ne na neku sredinu. Rešenje je snimak kolona pre akcije i vraćanje celog snimka, ne pojedinačnih kartica. Prva verzija je ipak imala rupu. Server akcija odbija potez tako što vrati grešku, a ne tako što baci izuzetak, pa catch blok nikad nije video odbijanje. Kartica je ostajala u novoj koloni, a baza je čuvala staru. Sada se vraćanje pokreće i kad akcija vrati grešku i kad baci izuzetak, a korisnik dobija poruku umesto kartice koja tiho stoji na pogrešnom mestu. Slična greška krila se u ključevima liste: kartice su bile ključevane po poziciji, pa je posle prevlačenja otvoren dijalog za izmenu mogao da ostane vezan za pogrešnu prijavu.",
      en: "Optimistic drag across several columns: if the server rejects, the board must return to exactly the previous state, not some middle ground. The fix is a snapshot of the columns before the action and restoring the whole snapshot, not individual cards. The first version still had a hole. The server action refuses a move by returning an error, not by throwing, so the catch block never saw the refusal. The card stayed in its new column while the database kept the old one. Now the rollback runs both when the action returns an error and when it throws, and the user gets a message instead of a card sitting quietly in the wrong place. A similar bug hid in the list keys: cards were keyed by position, so after a drag an open edit dialog could stay attached to the wrong application.",
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
      sr: "Nedeljni plan treninga koji AI napravi iz šest pitanja, sa svakim odgovorom modela proverenim pre baze.",
      en: "A weekly training plan an AI writes from six questions, with every model reply validated before it reaches the database.",
    },
    summary: {
      sr: "Aplikaciju sam napravio sam, od praznog repoa do dokumentacije, u 21 commit-u od avgusta do septembra 2026. Korisnik odgovori na šest pitanja (cilj, iskustvo, broj dana, dužina treninga, oprema, podela treninga) i po želji opiše povredu. Server od toga sastavi prompt, a model preko OpenRouter-a vrati ceo nedeljni program: vežbe, serije, ponavljanja, pauze, RPE, savete za tehniku, zamenske vežbe i pravila progresije. Front je React sa Vite-om i Tailwind-om, API je Express, podaci su u Neon Postgres bazi kroz Prisma-u, a prijava ide preko Neon Auth-a. Svako novo generisanje čuva se kao nova verzija, pa se korisnik uvek može vratiti na stari plan.",
      en: "I built it alone, from an empty repo to the docs, in 21 commits from August to September 2026. The user answers six questions (goal, experience, days per week, session length, equipment, training split) and can describe an injury. The server turns that into a prompt, and a model on OpenRouter returns a full weekly program: exercises, sets, reps, rest, RPE, form cues, swap-in alternatives and progression rules. The front end is React with Vite and Tailwind, the API is Express, data lives in Neon Postgres through Prisma, and sign-in runs on Neon Auth. Every regeneration is stored as a new version, so the user can always go back to an old plan.",
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
    team: { sr: "Sam", en: "Solo" },
    scale: {
      sr: "22 commit-a, 64 fajla, ~2.6k linija, Clerk organizacije, Postgres",
      en: "22 commits, 64 files, ~2.6k lines, Clerk organizations, Postgres",
    },
    impact: {
      sr: [
        "Full-stack Next.js sa pravom prijavom, bazom i tokom odobravanja, ne samo front.",
        "Keširanje po komponentama: statični delovi stranice stižu odmah, a samo ono što zavisi od korisnika čeka server.",
      ],
      en: [
        "Full-stack Next.js with real sign-in, a database and an approval flow, not just a front end.",
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
      sr: "LaunchHub stavlja novi model keširanja iz Next.js na pravu aplikaciju sa javnim i zaštićenim delom. Napravio sam ga za sedam dana, u 22 commit-a od 22. do 28. decembra 2025, uz jednu dopunu u septembru 2026. Autor prijavi proizvod sa opisom, linkom i tagovima; proizvod čeka admina, a posle odobrenja se pojavljuje na početnoj i na /explore, gde posetioci glasaju. Stack je Next.js sa Server Components i Server Actions, Clerk za prijavu i organizacije, Neon Postgres kroz Drizzle ORM i shadcn/ui komponente. Uključen je cacheComponents, pa su liste i stranice proizvoda keširane, a dinamični delovi stižu kroz Suspense sa skeletonima.",
      en: "LaunchHub puts the new Next.js caching model to work in a real app with both a public and a protected side. I built it in seven days, 22 commits from 22 to 28 December 2025, plus one update in September 2026. An author submits a product with a description, link and tags; it waits for an admin, and once approved it shows up on the home page and /explore, where visitors vote. The stack is Next.js with Server Components and Server Actions, Clerk for sign-in and organizations, Neon Postgres through Drizzle ORM, and shadcn/ui. cacheComponents is on, so product lists and pages are cached, and the dynamic parts stream in through Suspense with skeletons.",
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
      sr: "Chat bez naloga i bez istorije: otvorite sobu, pošaljete link jednoj osobi, i posle deset minuta od razgovora ne ostaje ništa. Napravio sam ga sam za dva dana, 28. i 29. decembra 2025, u 17 commit-a. Next.js nosi i front i API: Elysia je montirana u jednu catch-all rutu, a Eden Treaty klijent daje tipizirane pozive bez posebnog SDK-a. Upstash Redis čuva sobu i poruke sa rokom trajanja, Upstash Realtime šalje četiri vrste događaja (poruka, kucanje, pročitano, uništi), a TanStack Query drži stanje na klijentu. Korisničko ime je nasumično, izgled je terminal sa JetBrains Mono fontom.",
      en: "A chat with no account and no history: open a room, send the link to one person, and ten minutes later nothing of the conversation is left. I built it alone in two days, 28 and 29 December 2025, in 17 commits. Next.js carries both the front end and the API: Elysia is mounted in one catch-all route, and the Eden Treaty client gives typed calls without a separate SDK. Upstash Redis stores the room and messages with an expiry, Upstash Realtime pushes four event types (message, typing, read, destroy), and TanStack Query holds client state. The username is random and the look is a terminal in JetBrains Mono.",
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
export const clientProjects = projects.filter((p) => p.kind !== "personal");
export const personalProjects = projects.filter((p) => p.kind === "personal");
