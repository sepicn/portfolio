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
      {/* lazyOnload keeps the tag manager out of the critical path; consent defaults are already set. */}
      <Script id="gtm" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
    </>
  );
}
