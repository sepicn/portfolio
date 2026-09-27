import type { Localized, LocalizedList } from "../i18n";
import type { ServiceId } from "./service-slugs";

export type { ServiceId };

export type Service = {
  id: ServiceId;
  title: Localized;
  lead: Localized;
  includes: LocalizedList;
  forWhom: Localized;
  /** Case study slugs that show this service in real work, linked from /services. */
  examples: string[];
};

export const services: Service[] = [
  {
    id: "web",
    examples: ["medical-time", "mango", "vuk-studio", "prostor-izmedju"],
    title: { sr: "Sajtovi i web aplikacije", en: "Websites and web apps" },
    lead: {
      sr: "Od prezentacionog sajta za lokalnu firmu do platforme sa nalozima, plaćanjem i administracijom, kakvu gradim za privatnu bolnicu. Kod pišem sam, bez tema i page builder-a, pa je sajt brz i lako se menja.",
      en: "From a business website to a platform with accounts, payments and an admin panel, like the one I build for a private hospital. I write the code myself, no themes or page builders, so the site stays fast and easy to change.",
    },
    includes: {
      sr: [
        "Next.js ili Nuxt sa SSR-om, TypeScript, Tailwind",
        "Višejezičnost sa lokalizovanim URL-ovima",
        "Kontakt i forme za zakazivanje, cookie consent, GTM",
        "Performanse: Lighthouse 90+ na mobilnom kao uslov predaje",
        "Održavanje i sitne izmene posle lansiranja",
      ],
      en: [
        "Next.js or Nuxt with SSR, TypeScript, Tailwind",
        "Multiple languages with localized URLs",
        "Contact and booking forms, cookie consent, GTM",
        "Performance: Lighthouse 90+ on mobile as a delivery condition",
        "Maintenance and small changes after launch",
      ],
    },
    forWhom: {
      sr: "Ordinacije, saloni, restorani, studiji, zanatlije i firme kojima treba sajt koji donosi upite, ne samo lep izgled.",
      en: "Clinics, salons, restaurants, studios, trades and companies that need a site that brings inquiries, not only a nice look.",
    },
  },
  {
    id: "google-ads",
    examples: ["medical-time"],
    title: { sr: "Google Ads", en: "Google Ads" },
    lead: {
      sr: "Search i Performance Max kampanje za upite koje ljudi već kucaju: „zubar Vračar“, „moler Beograd“. Postavljam merenje konverzija pre prvog dinara budžeta, pa se zna šta radi. Za privatnu bolnicu vodim osam Search kampanja: iz izveštaja o pretragama izbacio sam 370+ nerelevantnih upita, a najbolje kampanje imaju i do 54% nižu cenu konverzije od proseka naloga.",
      en: 'Search and Performance Max campaigns for what people already type: "dentist Vračar", "painter Belgrade". Conversion tracking is set up before the first dinar of budget, so we know what works. For a private hospital I run eight Search campaigns: I cut 370+ irrelevant queries from the search term reports, and the best campaigns run up to 54% below the account-average cost per conversion.',
    },
    includes: {
      sr: [
        "Istraživanje ključnih reči i negativne reči iz stvarnih izveštaja o pretragama",
        "Struktura kampanja, oglasi, ekstenzije, landing stranice",
        "Limit cene po kliku i preraspodela budžeta po udelu izgubljenih prikaza",
        "Konverzije kroz GA4 i GTM (poziv, forma, WhatsApp)",
        "Zaštita od lažnih klikova (ClickCease)",
        "Mesečni izveštaj na jednoj strani, bez žargona",
      ],
      en: [
        "Keyword research and negative keywords from real search term reports",
        "Campaign structure, ads, extensions, landing pages",
        "CPC caps and budget reallocation based on lost impression share",
        "Conversions through GA4 and GTM (call, form, WhatsApp)",
        "Click fraud protection (ClickCease)",
        "A one-page monthly report, no jargon",
      ],
    },
    forWhom: {
      sr: "Lokalne usluge sa jasnom namerom pretrage, gde jedan novi klijent vredi više od cene klika.",
      en: "Local services with clear search intent, where one new customer is worth more than the cost of the clicks.",
    },
  },
  {
    id: "meta-ads",
    examples: ["medical-time"],
    title: {
      sr: "Meta Ads (Facebook i Instagram)",
      en: "Meta Ads (Facebook and Instagram)",
    },
    lead: {
      sr: "Kampanje za ponude koje treba pokazati ljudima pre nego što ih traže: estetski tretmani, torte, snimanje u studiju. Kreative, publike i testiranje, pa skaliranje onoga što donosi upite. Meta nalog privatne bolnice vodim uz njen Google Ads.",
      en: "Campaigns for offers people need to see before they search: aesthetic treatments, cakes, studio recording. Creatives, audiences and testing, then scaling what brings inquiries. I run a private hospital's Meta account alongside its Google Ads.",
    },
    includes: {
      sr: [
        "Pixel i Conversions API, događaji koji se stvarno mere",
        "Kreative u saradnji sa klijentom (fotografije, kratki video)",
        "Publike: lokacija, interesovanja, retargeting posetilaca sajta",
        "A/B testiranje oglasa i landing stranica",
      ],
      en: [
        "Pixel and Conversions API, events that actually measure",
        "Creatives made with the client (photos, short video)",
        "Audiences: location, interests, retargeting of site visitors",
        "A/B testing of ads and landing pages",
      ],
    },
    forWhom: {
      sr: "Firme sa vizuelnom ponudom i ponovnim kupcima.",
      en: "Businesses with a visual offer and repeat customers.",
    },
  },
  {
    id: "seo",
    examples: ["medical-time", "vuk-studio"],
    title: { sr: "SEO i analitika", en: "SEO and analytics" },
    lead: {
      sr: "Tehnički SEO koji Google stvarno nagrađuje: brzina, struktura, hreflang, JSON-LD, sitemap bez grešaka. Na medicaltime.rs: Site Health 90% → 98% za nedelju dana, greške 6 → 0. Plus GA4 i GTM postavka da izveštaji pokazuju upite, ne samo posete.",
      en: "Technical SEO that Google actually rewards: speed, structure, hreflang, JSON-LD, an error-free sitemap. On medicaltime.rs: Site Health 90% → 98% in one week, errors 6 → 0. Plus GA4 and GTM set up so reports show inquiries, not just visits.",
    },
    includes: {
      sr: [
        "Audit (Semrush, Search Console, Lighthouse) sa listom popravki po prioritetu",
        "Tehničke popravke direktno u kodu sajta",
        "Lokalni SEO: Google Business profil, LocalBusiness podaci",
        "GA4 događaji i konverzije, GTM kontejner, consent mode",
      ],
      en: [
        "Audit (Semrush, Search Console, Lighthouse) with a prioritized fix list",
        "Technical fixes directly in the site code",
        "Local SEO: Google Business profile, LocalBusiness data",
        "GA4 events and conversions, GTM container, consent mode",
      ],
    },
    forWhom: {
      sr: "Sajtovi koji postoje, ali ih Google ne pokazuje, ili se ne zna odakle dolaze upiti.",
      en: "Sites that exist but Google does not show, or where nobody knows where the inquiries come from.",
    },
  },
];

export const process = {
  sr: [
    {
      title: "Razgovor",
      body: "Pola sata uživo ili online. Šta prodajete, kome, šta danas donosi klijente. Bez upitnika od dvadeset strana.",
    },
    {
      title: "Predlog",
      body: "Za dva dana dobijate predlog sa obimom, rokom i cenom. Ako je sajt, i skicu strukture. Ako su oglasi, i procenu budžeta.",
    },
    {
      title: "Rad",
      body: "Sajt gledate na privremenoj adresi dok nastaje. Kampanje pratite u zajedničkom izveštaju. Pišete mi kad god nešto nije jasno.",
    },
    {
      title: "Lansiranje i posle",
      body: "Merenje radi od prvog dana. Prvih mesec dana izmene su uključene, posle toga dogovor o održavanju.",
    },
  ],
  en: [
    {
      title: "A conversation",
      body: "Half an hour in person or online. What you sell, to whom, what brings customers today. No twenty-page questionnaire.",
    },
    {
      title: "A proposal",
      body: "Within two days you get a proposal with scope, deadline and price. For a site, a structure sketch. For ads, a budget estimate.",
    },
    {
      title: "The work",
      body: "You watch the site take shape on a preview address. You follow campaigns in a shared report. You message me whenever something is unclear.",
    },
    {
      title: "Launch and after",
      body: "Tracking works from day one. Changes are included for the first month, then we agree on maintenance.",
    },
  ],
};

