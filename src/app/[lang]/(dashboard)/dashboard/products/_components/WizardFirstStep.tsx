import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm } from "react-hook-form";

import Icon from "@/components/atoms/Icon";
import { Badge } from "@/components/ui/badge";
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
import {
  type FormSteps,
  ProductFirstStepFormSchema,
  ProductFormSchema,
} from "@/types";

interface PropTypes {
  dict: typeof en;
  formData: ProductFormSchema;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormSchema>>;
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
  const form = useForm<ProductFirstStepFormSchema>({
    resolver: zodResolver(productFirstStepFormSchema),
    defaultValues: {
      title_en: formData.title_en,
      title_fa: formData.title_fa,
      price: formData.price,
      quantity: formData.quantity,
      images: formData.images,
    },
  });

  const images = form.watch("images");

  const onClickDelete = (id: string | number) => {
    const isDeletedDefault = images.find((image) => image.id === id)
      ?.is_default;
    const newImages = images.filter((image) => image.id !== id);
    if (isDeletedDefault && newImages[0]) newImages[0].is_default = true;
    form.setValue("images", newImages);
  };

  const onClickSetDefault = (id: string | number) => {
    const newImages = images.map((image) => (image.id === id
      ? { ...image, is_default: true }
      : { ...image, is_default: false }));
    form.setValue("images", newImages);
  };

  function onSubmit(values: ProductFirstStepFormSchema) {
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
          <FormField
            control={form.control}
            name="images"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem className="col-span-2">
                <FormLabel>{imagesDict.title}</FormLabel>
                <FormControl>
                  <Input
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files!);
                      const imagesFile = files.map((file) => ({
                        id: file.name,
                        file,
                        is_default: false,
                      }));
                      if (!value.some((image) => image.is_default)) {
                        imagesFile[0].is_default = true;
                      }
                      onChange([...value, ...imagesFile]);
                    }}
                    type="file"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 grid grid-cols-3 gap-2">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <div className="absolute top-0 right-0 rtl:left-0 m-1 flex items-center gap-1">
                  {image.is_default && <Badge className="">Default</Badge>}
                  <Button
                    type="button"
                    variant="destructive"
                    className="p-1 w-6 h-6"
                    onClick={() => onClickDelete(image.id)}
                  >
                    <Icon render={TrashIcon} className="w-4 h-4" />
                  </Button>
                </div>
                <button
                  type="button"
                  className="w-full h-24 rounded overflow-hidden"
                  onClick={() => onClickSetDefault(image.id)}
                >
                  <img
                    alt=""
                    src={
                      image.url ? image.url : URL.createObjectURL(image.file!)
                    }
                    className="w-full h-full object-cover"
                  />
                </button>
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
