import React from "react";

interface PropTypes extends React.HTMLAttributes<HTMLElement> {}

export default function List({ children, className }: PropTypes) {
  return (
    <ul
      className={`list-image-[url('/checkmark-circle-outline.svg')] list-outside ps-8 flex flex-col gap-5 ${className}`}
    >
      {children}
    </ul>
  );
}
