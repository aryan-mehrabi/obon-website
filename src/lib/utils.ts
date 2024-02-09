import { Locale } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const i18n = {
  defaultLocale: Locale.fa,
  locales: Object.values(Locale),
  rtl: [Locale.fa],
} as const;

// eslint-disable-next-line
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (number: number, locale: Locale = "en") => number.toLocaleString(locale);

export const convertToNumber = (str: string): number => parseInt(
  str
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
    .replace(/[^0-9]/g, ""),
  10,
);

export const filterDirtyFields = <
  T extends Record<string, unknown>,
  U extends string[],
>(
    fields: T,
    dirtyFields: U,
  ): Partial<T> => dirtyFields.reduce((acc, curr) => ({ ...acc, [curr]: fields[curr] }), {});
