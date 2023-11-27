import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  newProductFirstStepFormSchema,
  newProductSecondStepFormSchema,
} from "@/lib/validations";
import { FormSteps } from "@/types";

interface PropTypes {
  formData: z.infer<typeof newProductSecondStepFormSchema> &
    z.infer<typeof newProductFirstStepFormSchema>;
  setFormData: React.Dispatch<
    React.SetStateAction<
      z.infer<typeof newProductSecondStepFormSchema> &
        z.infer<typeof newProductFirstStepFormSchema>
    >
  >;
  setStep: React.Dispatch<React.SetStateAction<FormSteps>>;
}

export default function WizardSecondStep({
  formData,
  // setFormData,
  setStep,
}: PropTypes) {
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
    console.log(values);
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
                <FormLabel>Material (EN)</FormLabel>
                <FormControl>
                  <Input placeholder="Product Material" {...field} />
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
                <FormLabel>Material (FA)</FormLabel>
                <FormControl>
                  <Input placeholder="Product Material" {...field} />
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
                <FormLabel>Description (EN)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
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
                <FormLabel>Description (FA)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
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
                  <FormLabel>Width (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Width"
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
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Height"
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
                  <FormLabel>Length (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Length"
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
                <FormLabel>Available</FormLabel>
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
                <FormLabel>Visibile</FormLabel>
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
            Previous Step
          </Button>
          <Button>Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
