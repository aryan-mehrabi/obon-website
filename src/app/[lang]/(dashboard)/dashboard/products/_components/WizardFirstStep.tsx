import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  newProductFirstStepFormSchema,
  newProductFormSchema,
} from "@/lib/validations";
import { type FormSteps } from "@/types";

interface PropTypes {
  dict: typeof en;
  formData: z.infer<typeof newProductFormSchema>;
  setFormData: React.Dispatch<
    React.SetStateAction<z.infer<typeof newProductFormSchema>>
  >;
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

export default function WizardFirstStep({
  setFormData,
  formData,
  setStep,
  dict,
}: PropTypes) {
  const {
    price: { currency },
    pages: {
      dashboardProducts: {
        newProductModal,
        productForm: {
          name, price, quantity, images: imagesDict,
        },
      },
    },
  } = dict;
  const form = useForm<z.infer<typeof newProductFirstStepFormSchema>>({
    resolver: zodResolver(newProductFirstStepFormSchema),
    defaultValues: {
      title_en: formData.title_en,
      title_fa: formData.title_fa,
      price: formData.price,
      quantity: formData.quantity,
      images: formData.images,
    },
  });

  const images = form.watch("images");

  const onClickDelete = (index: number) => {
    form.setValue(
      "images",
      images.filter((_, i) => index !== i),
    );
  };

  function onSubmit(values: z.infer<typeof newProductFirstStepFormSchema>) {
    setFormData((state) => ({ ...state, ...values }));
    setStep((step) => step + 1);
  }
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {price.title}
                  (
                  {currency}
                  )
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={price.placeholder}
                    {...field}
                    {...form.register("price", { valueAsNumber: true })}
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
          <FormField
            control={form.control}
            name="images"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value: _, onChange, ...field } }) => (
              <FormItem className="col-span-2">
                <FormLabel>{imagesDict.title}</FormLabel>
                <FormControl>
                  <Input
                    multiple
                    onChange={(e) => {
                      onChange(Array.from(e.target.files!));
                    }}
                    type="file"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 flex gap-2">
            {images?.map((image, i) => (
              <div key={image.name} className="w-28 relative">
                <button
                  type="button"
                  className="absolute inset-0"
                  onClick={() => onClickDelete(i)}
                >
                  delete
                </button>
                <img
                  alt=""
                  src={URL.createObjectURL(image)}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
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
