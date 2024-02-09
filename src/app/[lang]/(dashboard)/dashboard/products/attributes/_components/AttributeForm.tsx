"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Locale } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import en from "@/dictionaries/en.json";
import { filterDirtyFields, i18n } from "@/lib/utils";
import { attributeFormSchema } from "@/lib/validations";
import { AttributeFormSchema, ErrorResponse, SuccessResponse } from "@/types";

interface PropTypes {
  dict: typeof en;
  formData: AttributeFormSchema;
  onSubmit: (
    values: AttributeFormSchema,
    attributeId: number,
  ) => Promise<SuccessResponse | ErrorResponse>;
}

export default function AttributeForm({ dict, formData, onSubmit }: PropTypes) {
  const {
    pages: {
      dashboardAttributes: { attributeForm },
      dashboardAttributesEdit: { submit, dismiss },
    },
  } = dict;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const { lang } = useParams();
  const form = useForm<AttributeFormSchema>({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: {
      title_en: formData.title_en,
      title_fa: formData.title_fa,
      required: formData.required,
      key: formData.key,
      locale: formData.locale,
    },
  });

  const onSubmitForm = (values: AttributeFormSchema) => {
    const attributeId = +pathname.split("/").filter((path) => path)[4];
    const dirtyFields = Object.keys(form.formState.dirtyFields);
    startTransition(async () => {
      const res = await onSubmit(
        Number.isNaN(attributeId)
          ? values
          : (filterDirtyFields(values, dirtyFields) as AttributeFormSchema),
        attributeId,
      );
      if (res.success) {
        toast({ title: res?.message });
        router.push("/dashboard/products/attributes");
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
                  {attributeForm.title.title}
                  {" "}
                  (fa)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={attributeForm.title.placeholder}
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
                  {attributeForm.title.title}
                  {" "}
                  (en)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={attributeForm.title.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{attributeForm.key.title}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={attributeForm.key.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{attributeForm.locale.title}</FormLabel>
                <Select
                  dir={i18n.rtl.some((loc) => loc === lang) ? "rtl" : "ltr"}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Locale).map((locale) => (
                      <SelectItem key={locale} value={locale}>
                        {locale.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="required"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem className="flex gap-2 items-center space-y-0">
                <FormLabel>{attributeForm.required.title}</FormLabel>
                <FormControl>
                  <Switch
                    onCheckedChange={(val) => onChange(val)}
                    checked={value}
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
