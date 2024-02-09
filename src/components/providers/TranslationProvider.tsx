"use client";

import React, { createContext } from "react";

import { getDictionary } from "@/lib/locale";
import { TDictionary } from "@/types";

export const TranslationContext = createContext<TDictionary | null>(null);

export default function TranslationProvider({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
}
