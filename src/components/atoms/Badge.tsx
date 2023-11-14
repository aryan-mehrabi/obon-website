import React from "react";
import { twMerge } from "tailwind-merge";

interface PropTypes extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  className = "",
  ...props
}: PropTypes) {
  return (
    <div className="relative">
      <span
        className={twMerge(
          `bg-red-600 bg-opacity-80 text-white absolute top-0 right-0 rounded-full text-xs w-4 h-4 text-center translate-x-1/2 -translate-y-1/2 ${className}`,
        )}
        {...{ ...props }}
      >
        {children}
      </span>
    </div>
  );
}
