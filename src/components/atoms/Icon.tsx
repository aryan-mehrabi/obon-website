import React from "react";

interface PropTypes extends React.HTMLAttributes<HTMLElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: any;
}

export default function Icon({ render, className, ...props }: PropTypes) {
  return React.createElement(render, {
    className: `w-8 h-8 ${className}`,
    ...props,
  });
}
