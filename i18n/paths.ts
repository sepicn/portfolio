import { serviceSlug } from "@/content/data/service-slugs";
import { blogSlug } from "@/content/blog/slug-map";
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

export function translateRouteParam(
  route: string,
  key: string,
  value: string,
  _from: string,
  to: string,
): string {
  if (key === "service") return serviceSlug(value, to);
  if (key === "slug" && route.startsWith("/blog")) return blogSlug(value, to);
  return value;
}

function translateParams(params: Params, locale: string): Params {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      key === "service"
        ? serviceSlug(value, locale)
        : key === "slug"
          ? blogSlug(value, locale)
          : value,
    ]),
  );
}

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

export function publicPath(locale: string, path: string): string {
  const localized = localizedPathname(locale, path);
  if (locale === routing.defaultLocale) return localized;
  return localized === "/" ? `/${locale}` : `/${locale}${localized}`;
}

export function serviceHref(id: string, locale: string): AppHref {
  return {
    pathname: "/services/[service]",
    params: { service: serviceSlug(id, locale) },
  };
}

export function blogHref(slug: string): AppHref {
  return { pathname: "/blog/[slug]", params: { slug } };
}

export function projectHref(slug: string): AppHref {
  return { pathname: "/projects/[slug]", params: { slug } };
}
