import { createElement, type ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { resolveHref } from "./paths";
import { routing } from "./routing";

const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = navigation;

type BaseLinkProps = ComponentProps<typeof navigation.Link>;

/**
 * A typed href: a static route ("/projects") or an object with the route key and its
 * params, e.g. { pathname: "/projects/[slug]", params: { slug } }, optionally with a hash.
 */
export type AppHref = BaseLinkProps["href"];

/**
 * next-intl's Link, which also takes a plain internal path such as "/projects#clients"
 * (the room hotspots store those). Plain paths are matched against routing.pathnames, so
 * they still get the localized public URL ("/projekti#clients" in Serbian).
 */
export function Link({
  href,
  ...rest
}: Omit<BaseLinkProps, "href"> & { href: AppHref | string }) {
  return createElement(navigation.Link, {
    ...rest,
    href: typeof href === "string" ? resolveHref(href) : href,
  } as BaseLinkProps);
}
