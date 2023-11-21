import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading type="h3">Products</Heading>
        <Button>
          <Icon render={PlusIcon} className="w-4 h-4" />
          <p>New Product</p>
        </Button>
      </div>
    </div>
  );
}
