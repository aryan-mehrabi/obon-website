import React from "react";

import Footer from "@/components/organs/Footer";
import { Locale } from "@/lib/locale";

export default function DashboardLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}) {
  return (
    <>
      {children}
      <Footer lang={lang} />
    </>
  );
}