export const faq = {
  sr: [
    {
      q: "Koliko košta sajt?",
      a: "Zavisi od obima, zato je cena na upit. Posle razgovora dobijate fiksnu cenu u predlogu, bez naknadnih iznenađenja.",
    },
    {
      q: "Koliki budžet treba za Google Ads?",
      a: "Za lokalne usluge u Beogradu kampanja ima smisla od nekoliko stotina evra mesečno. Tačan iznos procenjujem po ključnim rečima i konkurenciji, pre početka.",
    },
    {
      q: "Radite li sa WordPress-om?",
      a: "Održavam postojeće WordPress sajtove kad zatreba, ali nove sajtove pravim u Next.js-u ili Nuxt-u zbog brzine i bezbednosti.",
    },
    {
      q: "Ko je vlasnik koda i naloga?",
      a: "Vi. Sajt je u vašem repozitorijumu i na vašem hostingu, Google Ads i Meta nalozi su na vaše ime, ja imam pristup dok sarađujemo.",
    },
  ],
  en: [
    {
      q: "How much does a website cost?",
      a: "It depends on scope, which is why pricing is on request. After the conversation you get a fixed price in the proposal, no surprises later.",
    },
    {
      q: "What budget do I need for Google Ads?",
      a: "For local services in Belgrade a campaign makes sense from a few hundred euros a month. I estimate the exact amount from keywords and competition before starting.",
    },
    {
      q: "Do you work with WordPress?",
      a: "I maintain existing WordPress sites when needed, but I build new sites in Next.js or Nuxt for speed and security.",
    },
    {
      q: "Who owns the code and the accounts?",
      a: "You do. The site lives in your repository and on your hosting, the Google Ads and Meta accounts are in your name, and I have access while we work together.",
    },
  ],
};

// ---------------------------------------------------------------------------------------
// Service pages (/usluge/[service], /en/services/[service]). One page per service, each
// written natively in both languages. Numbers follow the public-metrics rule: only
// percentages and counts of my own work, never client spend or conversion counts.
// ---------------------------------------------------------------------------------------

type Item = { title: string; body: string };
type Step = { title: string; time: string; body: string };
type QA = { q: string; a: string };
type PerLocale<T> = { sr: T[]; en: T[] };

export type ServicePage = {
  /** The keyword H1 of the page. */
  h1: Localized;
  /** Search title; the layout appends " | Nikola Šepić", so keep it under ~50 characters. */
  metaTitle: Localized;
  /** 140 to 160 characters, unique per page and locale. */
  metaDescription: Localized;
  /** Opening paragraphs: what, for whom, how long, proof. */
  intro: LocalizedList;
  forWhom: LocalizedList;
  notFor: Localized;
  includedTitle: Localized;
  included: PerLocale<Item>;
  processTitle: Localized;
  process: PerLocale<Step>;
  tools: string[];
  toolsNote: Localized;
  measure: LocalizedList;
  timeline: Localized;
  /** Case studies that show this service, with what they prove. */
  proof: { slug: string; text: Localized }[];
  faq: PerLocale<QA>;
};

