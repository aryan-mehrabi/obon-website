import { Locale } from "@prisma/client";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

import { getDictionary } from "@/lib/locale";
import { cn } from "@/lib/utils";

export default async function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const {
    pages: {
      dashboardProducts: { productRoutes },
    },
  } = await getDictionary(lang);

  const headersList = headers();
  const pathname = headersList.get("next-url") || "";
  const subPath = pathname.split("/").filter((path) => path)[3] || "/";

  return (
    <>
      <div className="mb-4 flex items-center">
        {productRoutes.map(({ title, href, path }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
              path === subPath
                ? "bg-muted font-medium text-primary"
                : "text-muted-foreground",
            )}
          >
            {title}
          </Link>
        ))}
      </div>
      {children}
    </>
  );
}
