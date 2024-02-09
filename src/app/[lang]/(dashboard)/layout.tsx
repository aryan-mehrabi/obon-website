import { Locale } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

import Sidebar from "@/components/organs/Sidebar";
import { getDictionary } from "@/lib/locale";

interface PropTypes {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export async function generateMetadata(
  { params: { lang } }: PropTypes,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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
      <main className="grow px-4 py-5 md:px-12 md:py-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
