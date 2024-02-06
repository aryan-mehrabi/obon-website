import { Locale } from "@prisma/client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Icon from "../atoms/Icon";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { lang } = useParams();
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length}
        {" "}
        of
        {" "}
        {table.getFilteredRowModel().rows.length}
        {" "}
        row(s) selected.
      </div>
      <div className="flex items-center gap-2 sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            dir={lang === Locale.fa ? "rtl" : "ltr"}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page
          {" "}
          {table.getState().pagination.pageIndex + 1}
          {" "}
          of
          {" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {/* <span className="sr-only">Go to first page</span> */}
            <Icon
              render={DoubleArrowLeftIcon}
              className="h-4 w-4 rtl:rotate-180"
            />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {/* <span className="sr-only">Go to previous page</span> */}
            <Icon render={ChevronLeftIcon} className="h-4 w-4 rtl:rotate-180" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {/* <span className="sr-only">Go to next page</span> */}
            <Icon
              render={ChevronRightIcon}
              className="h-4 w-4 rtl:rotate-180"
            />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {/* <span className="sr-only">Go to last page</span> */}
            <Icon
              render={DoubleArrowRightIcon}
              className="h-4 w-4 rtl:rotate-180"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
