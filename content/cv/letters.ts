/**
 * Cover letters and short messages per CV variant, written to cv-variants/<id>/ by
 * scripts/build-cv-variants.mjs. Square brackets are placeholders to fill in for each
 * application; the line about the company is the one that matters most, so never send
 * it with the placeholder left in.
 */

const srFooter = `Nikola Šepić
+381 63 7624 555 | sepicnikola@gmail.com
sepic.me | linkedin.com/in/sepicn | github.com/sepicn`;

const enFooter = srFooter;

export const letters: Record<string, { sr: string; en: string }> = {
  "fullstack-mid": {
    sr: `NASLOV MEJLA: Prijava za poziciju [naziv pozicije] – Nikola Šepić

Poštovani/a [ime osobe ili „tim [Firma]"],

prijavljujem se za poziciju [naziv pozicije] u [Firma]. Poslednjih godinu i po radim kao full-stack developer na produkcionim sistemima: bolničkoj platformi od oko 400 hiljada linija koda u Nuxt-u 4 i Laravelu 12, TMS sistemu za logistiku iz SAD u ASP.NET Core 8 MVC i portalu za praćenje pošiljki u Rails-u 7.

Na bolničkoj platformi sam napravio chatbot koji zakazuje termine i daljinsko potpisivanje saglasnosti sa šaltera na tablet, a vodim i i18n na pet jezika. U logistici sam kao jedini UI developer u timu od 7 do 10 ljudi redizajnirao 40+ formi u modularne wizard-e, radeći kroz Jira tikete i code review sa timom u SAD.

[Jedna rečenica zašto baš ova firma: njihov proizvod, stack ili problem koji rešavaju, i kako se to vezuje za moj rad.]

Uz CV šaljem i link ka portfoliju sa studijama slučaja: sepic.me. Rado ću objasniti bilo koji od projekata na razgovoru.

Srdačan pozdrav,
${srFooter}

---
KRATKA PORUKA (LinkedIn / mejl regruteru):
Zdravo [ime], video sam oglas za [pozicija] u [Firma]. Full-stack sam developer sa godinu i po na produkcionim sistemima (Nuxt i Laravel, .NET MVC, Next.js). Šaljem CV, a portfolio je na sepic.me. Da li je pozicija još otvorena?`,
    en: `SUBJECT: Application for [Job title] – Nikola Šepić

Dear [Name / "[Company] team"],

I am applying for the [Job title] role at [Company]. For the past year and a half I have worked as a full-stack developer on production systems: a ~400k-line private hospital platform in Nuxt 4 and Laravel 12, a US logistics TMS in ASP.NET Core 8 MVC, and a shipment tracking portal in Rails 7.

On the hospital platform I built a chatbot that books appointments and remote consent signing from the front desk to a tablet, and I own i18n across five languages. At the logistics company, as the only UI developer on a team of 7 to 10, I redesigned 40+ forms into modular multi-step wizards, working through Jira tickets and code review with a US team.

[One sentence on why this company: their product, stack or the problem they solve, and how it connects to my work.]

My portfolio with case studies is at sepic.me. I would be glad to walk you through any of these projects in an interview.

Kind regards,
${enFooter}

---
SHORT MESSAGE (LinkedIn / email to a recruiter):
Hi [Name], I saw the [Job title] opening at [Company]. I am a full-stack developer with a year and a half on production systems (Nuxt and Laravel, .NET MVC, Next.js). My CV is attached and my portfolio is at sepic.me. Is the role still open?`,
  },

  "fullstack-junior": {
    sr: `NASLOV MEJLA: Prijava za poziciju Junior Full-Stack Developer – Nikola Šepić

Poštovani/a [ime osobe ili „tim [Firma]"],

prijavljujem se za poziciju [naziv pozicije] u [Firma]. Diplomirao sam informacione tehnologije na Singidunumu 2024. i od tada godinu i po radim na pravim produkcionim projektima: bolničkoj platformi u Nuxt-u i Laravelu, TMS sistemu za logistiku u .NET-u i portalu za praćenje pošiljki u Rails-u.

Rails i .NET nisam znao kada sam počeo, naučio sam ih na poslu i u oba isporučio interfejs koji se koristi svaki dan. Pored toga sam sam napravio nekoliko full-stack aplikacija, na primer Job Application Tracker u Next.js 16 sa MongoDB-om, Better Auth-om i Zod validacijom na svakoj serverskoj akciji, i GymAI sa Express 5 API-jem, Prisma-om i 44 testa.

[Jedna rečenica zašto baš ova firma i šta želiš da naučiš kod njih.]

Portfolio sa kodom i živim demo verzijama je na sepic.me. Radujem se prilici da se upoznamo.

Srdačan pozdrav,
${srFooter}

---
KRATKA PORUKA:
Zdravo [ime], prijavio bih se za junior full-stack poziciju u [Firma]. Diplomirani sam IT inženjer sa godinu i po iskustva na produkcionim sistemima i sa nekoliko svojih Next.js i Node.js aplikacija. CV u prilogu, portfolio na sepic.me.`,
    en: `SUBJECT: Application for Junior Full-Stack Developer – Nikola Šepić

Dear [Name / "[Company] team"],

I am applying for the [Job title] role at [Company]. I graduated in Information Technology from Singidunum University in 2024 and have since spent a year and a half on real production projects: a hospital platform in Nuxt and Laravel, a logistics TMS in .NET, and a shipment tracking portal in Rails.

I did not know Rails or .NET when I started; I learned both on the job and shipped UI in each that people use every day. I have also built several full-stack apps on my own, such as a Job Application Tracker in Next.js 16 with MongoDB, Better Auth and Zod validation on every server action, and GymAI with an Express 5 API, Prisma and 44 tests.

[One sentence on why this company and what you want to learn there.]

My portfolio with code and live demos is at sepic.me. I would welcome the chance to meet.

Kind regards,
${enFooter}

---
SHORT MESSAGE:
Hi [Name], I would like to apply for the junior full-stack role at [Company]. I am an IT graduate with a year and a half on production systems and several of my own Next.js and Node.js apps. CV attached, portfolio at sepic.me.`,
  },

  frontend: {
    sr: `NASLOV MEJLA: Prijava za poziciju Front-End Developer – Nikola Šepić

Poštovani/a [ime osobe ili „tim [Firma]"],

prijavljujem se za poziciju [naziv pozicije] u [Firma]. Godinu i po radim na produkcionom interfejsu. Za logističku firmu iz SAD bio sam jedini UI developer u timu od 7 do 10 ljudi i redizajnirao sam ceo TMS sistem, uključujući 40+ Add/Edit formi pretvorenih u modularne wizard-e koji rade i u modalu i na celoj stranici. Na njihovom portalu za praćenje pošiljki napravio sam interaktivnu Leaflet mapu sa živom lokacijom kamiona.

Danas radim na javnom delu bolničke platforme na pet jezika u Nuxt-u 4, a lične projekte pravim u React-u i Next.js-u. Vodim računa o pristupačnosti (WCAG AA), performansama i SEO-u. Tehnički SEO koji sam uradio podigao je Semrush Site Health sa 90% na 98% za nedelju dana.

[Jedna rečenica o njihovom proizvodu ili interfejsu i šta bi konkretno doneo.]

Portfolio je na sepic.me. Sam sajt je 3D soba u React Three Fiber-u, pa pokazuje i kako radim sa animacijom i performansama.

Srdačan pozdrav,
${srFooter}

---
KRATKA PORUKA:
Zdravo [ime], video sam oglas za front-end poziciju u [Firma]. Godinu i po radim na produkcionom UI-ju (React, Next.js, Vue, Nuxt, TypeScript), uključujući redizajn celog interfejsa jednog TMS sistema. CV u prilogu, portfolio na sepic.me.`,
    en: `SUBJECT: Application for Front-End Developer – Nikola Šepić

Dear [Name / "[Company] team"],

I am applying for the [Job title] role at [Company]. I have spent a year and a half on production UI. At a US logistics company I was the only UI developer on a team of 7 to 10 and redesigned the whole TMS, including 40+ Add/Edit forms turned into modular wizards that work both in a modal and on a full page. On their shipment tracking portal I built an interactive Leaflet map with live truck locations.

Today I work on the public site of a five-language hospital platform in Nuxt 4, and I build personal projects in React and Next.js. I care about accessibility (WCAG AA), performance and SEO. My technical SEO work raised Semrush Site Health from 90% to 98% in one week.

[One sentence about their product or interface and what you would bring to it.]

My portfolio is at sepic.me. The site itself is a 3D room in React Three Fiber, so it also shows how I handle animation and performance.

Kind regards,
${enFooter}

---
SHORT MESSAGE:
Hi [Name], I saw the front-end opening at [Company]. I have a year and a half on production UI (React, Next.js, Vue, Nuxt, TypeScript), including a redesign of a whole TMS interface. CV attached, portfolio at sepic.me.`,
  },

  internship: {
    sr: `NASLOV MEJLA: Prijava za praksu – Web Development – Nikola Šepić

Poštovani/a [ime osobe ili „tim [Firma]"],

prijavljujem se za praksu [naziv prakse] u [Firma]. Diplomirao sam informacione tehnologije na Singidunumu 2024. Tokom poslednjih godinu i po radio sam ugovorno i kao freelancer na produkcionim projektima: bolničkoj platformi u Nuxt-u i Laravelu, TMS sistemu za logistiku u .NET-u i nekoliko sajtova za male firme.

Praksu tražim jer želim da radim u timu sa jasnim procesom, mentorstvom i code review-om, i da produbim [oblast iz oglasa, npr. back-end, testiranje, arhitekturu]. Pošto već radim na pravim sistemima, od prve nedelje mogu da preuzmem konkretne zadatke.

[Jedna rečenica zašto baš ova firma.]

Moji projekti, sa kodom i živim demo verzijama, su na sepic.me i github.com/sepicn.

Srdačan pozdrav,
${srFooter}

---
KRATKA PORUKA:
Zdravo [ime], zanima me praksa u [Firma]. Diplomirani sam IT inženjer sa godinu i po rada na produkcionim projektima (React, Next.js, Nuxt, Laravel) i tražim tim u kome ću učiti kroz mentorstvo i code review. CV u prilogu.`,
    en: `SUBJECT: Web Development Internship Application – Nikola Šepić

Dear [Name / "[Company] team"],

I am applying for the [Internship title] at [Company]. I graduated in Information Technology from Singidunum University in 2024. Over the past year and a half I have worked on contract and freelance production projects: a hospital platform in Nuxt and Laravel, a logistics TMS in .NET, and several websites for small businesses.

I am looking for an internship because I want to work in a team with a clear process, mentoring and code review, and to go deeper into [area from the listing, e.g. back-end, testing, architecture]. Since I already work on real systems, I can take on concrete tasks from the first week.

[One sentence on why this company.]

My projects, with code and live demos, are at sepic.me and github.com/sepicn.

Kind regards,
${enFooter}

---
SHORT MESSAGE:
Hi [Name], I am interested in the internship at [Company]. I am an IT graduate with a year and a half on production projects (React, Next.js, Nuxt, Laravel), looking for a team where I can learn through mentoring and code review. CV attached.`,
  },

  "web-marketing": {
    sr: `NASLOV MEJLA: Prijava za poziciju [naziv pozicije] – Nikola Šepić

Poštovani/a [ime osobe ili „tim [Firma]"],

prijavljujem se za poziciju [naziv pozicije] u [Firma]. Radim na preseku web razvoja i digitalnog marketinga: sajtove pravim, a zatim ih punim kroz Google Ads, Meta Ads i SEO.

Za privatnu bolnicu u Beogradu vodim osam Google Ads Search kampanja i Meta Ads, uz GA4 i GTM merenje konverzija. Iz izveštaja o terminima pretrage izdvojio sam 370+ negativnih ključnih reči, a analizom udela izgubljenih prikaza pokazao gde budžet ima prostora da raste. Na istom sajtu sam tehničkim SEO-om podigao Semrush Site Health sa 90% na 98% za nedelju dana, sa nula grešaka u auditu.

[Jedna rečenica zašto baš ova firma ili njihovi klijenti.]

Prednost je što ne postoji jaz između developera i marketara: istu stranicu pravim, merim i dovodim joj saobraćaj. Portfolio je na sepic.me.

Srdačan pozdrav,
${srFooter}

---
KRATKA PORUKA:
Zdravo [ime], video sam oglas za [pozicija] u [Firma]. Vodim Google Ads i Meta Ads za privatnu bolnicu i sam pravim sajtove (Nuxt, Next.js, Laravel). Tehnički SEO mi je podigao Site Health sa 90% na 98% za nedelju dana. CV u prilogu, portfolio na sepic.me.`,
    en: `SUBJECT: Application for [Job title] – Nikola Šepić

Dear [Name / "[Company] team"],

I am applying for the [Job title] role at [Company]. I work where web development meets digital marketing: I build sites, then fill them through Google Ads, Meta Ads and SEO.

For a private hospital in Belgrade I run eight Google Ads Search campaigns and Meta Ads with GA4 and GTM conversion tracking. From search term reports I built 370+ negative keywords, and an impression share analysis showed where budget has room to grow. On the same site my technical SEO raised Semrush Site Health from 90% to 98% in one week, with zero audit errors.

[One sentence on why this company or its clients.]

The advantage is that there is no gap between the developer and the marketer: I build the page, measure it and bring it traffic. My portfolio is at sepic.me.

Kind regards,
${enFooter}

---
SHORT MESSAGE:
Hi [Name], I saw the [Job title] opening at [Company]. I run Google Ads and Meta Ads for a private hospital and build the sites myself (Nuxt, Next.js, Laravel). My technical SEO raised Site Health from 90% to 98% in one week. CV attached, portfolio at sepic.me.`,
  },
};
