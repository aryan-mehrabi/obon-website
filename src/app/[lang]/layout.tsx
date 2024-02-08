import "@/styles/tailwind.css";

import { Locale } from "@prisma/client";
import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import React from "react";

import Navbar from "@/components/organs/Navbar";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { getDictionary } from "@/lib/locale";
import { i18n } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const vazir = Vazirmatn({ subsets: ["arabic"] });

interface PropTypes {
  children: React.ReactNode;
  params: { lang: Locale };
}

export async function generateMetadata({
  params: { lang },
}: PropTypes): Promise<Metadata> {
  const { metadata } = await getDictionary(lang);
  return {
    title: metadata.title,
  };
}

// eslint-disable-next-line
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: PropTypes) {
  const { nav_menu: navMenu } = await getDictionary(lang);
  return (
    <html lang={lang} dir={i18n.rtl.some((ln) => ln === lang) ? "rtl" : "ltr"}>
      <body
        className={`${
          lang === Locale.fa ? vazir.className : inter.className
        } min-h-screen flex flex-col pt-20`}
      >
        <QueryProvider>
          <Toaster />
          <Navbar navMenu={navMenu} />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
