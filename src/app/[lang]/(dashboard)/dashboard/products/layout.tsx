import React from "react";

interface PropTypes {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: PropTypes) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
