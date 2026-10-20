import { createElement, type ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { resolveHref } from "./paths";
import { routing } from "./routing";

const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = navigation;

type BaseLinkProps = ComponentProps<typeof navigation.Link>;

export type AppHref = BaseLinkProps["href"];

export function Link({
  href,
  ...rest
}: Omit<BaseLinkProps, "href"> & { href: AppHref | string }) {
  return createElement(navigation.Link, {
    ...rest,
    href: typeof href === "string" ? resolveHref(href) : href,
  } as BaseLinkProps);
}
