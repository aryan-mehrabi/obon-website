import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Locale } from "./locale";

// eslint-disable-next-line
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (number: number, locale: Locale = "en") => number.toLocaleString(locale);
