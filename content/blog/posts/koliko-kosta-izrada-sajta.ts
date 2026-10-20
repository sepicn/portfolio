import type { Post } from "../types";

export const post: Post = {
  slug: {
    sr: "koliko-kosta-izrada-sajta",
    en: "how-much-does-a-website-cost-serbia",
  },
  title: {
    sr: "Koliko košta izrada sajta u Srbiji i od čega zavisi cena",
    en: "How much does a website cost in Serbia, and what drives the price",
  },
  description: {
    sr: "Od čega zavisi cena sajta: broj stranica i jezika, forme, integracije sa fiskalnom kasom, CRM-om i plaćanjem, SEO i održavanje. Poređenje šablona, WordPressa i sajta po meri.",
    en: "What decides the price of a website: pages and languages, forms, integrations with fiscal registers, CRMs and payments, SEO and maintenance. Template vs WordPress vs custom.",
  },
  answer: {
    sr: "Cena sajta u Srbiji najviše zavisi od toga šta sajt treba da radi, a mnogo manje od toga kako izgleda. Broj stranica i jezika, forme koje nešto pokreću, integracije sa kasom, CRM-om ili plaćanjem, SEO i održavanje čine najveći deo posla. Realnu cenu zato dobijate tek kada znate odgovor na ta pitanja.",
    en: "The price of a website in Serbia depends mostly on what the site has to do, and much less on how it looks. Pages and languages, forms that trigger something, integrations with a cash register, CRM or payments, SEO and maintenance make up most of the work. You get a realistic price only once those questions are answered.",
  },
  category: "sajtovi",
  date: "2026-10-14",
  minutes: 5,
  body: {
    sr: [
      {
        type: "p",
        text: "Ovo pitanje dobijam skoro na svakom prvom razgovoru. Razumem ga. Niko ne želi da potroši sat vremena na sastanak pa da sazna da mu je budžet daleko od realnog. Ipak, ovde neću pisati cifre. Cene se menjaju, svaki projekat je drugačiji, a broj bez konteksta više zbuni nego što pomogne. Umesto toga objasniću šta zapravo pomera cenu gore ili dole, pa ćete posle čitanja moći sami da procenite gde je vaš sajt.",
      },
      { type: "h2", text: "Dizajn je manji deo računa nego što mislite" },
      {
        type: "p",
        text: "Većina ljudi misli da najviše plaća izgled. U praksi su dizajn početne strane i nekoliko unutrašnjih šablona ograničen posao. Ono što raste sa svakim novim zahtevom su stvari koje se ne vide na prvi pogled: logika iza formi, povezivanje sa drugim sistemima, prevodi, podešavanje praćenja. Sajt koji samo predstavlja firmu i sajt koji prima porudžbine mogu da izgledaju gotovo isto. Razlika u poslu ipak može biti višestruka.",
      },
      { type: "h2", text: "Broj stranica i jezika" },
      {
        type: "p",
        text: "Svaka nova vrsta stranice znači novi šablon, novi sadržaj i novo testiranje. Pet stranica istog tipa nije isto što i pet različitih tipova. Ako imate deset usluga koje se prikazuju na isti način, to je jedan šablon i deset unosa. Ako svaka usluga ima svoj raspored, to je deset malih projekata.",
      },
      {
        type: "p",
        text: "Jezici se često potcene. Druga jezička verzija nije samo prevod teksta. Treba rešiti adrese stranica za svaki jezik, menije, forme i poruke o greškama, mapu sajta i hreflang oznake, da bi Google znao koja verzija je za koga. Ako sadržaj dodajete i posle lansiranja, svaki novi tekst mora da postoji na svim jezicima. O tome sam detaljnije pisao u tekstu o sajtu na pet jezika.",
      },
      { type: "h2", text: "Forme koje nešto rade" },
      {
        type: "p",
        text: "Kontakt forma koja šalje mejl je jednostavna. Forma koja zakazuje termin, proverava slobodna mesta, šalje potvrdu klijentu i upisuje podatke u vaš sistem je već mala aplikacija. Pitanje koje uvek postavim glasi: šta se dešava posle klika na dugme? Što je odgovor duži, to je više posla. Validacija, zaštita od spama, poruke na više jezika i obaveštenja za vas i za klijenta skupe se brže nego što izgleda.",
      },
      { type: "h2", text: "Integracije" },
      {
        type: "p",
        text: "Ovde cena najviše varira. Povezivanje sa fiskalnom kasom, CRM-om ili sistemom za plaćanje znači rad sa tuđim API-jem, tuđom dokumentacijom i tuđim ograničenjima. Neki servisi imaju jasnu dokumentaciju i testno okruženje. Neki nemaju, pa ode dosta vremena na proveru kako se sistem stvarno ponaša. Kada pravim procenu, svaku integraciju računam posebno. Jedna loše dokumentovana veza može da traje duže od celog ostatka sajta.",
      },
      {
        type: "p",
        text: "Ako vas zanima kako to izgleda sa fiskalizacijom i IPS plaćanjem, opisao sam to u posebnom tekstu, na osnovu softvera za salone i ugostiteljstvo koji sam razvijao.",
      },
      { type: "h2", text: "SEO i praćenje" },
      {
        type: "p",
        text: "Osnovni tehnički SEO treba da bude deo svakog sajta: brze stranice, ispravni naslovi i opisi, mapa sajta, čiste adrese i strukturirani podaci tamo gde imaju smisla. Bez toga sajt nije završen. Dodatni posao je istraživanje ključnih reči, pisanje sadržaja i podešavanje praćenja konverzija za Google Ads i Analytics.",
      },
      {
        type: "p",
        text: "Ako planirate oglase, praćenje se podešava pre lansiranja, a ne posle. U suprotnom nekoliko nedelja plaćate klikove i ne znate šta su doneli.",
      },
      { type: "h2", text: "Održavanje" },
      {
        type: "p",
        text: "Sajt nije gotov kada ode na server. Sistem i dodatke treba ažurirati, greške pratiti, rezervne kopije praviti, a sadržaj povremeno menjati. Za WordPress je ovo obavezno, jer su zastareli dodaci najčešći razlog zašto sajtovi budu hakovani. Sajt po meri obično traži ređe intervencije, ali kada zatreba, treba vam neko ko poznaje taj kod. Kada upoređujete ponude, pitajte šta je uključeno posle lansiranja.",
      },
      { type: "h2", text: "Šablon, WordPress ili po meri" },
      {
        type: "p",
        text: "Ovo su tri najčešća puta, sa razlikama koje klijentima najviše znače:",
      },
      {
        type: "options",
        items: [
          {
            name: "Šablon",
            rows: [
              ["Rok", "Najkraći"],
              ["Izmene kasnije", "Tekst lako, strukturu teško"],
              ["Više jezika", "Zavisi od šablona, često ograničeno"],
            ],
            note: "Dobar početak kada vreme i budžet odlučuju o svemu.",
          },
          {
            name: "WordPress",
            rows: [
              ["Rok", "Srednji"],
              ["Izmene kasnije", "Sadržaj menjate sami kroz admin panel"],
              ["Više jezika", "Moguće uz dodatke, traži pažljivo podešavanje"],
            ],
            note: "Najbolji izbor kada često objavljujete sadržaj.",
            highlight: true,
          },
          {
            name: "Po meri",
            rows: [
              ["Rok", "Najduži"],
              ["Izmene kasnije", "Sve je moguće, ali uz programera"],
              ["Više jezika", "Ugrađeno od početka, bez kompromisa"],
            ],
            note: "Ima smisla kada sajt ima posebnu logiku ili integracije.",
          },
        ],
      },
      {
        type: "p",
        text: "Primer za WordPress iz moje prakse je jedan onlajn magazin sa više od 70 članaka. Tu je WordPress bio pravi izbor. Urednici redovno objavljuju tekstove, dodaju slike i kategorije, i ne treba im programer za svaki novi članak. Da smo išli na rešenje po meri, platili bi razvoj admin panela koji WordPress već ima.",
      },
      {
        type: "p",
        text: "Sa druge strane, kada sajt treba da izdaje fiskalne račune ili da radi sa rezervacijama po posebnim pravilima, dodaci brzo postanu više problem nego rešenje. Tada je kod po meri jeftiniji na duže staze, iako je početak skuplji.",
      },
      { type: "h2", text: "Kako da dobijete realnu procenu" },
      {
        type: "p",
        text: "Pre nego što zatražite ponudu, zapišite odgovore na nekoliko pitanja. Koje stranice vam trebaju i da li se neke ponavljaju? Na koliko jezika? Šta treba da se desi kada klijent popuni formu? Sa kojim sistemima sajt mora da razgovara? Ko će posle menjati sadržaj? Planirate li oglase?",
      },
      {
        type: "p",
        text: "Sa tim odgovorima svaki ozbiljan developer može da da procenu koja neće porasti usred projekta. Ako ponuda stigne bez ijednog pitanja, budite oprezni. Verovatno niko nije razmislio šta sve sajt treba da radi.",
      },
      {
        type: "callout",
        text: "Ako želite procenu za svoj sajt, pošaljite mi odgovore na ova pitanja. Javljam se sa procenom roka i obima posla, bez obaveze.",
      },
    ],
    en: [
      {
        type: "p",
        text: "I get this question in almost every first call. I understand why. Nobody wants to spend an hour in a meeting only to find out their budget is nowhere near realistic. Still, I won't put numbers in this post. Prices change, every project is different, and a figure without context confuses more than it helps. Instead I'll explain what actually moves the price up or down, so after reading you can judge for yourself where your site sits.",
      },
      { type: "h2", text: "Design is a smaller part of the bill than you think" },
      {
        type: "p",
        text: "Most people assume they are paying mainly for the look. In practice, designing the home page and a few inner templates is a limited job. What grows with every new requirement is the stuff you don't see at first glance: the logic behind forms, connections to other systems, translations, tracking setup. A site that only presents a company and a site that takes orders can look almost the same. The difference in work can still be several times over.",
      },
      { type: "h2", text: "Number of pages and languages" },
      {
        type: "p",
        text: "Every new type of page means a new template, new content and new testing. Five pages of the same type are not the same as five different types. If you have ten services that are all shown the same way, that is one template and ten entries. If every service has its own layout, that is ten small projects.",
      },
      {
        type: "p",
        text: "Languages are often underestimated. A second language is more than translated text. You need page addresses for each language, menus, forms and error messages, a sitemap and hreflang tags so Google knows which version is for whom. If you keep adding content after launch, every new article has to exist in every language. I wrote about this in more detail in the post about a website in five languages.",
      },
      { type: "h2", text: "Forms that actually do something" },
      {
        type: "p",
        text: "A contact form that sends an email is simple. A form that books an appointment, checks free slots, sends the client a confirmation and writes the data into your system is already a small application. The question I always ask is: what happens after someone clicks the button? The longer the answer, the more work. Validation, spam protection, messages in several languages and notifications for you and the client add up faster than it seems.",
      },
      { type: "h2", text: "Integrations" },
      {
        type: "p",
        text: "This is where the price varies most. Connecting to a fiscal cash register, a CRM or a payment system means working with someone else's API, their documentation and their limits. Some services have clear docs and a test environment. Some don't, and a lot of time goes into finding out how the system really behaves. When I estimate a project, I price each integration separately. One poorly documented connection can take longer than the rest of the site.",
      },
      {
        type: "p",
        text: "If you want to see what that looks like with fiscalization and IPS payments, I covered it in a separate post, based on software for salons and hospitality that I built.",
      },
      { type: "h2", text: "SEO and tracking" },
      {
        type: "p",
        text: "Basic technical SEO belongs in every site: fast pages, proper titles and descriptions, a sitemap, clean URLs and structured data where it makes sense. Without it the site isn't finished. The extra work is keyword research, writing content and setting up conversion tracking for Google Ads and Analytics.",
      },
      {
        type: "p",
        text: "If you plan to run ads, tracking gets set up before launch, not after. Otherwise you spend a few weeks paying for clicks with no idea what they brought in.",
      },
      { type: "h2", text: "Maintenance" },
      {
        type: "p",
        text: "A site isn't done when it goes live. The system and plugins need updates, errors need watching, backups need to happen and content needs changing now and then. For WordPress this is mandatory, because outdated plugins are the most common reason sites get hacked. A custom site usually needs attention less often, but when it does, you need someone who knows that code. When you compare offers, ask what is included after launch.",
      },
      { type: "h2", text: "Template, WordPress or custom" },
      {
        type: "p",
        text: "These are the three most common routes, with the differences clients care about most:",
      },
      {
        type: "options",
        items: [
          {
            name: "Template",
            rows: [
              ["Timeline", "Shortest"],
              ["Changes later", "Text is easy, structure is hard"],
              ["Multiple languages", "Depends on the template, often limited"],
            ],
            note: "A good start when time and budget decide everything.",
          },
          {
            name: "WordPress",
            rows: [
              ["Timeline", "Medium"],
              ["Changes later", "You edit content yourself in the admin panel"],
              ["Multiple languages", "Possible with plugins, needs careful setup"],
            ],
            note: "The best fit when you publish content often.",
            highlight: true,
          },
          {
            name: "Custom",
            rows: [
              ["Timeline", "Longest"],
              ["Changes later", "Anything is possible, with a developer"],
              ["Multiple languages", "Built in from day one, no compromises"],
            ],
            note: "Makes sense when the site has its own logic or integrations.",
          },
        ],
      },
      {
        type: "p",
        text: "A WordPress example from my own work is an online magazine with more than 70 articles. WordPress was the right call there. The editors publish regularly, add images and categories, and don't need a developer for every new article. A custom build would have meant paying for an admin panel that WordPress already has.",
      },
      {
        type: "p",
        text: "On the other hand, when a site has to issue fiscal receipts or handle bookings with special rules, plugins quickly become more of a problem than a solution. Then custom code is cheaper in the long run, even though it costs more at the start.",
      },
      { type: "h2", text: "How to get a realistic estimate" },
      {
        type: "p",
        text: "Before you ask for a quote, write down answers to a few questions. Which pages do you need, and do some of them repeat? How many languages? What should happen when a client fills in a form? Which systems does the site need to talk to? Who will change the content later? Are you planning to run ads?",
      },
      {
        type: "p",
        text: "With those answers any serious developer can give you an estimate that won't grow halfway through the project. If a quote arrives without a single question, be careful. Most likely nobody thought about everything the site needs to do.",
      },
      {
        type: "callout",
        text: "If you want an estimate for your site, send me your answers to these questions. I'll come back with a timeline and scope, no strings attached.",
      },
    ],
  },
};
