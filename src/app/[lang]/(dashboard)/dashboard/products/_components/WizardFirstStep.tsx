import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import en from "@/dictionaries/en.json";
import { convertToNumber, formatNumber } from "@/lib/utils";
import { productFirstStepFormSchema } from "@/lib/validations";
import { type FormSteps, ProductFirstStepFormSchema, TFormData } from "@/types";

import ImageInput from "./ImageInput";

interface PropTypes {
  dict: typeof en;
  formData: TFormData;
  setFormData: React.Dispatch<React.SetStateAction<TFormData>>;
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

export default function WizardFirstStep({
  setFormData,
  formData: { fields },
  setStep,
  dict,
}: PropTypes) {
  const {
    price: { currency },
    pages: {
      dashboardProducts: {
        newProductModal,
        productForm: { name, price, quantity },
      },
    },
  } = dict;

  const form = useForm<ProductFirstStepFormSchema>({
    resolver: zodResolver(productFirstStepFormSchema),
    defaultValues: {
      title_en: fields.title_en,
      title_fa: fields.title_fa,
      price: fields.price,
      quantity: fields.quantity,
      images: fields.images,
    },
  });

  const onSubmit = (values: ProductFirstStepFormSchema) => {
    setFormData((state) => ({
      dirtyFields: [
        ...state.dirtyFields,
        ...(Object.keys(
          form.formState.dirtyFields,
        ) as TFormData["dirtyFields"]),
      ],
      fields: { ...state.fields, ...values },
    }));
    setStep((step) => step + 1);
  };

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
          <FormField
            control={form.control}
            name="title_en"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>
                  {name.title}
                  {" "}
                  (EN)
                </FormLabel>
                <FormControl>
                  <Input placeholder={name.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title_fa"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>
                  {name.title}
                  {" "}
                  (FA)
                </FormLabel>
                <FormControl>
                  <Input placeholder={name.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>
                  {price.title}
                  (
                  {currency}
                  )
                </FormLabel>
                <FormControl>
                  <Input
                    value={formatNumber(value)}
                    onChange={(e) => {
                      const num = convertToNumber(e.target.value);
                      onChange(Number.isNaN(num) ? "" : num);
                    }}
                    type="text"
                    placeholder={price.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{quantity.title}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={quantity.placeholder}
                    {...field}
                    {...form.register("quantity", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageInput dict={dict} form={form} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{newProductModal.buttons.dismiss}</Button>
          </DialogClose>
          <Button>{newProductModal.buttons.next}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
