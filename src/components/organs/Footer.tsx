import { Locale } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import { getDictionary } from "@/lib/locale";

interface PropTypes extends React.HTMLAttributes<HTMLElement> {
  lang: Locale;
}

export default async function Footer({ lang, className = "" }: PropTypes) {
  const { footer } = await getDictionary(lang);
  return (
    <footer
      className={twMerge(
        `bg-esecondary text-white relative mt-auto bottom-0 ${className}`,
      )}
    >
      <div className="py-10 px-4 max-w-5xl md:mx-auto">
        <hr />
        <div className="md:flex md:gap-8">
          <div className="mt-4 mb-12">
            <h3 className="text-2xl font-semibold mb-3">{footer.title}</h3>
            <p>{footer.description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16 md:mt-10">
            {footer.menu.map(({ id, title, links }) => (
              <div key={id}>
                <h4 className="text-eprimary font-[500] mb-5">{title}</h4>
                <ul className="flex flex-col gap-4">
                  {links.map(({ id: j, title: linkTitle, href }) => (
                    <li key={j}>
                      <Link href={href}>{linkTitle}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-secondary text-black text-sm absolute w-full bottom-0 left-0 text-center p-1">
          <p>{footer.bottom}</p>
        </div>
      </div>
    </footer>
  );
}
