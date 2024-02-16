import { zodResolver } from "@hookform/resolvers/zod";
import { Attribute, Category, Locale } from "@prisma/client";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { DialogFooter } from "@/components/ui/dialog";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import en from "@/dictionaries/en.json";
import { cn, filterDirtyFields } from "@/lib/utils";
import {
  productMetadataFormSchema,
  productSecondStepFormSchema,
} from "@/lib/validations";
import {
  ErrorResponse,
  FormSteps,
  ProductSecondStepFormSchema,
  SuccessResponse,
  TFormData,
} from "@/types";

interface PropTypes {
  attributes: Attribute[];
  categories: Category[];
  dict: typeof en;
  formData: TFormData;
  onSubmit: (
    values: FormData,
    id?: number,
  ) => Promise<SuccessResponse | ErrorResponse>;
  setFormData: React.Dispatch<React.SetStateAction<TFormData>>;
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

export default function WizardSecondStep({
  attributes,
  categories,
  formData: { fields, dirtyFields },
  setFormData,
  setStep,
  dict,
  onSubmit,
}: PropTypes) {
  const {
    pages: {
      dashboardProducts: {
        newProductModal: { buttons },
        productForm: { available, visible, categories: dictCategories },
      },
    },
  } = dict;
  const { lang }: { lang: Locale } = useParams();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const attributesSchema = productMetadataFormSchema(attributes);
  const [open, setOpen] = useState(false);
  const form = useForm<ProductSecondStepFormSchema>({
    resolver: zodResolver(productSecondStepFormSchema.merge(attributesSchema)),
    defaultValues: {
      is_available: fields.is_available,
      is_visible_to_user: fields.is_visible_to_user,
      metadata: fields.metadata,
      categories: fields.categories,
    },
  });

  const onSubmitForm = (values: ProductSecondStepFormSchema) => {
    const data = new FormData();
    const productId = +pathname.split("/").filter((path) => path)[3];
    const isEditingSubmit = !Number.isNaN(productId);
    const allFields = { ...fields, ...values };
    const allDirtyFields: TFormData["dirtyFields"] = [
      ...dirtyFields,
      ...(Object.keys(form.formState.dirtyFields) as TFormData["dirtyFields"]),
    ];

    setFormData({
      fields: allFields,
      dirtyFields: allDirtyFields,
    });

    fields.images.forEach(({ file }) => {
      if (file) {
        data.append("files", file, file.name);
      }
    });
    data.append(
      "data",
      JSON.stringify(
        isEditingSubmit
          ? filterDirtyFields(allFields, allDirtyFields)
          : allFields,
      ),
    );

    startTransition(async () => {
      const res = await onSubmit(
        data,
        Number.isNaN(productId) ? undefined : productId,
      );
      if (res.success) {
        toast({ title: res.message });
        router.push("/dashboard/products");
      } else {
        toast({ title: res.message, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
          {attributes.map((attribute) => (
            <FormField
              key={attribute.id}
              control={form.control}
              name={`metadata.${attribute.key}`}
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="grow">
                  <FormLabel>
                    {attribute[`title_${lang}`]}
                    (
                    {attribute.locale}
                    )
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={value?.value || ""}
                      onChange={(e) => onChange(
                        e.target.value
                          ? {
                            ...value,
                            attributeId: attribute.id,
                            value: e.target.value,
                          }
                          : undefined,
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="col-span-2 grid grid-cols-2 gap-x-2">
            <FormField
              control={form.control}
              name="is_available"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="flex gap-2 items-center space-y-0">
                  <FormLabel>{available.title}</FormLabel>
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
            <FormField
              control={form.control}
              name="is_visible_to_user"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="flex gap-2 items-center space-y-0">
                  <FormLabel>{visible.title}</FormLabel>
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
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="categories"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>{dictCategories.title}</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          <ul className="inline-block text-ellipsis whitespace-nowrap overflow-hidden">
                            {value.length
                              ? value.map((category) => (
                                <li
                                  key={category.id}
                                  className="inline-block py-1 px-2 rounded-full bg-muted"
                                >
                                  {category[`title_${lang}`]}
                                  <span
                                    role="presentation"
                                    onClick={(e) => {
                                      onChange(
                                        value.filter(
                                          (cat) => cat.id !== category.id,
                                        ),
                                      );
                                      e.stopPropagation();
                                    }}
                                  >
                                    <Cross2Icon className="h-3 w-3 opacity-50 inline-block" />
                                  </span>
                                </li>
                              ))
                              : dictCategories.placeholder}
                          </ul>
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder={dictCategories.search}
                            className="h-9"
                          />
                          <CommandEmpty>{dictCategories.notFound}</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category[`title_${lang}`]}
                                onSelect={() => {
                                  onChange(
                                    value.some((cat) => cat.id === category.id)
                                      ? value.filter(
                                        (cat) => cat.id !== category.id,
                                      )
                                      : [...value, category],
                                  );
                                  setOpen(false);
                                }}
                              >
                                {category[`title_${lang}`]}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value.some((cat) => cat.id === category.id)
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((step) => step - 1)}
          >
            {buttons.previous}
          </Button>
          <Button type="submit" disabled={isPending}>
            {buttons.submit}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
