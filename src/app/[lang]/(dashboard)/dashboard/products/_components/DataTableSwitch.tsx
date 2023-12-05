import { Row } from "@tanstack/react-table";
import React, { useOptimistic } from "react";

import { updateProductVisibile } from "@/actions/product";
import { Switch } from "@/components/ui/switch";

export default function DataTableSwitch<
  TData extends { id: number; is_visible_to_user: boolean },
>({ row }: { row: Row<TData> }) {
  const [optimisticState, addOptimisticState] = useOptimistic(
    { isVisibile: row.original.is_visible_to_user, sending: false },
    (state, newState: boolean) => ({
      ...state,
      isVisibile: newState,
      sending: true,
    }),
  );
  const onChangeSwitch = async () => {
    addOptimisticState(!optimisticState.isVisibile);
    await updateProductVisibile(row.original.id, !optimisticState.isVisibile);
  };
  return (
    <Switch
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onCheckedChange={onChangeSwitch}
      checked={optimisticState.isVisibile}
    />
  );
}
