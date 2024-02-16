"use client";

import { Category, Locale } from "@prisma/client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";

import Icon from "@/components/atoms/Icon";

export default function FilterProducts({
  categories,
}: {
  categories: Category[];
}) {
  const { lang }: { lang: Locale } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let selectedCategories = searchParams
    .get("categories")
    ?.split(",")
    .map((cat) => +cat)
    .filter((cat) => cat);

  const onClickCategory = (id: number) => {
    if (!selectedCategories) selectedCategories = [];
    let newCategories;
    if (selectedCategories.includes(id)) {
      newCategories = selectedCategories.filter((catId) => catId !== id);
    } else {
      newCategories = [...selectedCategories, id];
    }
    router.replace(`${pathname}?categories=${newCategories.join(",")}`);
  };

  const onClickDelete = (id: number) => {
    if (!selectedCategories) return;
    const newCategories = selectedCategories.filter((catId) => catId !== id);
    router.replace(`${pathname}?categories=${newCategories.join(",")}`);
  };

  return (
    <div className="flex items-center">
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            className="flex w-52 justify-between items-center gap-2 px-2 py-1 bg-white border border-[#898989]"
            type="button"
          >
            <p>Select Categories</p>
            <Icon
              render={ChevronDownIcon}
              className="w-6 h-6 border-l-[1px] pl-2"
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white w-52 shadow border border-[#898989]"
            sideOffset={4}
          >
            {categories.map((category) => (
              <DropdownMenu.Item
                key={category.id}
                onClick={() => onClickCategory(category.id)}
                className="flex justify-between items-center cursor-pointer hover:bg-background py-2 px-3"
              >
                <p>{category[`title_${lang}`]}</p>
                {selectedCategories?.includes(category.id) && (
                  <Icon render={CheckIcon} className="w-3 h-3" />
                )}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <div className="flex gap-2 mx-2 overflow-auto">
        {selectedCategories?.map((categoryId) => (
          <div
            key={categoryId}
            className="flex gap-2 items-center bg-white rounded-full text-secondary-foreground py-1 px-3 border"
          >
            <p className="whitespace-nowrap">
              {categories.find((cat) => cat.id === categoryId)?.title_en}
            </p>
            <button onClick={() => onClickDelete(categoryId)} type="button">
              <Icon render={Cross2Icon} className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
