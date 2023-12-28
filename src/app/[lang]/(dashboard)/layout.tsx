import { Metadata, ResolvingMetadata } from "next";
import React from "react";

import Sidebar from "@/components/organs/Sidebar";
import { getDictionary, Locale } from "@/lib/locale";

interface PropTypes {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export async function generateMetadata(
  { params: { lang } }: PropTypes,
  parent: ResolvingMetadata,
): Metadata {
  const {
    pages: {
      dashboard: { metadata },
    },
  } = await getDictionary(lang);
  return {
    title: `${(await parent).title?.absolute} | ${metadata.title}`,
  };
}

export default async function layout({
  children,
  params: { lang },
}: PropTypes) {
  const dict = await getDictionary(lang);
  const { sidebar } = dict;
  return (
    <div className="flex h-[calc(100vh-80px)]">
      <Sidebar dict={sidebar} />
      <main className="grow px-4 py-5 sm:px-12 sm:py-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
