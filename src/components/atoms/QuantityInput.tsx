import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import Icon from "./Icon";

interface PropTypes {
  availableQuantity: number;
  initQuantity: number;
  onChange: (counter: number) => void;
}

export default function QuantityInput({
  availableQuantity,
  onChange,
  initQuantity,
}: PropTypes) {
  const [counter, setCounter] = useState(initQuantity);

  const counterValidator = (val: string): number => {
    if (+val > availableQuantity || +val < 1) {
      return counter;
    }
    return +val;
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCounter = counterValidator(e.target.value) || counter;
    setCounter(newCounter);
    onChange(newCounter);
  };

  const onClickMinus = () => {
    setCounter((val) => val - 1);
    onChange(counter - 1);
  };

  const onClickPlus = () => {
    setCounter((val) => val + 1);
    onChange(counter + 1);
  };

  return (
    <div className="flex items-center gap-1 bg-white w-min border border-eprimary">
      <button
        type="button"
        onClick={onClickMinus}
        className="p-2 disabled:text-neutral-500"
      >
        {counter === 1 ? (
          <Icon render={TrashIcon} className="w-4 h-4 text-red-600" />
        ) : (
          <Icon render={MinusIcon} className="w-4 h-4" />
        )}
      </button>
      <input
        onChange={onChangeInput}
        value={counter}
        className="w-10 text-center self-stretch"
        type="text"
        name="quantity"
      />
      <button
        type="button"
        onClick={onClickPlus}
        className="p-2 disabled:text-neutral-500"
        disabled={counter > availableQuantity - 1}
      >
        <Icon render={PlusIcon} className="w-4 h-4" />
      </button>
    </div>
  );
}
