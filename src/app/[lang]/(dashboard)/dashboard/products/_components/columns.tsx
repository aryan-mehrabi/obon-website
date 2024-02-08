"use client";

import { Locale } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { deleteProduct } from "@/actions/product";
import Image from "@/components/atoms/Image";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { formatNumber } from "@/lib/utils";
import { ProductWithImage } from "@/types";

import DataTableSwitch from "./DataTableSwitch";

function ProductActions({ row }: { row: Row<ProductWithImage> }) {
  const { toast } = useToast();
  const dict = useTranslation();
  const {
    pages: {
      dashboardProducts: {
        table: {
          actions: { edit, delete: deleteButton, deleteDialog },
        },
      },
    },
  } = dict;
  const onDelete = async () => {
    const res = await deleteProduct(row.original.id);
    if (res.success) {
      toast({ title: "Product deleted Successfully" });
    } else {
      toast({ title: res.message, variant: "destructive" });
    }
  };
  return (
    <DataTableRowActions>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/dashboard/products/${row.original.id}/edit`}>
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

export const columns: ColumnDef<ProductWithImage>[] = [
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
          title={dict.pages.dashboardProducts.table.cols.id}
        />
      );
    },
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return (
        <Link href={`/product/${id}`} className="w-[40px]">
          <Button variant="link">
            #
            {id}
          </Button>
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardProducts.table.cols.title}
        />
      );
    },
    cell: function Cell({ row }) {
      const { lang }: { lang: Locale } = useParams();
      const image = row.original.images.find((img) => img.is_default);
      return (
        <div className="flex gap-2 items-center">
          <div className="h-14 w-24 hidden sm:block">
            <Image
              src={image?.url}
              width={image?.width}
              height={image?.height}
              alt={image?.alt || "product image"}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="max-w-[500px] truncate font-medium">
            {row.original[`title_${lang}`]}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardProducts.table.cols.quantity}
        />
      );
    },
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardProducts.table.cols.price}
        />
      );
    },
    cell: ({ row }) => <div>{formatNumber(row.getValue("price"))}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "is_visible_to_user",
    header: function Header({ column }) {
      const dict = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={dict.pages.dashboardProducts.table.cols.visibility}
        />
      );
    },
    cell: ({ row }) => <DataTableSwitch row={row} />,
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status"),
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority"),
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ProductActions,
  },
];
