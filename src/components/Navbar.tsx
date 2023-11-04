"use client";

import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import React, { useRef, useState } from "react";

import useClickOutside from "@/hooks/useClickOutside";

import CartIcon from "../../public/carticon.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useClickOutside(ref, () => setIsMenuOpen(false));
  return (
    <nav
      ref={ref}
      className="bg-white flex items-center justify-between p-7 fixed w-full z-10"
    >
      <HamburgerMenuIcon
        onClick={() => setIsMenuOpen((val) => !val)}
        className="w-8 h-8"
      />
      <h3 className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Candleaf
      </h3>
      <div
        className={`absolute bottom-0 left-0 translate-y-full bg-white w-full ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul className="px-10 py-5 flex flex-col gap-y-5 text-2xl">
          <li>Discovery</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
      </div>
      <div className="flex gap-3">
        <PersonIcon className="w-8 h-8" />
        <CartIcon className="w-8 h-8" />
      </div>
    </nav>
  );
}
