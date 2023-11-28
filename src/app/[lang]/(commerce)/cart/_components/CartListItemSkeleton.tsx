import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function CartListItemSkeleton() {
  return (
    <tr className="border-b-[1px]">
      <td className="flex items-center gap-1">
        <Skeleton className="w-24 md:w-40 h-20 rounded m-2" />
        <Skeleton className="h-6 w-24 rounded m-2" />
      </td>
      <td>
        <Skeleton className="h-6 w-24 rounded m-2" />
      </td>
      <td>
        <Skeleton className="h-6 w-8 rounded m-2" />
      </td>
      <td>
        <Skeleton className="hidden md:table-cell h-6 w-24 rounded m-2" />
      </td>
    </tr>
  );
}
