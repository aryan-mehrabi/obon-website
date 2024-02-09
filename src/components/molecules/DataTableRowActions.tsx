import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React from "react";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { i18n } from "@/lib/utils";

export function DataTableRowActions({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useParams();
  return (
    <DropdownMenu
      dir={i18n.rtl.some((locale) => lang === locale) ? "rtl" : "ltr"}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <AlertDialog>{children}</AlertDialog>
    </DropdownMenu>
  );
}
