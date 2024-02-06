import { Locale } from "@prisma/client";
import React from "react";

import Footer from "@/components/organs/Footer";

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
