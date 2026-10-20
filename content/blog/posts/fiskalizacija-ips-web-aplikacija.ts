import type { Post } from "../types";

export const post: Post = {
  slug: {
    sr: "fiskalizacija-ips-web-aplikacija",
    en: "fiscalization-ips-payments-web-app",
  },
  title: {
    sr: "Fiskalizacija i IPS plaćanje u web aplikaciji",
    en: "Fiscalization and IPS payments in a web application",
  },
  description: {
    sr: "Šta developer mora da reši kada web aplikacija izdaje fiskalne račune i prima IPS uplate: tok računa, stanja, prekidi veze, depoziti i testiranje. Iz iskustva sa softverom Makaze i Kafe.",
    en: "What a developer has to handle when a web app issues fiscal receipts and accepts IPS payments in Serbia: receipt flow, states, dropped connections, deposits and testing. From building Makaze and Kafe.",
  },
  answer: {
    sr: "Web aplikacija koja izdaje fiskalne račune u Srbiji ne potpisuje ih sama. Ona radi kao ESIR: šalje podatke o računu procesoru fiskalnih računa i od njega dobija potpisan račun sa QR kodom. IPS se uklapa kao još jedan način plaćanja, a developer mora da reši stanja transakcija, prekide veze i povezivanje uplate sa pravim računom.",
    en: "A web app that issues fiscal receipts in Serbia doesn't sign them itself. It acts as an ESIR: it sends the receipt data to a fiscal receipt processor and gets back a signed receipt with a QR code. IPS fits in as one more payment method, and the developer has to handle transaction states, dropped connections and matching each payment to the right receipt.",
  },
  category: "razvoj",
  date: "2026-09-17",
  minutes: 4,
  body: {
    sr: [
      {
        type: "p",
        text: "Radio sam dva projekta u kojima je fiskalizacija bila u centru: Makaze, softver za frizerske i kozmetičke salone, i Kafe, POS za ugostiteljske objekte. U Makazama klijent može da plati depozit za termin preko IPS-a, a salon izdaje fiskalni račun. U Kafeu konobari kucaju porudžbine, a račun ide na štampač. Ovde pišem šta sam naučio kao developer, iz ugla koda.",
      },
      {
        type: "callout",
        text: "Ovo nije pravni ni poreski savet. Vrste računa za vašu delatnost, poreske stope i obaveze proverite sa knjigovođom.",
      },
      { type: "h2", text: "Kako izgleda tok računa" },
      {
        type: "p",
        text: "U srpskom sistemu fiskalizacije aplikacija koja kuca račun zove se ESIR, elektronski sistem za izdavanje računa. Ona račun ne potpisuje sama. Šalje podatke procesoru fiskalnih računa, koji može biti lokalni uređaj ili virtuelni servis Poreske uprave. Procesor vraća potpisan račun sa brojem, vremenom i QR kodom za proveru. Tek tada imate račun koji možete da odštampate ili pošaljete kupcu.",
      },
      {
        type: "p",
        text: "Za developera to znači jednu stvar koju je lako potceniti: izdavanje računa je mrežni poziv. A mrežni poziv može da propadne.",
      },
      { type: "h2", text: "Šta sve mora da se reši" },
      {
        type: "p",
        text: "Spisak je duži nego što deluje kada prvi put pročitate dokumentaciju.",
      },
      {
        type: "list",
        items: [
          "Stavke računa: naziv, količina, jedinična cena i poreska oznaka. Iznose čuvam kao cele brojeve u najmanjoj jedinici ili kao decimale fiksne preciznosti, nikad kao float.",
          "Načini plaćanja: gotovina, kartica, prenos, i kombinacije kada kupac plati delom gotovinom, a delom karticom.",
          "Vrste računa, kao što su promet, avans, predračun, kopija i obuka, i vrste transakcija, prodaja i refundacija. Svaka ima svoja pravila.",
          "Refundacija mora da se poziva na originalni račun.",
          "Odgovor procesora se čuva u celosti: broj, potpis, vreme i QR kod. To je vaš dokaz da je račun izdat.",
          "Štampa za termalni štampač i elektronska kopija za kupca.",
        ],
      },
      { type: "h2", text: "Kada procesor ne odgovori" },
      {
        type: "p",
        text: "Ovaj deo se najčešće uradi loše. Šta ako zahtev ode, a odgovor ne stigne? Ne znate da li je račun izdat. Ako samo ponovite zahtev, možete da izdate dva računa za istu prodaju. Ako odustanete, kupac odlazi bez računa, a račun je možda ipak izdat.",
      },
      {
        type: "p",
        text: "Zato svaki pokušaj izdavanja ima svoje stanje u bazi. Pre slanja upišem da je račun u obradi. Kada odgovor stigne, upišem rezultat. Ako odgovor izostane, aplikacija ne šalje slepo ponovo. Prvo pokuša da utvrdi da li je račun izdat, koliko to procesor koji koristite dozvoljava, pa tek onda odlučuje. Korisnik na ekranu vidi jasnu poruku šta se desilo i šta treba da uradi.",
      },
      {
        type: "p",
        text: "U Kafeu je ovo bilo posebno važno. Konobar u gužvi ne čeka. Ekran mora da bude brz, ali i da spreči dupli račun kada neko dva puta pritisne dugme.",
      },
      { type: "h2", text: "IPS plaćanje" },
      {
        type: "p",
        text: "IPS je sistem Narodne banke Srbije za instant plaćanja. Kupac skenira QR kod u aplikaciji svoje banke i novac stiže za nekoliko sekundi, bez kartice. Za salone je to zgodan način da se naplati depozit već pri zakazivanju.",
      },
      {
        type: "p",
        text: "Tehnički, IPS QR kod nosi podatke o primaocu, iznosu i svrsi plaćanja u formatu koji propisuje NBS. Za developera je najvažnije polje poziv na broj, jer preko njega povezujete uplatu sa terminom. Ako referenca nije jedinstvena, ne znate čija je uplata.",
      },
      {
        type: "p",
        text: "Drugi deo je potvrda. QR kod sam po sebi ne znači da je plaćeno. Potvrdu dobijate od banke ili posrednika sa kojim radite, obično kroz webhook ili proveru statusa. Aplikacija mora da podnese i slučajeve kada potvrda kasni, kada kupac uplati pogrešan iznos ili kada uplati dva puta.",
      },
      { type: "h2", text: "Depozit i fiskalni račun" },
      {
        type: "p",
        text: "Depozit unapred i konačna naplata posle usluge su dva različita događaja. U Makazama sam ih modelovao kao dva povezana zapisa: uplata depozita vezana za termin i konačna naplata koja uzima depozit u obzir. Kako se tačno depozit fiskalizuje zavisi od situacije, i to je pitanje za knjigovođu. Moj posao je da aplikacija može da izda ono što knjigovođa kaže i da se iznosi uvek slažu.",
      },
      { type: "h2", text: "Testiranje" },
      {
        type: "p",
        text: "Za fiskalizaciju postoji testno okruženje. Koristite ga i nemojte razvijati na pravim računima. Napravite skup scenarija koje puštate posle svake veće izmene: obična prodaja, više poreskih stopa na jednom računu, kombinovano plaćanje, refundacija, prekid veze usred izdavanja. Poslednji scenario je onaj koji najviše ljudi preskoči.",
      },
      { type: "h2", text: "Savet za početak" },
      {
        type: "p",
        text: "Počnite od modela podataka i stanja, a ekrane radite posle. Izdat račun se ne menja. Ako je nešto pogrešno, izdaje se refundacija i novi račun. Ako baza to ne poštuje od prvog dana, kasnije se teško ispravlja.",
      },
      {
        type: "p",
        text: "I uključite knjigovođu rano. Developer zna kako da pošalje račun. Knjigovođa zna koji račun treba poslati.",
      },
      {
        type: "callout",
        text: "Tekst opisuje tehničku stranu. Zakonske obaveze, vrste računa i poreske stope uvek proverite sa knjigovođom ili u važećim propisima.",
      },
    ],
    en: [
      {
        type: "p",
        text: "I've built two projects where fiscalization sat at the center: Makaze, software for hair and beauty salons, and Kafe, a POS for restaurants and cafés. In Makaze a client can pay a deposit for an appointment through IPS, and the salon issues a fiscal receipt. In Kafe the waiters ring up orders and the receipt goes to the printer. Here I'm writing about what I learned as a developer, from the code side.",
      },
      {
        type: "callout",
        text: "This is not legal or tax advice. Check receipt types for your business, tax rates and obligations with an accountant.",
      },
      { type: "h2", text: "What the receipt flow looks like" },
      {
        type: "p",
        text: "In the Serbian fiscalization system, the app that rings up a receipt is called an ESIR, an electronic invoicing system. It doesn't sign the receipt itself. It sends the data to a fiscal receipt processor, which can be a local device or a virtual service run by the Tax Administration. The processor returns a signed receipt with a number, a timestamp and a QR code for verification. Only then do you have a receipt you can print or send to the customer.",
      },
      {
        type: "p",
        text: "For a developer that means one thing that's easy to underestimate: issuing a receipt is a network call. And a network call can fail.",
      },
      { type: "h2", text: "What you have to handle" },
      {
        type: "p",
        text: "The list is longer than it looks the first time you read the documentation.",
      },
      {
        type: "list",
        items: [
          "Receipt items: name, quantity, unit price and tax label. I store amounts as integers in the smallest unit or as fixed-precision decimals, never as floats.",
          "Payment methods: cash, card, bank transfer, and combinations when a customer pays partly in cash and partly by card.",
          "Receipt types such as normal, advance, proforma, copy and training, and transaction types, sale and refund. Each has its own rules.",
          "A refund has to reference the original receipt.",
          "The processor's response is stored in full: number, signature, timestamp and QR code. That's your proof the receipt was issued.",
          "Printing for a thermal printer and an electronic copy for the customer.",
        ],
      },
      { type: "h2", text: "When the processor doesn't answer" },
      {
        type: "p",
        text: "This is the part that most often gets done badly. What if the request goes out and no response comes back? You don't know whether the receipt was issued. If you simply retry, you may issue two receipts for the same sale. If you give up, the customer leaves without a receipt, and the receipt may have been issued after all.",
      },
      {
        type: "p",
        text: "So every attempt to issue a receipt has its own state in the database. Before sending, I record that the receipt is in progress. When the response arrives, I record the result. If no response comes, the app doesn't blindly resend. It first tries to find out whether the receipt was issued, as far as your processor allows, and only then decides. The user sees a clear message on screen about what happened and what to do next.",
      },
      {
        type: "p",
        text: "In Kafe this mattered a lot. A waiter in a rush doesn't wait around. The screen has to be fast, and it also has to stop a duplicate receipt when someone taps the button twice.",
      },
      { type: "h2", text: "IPS payments" },
      {
        type: "p",
        text: "IPS is the National Bank of Serbia's instant payment system. The customer scans a QR code in their bank's app and the money arrives within seconds, no card needed. For salons it's a handy way to collect a deposit right at booking.",
      },
      {
        type: "p",
        text: "Technically, the IPS QR code carries the payee, the amount and the payment purpose in a format defined by the NBS. For a developer the most important field is the payment reference, because that's how you link a payment to an appointment. If the reference isn't unique, you can't tell whose payment it is.",
      },
      {
        type: "p",
        text: "The second part is confirmation. A QR code on its own doesn't mean anything was paid. You get confirmation from the bank or the provider you work with, usually through a webhook or a status check. The app has to cope with confirmations that arrive late, customers who pay the wrong amount and customers who pay twice.",
      },
      { type: "h2", text: "Deposits and fiscal receipts" },
      {
        type: "p",
        text: "A deposit paid in advance and the final charge after the service are two separate events. In Makaze I modeled them as two linked records: the deposit payment tied to the appointment, and the final charge that takes the deposit into account. Exactly how the deposit gets fiscalized depends on the situation, and that's a question for an accountant. My job is to make sure the app can issue whatever the accountant says and that the amounts always add up.",
      },
      { type: "h2", text: "Testing" },
      {
        type: "p",
        text: "There's a test environment for fiscalization. Use it, and don't develop against real receipts. Build a set of scenarios you run after every larger change: a simple sale, several tax rates on one receipt, a split payment, a refund, a connection drop in the middle of issuing. That last one is the scenario most people skip.",
      },
      { type: "h2", text: "Advice for getting started" },
      {
        type: "p",
        text: "Start with the data model and the states, and build the screens after. An issued receipt never changes. If something is wrong, you issue a refund and a new receipt. If the database doesn't respect that from day one, it's painful to fix later.",
      },
      {
        type: "p",
        text: "And bring an accountant in early. The developer knows how to send a receipt. The accountant knows which receipt to send.",
      },
      {
        type: "callout",
        text: "This post covers the technical side. Always check legal obligations, receipt types and tax rates with an accountant or in the current regulations.",
      },
    ],
  },
};
