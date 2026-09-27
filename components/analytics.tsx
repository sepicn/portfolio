import Script from "next/script";
import { consentDefaultScript } from "@/lib/consent";

const configuredId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-N8HZMPBW";

/**
 * GTM container, loaded only in production and only when the ID looks like one. The ID is
 * interpolated into an inline script, so anything else is rejected rather than escaped.
 */
export const gtmId =
  process.env.NODE_ENV === "production" && /^GTM-[A-Z0-9]{4,12}$/.test(configuredId)
    ? configuredId
    : "";

export function Analytics() {
  if (!gtmId) return null;
  return (
    <>
      <Script id="consent-default" strategy="afterInteractive">
        {consentDefaultScript}
      </Script>
      {/* The tag manager and the tags it pulls in are ~290 KB of script. They load on the
          first interaction, or 3.5 s after the page has loaded for visitors who only read,
          so they never compete with the first paint and the hero. Consent defaults above
          are already queued in dataLayer. */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d){var done=false,ev=['pointerdown','keydown','wheel','touchstart'];function load(){if(done)return;done=true;ev.forEach(function(e){w.removeEventListener(e,load)});(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(w,d,'script','dataLayer','${gtmId}');}ev.forEach(function(e){w.addEventListener(e,load,{once:true,passive:true})});function later(){setTimeout(load,3500)}if(d.readyState==='complete')later();else w.addEventListener('load',later,{once:true});})(window,document);`}
      </Script>
    </>
  );
}
