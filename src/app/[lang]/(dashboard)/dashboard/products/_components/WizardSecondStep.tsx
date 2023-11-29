import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createProduct } from "@/actions/product";
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
import { Textarea } from "@/components/ui/textarea";
import en from "@/dictionaries/en.json";
import {
  newProductFormSchema,
  newProductSecondStepFormSchema,
} from "@/lib/validations";
import { FormSteps } from "@/types";

interface PropTypes {
  dict: typeof en;
  formData: z.infer<typeof newProductFormSchema>;
  setFormData: React.Dispatch<
    React.SetStateAction<z.infer<typeof newProductFormSchema>>
  >;
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

export default function WizardSecondStep({
  formData,
  setFormData,
  setStep,
  dict,
}: PropTypes) {
  const {
    pages: {
      dashboardProducts: {
        newProductModal: { buttons },
        productForm: {
          available,
          visible,
          material,
          width,
          length,
          height,
          description,
        },
      },
    },
  } = dict;
  const [, startTransition] = useTransition();
  const form = useForm<z.infer<typeof newProductSecondStepFormSchema>>({
    resolver: zodResolver(newProductSecondStepFormSchema),
    defaultValues: {
      material_en: formData.material_en,
      material_fa: formData.material_fa,
      description_en: formData.description_en,
      description_fa: formData.description_fa,
      width: formData.width,
      height: formData.height,
      length: formData.length,
      is_available: formData.is_available,
      is_visible_to_user: formData.is_visible_to_user,
    },
  });

  const onSubmit = (values: z.infer<typeof newProductSecondStepFormSchema>) => {
    setFormData((state) => ({ ...state, ...values }));
    const data = new FormData();
    formData.images.files.forEach((file) => {
      data.append("files", file, file.name);
    });
    data.append("data", JSON.stringify({ ...formData, ...values }));
    startTransition(async () => {
      await createProduct(data);
    });
  };

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
          <FormField
            control={form.control}
            name="material_en"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>
                  {material.title}
                  {" "}
                  (EN)
                </FormLabel>
                <FormControl>
                  <Input placeholder={material.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="material_fa"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>
                  {material.title}
                  {" "}
                  (FA)
                </FormLabel>
                <FormControl>
                  <Input placeholder={material.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description_fa"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  {description.title}
                  {" "}
                  (EN)
                </FormLabel>
                <FormControl>
                  <Textarea placeholder={description.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description_en"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  {description.title}
                  {" "}
                  (FA)
                </FormLabel>
                <FormControl>
                  <Textarea placeholder={description.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {width.title}
                    {" "}
                    (
                    {width.unit}
                    )
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={width.placeholder}
                      {...field}
                      {...form.register("width", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {height.title}
                    {" "}
                    (
                    {height.unit}
                    )
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={height.placeholder}
                      {...field}
                      {...form.register("height", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {length.title}
                    {" "}
                    (
                    {length.unit}
                    )
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={length.placeholder}
                      {...field}
                      {...form.register("length", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <Button>{buttons.submit}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
