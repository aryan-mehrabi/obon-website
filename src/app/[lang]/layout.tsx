import "@/styles/tailwind.css";

import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import React from "react";

import Navbar from "@/components/organs/Navbar";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import { getDictionary, i18n, type Locale } from "@/lib/locale";

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
    <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <body
        className={`${
          lang === "fa" ? vazir.className : inter.className
        } min-h-screen flex flex-col pt-20`}
      >
        <Provider>
          <Toaster />
          <Navbar navMenu={navMenu} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
