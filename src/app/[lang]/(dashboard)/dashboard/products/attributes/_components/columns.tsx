"use client";

import { Attribute, Locale } from "@prisma/client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { deleteAttribute } from "@/actions/attribute";
import Icon from "@/components/atoms/Icon";
import { DataTableColumnHeader } from "@/components/molecules/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/molecules/DataTableRowActions";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useTranslation from "@/hooks/useTranslation";

function AttributeAction({ row }: { row: Row<Attribute> }) {
  const { toast } = useToast();
  const {
    pages: {
      dashboardAttributes: {
        table: {
          actions: { edit, delete: deleteButton, deleteDialog },
        },
      },
    },
  } = useTranslation();

  const onDelete = async () => {
    const res = await deleteAttribute(row.original.id);
    if (res.success) {
      toast({ title: "deleted successfully" });
    } else {
      toast({ title: res.message, variant: "destructive" });
    }
  };

  return (
    <DataTableRowActions>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/dashboard/products/attributes/${row.original.id}/edit`}>
          <DropdownMenuItem>{edit}</DropdownMenuItem>
        </Link>
        <AlertDialogTrigger asChild>
          <DropdownMenuItem className="text-destructive">
            {deleteButton}
          </DropdownMenuItem>
        </AlertDialogTrigger>
      </DropdownMenuContent>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{deleteDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {deleteDialog.disclaimer}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{deleteDialog.cancel}</AlertDialogCancel>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <AlertDialogAction variant="destructive" onClick={onDelete}>
            {deleteDialog.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </DataTableRowActions>
  );
}

export const columns: ColumnDef<Attribute>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardAttributes.table.cols.id}
        />
      );
    },
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title_en",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardAttributes.table.cols.title}
        />
      );
    },
    cell: function Cell({ row }) {
      const { lang }: { lang: Locale } = useParams();
      return <div>{row.original[`title_${lang}`]}</div>;
    },
  },
  {
    accessorKey: "locale",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardAttributes.table.cols.locale}
        />
      );
    },
    cell: ({ row }) => <div>{row.getValue("locale")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "key",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardAttributes.table.cols.key}
        />
      );
    },
    cell: ({ row }) => <div>{row.getValue("key")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "required",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardAttributes.table.cols.required}
        />
      );
    },
    cell: ({ row }) => (
      <div>
        {row.getValue("required") ? (
          <Icon className="w-6 h-6" render={CheckIcon} />
        ) : (
          <Icon className="w-6 h-6" render={Cross2Icon} />
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: AttributeAction,
  },
];
