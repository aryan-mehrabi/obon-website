import React from "react";

const buttonTypes = {
  default: "default",
  disabled: "disabled",
} as const;

interface PropTypes {
  children: React.ReactNode;
  className?: string;
  type?: keyof typeof buttonTypes;
}

export default function Button({
  children,
  className = "",
  type = buttonTypes.default,
  ...props
}: PropTypes) {
  let classes = "";
  if (type === buttonTypes.default) {
    classes = "bg-eprimary text-white hover:bg-white hover:text-eprimary border border-eprimary transition";
  } else if (type === buttonTypes.disabled) {
    classes = "bg-[#D6D6D6] cursor-default";
  }
  return (
    <button
      type="button"
      className={`py-2 px-11 rounded-sm ${classes} ${className}`}
      {...{ props }}
    >
      {children}
    </button>
  );
}
