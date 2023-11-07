/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

import fa from "@/dictionaries/fa.json";
import useClickOutside from "@/hooks/useClickOutside";

import CartIcon from "../../../public/carticon.svg";
import Logo from "../../../public/logo.png";
import Icon from "../atoms/Icon";

interface PropTypes {
  navMenu: typeof fa.nav_menu;
}

export default function Navbar({ navMenu }: PropTypes) {
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
        <Image
          alt="Candleaf Logo"
          src={Logo}
          className="h-8 w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0"
        />
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
          <Icon render={CartIcon} />
        </div>
      </div>
    </nav>
  );
}
