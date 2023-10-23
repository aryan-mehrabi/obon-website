import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