export const servicePages: Record<ServiceId, ServicePage> = {
  web: {
    h1: { sr: "Izrada sajtova u Beogradu", en: "Web development in Belgrade" },
    metaTitle: {
      sr: "Izrada sajtova Beograd: brzi sajtovi po meri",
      en: "Web development in Belgrade: fast custom sites",
    },
    metaDescription: {
      sr: "Izrada sajtova u Next.js-u i Nuxt-u za firme iz Beograda: Lighthouse 90+ na mobilnom, više jezika, forme i merenje upita. Fiksna ponuda za dva dana.",
      en: "Custom websites and web apps in Next.js and Nuxt for Belgrade businesses: 90+ mobile Lighthouse, multilingual, forms and inquiry tracking. Quote in two days.",
    },
    intro: {
      sr: [
        "Pravim brze sajtove i web aplikacije za firme iz Beograda i regiona, u Next.js-u ili Nuxt-u, bez gotovih tema i page builder-a. Razgovarate direktno sa osobom koja piše kod, podešava merenje i odgovara na vaše poruke. Prezentacioni sajt je obično gotov za dve do četiri nedelje, a fiksnu cenu dobijate u predlogu posle kratkog razgovora.",
        "Sajt predajem tek kada na mobilnom Lighthouse testu ima 90+ za performanse. To se vidi na sajtovima koji već rade: Vuk Studio ima 98 na mobilnom, Mango poslastičarnica 90, a javni sajt bolnice Medical Time, na kome radim od 2025, ima 95.",
      ],
      en: [
        "I build fast websites and web apps for businesses in Belgrade and abroad, in Next.js or Nuxt, with no themes or page builders. You talk directly to the person who writes the code, sets up tracking and answers your messages. A business website usually takes two to four weeks, and you get a fixed price in the proposal after a short call.",
        "A site is handed over only once it scores 90+ for performance in a mobile Lighthouse test. You can check that on sites that are live: Vuk Studio scores 98 on mobile, Mango pastry shop 90, and the public site of Medical Time hospital, which I have worked on since 2025, 95.",
      ],
    },
    forWhom: {
      sr: [
        "Ordinacije, klinike i saloni kojima treba zakazivanje i kratak put do poziva.",
        "Restorani, poslastičarnice i studiji koji žive od fotografija i lokalne pretrage.",
        "Zanatlije i servisi kojima sajt treba da donese upit, a ne samo da postoji.",
        "Firme kojima treba više od sajta: korisnički nalozi, plaćanje, administracija, više jezika.",
      ],
      en: [
        "Clinics, practices and salons that need booking and a short path to a phone call.",
        "Restaurants, pastry shops and studios that live on photos and local search.",
        "Trades and repair services that need the site to bring inquiries, not just exist.",
        "Companies that need more than a website: user accounts, payments, an admin panel, several languages.",
      ],
    },
    notFor: {
      sr: "Ne pravim webshopove sa hiljadama proizvoda i složenim lagerom. Za to su bolji Shopify ili specijalizovana agencija, i reći ću vam to na prvom razgovoru.",
      en: "I do not build shops with thousands of products and complex inventory. Shopify or a specialised agency is a better fit there, and I will tell you so on the first call.",
    },
    includedTitle: {
      sr: "Šta dobijate uz izradu sajta",
      en: "What a website project includes",
    },
    included: {
      sr: [
        {
          title: "Struktura i tekst",
          body: "Pre dizajna dogovaramo stranice i šta svaka treba da postigne. Pomažem oko teksta, a naslove i meta opise pišem prema onome što ljudi zaista kucaju u Google.",
        },
        {
          title: "Dizajn i kod",
          body: "Next.js ili Nuxt sa renderovanjem na serveru, TypeScript i Tailwind. Kod pripada vama, bez licenci za teme i dodatke koje treba plaćati svake godine.",
        },
        {
          title: "Brzina na telefonu",
          body: "Slike se same smanjuju i služe u WebP ili AVIF formatu, fontovi se učitavaju bez treperenja. Na Mango sajtu fotografija od 8 MB postaje 60 do 120 KB, a vlasnica i dalje samo ubaci original.",
        },
        {
          title: "Više jezika",
          body: "Lokalizovani URL-ovi (kao /usluge i /en/services), hreflang i canonical podešeni tako da Google svaku verziju prikaže pravoj publici.",
        },
        {
          title: "Forme, merenje i pristanak",
          body: "Kontakt i zakazivanje, cookie consent, GTM i GA4 događaji za poziv, formu i WhatsApp. Od prvog dana znate odakle dolaze upiti.",
        },
        {
          title: "Tehnički SEO od starta",
          body: "Sitemap, robots, JSON-LD (LocalBusiness, Service, FAQ), Open Graph slike i HTML koji Google čita bez čekanja na JavaScript.",
        },
        {
          title: "Posle lansiranja",
          body: "Prvih mesec dana sitne izmene su uključene. Posle toga dogovaramo održavanje, ili vam predajem sve pristupe i dokumentaciju.",
        },
      ],
      en: [
        {
          title: "Structure and copy",
          body: "Before any design we agree on the pages and what each one has to achieve. I help with the copy and write titles and meta descriptions around what people actually type into Google.",
        },
        {
          title: "Design and code",
          body: "Next.js or Nuxt with server-side rendering, TypeScript and Tailwind. The code is yours, with no theme or plugin licences to renew every year.",
        },
        {
          title: "Speed on a phone",
          body: "Images are resized automatically and served as WebP or AVIF, fonts load without flashing. On the Mango site an 8 MB photo becomes 60 to 120 KB while the owner still just uploads the original.",
        },
        {
          title: "Several languages",
          body: "Localized URLs (like /usluge and /en/services), hreflang and canonical tags set so Google shows each version to the right audience.",
        },
        {
          title: "Forms, tracking and consent",
          body: "Contact and booking forms, cookie consent, GTM and GA4 events for calls, forms and WhatsApp. From day one you know where inquiries come from.",
        },
        {
          title: "Technical SEO from the start",
          body: "Sitemap, robots, JSON-LD (LocalBusiness, Service, FAQ), Open Graph images and HTML that Google reads without waiting for JavaScript.",
        },
        {
          title: "After launch",
          body: "Small changes are included for the first month. After that we agree on maintenance, or I hand over every login and the documentation.",
        },
      ],
    },
    processTitle: {
      sr: "Kako teče izrada sajta",
      en: "How a website project runs",
    },
    process: {
      sr: [
        {
          title: "Razgovor",
          time: "30 minuta",
          body: "Šta prodajete, kome i kako vas klijenti danas nalaze. Pogledam postojeći sajt i konkurenciju, ako ih ima.",
        },
        {
          title: "Predlog",
          time: "do 2 dana",
          body: "Stranice, obim, rok i fiksna cena u jednom dokumentu, bez stavke „ostalo po dogovoru“.",
        },
        {
          title: "Struktura i dizajn",
          time: "prva nedelja",
          body: "Mapa stranica i dizajn početne. Menjamo dok ne bude jasno kome se sajt obraća i šta posetilac treba da uradi.",
        },
        {
          title: "Izrada",
          time: "1 do 3 nedelje",
          body: "Sajt gledate na privremenoj adresi dok nastaje i komentarišete direktno na njoj.",
        },
        {
          title: "Provera i lansiranje",
          time: "2 do 3 dana",
          body: "Lighthouse na mobilnom, test svih formi, merenje i redirekcije sa starog sajta. Tek onda prebacujem domen.",
        },
      ],
      en: [
        {
          title: "A call",
          time: "30 minutes",
          body: "What you sell, to whom, and how customers find you today. I look at your current site and competitors, if there are any.",
        },
        {
          title: "Proposal",
          time: "within 2 days",
          body: "Pages, scope, deadline and a fixed price in one document, with no open-ended extras.",
        },
        {
          title: "Structure and design",
          time: "first week",
          body: "A page map and the home page design. We iterate until it is clear who the site speaks to and what a visitor should do next.",
        },
        {
          title: "Build",
          time: "1 to 3 weeks",
          body: "You watch the site take shape on a preview address and leave comments right there.",
        },
        {
          title: "Checks and launch",
          time: "2 to 3 days",
          body: "Mobile Lighthouse, every form tested, tracking and redirects from the old site. Only then do I switch the domain.",
        },
      ],
    },
    tools: [
      "Next.js",
      "Nuxt",
      "React",
      "Vue",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "Vercel",
      "GitHub Actions",
      "GTM",
      "GA4",
      "Lighthouse",
    ],
    toolsNote: {
      sr: "WordPress održavam kad ga klijent već ima (Prostor Između, Sportski centar Olimp), ali nove sajtove pravim u Next.js-u ili Nuxt-u: brži su i nema dodataka koje treba stalno ažurirati.",
      en: "I maintain WordPress when a client already runs it (Prostor Između, Olimp sports centre), but new sites are built in Next.js or Nuxt: they are faster and there are no plugins to keep patching.",
    },
    measure: {
      sr: [
        "Na predaji: Lighthouse na mobilnom, Core Web Vitals (LCP, CLS, INP) i provera u Search Console-u da Google vidi sve stranice.",
        "Posle lansiranja: upiti kroz formu, pozivi i WhatsApp poruke u GA4, po stranici i po izvoru posete. Sajt koji lepo izgleda a ne donosi upite za mene nije završen posao.",
      ],
      en: [
        "At handover: mobile Lighthouse, Core Web Vitals (LCP, CLS, INP) and a Search Console check that Google can see every page.",
        "After launch: form inquiries, calls and WhatsApp messages in GA4, per page and per traffic source. A site that looks good but brings no inquiries is not a finished job to me.",
      ],
    },
    timeline: {
      sr: "Prezentacioni sajt od pet do deset stranica traje dve do četiri nedelje. Sajt na više jezika ili sa zakazivanjem četiri do šest nedelja. Portal sa nalozima i plaćanjem procenjujem posle razgovora i radim u fazama od po dve nedelje, da svaka faza ima nešto što možete da isprobate.",
      en: "A business site of five to ten pages takes two to four weeks. A multilingual site or one with booking takes four to six weeks. A portal with accounts and payments gets its estimate after a call and is built in two-week phases, each ending with something you can try.",
    },
    proof: [
      {
        slug: "medical-time",
        text: {
          sr: "Javni sajt privatne bolnice na pet jezika: lokalizovani URL-ovi, SSR za blog i prodavnicu, 95 na mobilnom Lighthouse testu.",
          en: "The public site of a private hospital in five languages: localized URLs, server rendering for the blog and shop, 95 in a mobile Lighthouse test.",
        },
      },
      {
        slug: "mango",
        text: {
          sr: "Nuxt 4 sa SSR-om, GTM tek posle pristanka na kolačiće i fotografije koje se same smanjuju sa 8 MB na 60 do 120 KB.",
          en: "Nuxt 4 with SSR, GTM only after cookie consent, and photos that shrink themselves from 8 MB to 60 to 120 KB.",
        },
      },
      {
        slug: "vuk-studio",
        text: {
          sr: "Statičan Nuxt sajt sa LocalBusiness i FAQ podacima: 98 za performanse i 100 za SEO na mobilnom.",
          en: "A static Nuxt site with LocalBusiness and FAQ data: 98 for performance and 100 for SEO on mobile.",
        },
      },
      {
        slug: "prostor-izmedju",
        text: {
          sr: "WordPress e-magazin koji sam dizajnirao i napravio od nule: četiri rubrike, newsletter i CLS 0 na telefonu, iako živi od velikih fotografija.",
          en: "A WordPress magazine I designed and built from scratch: four sections, a newsletter and a CLS of 0 on mobile, despite living on big photos.",
        },
      },
    ],
    faq: {
      sr: [
        {
          q: "Koliko košta izrada sajta?",
          a: "Cenu dajem posle razgovora, fiksnu i u pisanom predlogu. Najviše je menjaju broj stranica, broj jezika i da li sajt radi nešto više od kontakt forme: zakazivanje, naloge ili plaćanje.",
        },
        {
          q: "Koliko traje izrada sajta?",
          a: "Prezentacioni sajt dve do četiri nedelje od dogovora. Najčešće kasne tekstovi i fotografije, zato ih tražim na početku, a ne na kraju.",
        },
        {
          q: "Zašto ne WordPress?",
          a: "WordPress je dobar za blog koji uređuje više ljudi. Za sajt firme Next.js ili Nuxt daju bolju brzinu na telefonu i manje bezbednosnih zakrpa, jer nema dodataka trećih strana.",
        },
        {
          q: "Mogu li sam da menjam sadržaj?",
          a: "Da. Za delove koje često menjate, kao što su cene, galerija i vesti, pravim jednostavan unos. Na Mango sajtu vlasnica sama ubacuje fotografije, a sajt ih sam priprema za web.",
        },
        {
          q: "Radite li redizajn postojećeg sajta?",
          a: "Da. Prvo u Search Console-u vidim koje stranice donose posete, pa za svaki stari URL pravim 301 redirekciju, da ne izgubite pozicije koje već imate.",
        },
        {
          q: "Ko je vlasnik sajta i domena?",
          a: "Vi. Domen, hosting i repozitorijum su na vaše ime, a ja imam pristup dok radimo zajedno.",
        },
      ],
      en: [
        {
          q: "How much does a website cost?",
          a: "I give the price after a call, fixed and in a written proposal. What moves it most is the number of pages, the number of languages, and whether the site does more than a contact form: booking, accounts or payments.",
        },
        {
          q: "How long does it take?",
          a: "Two to four weeks from sign-off for a business site. Copy and photos are what usually run late, so I ask for them at the start, not the end.",
        },
        {
          q: "Why not WordPress?",
          a: "WordPress suits a blog edited by many people. For a company site, Next.js or Nuxt give better speed on a phone and fewer security patches, because there are no third-party plugins.",
        },
        {
          q: "Can I edit the content myself?",
          a: "Yes. For the parts you change often, such as prices, the gallery and news, I build a simple editor. On the Mango site the owner uploads photos herself and the site prepares them for the web.",
        },
        {
          q: "Do you redesign existing sites?",
          a: "Yes. I first check in Search Console which pages bring visits, then set a 301 redirect for every old URL so you keep the rankings you already have.",
        },
        {
          q: "Who owns the site and the domain?",
          a: "You do. The domain, hosting and repository are in your name, and I have access while we work together.",
        },
      ],
    },
  },

  "google-ads": {
    h1: {
      sr: "Google Ads oglašavanje u Beogradu",
      en: "Google Ads management in Belgrade",
    },
    metaTitle: {
      sr: "Google Ads oglašavanje Beograd: vođenje kampanja",
      en: "Google Ads management in Belgrade: Search, PMax",
    },
    metaDescription: {
      sr: "Vođenje Google Ads kampanja za lokalne usluge u Beogradu: merenje konverzija pre prvog klika, negativne ključne reči i mesečni izveštaj na jednoj strani.",
      en: "Google Ads management for local services in Belgrade: conversion tracking before the first click, negative keywords, and a one-page monthly report.",
    },
    intro: {
      sr: [
        "Postavljam i vodim Google Ads kampanje za lokalne usluge: Search za upite koje ljudi već kucaju („stomatolog Vračar“, „servis klima Beograd“) i Performance Max kada za to ima podataka. Merenje konverzija podešavam pre nego što kampanja potroši prvi dinar, pa od prvog dana znate koji upit donosi poziv.",
        "Za privatnu bolnicu Medical Time vodim osam Search kampanja. Iz izveštaja o pretragama izbacio sam 370+ nerelevantnih upita, a najbolje kampanje imaju i do 54% nižu cenu po konverziji od proseka naloga.",
      ],
      en: [
        'I set up and run Google Ads campaigns for local services: Search for the queries people already type ("dentist Vračar", "AC repair Belgrade") and Performance Max once there is enough data for it. Conversion tracking is in place before a campaign spends anything, so from day one you know which search brings a call.',
        "For Medical Time, a private hospital, I run eight Search campaigns. I have removed 370+ irrelevant queries through the search term reports, and the best campaigns run at up to 54% below the account-average cost per conversion.",
      ],
    },
    forWhom: {
      sr: [
        "Lokalne usluge sa jasnom namerom pretrage: ordinacije, klinike, servisi, zanatlije, škole.",
        "Firme kod kojih jedan novi klijent vredi mnogo više od cene nekoliko klikova.",
        "Oni koji već imaju kampanje, ali ne znaju koji deo budžeta donosi upite.",
      ],
      en: [
        "Local services with clear search intent: clinics, practices, repair services, trades, schools.",
        "Businesses where one new customer is worth far more than the cost of a few clicks.",
        "Anyone already running campaigns who cannot tell which part of the budget brings inquiries.",
      ],
    },
    notFor: {
      sr: "Ako vaš proizvod niko ne traži na Google-u, Search kampanja ga neće prodati. Tada predlažem Meta Ads ili prvo rad na sajtu, pa tek onda oglase.",
      en: "If nobody searches Google for what you sell, a Search campaign will not sell it. In that case I suggest Meta Ads, or work on the site first and ads after.",
    },
    includedTitle: {
      sr: "Šta obuhvata vođenje Google Ads kampanja",
      en: "What Google Ads management covers",
    },
    included: {
      sr: [
        {
          title: "Audit postojećeg naloga",
          body: "Ako nalog već postoji, prvo prolazim kroz strukturu, ključne reči, izveštaj o pretragama i merenje. Dobijate listu popravki po prioritetu pre bilo kakve promene.",
        },
        {
          title: "Ključne reči i negativne reči",
          body: "Istraživanje u Keyword Planner-u, a posle pokretanja redovno čišćenje izveštaja o pretragama. Upiti kao „besplatno“, „posao“ ili tuđi brendovi idu u negativne reči.",
        },
        {
          title: "Struktura kampanja",
          body: "Jedna kampanja po usluzi ili grupi usluga, da budžet ide tamo gde vi hoćete, a ne tamo gde Google najlakše troši.",
        },
        {
          title: "Oglasi i ekstenzije",
          body: "Naslovi koji odgovaraju na upit, ekstenzije za poziv, lokaciju i podstranice. Više verzija oglasa, a ostaje ona koja donosi upite.",
        },
        {
          title: "Merenje konverzija",
          body: "GA4 i GTM događaji za poziv, formu i WhatsApp, uz consent mode. Konverzija je upit, a ne poseta stranici.",
        },
        {
          title: "Zaštita od lažnih klikova",
          body: "ClickCease na nalozima gde konkurencija ili botovi klikću po oglasima.",
        },
        {
          title: "Mesečni izveštaj",
          body: "Jedna strana: šta je urađeno, šta je donelo upite i šta menjam sledećeg meseca. Bez žargona.",
        },
      ],
      en: [
        {
          title: "Audit of an existing account",
          body: "If you already have an account, I first go through its structure, keywords, search term report and tracking. You get a prioritized list of fixes before anything changes.",
        },
        {
          title: "Keywords and negative keywords",
          body: 'Research in Keyword Planner, then regular clean-ups of the search term report once campaigns run. Queries like "free", "jobs" or competitor brands go into negatives.',
        },
        {
          title: "Campaign structure",
          body: "One campaign per service or service group, so the budget goes where you want it, not where Google finds it easiest to spend.",
        },
        {
          title: "Ads and assets",
          body: "Headlines that answer the query, call, location and sitelink assets. Several ad versions, and the one that brings inquiries stays.",
        },
        {
          title: "Conversion tracking",
          body: "GA4 and GTM events for calls, forms and WhatsApp, with consent mode. A conversion is an inquiry, not a page view.",
        },
        {
          title: "Click fraud protection",
          body: "ClickCease on accounts where competitors or bots click the ads.",
        },
        {
          title: "Monthly report",
          body: "One page: what was done, what brought inquiries, and what changes next month. No jargon.",
        },
      ],
    },
    processTitle: {
      sr: "Kako pokrećem i vodim kampanje",
      en: "How campaigns get launched and run",
    },
    process: {
      sr: [
        {
          title: "Razgovor i pristup",
          time: "prvi dan",
          body: "Koje usluge su najvažnije, koje područje pokrivate i ko su konkurenti. Dobijam pristup kao korisnik, a nalog ostaje vaš.",
        },
        {
          title: "Merenje",
          time: "2 do 3 dana",
          body: "Konverzije u GA4 i GTM i provera da se poziv i forma zaista beleže. Bez toga ne pokrećem kampanju.",
        },
        {
          title: "Postavka",
          time: "prva nedelja",
          body: "Ključne reči, negativne reči, oglasi, ekstenzije i ciljanje lokacije. Ako stranica ne odgovara na oglas, predlažem landing stranicu.",
        },
        {
          title: "Učenje i čišćenje",
          time: "3 do 4 nedelje",
          body: "Svakodnevno gledam upite, dodajem negativne reči i gasim ono što troši bez rezultata.",
        },
        {
          title: "Optimizacija",
          time: "svakog meseca",
          body: "Preraspodela budžeta prema udelu izgubljenih prikaza, testovi oglasa i landing stranica.",
        },
      ],
      en: [
        {
          title: "Call and access",
          time: "day one",
          body: "Which services matter most, which area you cover and who you compete with. I get user access, the account stays yours.",
        },
        {
          title: "Tracking",
          time: "2 to 3 days",
          body: "Conversions in GA4 and GTM, and a check that calls and forms are really recorded. No campaign starts without it.",
        },
        {
          title: "Setup",
          time: "first week",
          body: "Keywords, negatives, ads, assets and location targeting. If the landing page does not answer the ad, I propose one that does.",
        },
        {
          title: "Learning and clean-up",
          time: "3 to 4 weeks",
          body: "I check the queries daily, add negatives and pause whatever spends without results.",
        },
        {
          title: "Optimization",
          time: "every month",
          body: "Budget moved according to lost impression share, plus ad and landing page tests.",
        },
      ],
    },
    tools: [
      "Google Ads",
      "Keyword Planner",
      "Google Analytics 4",
      "Google Tag Manager",
      "Search Console",
      "ClickCease",
    ],
    toolsNote: {
      sr: "Landing stranice pravim sam kada postojeći sajt ne odgovara na oglas, pa ne čekate developera da bi kampanja krenula.",
      en: "I build landing pages myself when the current site does not answer the ad, so a campaign never waits on a developer.",
    },
    measure: {
      sr: [
        "Pratim cenu po konverziji po kampanji i po ključnoj reči, udeo prikaza i udeo izgubljen zbog budžeta ili ranga. Tako se vidi gde dodatni budžet donosi upite, a gde samo skuplje klikove.",
        "Na Medical Time je ta analiza pokazala ključne reči sa cenom po kliku i do 19 puta iznad proseka naloga. Predložio sam limite cene po kliku i preraspodelu budžeta ka kampanjama koje donose upite jeftinije.",
      ],
      en: [
        "I track cost per conversion by campaign and keyword, impression share, and the share lost to budget or rank. That shows where extra budget brings inquiries and where it only buys pricier clicks.",
        "At Medical Time that analysis found keywords with a cost per click up to 19 times the account average. I recommended CPC caps and moving budget towards the campaigns that bring inquiries for less.",
      ],
    },
    timeline: {
      sr: "Merenje i prve kampanje: nedelju dana. Prve brojke na koje se možete osloniti: posle tri do četiri nedelje, kada Google završi učenje i izveštaj o pretragama se očisti. Veće odluke o budžetu donosim posle dva do tri meseca podataka.",
      en: "Tracking and the first campaigns: one week. The first numbers you can rely on: after three to four weeks, once Google finishes learning and the search term report is cleaned up. Bigger budget decisions come after two to three months of data.",
    },
    proof: [
      {
        slug: "medical-time",
        text: {
          sr: "Osam Search kampanja za privatnu bolnicu, 370+ negativnih ključnih reči i najbolje kampanje do 54% ispod proseka naloga po ceni konverzije.",
          en: "Eight Search campaigns for a private hospital, 370+ negative keywords, and the best campaigns up to 54% below the account-average cost per conversion.",
        },
      },
    ],
    faq: {
      sr: [
        {
          q: "Koliki budžet treba za Google Ads?",
          a: "Zavisi od cene klika u vašoj oblasti i od toga koliko područja pokrivate. Pre početka proveravam ključne reči u Keyword Planner-u i dajem procenu budžeta sa kojim kampanja ima smisla.",
        },
        {
          q: "Kada se vide prvi rezultati?",
          a: "Prvi upiti stižu obično već prve nedelje. Brojke na osnovu kojih se menja budžet imate posle tri do četiri nedelje, kada se kampanja stabilizuje.",
        },
        {
          q: "Da li radite Performance Max?",
          a: "Da, ali tek kada merenje radi i Search kampanje imaju dovoljno konverzija. Bez toga Performance Max troši na prikaze koje je teško proveriti.",
        },
        {
          q: "Da li mi treba novi sajt za oglase?",
          a: "Ne uvek. Ako stranica jasno odgovara na oglas i brzo se učitava na telefonu, dovoljna je. Ako ne, pravim landing stranicu samo za tu uslugu.",
        },
        {
          q: "Ko je vlasnik Google Ads naloga?",
          a: "Vi. Nalog i način plaćanja su na vaše ime, a ja imam pristup kao korisnik dok radimo zajedno.",
        },
        {
          q: "Po čemu se razlikujete od agencije?",
          a: "Razgovarate sa osobom koja radi u nalogu. Isti čovek podešava merenje i menja sajt, pa nema čekanja između agencije i developera.",
        },
      ],
      en: [
        {
          q: "What budget do I need for Google Ads?",
          a: "It depends on the cost per click in your field and how large an area you cover. Before starting I check the keywords in Keyword Planner and estimate the budget at which a campaign makes sense.",
        },
        {
          q: "When will I see results?",
          a: "The first inquiries usually arrive in the first week. Numbers solid enough to change the budget on come after three to four weeks, once the campaign settles.",
        },
        {
          q: "Do you run Performance Max?",
          a: "Yes, but only once tracking works and the Search campaigns have enough conversions. Without that, Performance Max spends on impressions that are hard to verify.",
        },
        {
          q: "Do I need a new website for ads?",
          a: "Not always. If the page clearly answers the ad and loads fast on a phone, it is enough. If not, I build a landing page for that one service.",
        },
        {
          q: "Who owns the Google Ads account?",
          a: "You do. The account and payment method are in your name, and I have user access while we work together.",
        },
        {
          q: "How is this different from an agency?",
          a: "You talk to the person working in the account. The same person sets up tracking and edits the site, so there is no waiting between an agency and a developer.",
        },
      ],
    },
  },

  "meta-ads": {
    h1: {
      sr: "Meta Ads oglašavanje na Facebooku i Instagramu",
      en: "Meta Ads: Facebook and Instagram advertising",
    },
    metaTitle: {
      sr: "Meta Ads: oglasi na Facebooku i Instagramu",
      en: "Meta Ads management: Facebook and Instagram",
    },
    metaDescription: {
      sr: "Meta Ads kampanje na Facebooku i Instagramu za lokalne firme iz Beograda: Pixel i Conversions API, kreative, publike i testovi koji broje upite, ne lajkove.",
      en: "Facebook and Instagram ad campaigns for Belgrade businesses: Pixel and Conversions API, creatives, audiences and tests that count inquiries, not likes.",
    },
    intro: {
      sr: [
        "Vodim Meta Ads kampanje na Facebooku i Instagramu za ponude koje treba pokazati ljudima pre nego što ih potraže: estetske tretmane, torte po porudžbini, snimanje u studiju, događaje. Počinjem od merenja (Pixel i Conversions API), pa tek onda prelazim na kreative i publike.",
        "Za bolnicu Medical Time pored Google Ads-a vodim i Meta nalog. Ista osoba podešava merenje na sajtu i kampanje, pa se događaji iz oglasa i sa sajta poklapaju, a vi ne slušate dve verzije iste priče.",
      ],
      en: [
        "I run Meta Ads campaigns on Facebook and Instagram for offers people need to see before they go looking: aesthetic treatments, custom cakes, studio recording, events. The work starts with tracking (Pixel and Conversions API), and only then moves to creatives and audiences.",
        "For Medical Time hospital I run the Meta account alongside Google Ads. The same person sets up tracking on the site and runs the campaigns, so ad events and site events match and you do not hear two versions of the same story.",
      ],
    },
    forWhom: {
      sr: [
        "Firme sa vizuelnom ponudom: saloni, estetika, poslastičarnice, studiji, restorani.",
        "Ponude sa kupcima koji se vraćaju, gde retargeting posetilaca sajta ima smisla.",
        "Lokalni biznisi koji žele da ih vidi tačno određen deo grada.",
      ],
      en: [
        "Businesses with a visual offer: salons, aesthetics, pastry shops, studios, restaurants.",
        "Offers with repeat customers, where retargeting site visitors makes sense.",
        "Local businesses that want to reach one specific part of the city.",
      ],
    },
    notFor: {
      sr: "Ako ljudi vašu uslugu traže tek kada im zatreba (vodoinstalater, servis), Google Ads je bolji prvi korak. Meta je jača kada ponudu treba pokazati, a ne samo pronaći.",
      en: "If people only look for your service when they need it (plumber, repairs), Google Ads is the better first step. Meta is stronger when an offer needs to be shown, not just found.",
    },
    includedTitle: {
      sr: "Šta obuhvata vođenje Meta kampanja",
      en: "What Meta Ads management covers",
    },
    included: {
      sr: [
        {
          title: "Pixel i Conversions API",
          body: "Događaji za pregled, upit, poziv i porudžbinu, poslati iz pregledača i sa servera, da iOS i blokatori ne pojedu podatke. Sve iza cookie consent-a.",
        },
        {
          title: "Struktura kampanja",
          body: "Odvojene kampanje za novu publiku i za retargeting, sa ciljem koji odgovara onome što vam treba: upit, poruka ili poseta.",
        },
        {
          title: "Kreative",
          body: "Radim sa fotografijama i kratkim videima koje već imate ili snimite telefonom. Predlažem kadrove i tekst i pravim više verzija za test.",
        },
        {
          title: "Publike",
          body: "Lokacija, interesovanja, slične publike i posetioci sajta. Uske publike pravim tek kad ima dovoljno podataka.",
        },
        {
          title: "A/B testovi",
          body: "Jedna promena po testu: slika, naslov ili ponuda. Ostaje verzija koja donosi jeftiniji upit.",
        },
        {
          title: "Mesečni izveštaj",
          body: "Jedna strana, sa upitima iz GA4 pored brojki iz Meta-e, jer se te dve cifre retko poklapaju.",
        },
      ],
      en: [
        {
          title: "Pixel and Conversions API",
          body: "Events for view, inquiry, call and order, sent from the browser and the server so iOS and blockers do not swallow the data. All behind cookie consent.",
        },
        {
          title: "Campaign structure",
          body: "Separate campaigns for new audiences and for retargeting, each with the objective you actually need: an inquiry, a message or a visit.",
        },
        {
          title: "Creatives",
          body: "I work with the photos and short videos you already have or shoot on a phone. I suggest shots and copy and make several versions to test.",
        },
        {
          title: "Audiences",
          body: "Location, interests, lookalikes and site visitors. Narrow audiences come only once there is enough data.",
        },
        {
          title: "A/B tests",
          body: "One change per test: the image, the headline or the offer. The version that brings a cheaper inquiry stays.",
        },
        {
          title: "Monthly report",
          body: "One page, with inquiries from GA4 next to the Meta numbers, because those two rarely match.",
        },
      ],
    },
    processTitle: {
      sr: "Kako pokrećem Meta kampanje",
      en: "How Meta campaigns get started",
    },
    process: {
      sr: [
        {
          title: "Razgovor",
          time: "prvi dan",
          body: "Šta je ponuda, ko kupuje i šta imate od fotografija i videa.",
        },
        {
          title: "Merenje",
          time: "2 do 3 dana",
          body: "Pixel, Conversions API i provera događaja u Events Manager-u.",
        },
        {
          title: "Kreative i publike",
          time: "prva nedelja",
          body: "Tri do pet verzija oglasa i dve do tri publike, sa jasnim ciljem svake kampanje.",
        },
        {
          title: "Test",
          time: "2 do 3 nedelje",
          body: "Sve verzije dobijaju manji budžet, a gasim one koje ne donose upite.",
        },
        {
          title: "Skaliranje",
          time: "od drugog meseca",
          body: "Budžet ide na kombinacije koje rade, uz nove kreative na nekoliko nedelja, da se publika ne zasiti oglasa.",
        },
      ],
      en: [
        {
          title: "A call",
          time: "day one",
          body: "What the offer is, who buys it, and what photos and video you have.",
        },
        {
          title: "Tracking",
          time: "2 to 3 days",
          body: "Pixel, Conversions API and an event check in Events Manager.",
        },
        {
          title: "Creatives and audiences",
          time: "first week",
          body: "Three to five ad versions and two to three audiences, each campaign with a clear objective.",
        },
        {
          title: "Testing",
          time: "2 to 3 weeks",
          body: "Every version gets a small budget, and the ones that bring no inquiries get switched off.",
        },
        {
          title: "Scaling",
          time: "from month two",
          body: "Budget moves to the combinations that work, with fresh creatives every few weeks so the audience does not tire of the ad.",
        },
      ],
    },
    tools: [
      "Meta Ads Manager",
      "Meta Pixel",
      "Conversions API",
      "Events Manager",
      "Google Tag Manager",
      "Google Analytics 4",
    ],
    toolsNote: {
      sr: "Kada oglas vodi na sajt, proveravam i stranicu na koju vodi: brzinu na telefonu, formu i da li se događaj zaista beleži.",
      en: "When an ad sends people to the site, I also check the page it lands on: speed on a phone, the form, and whether the event is really recorded.",
    },
    measure: {
      sr: [
        "Brojim ono što vam donosi posao: upite, poruke i pozive, a ne lajkove i doseg. Glavna cifra je cena po upitu, po kampanji i po kreativi.",
        "Brojke iz Meta-e poredim sa GA4 i sa onim što vi vidite u inbox-u i na telefonu. Kada se razlikuju, verujem vašem inbox-u i tražim gde merenje curi.",
      ],
      en: [
        "I count what brings you business: inquiries, messages and calls, not likes and reach. The main number is cost per inquiry, by campaign and by creative.",
        "I compare Meta's numbers with GA4 and with what you see in your inbox and on your phone. When they differ, I trust your inbox and look for where tracking leaks.",
      ],
    },
    timeline: {
      sr: "Merenje i prve kampanje: nedelju dana. Prvi test kreativa: dve do tri nedelje. Kampanja sa stabilnom cenom po upitu: obično posle prvog meseca, uz nove kreative svakih nekoliko nedelja.",
      en: "Tracking and the first campaigns: one week. The first creative test: two to three weeks. A campaign with a steady cost per inquiry: usually after the first month, with new creatives every few weeks.",
    },
    proof: [
      {
        slug: "medical-time",
        text: {
          sr: "Vodim Meta nalog privatne bolnice uz Google Ads, sa zajedničkim GTM kontejnerom i consent mode-om za oba kanala.",
          en: "I run a private hospital's Meta account alongside Google Ads, with one GTM container and consent mode for both channels.",
        },
      },
      {
        slug: "mango",
        text: {
          sr: "Sajt poslastičarnice spreman za merenje oglasa: GTM se učitava tek posle pristanka na kolačiće, a slike proizvoda su brze na telefonu.",
          en: "A pastry shop site ready for ad tracking: GTM loads only after cookie consent, and product photos stay fast on a phone.",
        },
      },
    ],
    faq: {
      sr: [
        {
          q: "Koliki budžet treba za Meta Ads?",
          a: "Za test je dovoljan manji dnevni budžet po kampanji, koliko da svaka kreativa dobije dovoljno prikaza. Tačan iznos predlažem posle razgovora, prema veličini publike i vrednosti vašeg proizvoda.",
        },
        {
          q: "Ko pravi fotografije i video?",
          a: "Najbolje rade autentični snimci iz vašeg prostora, i telefon je sasvim dovoljan. Pošaljem vam listu kadrova, a ja ih pretvaram u oglase i tekst.",
        },
        {
          q: "Da li vodite i profile na društvenim mrežama?",
          a: "Ne. Vodim plaćene kampanje i merenje, a objave i odgovori na komentare ostaju vama ili vašem social media menadžeru.",
        },
        {
          q: "Zašto se broj konverzija u Meta-i razlikuje od GA4?",
          a: "Meta pripisuje sebi i konverzije posle pregleda oglasa, a GA4 uglavnom posle klika. Zato gledam obe cifre i proveravam ih sa stvarnim upitima.",
        },
        {
          q: "Da li mi treba sajt za Meta oglase?",
          a: "Za kampanju sa porukama ili pozivima ne mora. Za upite preko forme i za retargeting treba, i tada proveravam brzinu stranice na koju oglas vodi.",
        },
        {
          q: "Koliko često treba menjati kreative?",
          a: "Kada cena po upitu počne da raste, a isti čovek vidi oglas više od tri do četiri puta, publika ga je zapamtila. U praksi je to na nekoliko nedelja, zato na početku tražim više materijala odjednom.",
        },
      ],
      en: [
        {
          q: "What budget do I need for Meta Ads?",
          a: "A small daily budget per campaign is enough to test, as long as each creative gets enough impressions. I suggest the exact amount after a call, based on audience size and the value of your product.",
        },
        {
          q: "Who makes the photos and video?",
          a: "Authentic footage from your own space works best, and a phone is plenty. I send you a shot list and turn the footage into ads and copy.",
        },
        {
          q: "Do you manage social media profiles too?",
          a: "No. I run paid campaigns and tracking; posts and replies to comments stay with you or your social media manager.",
        },
        {
          q: "Why do Meta and GA4 show different conversion numbers?",
          a: "Meta also credits itself with conversions after an ad view, while GA4 mostly counts after a click. So I look at both and check them against real inquiries.",
        },
        {
          q: "Do I need a website for Meta ads?",
          a: "Not for a campaign built on messages or calls. For form inquiries and retargeting you do, and then I check the speed of the page the ad leads to.",
        },
        {
          q: "How often do creatives need replacing?",
          a: "When cost per inquiry starts to climb and the same person has seen the ad more than three or four times, the audience has learned it. In practice that is every few weeks, so I ask for more material up front.",
        },
      ],
    },
  },

  seo: {
    h1: {
      sr: "SEO optimizacija sajta u Beogradu",
      en: "Technical SEO and analytics in Belgrade",
    },
    metaTitle: {
      sr: "SEO optimizacija sajta Beograd: tehnički SEO",
      en: "Technical SEO services in Belgrade, with GA4",
    },
    metaDescription: {
      sr: "Tehnička SEO optimizacija sajta sa popravkama direktno u kodu: hreflang, JSON-LD, brzina, GA4. Na medicaltime.rs Site Health 90% → 98% za nedelju dana.",
      en: "Technical SEO with fixes made directly in your site's code: hreflang, JSON-LD, speed, GA4. On medicaltime.rs, Site Health went from 90% to 98% in a week.",
    },
    intro: {
      sr: [
        "Radim tehničku SEO optimizaciju sajta i analitiku: brzinu, strukturu, hreflang, JSON-LD, sitemap bez grešaka i GA4 merenje koje pokazuje upite, a ne samo posete. Popravke pišem direktno u kodu sajta, pa ne čekate developera da sprovede preporuke iz izveštaja.",
        "Na medicaltime.rs sam za nedelju dana podigao Semrush Site Health sa 90% na 98%: greške 6 → 0, upozorenja −87%. Audit sa listom popravki obično je gotov za nedelju dana, a najvažnije popravke za još jednu do tri.",
      ],
      en: [
        "I do technical SEO and analytics: speed, structure, hreflang, JSON-LD, an error-free sitemap, and GA4 tracking that shows inquiries rather than just visits. Fixes go straight into the site's code, so you are not waiting for a developer to act on a report.",
        "On medicaltime.rs I took Semrush Site Health from 90% to 98% in one week: errors 6 → 0, warnings down 87%. An audit with a fix list is usually ready within a week, and the most important fixes within one to three more.",
      ],
    },
    forWhom: {
      sr: [
        "Sajtovi koji postoje, ali ih Google ne pokazuje za važne upite.",
        "Sajtovi na više jezika sa duplim stranicama, pogrešnim canonical-om ili hreflang greškama.",
        "Firme koje ne znaju odakle dolaze upiti, jer GA4 i GTM nisu podešeni.",
        "Lokalne firme kojima treba bolja vidljivost u pretrazi za svoj grad ili kraj.",
      ],
      en: [
        "Sites that exist but do not show up on Google for the searches that matter.",
        "Multilingual sites with duplicate pages, wrong canonicals or hreflang errors.",
        "Businesses that do not know where inquiries come from because GA4 and GTM are not set up.",
        "Local businesses that need better visibility in searches for their city or neighbourhood.",
      ],
    },
    notFor: {
      sr: "Ne kupujem linkove i ne obećavam prvo mesto za mesec dana. Ko to obećava, obično prodaje nešto zbog čega Google kasnije kazni sajt.",
      en: "I do not buy links or promise the top spot in a month. Whoever promises that is usually selling something Google later penalises.",
    },
    includedTitle: {
      sr: "Šta obuhvata SEO optimizacija",
      en: "What the SEO work covers",
    },
    included: {
      sr: [
        {
          title: "Audit",
          body: "Semrush, Search Console i Lighthouse, plus ručni pregled šablona stranica. Dobijate listu popravki poređanu po uticaju, a ne izveštaj od osamdeset strana.",
        },
        {
          title: "Tehničke popravke u kodu",
          body: "Canonical, redirekcije, hreflang, sitemap, robots, brzina i Core Web Vitals. Radim u Next.js, Nuxt, Laravel i WordPress projektima.",
        },
        {
          title: "Strukturirani podaci",
          body: "JSON-LD za LocalBusiness, Service, FAQ, Article, Product i BreadcrumbList, proveren u Google-ovom Rich Results testu.",
        },
        {
          title: "Sajtovi na više jezika",
          body: "Lokalizovani URL-ovi, hreflang parovi i x-default, bez duplih stranica između jezika.",
        },
        {
          title: "Lokalni SEO",
          body: "Google Business profil, isti naziv, adresa i telefon svuda i posebne stranice za usluge koje ljudi traže po gradu.",
        },
        {
          title: "Naslovi i meta opisi",
          body: "Naslov i opis za svaku stranicu, logična struktura podnaslova i interni linkovi. Pišem ih tako da ih čovek pročita do kraja.",
        },
        {
          title: "Analitika",
          body: "GA4 događaji i konverzije, GTM kontejner i consent mode, da u izveštaju vidite koje stranice donose upite.",
        },
      ],
      en: [
        {
          title: "Audit",
          body: "Semrush, Search Console and Lighthouse, plus a manual review of page templates. You get a fix list ranked by impact, not an eighty-page report.",
        },
        {
          title: "Technical fixes in the code",
          body: "Canonicals, redirects, hreflang, sitemap, robots, speed and Core Web Vitals. I work in Next.js, Nuxt, Laravel and WordPress projects.",
        },
        {
          title: "Structured data",
          body: "JSON-LD for LocalBusiness, Service, FAQ, Article, Product and BreadcrumbList, checked in Google's Rich Results Test.",
        },
        {
          title: "Multilingual sites",
          body: "Localized URLs, hreflang pairs and x-default, with no duplicate pages across languages.",
        },
        {
          title: "Local SEO",
          body: "Google Business Profile, the same name, address and phone everywhere, and dedicated pages for services people search by city.",
        },
        {
          title: "Titles and meta descriptions",
          body: "A title and description for every page, a sensible heading structure and internal links. Written so a person reads them to the end.",
        },
        {
          title: "Analytics",
          body: "GA4 events and conversions, a GTM container and consent mode, so reports show which pages bring inquiries.",
        },
      ],
    },
    processTitle: {
      sr: "Kako radim SEO optimizaciju",
      en: "How the SEO work runs",
    },
    process: {
      sr: [
        {
          title: "Pristup i audit",
          time: "3 do 5 dana",
          body: "Search Console, GA4 i pristup kodu ili hostingu. Pregledam sajt alatima i ručno, šablon po šablon.",
        },
        {
          title: "Plan popravki",
          time: "1 dan",
          body: "Lista po uticaju i uloženom trudu. Zajedno biramo redosled, a vi znate šta dobijate i kada.",
        },
        {
          title: "Popravke",
          time: "1 do 3 nedelje",
          body: "Menjam kod, sadržaj i podešavanja. Na medicaltime.rs su najvažnije popravke bile gotove za nedelju dana.",
        },
        {
          title: "Provera",
          time: "posle popravki",
          body: "Ponovljen audit, validacija u Search Console-u i zahtev da Google ponovo pročita izmenjene stranice.",
        },
        {
          title: "Praćenje",
          time: "svakog meseca",
          body: "Prikazi, klikovi i upiti iz organske pretrage, i nove greške pre nego što naprave štetu.",
        },
      ],
      en: [
        {
          title: "Access and audit",
          time: "3 to 5 days",
          body: "Search Console, GA4 and access to the code or hosting. I review the site with tools and by hand, template by template.",
        },
        {
          title: "Fix plan",
          time: "1 day",
          body: "A list ranked by impact and effort. We pick the order together, so you know what you get and when.",
        },
        {
          title: "Fixes",
          time: "1 to 3 weeks",
          body: "I change the code, content and settings. On medicaltime.rs the most important fixes were done within a week.",
        },
        {
          title: "Verification",
          time: "after the fixes",
          body: "A repeat audit, validation in Search Console, and a request for Google to recrawl the changed pages.",
        },
        {
          title: "Monitoring",
          time: "every month",
          body: "Impressions, clicks and inquiries from organic search, and new errors caught before they do damage.",
        },
      ],
    },
    tools: [
      "Semrush",
      "Google Search Console",
      "Lighthouse",
      "PageSpeed Insights",
      "Rich Results Test",
      "Google Analytics 4",
      "Google Tag Manager",
    ],
    toolsNote: {
      sr: "Ovaj sajt je i sam primer: srpski URL-ovi, hreflang parovi, JSON-LD i sitemap sa stvarnim datumima izmena stranica.",
      en: "This site is an example too: Serbian URLs, hreflang pairs, JSON-LD and a sitemap with each page's real last-modified date.",
    },
    measure: {
      sr: [
        "Tehničko stanje: Site Health u Semrush-u, broj grešaka i upozorenja i Core Web Vitals u Search Console-u. To se vidi odmah posle popravki.",
        "Poslovni rezultat: prikazi i klikovi iz Search Console-a po stranici i upiti iz organske pretrage u GA4. To traje duže, jer Google-u trebaju nedelje da ponovo prođe kroz sajt.",
      ],
      en: [
        "Technical health: Site Health in Semrush, error and warning counts, and Core Web Vitals in Search Console. This shows right after the fixes.",
        "Business results: impressions and clicks per page in Search Console, and organic inquiries in GA4. This takes longer, because Google needs weeks to recrawl the site.",
      ],
    },
    timeline: {
      sr: "Audit: do nedelju dana. Tehničke popravke: jedna do tri nedelje, zavisno od veličine sajta. Promene u pozicijama: obično posle šest do dvanaest nedelja. SEO je stalan posao, ali tehnički temelj se sređuje jednom.",
      en: "Audit: up to a week. Technical fixes: one to three weeks depending on the size of the site. Movement in rankings: usually after six to twelve weeks. SEO is ongoing, but the technical foundation gets fixed once.",
    },
    proof: [
      {
        slug: "medical-time",
        text: {
          sr: "Site Health sa 90% na 98% za nedelju dana, greške 6 → 0, upozorenja 1.012 → 129. Lokalizovani slugovi na pet jezika, SSR za blog i prodavnicu i canonical popravka sa 301 redirekcijama.",
          en: "Site Health from 90% to 98% in one week, errors 6 → 0, warnings 1,012 → 129. Localized slugs in five languages, server rendering for the blog and shop, and a canonical fix with 301 redirects.",
        },
      },
      {
        slug: "vuk-studio",
        text: {
          sr: "LocalBusiness i FAQPage JSON-LD od prvog dana, 100 za SEO i 98 za performanse na mobilnom Lighthouse testu.",
          en: "LocalBusiness and FAQPage JSON-LD from day one, 100 for SEO and 98 for performance in a mobile Lighthouse test.",
        },
      },
    ],
    faq: {
      sr: [
        {
          q: "Koliko traje dok SEO ne da rezultat?",
          a: "Tehničke popravke se vide u auditu odmah. Promene u pozicijama i klikovima obično posle šest do dvanaest nedelja, jer Google mora ponovo da pročita sajt.",
        },
        {
          q: "Da li garantujete prvo mesto na Google-u?",
          a: "Ne, i to niko ne može pošteno da obeća. Garantujem da će sajt tehnički biti ispravan, da ćete znati šta je urađeno i da ćete merenjem videti šta se promenilo.",
        },
        {
          q: "Radite li SEO za WordPress sajt?",
          a: "Da. Održavam WordPress sajtove (Prostor Između, Sportski centar Olimp) i popravke radim u temi i podešavanjima, bez gomilanja dodataka.",
        },
        {
          q: "Šta je tehnički SEO?",
          a: "Sve što Google-u olakšava da pronađe, razume i brzo prikaže vaše stranice: brzina, ispravni URL-ovi i redirekcije, sitemap, hreflang i strukturirani podaci.",
        },
        {
          q: "Da li pišete tekstove za blog?",
          a: "Pišem naslove, opise i tekstove za stranice usluga. Za redovan blog je bolje da piše neko iz vaše struke, a ja se brinem da ga Google pronađe.",
        },
      ],
      en: [
        {
          q: "How long until SEO shows results?",
          a: "Technical fixes show up in the audit right away. Rankings and clicks usually move after six to twelve weeks, because Google has to recrawl the site.",
        },
        {
          q: "Do you guarantee the top spot on Google?",
          a: "No, and nobody can honestly promise that. I guarantee the site will be technically sound, that you will know what was done, and that tracking will show what changed.",
        },
        {
          q: "Do you do SEO for WordPress sites?",
          a: "Yes. I maintain WordPress sites (Prostor Između, Olimp sports centre) and make fixes in the theme and settings without piling on plugins.",
        },
        {
          q: "What is technical SEO?",
          a: "Everything that helps Google find, understand and quickly show your pages: speed, correct URLs and redirects, the sitemap, hreflang and structured data.",
        },
        {
          q: "Do you write blog posts?",
          a: "I write titles, descriptions and service page copy. A regular blog is better written by someone in your field, and I make sure Google finds it.",
        },
      ],
    },
  },
};

