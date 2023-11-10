import React from "react";
import { twMerge } from "tailwind-merge";

const buttonTypes = {
  default: "default",
  disabled: "disabled",
} as const;

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: keyof typeof buttonTypes;
}

export default function Button({
  children,
  className,
  styleType = buttonTypes.default,
  type = "button",
  ...props
}: PropTypes) {
  let classes = "";
  if (styleType === buttonTypes.default) {
    classes = "bg-eprimary text-white hover:bg-white hover:text-eprimary border border-eprimary transition";
  } else if (styleType === buttonTypes.disabled) {
    classes = "bg-[#D6D6D6] cursor-default";
  }
  return (
    <button
      // eslint-disable-next-line
      type={type}
      className={twMerge(`py-2 px-11 rounded-sm ${classes} ${className}`)}
      {...{ props }}
    >
      {children}
    </button>
  );
}
