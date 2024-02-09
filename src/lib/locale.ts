import "server-only";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import { Locale } from "@prisma/client";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";

import { i18n } from "./utils";

// prettier-ignore
const firstPathname = (url: URL): string | undefined => (
  url.pathname.split("/").filter((el) => el)[0]);

// prettier-ignore
const isInLocales = (x: string | undefined): x is Locale => (
  i18n.locales.includes(x as Locale));

export function getLocale(request: NextRequest): Locale {
  const referer = request.headers.get("referer");
  if (referer) {
    const pathnameLocale = firstPathname(new URL(referer));
    if (isInLocales(pathnameLocale)) {
      return pathnameLocale;
    }
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const { locales } = i18n;

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

// prettier-ignore
export const getDictionary = async (locale: Locale) => (
  dictionaries[locale]?.() ?? dictionaries.fa());
