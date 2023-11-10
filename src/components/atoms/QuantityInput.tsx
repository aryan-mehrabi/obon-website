"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import Icon from "./Icon";

interface PropTypes {
  availableQuantity: number;
}

export default function QuantityInput({ availableQuantity }: PropTypes) {
  const [counter, setCounter] = useState(1);

  const counterValidator = (val: string): number => {
    if (+val > availableQuantity || +val < 1) {
      return counter;
    }
    return +val;
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounter(counterValidator(e.target.value) || counter);
  };

  return (
    <div className="flex items-center gap-1 bg-white w-min border border-eprimary">
      <button
        type="button"
        onClick={() => setCounter((val) => val - 1)}
        className="p-2 disabled:text-neutral-500"
        disabled={counter < 2}
      >
        <Icon render={MinusIcon} className="w-4 h-4" />
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
        onClick={() => setCounter((val) => val + 1)}
        className="p-2 disabled:text-neutral-500"
        disabled={counter > availableQuantity - 1}
      >
        <Icon render={PlusIcon} className="w-4 h-4" />
      </button>
    </div>
  );
}