/** UI labels of the service pages (headings that are the same on every service page). */
export const servicePageLabels = {
  forWhom: { sr: "Za koga je", en: "Who it is for" },
  notFor: { sr: "Za koga nije", en: "Who it is not for" },
  tools: { sr: "Alati i tehnologije", en: "Tools and technology" },
  measure: { sr: "Kako se meri rezultat", en: "How results are measured" },
  timeline: { sr: "Koliko traje", en: "Typical timeline" },
  proofEyebrow: { sr: "Iz prakse", en: "From real work" },
  proofTitle: {
    sr: "Projekti na kojima se ovo vidi",
    en: "Projects that show this work",
  },
  proofLink: { sr: "Pročitajte studiju slučaja", en: "Read the case study" },
  faqTitle: { sr: "Česta pitanja", en: "Frequently asked questions" },
  ctaTitle: {
    sr: "Razgovarajmo o vašem projektu",
    en: "Let's talk about your project",
  },
  ctaBody: {
    sr: "Napišite ukratko šta vam treba. Odgovaram istog dana, a fiksnu ponudu dobijate za dva dana.",
    en: "Tell me briefly what you need. I reply the same day, and you get a fixed quote within two days.",
  },
  ctaButton: { sr: "Zakažite razgovor", en: "Book a call" },
  related: { sr: "Druge usluge", en: "Other services" },
  hubLink: { sr: "Sve o usluzi", en: "Full service details" },
} satisfies Record<string, Localized>;
