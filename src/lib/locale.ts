import "server-only";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { Locale } from "@prisma/client";

export const i18n = {
  defaultLocale: Locale.fa,
  locales: Object.values(Locale),
  rtl: [Locale.fa],
} as const;

export type Locale = (typeof i18n)["locales"][number];

const firstPathname = (url: URL): string | undefined =>
  url.pathname.split("/").filter((el) => el)[0];

type LocaleType = (typeof i18n.locales)[number];
const isInLocales = (x: string | undefined): x is LocaleType =>
  i18n.locales.includes(x as LocaleType);

export function getLocale(request: NextRequest): Locale {
  const referer = request.headers.get("referer");
  if (referer) {
    const pathnameLocale = firstPathname(new URL(referer));
    if (isInLocales(pathnameLocale)) {
      return pathnameLocale;
    }
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const { locales }: string[] = i18n;

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale) as Locale;

  return locale;
}

const dictionaries = {
  fa: () => import("../dictionaries/fa.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.fa();
