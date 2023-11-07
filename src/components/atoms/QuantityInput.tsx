"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import Icon from "./Icon";

export default function QuantityInput() {
  const [counter, setCounter] = useState(1);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounter(+e.target.value);
  };

  return (
    <div className="flex items-center gap-1 bg-white w-min border border-eprimary">
      <button
        type="button"
        onClick={() => setCounter((val) => val - 1)}
        className="p-2"
      >
        <Icon render={MinusIcon} className="w-4 h-4" />
      </button>
      <input
        onChange={onChangeInput}
        value={counter}
        className="w-10 text-center self-stretch"
        type="number"
      />
      <button
        type="button"
        onClick={() => setCounter((val) => val + 1)}
        className="p-2"
      >
        <Icon render={PlusIcon} className="w-4 h-4" />
      </button>
    </div>
  );
}
