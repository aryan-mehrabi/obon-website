import React from "react";

export default function CartListItemSkeleton() {
  return (
    <tr className="border-b-[1px]">
      <td className="flex items-center gap-1">
        <div className="w-24 md:w-40 h-20 bg-slate-200 rounded m-2" />
        <div className="h-6 w-24 bg-slate-200 rounded m-2" />
      </td>
      <td>
        <div className="h-6 w-12 bg-slate-200 rounded m-2" />
      </td>
      <td>
        <div className="h-6 w-8 bg-slate-200 rounded m-2" />
      </td>
      <td>
        <div className="hidden md:table-cell h-6 w-12 bg-slate-200 rounded m-2" />
      </td>
    </tr>
  );
}
