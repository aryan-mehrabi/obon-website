"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import en from "@/dictionaries/en.json";
import { cn } from "@/lib/utils";

export default function TabsList({
  dict,
  children,
}: {
  children: React.ReactNode;
  dict: typeof en;
}) {
  const {
    pages: {
      dashboardProducts: { productRoutes },
    },
  } = dict;
  const pathname = usePathname();
  const subPath = pathname.split("/").filter((p) => p)[3] || "/";
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
