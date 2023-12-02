"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "../ui/dialog";

interface PropTypes {
  children: React.ReactNode;
  title: string;
}

export default function Modal({ children, title, ...props }: PropTypes) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => !val && router.back()}
      {...props}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
