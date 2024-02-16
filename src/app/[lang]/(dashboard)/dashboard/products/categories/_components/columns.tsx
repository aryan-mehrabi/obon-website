"use client";

import { Category, Locale } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { deleteCategory } from "@/actions/category";
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

function CategoryAction({ row }: { row: Row<Category> }) {
  const { toast } = useToast();
  const {
    pages: {
      dashboardCategories: {
        table: {
          actions: { edit, delete: deleteButton, deleteDialog },
        },
      },
    },
  } = useTranslation();

  const onDelete = async () => {
    const res = await deleteCategory(row.original.id);
    if (res.success) {
      toast({ title: res.message });
    } else {
      toast({ title: res.message, variant: "destructive" });
    }
  };

  return (
    <DataTableRowActions>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/dashboard/products/categories/${row.original.id}/edit`}>
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

export const columns: ColumnDef<Category>[] = [
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
          title={dict.pages.dashboardCategories.table.cols.id}
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
          title={dict.pages.dashboardCategories.table.cols.title}
        />
      );
    },
    cell: function Cell({ row }) {
      const { lang }: { lang: Locale } = useParams();
      return <div>{row.original[`title_${lang}`]}</div>;
    },
  },
  {
    id: "actions",
    cell: CategoryAction,
  },
];
