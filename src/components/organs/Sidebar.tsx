"use client";

import {
  BackpackIcon,
  DashboardIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

import CartIcon from "@/assets/carticon.svg";
import Icon from "@/components/atoms/Icon";
import en from "@/dictionaries/en.json";

export default function Sidebar({ dict }: { dict: typeof en.sidebar }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);
  const {
    overview, orders, products, customers, settings,
  } = dict;

  const sidebarMenu = [
    {
      id: 1,
      icon: DashboardIcon,
      dict: overview,
    },
    {
      id: 2,
      icon: CartIcon as FC,
      dict: orders,
    },
    {
      id: 3,
      icon: BackpackIcon,
      dict: products,
    },
    {
      id: 4,
      icon: PersonIcon,
      dict: customers,
    },
    {
      id: 5,
      icon: GearIcon,
      dict: settings,
    },
  ];

  const renderList = () => {
    const currentPath = paths[2];
    return sidebarMenu.map((item) => {
      const [, itemPath] = item.dict.href.split("/").filter((href) => href);
      return (
        <Link key={item.id} href={item.dict.href}>
          <li
            className={`flex items-center space-x-8 rounded-md py-3 px-8 transition-all cursor-pointer hover:bg-accent ${
              currentPath === itemPath ? "bg-accent" : ""
            }`}
          >
            <Icon
              render={item.icon}
              className={`w-6 h-6 ${
                currentPath === itemPath ? "text-primary" : ""
              }`}
            />
            <p className="font-medium leading-none">{item.dict.title}</p>
          </li>
        </Link>
      );
    });
  };

  return (
    <aside className="flex">
      <ul className="flex flex-col gap-1 p-4">{renderList()}</ul>
    </aside>
  );
}
