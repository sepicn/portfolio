/**
 * Google Consent Mode v2 glue. Everything starts denied; the banner stores the visitor's choice
 * in localStorage and pushes a consent update to the dataLayer that GTM reads.
 */
export const CONSENT_KEY = "sepic-consent";
export const CONSENT_OPEN_EVENT = "consent:open";

export type ConsentChoice = "granted" | "denied";

type Gtag = (...args: unknown[]) => void;

export function readConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Private mode or blocked storage: the choice still applies to this page view.
  }
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
}

/**
 * Inline script that must run before GTM: defines gtag, sets every consent type to denied,
 * then re-applies a choice saved on an earlier visit.
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
try {
  var c = localStorage.getItem('${CONSENT_KEY}');
  if (c === 'granted') gtag('consent', 'update', {
    ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted'
  });
} catch (e) {}
`;
