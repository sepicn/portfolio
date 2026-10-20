import type { Post } from "../types";

export const post: Post = {
  slug: {
    sr: "site-health-90-98",
    en: "site-health-90-to-98",
  },
  title: {
    sr: "Site Health sa 90% na 98% za nedelju dana",
    en: "Site Health from 90% to 98% in one week",
  },
  description: {
    sr: "Kako sam na jednom velikom sajtu podigao Semrush Site Health sa 90% na 98% za nedelju dana: greške sa 6 na 0, upozorenja manje za 87%. Tehnički SEO korak po korak.",
    en: "How I raised Semrush Site Health on a large site from 90% to 98% in a week: errors from 6 to 0, warnings down 87%. Technical SEO step by step.",
  },
  answer: {
    sr: "Semrush Site Health na jednom velikom višejezičnom sajtu podigao sam sa 90% na 98% za nedelju dana. Greške su pale sa 6 na 0, a upozorenja za 87%. Najveći pomak je došao od popravki u šablonima, jer jedan problem u šablonu pravi isto upozorenje na svim stranicama koje ga koriste.",
    en: "I raised Semrush Site Health on a large multilingual site from 90% to 98% in one week. Errors went from 6 to 0 and warnings dropped by 87%. The biggest gain came from fixing templates, because one problem in a template creates the same warning on every page that uses it.",
  },
  category: "seo",
  date: "2026-09-30",
  minutes: 4,
  body: {
    sr: [
      {
        type: "p",
        text: "Site Health je jedan broj u Semrush-u koji pokazuje koliko je sajt tehnički zdrav prema njihovom crawleru. To nije Google-ov signal i ne treba ga juriti radi samog broja. Ipak, to je dobar spisak stvari koje i Google-ov crawler vidi, i brz način da proverite da li je sajt posle izmena i dalje u redu.",
      },
      {
        type: "p",
        text: "Kada sam počeo da radim na tom sajtu, skor je bio 90%. Nedelju dana kasnije bio je 98%. Greške su pale sa 6 na 0, a broj upozorenja za 87%. Evo kojim redom sam radio.",
      },
      { type: "h2", text: "Prvo pročitajte izveštaj, pa tek onda popravljajte" },
      {
        type: "p",
        text: "Semrush deli nalaze na greške, upozorenja i obaveštenja. Greške su ozbiljne stvari: stranice koje vraćaju grešku, neispravni interni linkovi, problemi sa mapom sajta ili sa oznakama koje Google koristi. Upozorenja se često ponavljaju na stotinama stranica zbog jednog šablona. Obaveštenja su uglavnom samo informacija.",
      },
      {
        type: "p",
        text: "Moje prvo pravilo je da ne popravljam stranicu po stranicu. Kada isti problem stoji na velikom broju adresa, uzrok je skoro uvek u jednom šablonu ili komponenti. Popravka na jednom mestu sredi sve odjednom. Zato su upozorenja mogla da padnu za 87% za nekoliko dana, a ne za nekoliko meseci.",
      },
      { type: "h2", text: "Greške" },
      {
        type: "p",
        text: "Greške sam rešio prve. Bilo ih je malo, a bile su najvažnije. Za svaku sam tražio izvor: da li je link pogrešno upisan u sadržaju, da li ga generiše kod, da li stranica stvarno ne postoji ili samo vraća pogrešan status.",
      },
      {
        type: "p",
        text: "Svaki izvor traži drugu popravku. Pogrešan link u tekstu ispravlja se u sadržaju. Link koji pravi kod popravlja se u komponenti, i tada nestaje sa svih stranica odjednom. Stranica koja je obrisana a negde se još pominje dobija preusmeravanje na najbližu zamenu, ili se link uklanja.",
      },
      { type: "h2", text: "Preusmeravanja i lanci" },
      {
        type: "p",
        text: "Na sajtu koji raste godinama skupe se preusmeravanja. Stranica A vodi na B, B na C. Takav lanac usporava crawler i nepotrebno troši njegovo vreme na sajtu. Rešenje je da interni linkovi vode direktno na konačnu adresu, a da stara preusmeravanja pokazuju odmah na kraj lanca.",
      },
      {
        type: "p",
        text: "Isto važi za sitnice kao što su kosa crta na kraju adrese, velika i mala slova ili http umesto https. Kada se jednom odluči koji oblik adrese je pravi, svi interni linkovi, canonical oznake i mapa sajta moraju da ga prate.",
      },
      { type: "h2", text: "Naslovi, opisi i oznake u šablonima" },
      {
        type: "p",
        text: "Duplirani naslovi i meta opisi su tipično upozorenje na sajtovima sa mnogo sličnih stranica. Na višejezičnom sajtu dešava se i da neka jezička verzija nema svoje meta podatke, pa pokupi tekst sa drugog jezika. Rešenje je u šablonu: svaka stranica pravi naslov i opis iz sopstvenog sadržaja, na sopstvenom jeziku, a ne iz zajedničke podrazumevane vrednosti.",
      },
      {
        type: "p",
        text: "U istom prolazu proverio sam canonical i hreflang. Svaka stranica treba da pokazuje na sebe kao canonical, osim ako stvarno postoji druga verzija koja treba da bude glavna. Hreflang mora da bude uzajaman: ako srpska verzija pokazuje na englesku, engleska mora da pokazuje nazad.",
      },
      { type: "h2", text: "Mapa sajta" },
      {
        type: "p",
        text: "Mapa sajta treba da sadrži samo stranice koje želite u indeksu i koje vraćaju status 200. Bez preusmeravanja, bez stranica sa noindex oznakom, bez obrisanih adresa. Ovo se lako pokvari kada se mapa generiše automatski iz baze, a niko ne gleda šta je u njoj. Pravilo koje sam postavio je jednostavno: ono što je u mapi i ono što je dozvoljeno za indeks mora biti ista lista.",
      },
      { type: "h2", text: "Ponovni crawl posle svake grupe" },
      {
        type: "p",
        text: "Posle svake grupe popravki pokretao sam novi crawl. Iz dva razloga. Prvo, vidite da li je popravka stvarno radila. Drugo, ponekad rešavanje jednog problema otkrije drugi, koji je do tada bio sakriven ispod. Nedelja je bila dovoljna zato što sam radio u grupama: greške, pa preusmeravanja, pa šabloni, pa mapa sajta.",
      },
      { type: "h2", text: "Šta Site Health ne meri" },
      {
        type: "p",
        text: "Visok skor ne znači da će sajt rangirati. Semrush ne zna da li je sadržaj dobar, da li odgovara na ono što ljudi traže i da li drugi sajtovi linkuju ka vama. On meri tehničku osnovu. Bez te osnove, međutim, i dobar sadržaj se teže pronalazi i indeksira.",
      },
      {
        type: "p",
        text: "Zato ovaj posao radim na početku svakog SEO projekta. Brz je, rezultat se vidi odmah, i posle njega znam da sadržaj koji pišemo ima čist put do indeksa.",
      },
      {
        type: "callout",
        text: "Ako imate Semrush ili Ahrefs, pokrenite audit i pogledajte samo greške. Ako ih je malo, popravite ih ove nedelje. Teško je naći jeftiniji SEO posao.",
      },
    ],
    en: [
      {
        type: "p",
        text: "Site Health is a single number in Semrush that shows how technically healthy a site is according to their crawler. It isn't a Google signal and you shouldn't chase it for its own sake. Still, it's a good list of things Google's crawler sees too, and a quick way to check that the site is still fine after changes.",
      },
      {
        type: "p",
        text: "When I started working on that site, the score was 90%. A week later it was 98%. Errors went from 6 to 0 and the number of warnings dropped by 87%. Here's the order I worked in.",
      },
      { type: "h2", text: "Read the report first, fix things second" },
      {
        type: "p",
        text: "Semrush splits findings into errors, warnings and notices. Errors are the serious stuff: pages returning an error, broken internal links, problems with the sitemap or with tags Google relies on. Warnings often repeat across hundreds of pages because of a single template. Notices are mostly just information.",
      },
      {
        type: "p",
        text: "My first rule is not to fix things page by page. When the same issue shows up on many URLs, the cause is almost always one template or component. A fix in one place clears all of them at once. That's why warnings could drop by 87% in a few days instead of a few months.",
      },
      { type: "h2", text: "Errors" },
      {
        type: "p",
        text: "I handled errors first. There were few of them and they mattered most. For each one I looked for the source: was the link mistyped in the content, was it generated by code, did the page really not exist or did it just return the wrong status?",
      },
      {
        type: "p",
        text: "Each source needs a different fix. A wrong link in an article gets corrected in the content. A link produced by code gets fixed in the component, and then it disappears from every page at once. A page that was deleted but is still referenced somewhere gets a redirect to the closest replacement, or the link gets removed.",
      },
      { type: "h2", text: "Redirects and chains" },
      {
        type: "p",
        text: "A site that has grown for years collects redirects. Page A points to B, B points to C. A chain like that slows the crawler down and wastes its time on the site. The fix is to make internal links point straight to the final URL, and to make old redirects point directly to the end of the chain.",
      },
      {
        type: "p",
        text: "The same goes for small things like a trailing slash, upper and lower case, or http instead of https. Once you decide which form of the URL is the real one, every internal link, canonical tag and the sitemap has to follow it.",
      },
      { type: "h2", text: "Titles, descriptions and tags in templates" },
      {
        type: "p",
        text: "Duplicate titles and meta descriptions are a typical warning on sites with many similar pages. On a multilingual site it also happens that one language version has no meta data of its own and picks up text from another language. The fix lives in the template: every page builds its title and description from its own content, in its own language, not from a shared default.",
      },
      {
        type: "p",
        text: "In the same pass I checked canonical and hreflang. Every page should point to itself as canonical, unless there really is another version that should be the main one. Hreflang has to be reciprocal: if the Serbian version points to the English one, the English one has to point back.",
      },
      { type: "h2", text: "Sitemap" },
      {
        type: "p",
        text: "A sitemap should list only pages you want indexed and that return status 200. No redirects, no noindex pages, no deleted URLs. This breaks easily when the sitemap is generated from the database and nobody looks at what ends up in it. The rule I set is simple: what's in the sitemap and what's allowed in the index must be the same list.",
      },
      { type: "h2", text: "A fresh crawl after every batch" },
      {
        type: "p",
        text: "After each batch of fixes I ran a new crawl. Two reasons. First, you see whether the fix actually worked. Second, solving one problem sometimes reveals another that was hidden underneath. A week was enough because I worked in batches: errors, then redirects, then templates, then the sitemap.",
      },
      { type: "h2", text: "What Site Health doesn't measure" },
      {
        type: "p",
        text: "A high score doesn't mean the site will rank. Semrush doesn't know whether the content is good, whether it answers what people are searching for, or whether other sites link to you. It measures the technical foundation. Without that foundation, though, even good content is harder to find and index.",
      },
      {
        type: "p",
        text: "That's why I do this work at the start of every SEO project. It's quick, the result is visible right away, and afterwards I know the content we write has a clean path to the index.",
      },
      {
        type: "callout",
        text: "If you have Semrush or Ahrefs, run an audit and look only at the errors. If there are just a few, fix them this week. It's hard to find cheaper SEO work.",
      },
    ],
  },
};
