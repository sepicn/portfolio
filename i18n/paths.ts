import { serviceSlug } from "@/content/data/service-slugs";
import type { AppHref } from "./navigation";
import { routing, type AppPathname } from "./routing";

type Params = Record<string, string>;

const routes = Object.keys(routing.pathnames) as AppPathname[];

function patternOf(template: string) {
  const names: string[] = [];
  const source = template.replace(/\[([^\]]+)\]/g, (_, name: string) => {
    names.push(name);
    return "([^/]+)";
  });
  return { regexp: new RegExp(`^${source}$`), names };
}

const compiled = routes.map((route) => ({ route, ...patternOf(route) }));

/** Params whose values are themselves localized (the service slug). */
function translateParams(params: Params, locale: string): Params {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      key === "service" ? serviceSlug(value, locale) : value,
    ]),
  );
}

/**
 * Splits a concrete internal path ("/projects/mango#gallery") into its route key, params
 * and hash. Returns null for anything that is not one of the app's routes.
 */
export function matchRoute(
  href: string,
): { pathname: AppPathname; params: Params; hash?: string } | null {
  const [rest, hash] = href.split("#", 2);
  const path = rest.split("?")[0] || "/";
  for (const { route, regexp, names } of compiled) {
    const match = path.match(regexp);
    if (match) {
      const params = Object.fromEntries(
        names.map((name, i) => [name, decodeURIComponent(match[i + 1])]),
      );
      return { pathname: route, params, ...(hash ? { hash } : {}) };
    }
  }
  return null;
}

/**
 * Public path of an internal path in one locale, without the locale prefix (a hash is kept):
 * ("sr", "/projects/mango") -> "/projekti/mango", ("sr", "/services/web") -> "/usluge/izrada-sajtova".
 * Unknown paths come back unchanged.
 */
export function localizedPathname(locale: string, path: string): string {
  const matched = matchRoute(path);
  if (!matched) return path;
  const hash = matched.hash ? `#${matched.hash}` : "";
  const config = routing.pathnames[matched.pathname];
  let template: string =
    typeof config === "string" ? config : config[locale === "en" ? "en" : "sr"];
  for (const [key, value] of Object.entries(translateParams(matched.params, locale))) {
    template = template.replace(`[${key}]`, encodeURIComponent(value));
  }
  return template + hash;
}

/**
 * Turns a plain internal href ("/projects#clients") into the object form next-intl's
 * typed navigation expects, so the link gets the localized URL. Hrefs that are not app
 * routes (external, mailto, unknown) are returned as they are.
 */
export function resolveHref(href: string, locale?: string): AppHref {
  const matched = matchRoute(href);
  if (!matched) return href as AppHref;
  const params = locale ? translateParams(matched.params, locale) : matched.params;
  return {
    pathname: matched.pathname,
    ...(Object.keys(params).length ? { params } : {}),
    ...(matched.hash ? { hash: matched.hash } : {}),
  } as AppHref;
}

/**
 * Full public path of an internal path, locale prefix included:
 * ("en", "/about") -> "/en/about", ("sr", "/about#education") -> "/o-meni#education".
 */
export function publicPath(locale: string, path: string): string {
  const localized = localizedPathname(locale, path);
  if (locale === routing.defaultLocale) return localized;
  return localized === "/" ? `/${locale}` : `/${locale}${localized}`;
}

/** Typed Link href of a service page, with the slug of the given locale. */
export function serviceHref(id: string, locale: string): AppHref {
  return {
    pathname: "/services/[service]",
    params: { service: serviceSlug(id, locale) },
  };
}

/** Typed Link href of a case study. */
export function projectHref(slug: string): AppHref {
  return { pathname: "/projects/[slug]", params: { slug } };
}
