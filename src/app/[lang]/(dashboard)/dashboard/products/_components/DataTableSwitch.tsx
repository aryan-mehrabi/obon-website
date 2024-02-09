import { Row } from "@tanstack/react-table";
import React, { useOptimistic, useTransition } from "react";

import { updateProductVisibile } from "@/actions/product";
import { Switch } from "@/components/ui/switch";

export default function DataTableSwitch<
  TData extends { id: number; is_visible_to_user: boolean },
>({ row }: { row: Row<TData> }) {
  const [, startTranstion] = useTransition();
  const [optimisticState, addOptimisticState] = useOptimistic(
    { isVisibile: row.original.is_visible_to_user, sending: false },
    (state, newState: boolean) => ({
      ...state,
      isVisibile: newState,
      sending: true,
    }),
  );
  const onChangeSwitch = () => {
    startTranstion(async () => {
      addOptimisticState(!optimisticState.isVisibile);
      await updateProductVisibile(row.original.id, !optimisticState.isVisibile);
    });
  };
  return (
    <Switch
      onCheckedChange={onChangeSwitch}
      checked={optimisticState.isVisibile}
    />
  );
}
