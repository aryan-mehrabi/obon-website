import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import en from "@/dictionaries/en.json";
import { productSecondStepFormSchema } from "@/lib/validations";
import {
  ErrorResponse,
  FormSteps,
  ProductFormSchema,
  ProductSecondStepFormSchema,
  SuccessResponse,
} from "@/types";

interface PropTypes {
  dict: typeof en;
  formData: ProductFormSchema;
  onSubmit: (
    values: FormData,
    id?: number,
  ) => Promise<SuccessResponse | ErrorResponse>;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormSchema>>;
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

export default function WizardSecondStep({
  formData,
  setFormData,
  setStep,
  dict,
  onSubmit,
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
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<ProductSecondStepFormSchema>({
    resolver: zodResolver(productSecondStepFormSchema),
    defaultValues: {
      material_en: formData.material_en,
      material_fa: formData.material_fa,
      description_en: formData.description_en,
      description_fa: formData.description_fa,
      dimensions: formData.dimensions,
      is_available: formData.is_available,
      is_visible_to_user: formData.is_visible_to_user,
    },
  });

  const onSubmitForm = (values: ProductSecondStepFormSchema) => {
    const id = +pathname.split("/").filter((path) => path)[3];
    setFormData((state) => ({ ...state, ...values }));
    const data = new FormData();
    formData.images.forEach(({ file }) => {
      if (file) {
        data.append("files", file, file.name);
      }
    });
    data.append("data", JSON.stringify({ ...formData, ...values }));
    startTransition(async () => {
      const res = await onSubmit(data, Number.isNaN(id) ? undefined : id);
      if (res.success) {
        toast({ title: "Product Created Successfully" });
        router.push("/dashboard/products");
        router.refresh();
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
            name="description_en"
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
            name="description_fa"
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
              name="dimensions.width"
              render={() => (
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
                      {...form.register("dimensions.width", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.height"
              render={() => (
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
                      {...form.register("dimensions.height", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.length"
              render={() => (
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
                      {...form.register("dimensions.length", {
                        valueAsNumber: true,
                      })}
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
          <Button type="submit" disabled={isPending}>
            {buttons.submit}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
