import { zodResolver } from "@hookform/resolvers/zod";
import { Attribute, Locale } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import en from "@/dictionaries/en.json";
import { filterDirtyFields } from "@/lib/utils";
import {
  // attributesFormSchema,
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
        productForm: { available, visible },
      },
    },
  } = dict;
  const { lang }: { lang: Locale } = useParams();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  // const attributesSchema = attributesFormSchema(attributes);
  const form = useForm<ProductSecondStepFormSchema>({
    resolver: zodResolver(productSecondStepFormSchema),
    defaultValues: {
      is_available: fields.is_available,
      is_visible_to_user: fields.is_visible_to_user,
      metadata: fields.metadata,
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
        toast({ title: "Product Created Successfully" });
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
              name="metadata"
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
                      onChange={(e) => {
                        let newMetadata;
                        if (
                          value.some(
                            ({ attributeId }) => attributeId === attribute.id,
                          )
                        ) {
                          newMetadata = value.map((attr) => (attr.attributeId === attribute.id
                            ? { ...attr, value: e.target.value }
                            : attr));
                        } else {
                          newMetadata = [
                            ...value,
                            {
                              attributeId: attribute.id,
                              value: e.target.value,
                            },
                          ];
                        }
                        onChange(newMetadata);
                      }}
                      value={
                        value.find(
                          ({ attributeId }) => attributeId === attribute.id,
                        )?.value || ""
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
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
                <FormLabel>{visible.placeholder}</FormLabel>
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
