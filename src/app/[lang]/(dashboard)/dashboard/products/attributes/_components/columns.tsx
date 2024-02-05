"use client";

import { Attribute } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";

import { deleteAttribute } from "@/actions/attribute";
import { DataTableColumnHeader } from "@/components/molecules/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/molecules/DataTableRowActions";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { formatNumber } from "@/lib/utils";

function AttributeAction({ row }: { row: Row<Attribute> }) {
  const router = useRouter();
  const { toast } = useToast();

  const onEdit = (id: number) => {
    router.push(`/dashboard/products/attributes/${id}/edit`);
  };

  const onDelete = async (id: number) => {
    const res = await deleteAttribute(id);
    if (res.success) {
      toast({ title: "deleted successfully" });
    }
  };

  return <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />;
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attribute Id" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div>{row.getValue("title_en")}</div>,
  },
  {
    accessorKey: "locale",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Locale" />
    ),
    cell: ({ row }) => <div>{row.getValue("locale")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "key",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Key" />
    ),
    cell: ({ row }) => <div>{formatNumber(row.getValue("key"))}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: AttributeAction,
  },
];
