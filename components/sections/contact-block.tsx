import { home } from "@/content/data/home";
import { pick } from "@/content/i18n";
import { encodeContact } from "@/lib/obfuscate";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/contact-form";

export function ContactBlock({ locale, heading = "h2" }: { locale: string; heading?: "h1" | "h2" }) {
  const H = heading;
  return (
    <section
      data-reveal
      id="kontakt"
      data-ruler={pick(home.contactTag, locale)}
      aria-labelledby="contact-title"
      className="scroll-mt-6 mt-24 grid border border-ink bg-paper lg:mt-36 lg:grid-cols-[1.1fr_1fr]"
    >
      <div className="border-b border-ink px-[18px] py-8 lg:border-r lg:border-b-0 lg:px-10 lg:py-14">
        <p className="tag">{pick(home.contactTag, locale)}</p>
        <H id="contact-title" className="mt-3 text-[clamp(3rem,6.4vw,7rem)] leading-[0.92] tracking-[-0.045em]">
          {pick(home.contactTitle1, locale)}
          <br />
          <span className="text-blue">{pick(home.contactTitle2, locale)}</span>
        </H>
        <p className="mt-6 max-w-[38ch] text-[18px] leading-[1.55] text-ink-2">
          {pick(home.contactLead, locale)}
        </p>
      </div>
      <ContactForm encodedEmail={encodeContact(siteConfig.email)} />
    </section>
  );
}
