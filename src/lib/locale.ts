import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import "server-only";

export const i18n = {
  defaultLocale: "fa",
  locales: ["fa", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

const firstPathname = (url: URL): string | undefined => {
  return url.pathname.split("/").filter(el => el)[0];
};

type LocaleType = (typeof i18n.locales)[number];
const isInLocales = (x: string | undefined): x is LocaleType =>
  i18n.locales.includes(x as LocaleType);

export function getLocale(request: NextRequest): string {
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
  const locales: string[] = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

const dictionaries = {
  fa: () => import("../dictionaries/fa.json").then(module => module.default),
  en: () => import("../dictionaries/en.json").then(module => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.fa();
