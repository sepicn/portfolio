import type { Localized, LocalizedList } from "../i18n";

export type Service = {
  id: string;
  title: Localized;
  lead: Localized;
  includes: LocalizedList;
  forWhom: Localized;
};

export const services: Service[] = [
  {
    id: "web",
    title: { sr: "Sajtovi i web aplikacije", en: "Websites and web apps" },
    lead: {
      sr: "Od prezentacionog sajta za lokalnu firmu do portala sa nalozima, plaćanjem i administracijom. Kod je moj, bez tema i page builder-a, pa je sajt brz i lako se menja.",
      en: "From a business website to a portal with accounts, payments and an admin panel. The code is mine, no themes or page builders, so the site stays fast and easy to change.",
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
    title: { sr: "Google Ads", en: "Google Ads" },
    lead: {
      sr: "Search i Performance Max kampanje za upite koje ljudi već kucaju: „zubar Vračar“, „moler Beograd“. Postavljam merenje konverzija pre prvog dinara budžeta, pa se zna šta radi.",
      en: 'Search and Performance Max campaigns for what people already type: "dentist Vračar", "painter Belgrade". Conversion tracking is set up before the first dinar of budget, so we know what works.',
    },
    includes: {
      sr: [
        "Istraživanje ključnih reči i negativne reči",
        "Struktura kampanja, oglasi, ekstenzije, landing stranice",
        "Konverzije kroz GA4 i GTM (poziv, forma, WhatsApp)",
        "Zaštita od lažnih klikova (ClickCease)",
        "Mesečni izveštaj na jednoj strani, bez žargona",
      ],
      en: [
        "Keyword research and negative keywords",
        "Campaign structure, ads, extensions, landing pages",
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
    title: {
      sr: "Meta Ads (Facebook i Instagram)",
      en: "Meta Ads (Facebook and Instagram)",
    },
    lead: {
      sr: "Kampanje za ponude koje treba pokazati ljudima pre nego što ih traže: estetski tretmani, torte, snimanje u studiju. Kreative, publike i testiranje, pa skaliranje onoga što donosi upite.",
      en: "Campaigns for offers people need to see before they search: aesthetic treatments, cakes, studio recording. Creatives, audiences and testing, then scaling what brings inquiries.",
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
    title: { sr: "SEO i analitika", en: "SEO and analytics" },
    lead: {
      sr: "Tehnički SEO koji Google stvarno nagrađuje: brzina, struktura, hreflang, JSON-LD, sitemap bez grešaka. Plus GA4 i GTM postavka da izveštaji pokazuju upite, ne samo posete.",
      en: "Technical SEO that Google actually rewards: speed, structure, hreflang, JSON-LD, an error-free sitemap. Plus GA4 and GTM set up so reports show inquiries, not just visits.",
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
