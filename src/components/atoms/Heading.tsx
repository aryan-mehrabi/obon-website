import { createElement } from "react";

const headerTypes = ["h1", "h2", "h3", "h4"] as const;
interface PropTypes extends React.HTMLAttributes<HTMLElement> {
  type: (typeof headerTypes)[number];
}

export default function Heading({
  children,
  type,
  className,
  ...props
}: PropTypes) {
  let classes = "";
  switch (type) {
    case "h1":
      classes = "text-4xl leading-tight";
      break;
    case "h2":
      classes = "text-4xl leading-tight";
      break;
    case "h3":
      classes = "text-3xl";
      break;
    case "h4":
      classes = "text-2xl";
      break;
    default:
      break;
  }
  return createElement(
    type,
    { className: `font-semibold ${classes} ${className}`, ...props },
    children,
  );
}
