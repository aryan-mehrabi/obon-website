import React from "react";

import Sidebar from "@/components/organs/Sidebar";
import { getDictionary, Locale } from "@/lib/locale";

interface PropTypes {
  children: React.ReactNode;
  params: {
    lang: Locale;
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
      <main className="grow px-12 py-8 overflow-auto">{children}</main>
    </div>
  );
}
