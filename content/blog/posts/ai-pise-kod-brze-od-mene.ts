import type { Post } from "../types";

export const post: Post = {
  slug: {
    sr: "ai-pise-kod-brze-od-mene",
    en: "ai-writes-code-faster-than-me",
  },
  title: {
    sr: "AI piše kod brže od mene. Zašto mi i dalje treba znanje",
    en: "AI writes code faster than me. Why I still need to know things",
  },
  description: {
    sr: "Kako radim sa AI agentima svaki dan i zašto i dalje učim arhitekturu: duple rezervacije, idempotentnost, outbox, row-level security, offline rad i hreflang. Stvari koje AI neće dodati ako ih ne tražite.",
    en: "How I work with AI agents every day and why I still study architecture: double bookings, idempotency, outbox, row-level security, offline mode and hreflang. Things AI won't add unless you ask.",
  },
  answer: {
    sr: "AI danas piše velik deo mog koda i radi to brže od mene. Ali piše ono što tražim, a stvari koje nisam pomenuo obično preskoči. Zaštita od duplih rezervacija, idempotentno plaćanje ili izolacija podataka između klijenata neće se pojaviti sami, morate da znate da postoje i da ih tražite.",
    en: "AI writes a big part of my code these days, and it does it faster than I do. But it writes what I ask for, and the things I don't mention usually get skipped. Protection against double bookings, idempotent payments or data isolation between tenants won't appear on their own. You have to know they exist and ask for them.",
  },
  category: "razvoj",
  date: "2026-10-20",
  minutes: 4,
  body: {
    sr: [
      {
        type: "p",
        text: "Svaki dan radim sa AI agentima. Claude Code, Codex, ponekad oba u isto vreme. Neko bi rekao da sam lenj. Ja bih rekao da sam praktičan. Kod koji bih ranije kucao pola dana sada dobijem za nekoliko minuta.",
      },
      {
        type: "p",
        text: "Pa zašto onda i dalje čitam o arhitekturi, bazama i transakcijama? Zato što AI radi tačno ono što mu kažete. I tu počinje problem.",
      },
      { type: "h2", text: "Kako izgleda moj dan sa AI-jem" },
      {
        type: "p",
        text: "Ne kažem agentu „napravi mi aplikaciju“ pa odem na kafu. Prvo napravim plan po fazama. Svaka faza je mala i može da se proveri. Važne odluke zapišem u ADR, kratak dokument koji kaže šta smo odlučili i zašto. To pomaže meni za par meseci, a pomaže i agentu. Dam mu taj fajl i on ne izmišlja ponovo ono što smo već rešili.",
      },
      {
        type: "p",
        text: "Često pustim nekoliko sesija paralelno. Jedna radi na bazi, druga na frontendu, neka treća piše testove. Zvuči kao da imam tim. Donekle i imam. Samo što taj tim nikad ne pita „jesi li siguran?“. Zato pregledam svaki korak. Svaki diff. I tek onda puštam testove.",
      },
      { type: "h2", text: "Stvari koje AI neće dodati ako ne pitate" },
      {
        type: "p",
        text: "Ovde postaje zanimljivo. Na sve ovo sam stvarno naleteo, i nijednu od ovih stvari agent nije predložio sam.",
      },
      {
        type: "p",
        text: "Duple rezervacije. Dva klijenta kliknu na isti termin u istoj sekundi. Kod proveri da li je termin slobodan, vidi da jeste i upiše oba. AI će vam rado napisati tu proveru u kodu. Ograničenje u samoj bazi, koje odbije drugi upis, neće dodati dok ga ne pomenete. A baš to ograničenje je jedino što pouzdano radi kada dva zahteva stignu u isto vreme.",
      },
      {
        type: "p",
        text: "Dupli fiskalni račun ili dupla naplata. Mreža pukne, korisnik klikne ponovo i upravo ste izdali dva računa. Rešenje su ključevi idempotentnosti, da server prepozna isti zahtev koji je već obradio. Uz to ide outbox obrazac: događaj se prvo upiše u bazu u istoj transakciji, pa ga tek onda poseban proces šalje dalje. Ako ne znate da ti pojmovi postoje, nećete ih ni tražiti. Kada kažete „dodaj plaćanje“, AI ih sam neće ponuditi.",
      },
      {
        type: "p",
        text: "Podaci između klijenata. Kada više firmi koristi istu aplikaciju i istu bazu, jedna nikad ne sme da vidi podatke druge. Filter u kodu je dobar početak. Row-level security u bazi je ono što vas spasi kada neko zaboravi filter. A neko će ga zaboraviti. Možda baš agent.",
      },
      {
        type: "p",
        text: "Offline rad. Konobar kuca porudžbinu, a internet je otišao. Aplikacija mora da sačuva komande lokalno, redom, i da ih pošalje kad se veza vrati, bez duplikata. Log komandi zvuči jednostavno dok ne počnete da razmišljate šta se dešava kad dvoje ljudi menja isti sto.",
      },
      {
        type: "p",
        text: "Hreflang i canonical. Na sajtu sa više jezika AI će prevesti stranice bez problema. Uzajamne hreflang veze, x-default i canonical koji pokazuje na pravu verziju dobijete tek kada ih tražite po imenu. Inače Google gleda pet verzija iste stranice i bira sam.",
      },
      { type: "h2", text: "Znati šta da pitaš je posao" },
      {
        type: "p",
        text: "Sve ove stvari imaju nešto zajedničko. AI ih zna. Pitajte ga šta je outbox obrazac i objasniće vam bolje od većine tutorijala. Kvaka je u tome što morate da pitate. Agent radi u kontekstu koji mu date, a vi ste jedini koji znate da će dva konobara u petak uveče kliknuti na isti sto.",
      },
      {
        type: "p",
        text: "Zato se moj posao pomerio. Manje kucam, više razmišljam o tome šta sistem mora da izdrži. Kontekst, arhitektura i pregled ostaju kod mene. Ko nema osnove, dobiće kod koji radi na demo snimku i pukne prvog dana sa pravim korisnicima.",
      },
      { type: "h2", text: "Gde mi AI stvarno pomaže" },
      {
        type: "list",
        items: [
          "Ponavljanje: forme, CRUD, migracije, testovi za slučajeve koje sam već opisao.",
          "Snalaženje u tuđem kodu. Pitam „gde se ovo računa?“ i odgovor dobijem odmah, umesto da kopam po fajlovima.",
          "Prva verzija nečega što ću ionako menjati.",
          "Prevodi i tekstovi u interfejsu, uz moju proveru.",
        ],
      },
      { type: "h2", text: "Gde se spotakne" },
      {
        type: "list",
        items: [
          "Izmisli funkciju koja ne postoji u verziji biblioteke koju koristim.",
          "Popravi test tako što promeni test, a kod ostavi kakav je bio.",
          "U dugoj sesiji zaboravi odluku od pre sat vremena. Zato i pišem ADR-ove.",
          "Kaže „gotovo“, a nije pokrenuo ništa.",
        ],
      },
      {
        type: "p",
        text: "Poslednja mi je omiljena. Agent napiše „sve radi“ sa punim samopouzdanjem. Onda pokrenem build i dobijem crveni ekran. Zato pregled kod mene nije opcija.",
      },
      { type: "h2", text: "Ako tek počinjete" },
      {
        type: "p",
        text: "Koristite AI. Bilo bi čudno ne koristiti ga. Ali paralelno učite osnove: baze, transakcije, kako radi HTTP, šta se dešava kad dva zahteva stignu u isto vreme. Ne morate sve da znate napamet. Dovoljno je da znate da nešto postoji, pa da možete da pitate.",
      },
      {
        type: "p",
        text: "AI je brz par ruku. Glava je i dalje vaša.",
      },
      {
        type: "callout",
        text: "Ako pravite sistem sa plaćanjem, rezervacijama ili više klijenata u istoj bazi i niste sigurni šta ste propustili, javite mi se. Rado pogledam.",
      },
    ],
    en: [
      {
        type: "p",
        text: "I work with AI agents every day. Claude Code, Codex, sometimes both at once. Some would call that lazy. I'd call it practical. Code I used to type for half a day now shows up in a few minutes.",
      },
      {
        type: "p",
        text: "So why do I still read about architecture, databases and transactions? Because AI does exactly what you tell it. That's where the trouble starts.",
      },
      { type: "h2", text: "What my day with AI looks like" },
      {
        type: "p",
        text: 'I don\'t tell the agent "build me an app" and go grab a coffee. First I make a plan in phases. Each phase is small and easy to check. Important decisions go into an ADR, a short document that says what we decided and why. That helps me a few months later, and it helps the agent too. I hand it that file and it stops reinventing things we already settled.',
      },
      {
        type: "p",
        text: 'I often run several sessions in parallel. One works on the database, another on the frontend, a third writes tests. Sounds like I have a team. Sort of, I do. Except this team never asks "are you sure?". So I review every step. Every diff. Then I run the tests.',
      },
      { type: "h2", text: "Things AI won't add unless you ask" },
      {
        type: "p",
        text: "This is where it gets interesting. I've actually run into every one of these, and the agent didn't suggest a single one on its own.",
      },
      {
        type: "p",
        text: "Double bookings. Two clients click the same time slot in the same second. The code checks whether the slot is free, sees that it is and saves both. AI will happily write that check in code for you. A constraint in the database itself, one that rejects the second insert, won't show up until you mention it. And that constraint is the only thing that reliably works when two requests land at the same time.",
      },
      {
        type: "p",
        text: "A duplicate fiscal receipt or a double charge. The network drops, the user clicks again and you've just issued two receipts. The fix is idempotency keys, so the server recognizes a request it already handled. Next to that goes the outbox pattern: the event is first written to the database in the same transaction, and only then does a separate process send it on. If you don't know these ideas exist, you won't ask for them. Say \"add payments\" and AI won't offer them by itself.",
      },
      {
        type: "p",
        text: "Data between tenants. When several companies use the same app and the same database, one must never see another's data. A filter in the code is a good start. Row-level security in the database is what saves you when someone forgets that filter. And someone will forget it. Maybe the agent.",
      },
      {
        type: "p",
        text: "Offline mode. A waiter takes an order and the internet is gone. The app has to store commands locally, in order, and send them once the connection is back, with no duplicates. A command log sounds simple until you start thinking about two people changing the same table.",
      },
      {
        type: "p",
        text: "Hreflang and canonical. On a multilingual site AI will translate the pages just fine. Reciprocal hreflang links, an x-default and a canonical pointing to the right version only show up when you ask for them by name. Otherwise Google looks at five versions of the same page and picks one on its own.",
      },
      { type: "h2", text: "Knowing what to ask is the job" },
      {
        type: "p",
        text: "All of these have something in common. AI knows them. Ask it what the outbox pattern is and it'll explain it better than most tutorials. The catch is that you have to ask. The agent works inside the context you give it, and you're the only one who knows two waiters will tap the same table on a Friday night.",
      },
      {
        type: "p",
        text: "So my job has shifted. I type less and think more about what the system has to survive. Context, architecture and review stay with me. Without the basics, you get code that works in the demo and falls over on day one with real users.",
      },
      { type: "h2", text: "Where AI really helps me" },
      {
        type: "list",
        items: [
          "Repetition: forms, CRUD, migrations, tests for cases I've already described.",
          'Finding my way around someone else\'s code. I ask "where does this get calculated?" and get an answer right away instead of digging through files.',
          "A first version of something I'm going to change anyway.",
          "Translations and interface copy, with me checking them.",
        ],
      },
      { type: "h2", text: "Where it trips" },
      {
        type: "list",
        items: [
          "It invents a function that doesn't exist in the library version I'm using.",
          "It fixes a failing test by changing the test and leaving the code as it was.",
          "In a long session it forgets a decision from an hour ago. That's why I write ADRs.",
          'It says "done" without having run anything.',
        ],
      },
      {
        type: "p",
        text: "That last one is my favorite. The agent writes \"everything works\" with full confidence. Then I run the build and get a wall of red. That's why review isn't optional for me.",
      },
      { type: "h2", text: "If you're just starting out" },
      {
        type: "p",
        text: "Use AI. It would be strange not to. But learn the basics alongside it: databases, transactions, how HTTP works, what happens when two requests arrive at once. You don't need to know it all by heart. It's enough to know something exists, so you can ask.",
      },
      {
        type: "p",
        text: "AI is a fast pair of hands. The head is still yours.",
      },
      {
        type: "callout",
        text: "If you're building a system with payments, bookings or several clients in one database and you're not sure what you missed, get in touch. Happy to take a look.",
      },
    ],
  },
};
