import { useContext } from "react";

import { TranslationContext } from "@/components/providers/TranslationProvider";

export default function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation should be used within its provider.");
  }

  return context;
}
