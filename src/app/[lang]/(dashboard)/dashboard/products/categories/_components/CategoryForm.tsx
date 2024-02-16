"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import en from "@/dictionaries/en.json";
import { filterDirtyFields } from "@/lib/utils";
import { categoryFormSchema } from "@/lib/validations";
import { CategoryFormSchema, ErrorResponse, SuccessResponse } from "@/types";

interface PropTypes {
  dict: typeof en;
  formData: CategoryFormSchema;
  onSubmit: (
    values: CategoryFormSchema,
    attributeId: number,
  ) => Promise<SuccessResponse | ErrorResponse>;
}

export default function CategoryForm({ dict, formData, onSubmit }: PropTypes) {
  const {
    pages: {
      dashboardCategories: { categoryForm },
      dashboardCategoriesEdit: { submit, dismiss },
    },
  } = dict;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title_en: formData.title_en,
      title_fa: formData.title_fa,
    },
  });

  const onSubmitForm = (values: CategoryFormSchema) => {
    const categoryId = +pathname.split("/").filter((path) => path)[4];
    const dirtyFields = Object.keys(form.formState.dirtyFields);
    startTransition(async () => {
      const res = await onSubmit(
        Number.isNaN(categoryId)
          ? values
          : (filterDirtyFields(values, dirtyFields) as CategoryFormSchema),
        categoryId,
      );
      if (res.success) {
        toast({ title: res?.message });
        router.push("/dashboard/products/categories");
      } else {
        toast({ title: res?.message, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
          <FormField
            control={form.control}
            name="title_fa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {categoryForm.title.title}
                  {" "}
                  (fa)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={categoryForm.title.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {categoryForm.title.title}
                  {" "}
                  (en)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={categoryForm.title.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{dismiss}</Button>
          </DialogClose>
          <Button disabled={isPending}>{submit}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
