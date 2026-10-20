import type { Post } from "../types";

export const post: Post = {
  slug: {
    sr: "sajt-na-pet-jezika-i18n-hreflang",
    en: "five-language-website-i18n-hreflang",
  },
  title: {
    sr: "Sajt na pet jezika: i18n i hreflang bez grešaka",
    en: "A website in five languages: i18n and hreflang without errors",
  },
  description: {
    sr: "Šta sam naučio radeći i18n za 5 jezika na jednoj platformi (Nuxt i Laravel, 779 adresa u mapi sajta): rute, prevodi, mapa sajta, hreflang i x-default.",
    en: "What I learned running i18n for 5 languages on one platform (Nuxt and Laravel, 779 sitemap URLs): routes, translations, sitemap, hreflang and x-default.",
  },
  answer: {
    sr: "Na jednoj platformi u Nuxt-u i Laravelu vodim i18n za 5 jezika, a mapa sajta ima 779 adresa. Da bi hreflang radio bez grešaka, svaka jezička verzija mora da ima svoju stabilnu adresu, sopstvene meta podatke i uzajamne hreflang veze sa x-default oznakom. Rute, hreflang i mapa sajta treba da dolaze iz istog izvora, da se nikad ne raziđu.",
    en: "On one Nuxt and Laravel platform I run i18n for 5 languages, and the sitemap has 779 URLs. For hreflang to work without errors, every language version needs its own stable URL, its own meta data and reciprocal hreflang links with an x-default. Routes, hreflang and the sitemap should come from the same source so they never drift apart.",
  },
  category: "razvoj",
  date: "2026-09-24",
  minutes: 4,
  body: {
    sr: [
      {
        type: "p",
        text: "Radim na platformi sa frontendom u Nuxt-u i backendom u Laravelu. Sajt postoji na 5 jezika, a moj deo posla je i18n: rute, prevodi, mapa sajta i hreflang. Mapa sajta danas ima 779 adresa. Na tom obimu svaka greška u šablonu se umnoži, pa sam naučio da višejezičnost tretiram kao arhitekturu od prvog dana, a ne kao prevod na kraju.",
      },
      { type: "h2", text: "Rute: jedan jezik, jedna adresa" },
      {
        type: "p",
        text: "Prva odluka je kako jezik ulazi u adresu. Najčešće opcije su prefiks u putanji, poddomen ili poseban domen. Za većinu sajtova prefiks je najjednostavniji: jedan domen, jedan sertifikat, jedna aplikacija. Bitno je da svaka jezička verzija ima svoju stabilnu adresu i da jezik ne zavisi od kolačića ili podešavanja pretraživača. Google-ov crawler ne nosi vaše kolačiće, pa ako se sadržaj menja po kolačiću, on vidi samo jednu verziju.",
      },
      {
        type: "p",
        text: "Druga odluka je da li se prevodi i sam deo adrese. Kada srpska verzija ima reč usluge u adresi, a engleska services, to lepše izgleda i pomaže u pretrazi na lokalnom jeziku. Ali tada aplikacija mora da zna da su te dve adrese ista stranica. U Nuxt-u se to rešava mapiranjem ruta po jeziku. Za sadržaj iz baze, Laravel mora da čuva slug za svaki jezik posebno, a ne samo preveden naslov.",
      },
      { type: "h2", text: "Šta sve treba prevesti" },
      {
        type: "p",
        text: "Prevod teksta je lakši deo. Teže je setiti se svega ostalog: naslova i opisa stranica, alt tekstova, poruka o greškama u formama, mejlova koji odlaze posle forme, formata datuma i brojeva, breadcrumb-a, strukturiranih podataka. Sve što ostane na pogrešnom jeziku korisniku izgleda kao greška, a pretraživaču šalje mešan signal.",
      },
      {
        type: "p",
        text: "Zato prevode delim u dve grupe. Statični tekst interfejsa ide u fajlove prevoda na frontendu. Sadržaj koji uređuju ljudi ide u bazu, sa poljem za svaki jezik. Kada za neki jezik prevod ne postoji, ta jezička verzija stranice ne treba da se pravi i ne ulazi u mapu sajta. Bolje je da je nema nego da pod srpskom adresom prikazuje tekst na drugom jeziku.",
      },
      { type: "h2", text: "Hreflang" },
      {
        type: "p",
        text: "Hreflang je oznaka koja Google-u kaže: ova stranica postoji i na ovim jezicima, a ovo su adrese. Pravila su jednostavna, ali se lako prekrše na velikom sajtu.",
      },
      {
        type: "list",
        items: [
          "Svaka jezička verzija navodi sve verzije, uključujući i samu sebe.",
          "Veze moraju biti uzajamne. Ako srpska stranica pokazuje na nemačku, nemačka mora da pokazuje na srpsku, inače Google tu vezu ignoriše.",
          "Adrese moraju biti apsolutne, kanonske i vraćati status 200, bez preusmeravanja.",
          "Kodovi moraju biti ispravni: kod jezika po ISO 639-1, a region, ako ga koristite, po ISO 3166-1. Česta greška je kod zemlje na mestu koda jezika.",
        ],
      },
      {
        type: "p",
        text: "Zato hreflang ne pišem ručno. Postoji jedna lista jezika i jedna funkcija koja za datu stranicu vraća njene adrese na svim jezicima. I oznake u head-u i mapa sajta koriste tu istu funkciju. Kada se doda jezik ili nova vrsta stranice, ne može da se desi da je jedno mesto ažurirano, a drugo nije.",
      },
      { type: "h2", text: "x-default" },
      {
        type: "p",
        text: "x-default je verzija koju Google prikazuje kada nijedan od vaših jezika ne odgovara korisniku. Najčešće je to engleska verzija ili stranica sa izborom jezika. Sajt bez x-default oznake nije pogrešan, ali propušta priliku. Korisnik iz zemlje čiji jezik nemate dobija verziju koju je Google izabrao sam. Bolje je da tu odluku donesete vi.",
      },
      {
        type: "p",
        text: "Ako koren domena preusmerava korisnika po jeziku pretraživača, koren je dobar kandidat za x-default. Ali to preusmeravanje mora da bude blago, sa jasnom mogućnošću promene jezika, i nikako ne sme da sakrije ostale verzije od crawlera.",
      },
      { type: "h2", text: "Mapa sajta" },
      {
        type: "p",
        text: "Sa 779 adresa mapa sajta ne može da se održava ručno. Generiše se iz baze i iz liste statičnih ruta, za svaki jezik. Hreflang može da stoji i u samoj mapi, kao xhtml:link elementi uz svaku adresu. Kod velikih sajtova to je zgodno jer ne opterećuje head svake stranice, a Google ga čita jednako.",
      },
      {
        type: "p",
        text: "Pravila za mapu su ista kao za hreflang: samo kanonske adrese, samo status 200, samo stranice koje treba da budu u indeksu. Stranica koja nema prevod na neki jezik ne dobija adresu na tom jeziku, ni u mapi ni u hreflang oznakama drugih verzija.",
      },
      { type: "h2", text: "Kako proveravam" },
      {
        type: "p",
        text: "Posle svake veće izmene prolazim isti spisak. Crawl sajta alatom koji prijavljuje hreflang greške. Provera da li broj adresa u mapi odgovara broju stranica po jeziku. Ručni pregled nekoliko stranica: izvorni kod, canonical, hreflang i lang atribut na html elementu. Na kraju Search Console, nekoliko dana kasnije, da vidim da li Google vidi iste veze kao ja.",
      },
      {
        type: "p",
        text: "Najviše problema nastaje kada se doda nova vrsta stranice, a neko zaboravi na prevode. Najsigurnije je da se nova stranica ne može ni sačuvati bez jezičkih polja. Tada sistem sam sprečava grešku koju bi čovek lako napravio.",
      },
      {
        type: "callout",
        text: "Ako vaš sajt ima više jezika, a niste sigurni da li hreflang radi, pošaljite mi adresu. Brzo mogu da vidim da li su veze uzajamne i da li postoji x-default.",
      },
    ],
    en: [
      {
        type: "p",
        text: "I work on a platform with a Nuxt frontend and a Laravel backend. The site runs in 5 languages, and my part of the work is i18n: routes, translations, the sitemap and hreflang. The sitemap now has 779 URLs. At that size every template mistake multiplies, so I've learned to treat multilingual support as architecture from day one, not as translation at the end.",
      },
      { type: "h2", text: "Routes: one language, one URL" },
      {
        type: "p",
        text: "The first decision is how the language enters the URL. The usual options are a path prefix, a subdomain or a separate domain. For most sites a prefix is the simplest: one domain, one certificate, one application. What matters is that each language version has its own stable URL and that the language doesn't depend on cookies or browser settings. Google's crawler doesn't carry your cookies, so if content switches by cookie, it only ever sees one version.",
      },
      {
        type: "p",
        text: "The second decision is whether the path itself gets translated. When the Serbian version has usluge in the URL and the English one has services, it looks better and helps with search in the local language. But then the app has to know those two URLs are the same page. In Nuxt you solve that with per-language route mapping. For content from the database, Laravel has to store a slug for each language, not just a translated title.",
      },
      { type: "h2", text: "Everything that needs translating" },
      {
        type: "p",
        text: "Translating the text is the easy part. The hard part is remembering everything else: page titles and descriptions, alt text, form error messages, emails sent after a form, date and number formats, breadcrumbs, structured data. Anything left in the wrong language looks like a bug to the user and sends a mixed signal to search engines.",
      },
      {
        type: "p",
        text: "So I split translations into two groups. Static interface text goes into translation files on the frontend. Content that people edit goes into the database, with a field for each language. When a translation doesn't exist for a language, that language version of the page shouldn't be generated and doesn't go into the sitemap. Better to have no page than to show text in another language under a Serbian URL.",
      },
      { type: "h2", text: "Hreflang" },
      {
        type: "p",
        text: "Hreflang is a tag that tells Google: this page also exists in these languages, and here are the URLs. The rules are simple, but they break easily on a large site.",
      },
      {
        type: "list",
        items: [
          "Every language version lists all versions, including itself.",
          "Links must be reciprocal. If the Serbian page points to the German one, the German one has to point back, or Google ignores the link.",
          "URLs must be absolute, canonical and return status 200, with no redirects.",
          "Codes must be valid: the language in ISO 639-1 and, if you use one, the region in ISO 3166-1. A common mistake is a country code where the language code should be.",
        ],
      },
      {
        type: "p",
        text: "That's why I don't write hreflang by hand. There is one list of languages and one function that returns a page's URLs in every language. Both the head tags and the sitemap use that same function. When a language or a new page type is added, there's no way for one place to get updated while the other doesn't.",
      },
      { type: "h2", text: "x-default" },
      {
        type: "p",
        text: "x-default is the version Google shows when none of your languages match the user. Usually it's the English version or a language picker page. A site without x-default isn't wrong, but it misses a chance. A user from a country whose language you don't have gets whatever version Google picks on its own. Better to make that decision yourself.",
      },
      {
        type: "p",
        text: "If the root of the domain redirects users based on browser language, the root is a good candidate for x-default. But that redirect has to be gentle, with a clear way to switch languages, and it must never hide the other versions from the crawler.",
      },
      { type: "h2", text: "Sitemap" },
      {
        type: "p",
        text: "With 779 URLs the sitemap can't be maintained by hand. It's generated from the database and from the list of static routes, for each language. Hreflang can also live in the sitemap itself, as xhtml:link elements next to each URL. On large sites that's handy because it keeps the head of every page lighter, and Google reads it the same way.",
      },
      {
        type: "p",
        text: "The sitemap rules match the hreflang rules: only canonical URLs, only status 200, only pages that belong in the index. A page without a translation in some language gets no URL in that language, neither in the sitemap nor in the hreflang tags of other versions.",
      },
      { type: "h2", text: "How I check it" },
      {
        type: "p",
        text: "After every larger change I go through the same list. A crawl with a tool that reports hreflang errors. A check that the number of sitemap URLs matches the number of pages per language. A manual look at a few pages: source code, canonical, hreflang and the lang attribute on the html element. Finally Search Console, a few days later, to see whether Google sees the same links I do.",
      },
      {
        type: "p",
        text: "Most problems appear when a new page type is added and someone forgets about translations. The safest setup is one where a new page can't even be saved without its language fields. Then the system itself blocks a mistake a person would easily make.",
      },
      {
        type: "callout",
        text: "If your site runs in several languages and you're not sure hreflang works, send me the URL. I can quickly tell whether the links are reciprocal and whether there's an x-default.",
      },
    ],
  },
};
