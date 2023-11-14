"use client";

import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useRef, useState } from "react";

import CartIcon from "@/assets/carticon.svg";
import Logo from "@/assets/logo.png";
import fa from "@/dictionaries/fa.json";
import useClickOutside from "@/hooks/useClickOutside";
import useStore from "@/hooks/useStore";
import { usePresistStore } from "@/store";

import Badge from "../atoms/Badge";
import Icon from "../atoms/Icon";

interface PropTypes {
  navMenu: typeof fa.nav_menu;
}

export default function Navbar({ navMenu }: PropTypes) {
  const cart = useStore(usePresistStore, (state) => state.cart) || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useClickOutside(ref, () => setIsMenuOpen(false));
  return (
    <nav ref={ref} className="bg-white fixed w-full z-10 top-0">
      <div className="flex items-center justify-between max-w-5xl md:mx-auto p-7 md:p-6">
        <Icon
          render={HamburgerMenuIcon}
          className="md:hidden"
          onClick={() => setIsMenuOpen((val) => !val)}
        />
        <Link href="/">
          <Image
            alt="Candleaf Logo"
            src={Logo}
            className="h-8 w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0"
          />
        </Link>
        <div
          className={`absolute bottom-0 left-0 translate-y-full bg-white w-full ${
            isMenuOpen ? "" : "hidden"
          } md:block md:static md:translate-y-0 md:w-auto`}
        >
          <ul className="px-10 py-5 flex flex-col md:flex-row gap-y-5 md:gap-16 text-2xl md:text-base md:p-0">
            {navMenu.map(({ id, title, href }) => (
              <li key={id}>
                <Link className="p-2" href={href}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3">
          <Icon render={PersonIcon} />
          <Link href="/cart">
            <Badge>{Object.values(cart).length}</Badge>
            <Icon render={CartIcon as FC} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
