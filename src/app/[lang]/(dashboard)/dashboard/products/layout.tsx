import { Locale } from "@prisma/client";
import React from "react";

import { getDictionary } from "@/lib/locale";

import TabsList from "./_components/TabsList";

export default async function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return <TabsList dict={dict}>{children}</TabsList>;
}
