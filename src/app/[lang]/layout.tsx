import "@/styles/tailwind.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import { i18n, type Locale } from "@/lib/locale";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// eslint-disable-next-line
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang} dir={lang === "fa" ? "rtl" : ""}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
