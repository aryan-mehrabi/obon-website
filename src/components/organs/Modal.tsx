"use client";

import { useRouter } from "next/navigation";
import React from "react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "../ui/dialog";

interface PropTypes {
  children: React.ReactNode;
  title: string;
}

export default function Modal({ children, title, ...props }: PropTypes) {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={(val) => !val && router.back()} {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
