import * as z from "zod";

export const credentialsSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(8, "enter a valid password"),
});

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Email is required." }),
    password: z.string().min(8, "enter a valid password"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const newProductFirstStepFormSchema = z.object({
  title_en: z.string().min(1).max(50),
  title_fa: z.string().min(1).max(50),
  price: z.number().positive(),
  quantity: z.number(),
  images: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]),
        file: z.custom<File>().optional(),
        url: z.string().optional(),
        alt: z.string().optional().nullable(),
        is_default: z.boolean(),
      }),
    )
    .refine((images) => images.length !== 0, "Image is Required"),
});

export const newProductSecondStepFormSchema = z.object({
  material_en: z.string().min(1),
  material_fa: z.string().min(1),
  description_fa: z.string(),
  description_en: z.string(),
  dimensions: z
    .object({
      width: z.number().nullish(),
      height: z.number().nullish(),
      length: z.number().nullish(),
    })
    .nullish(),
  is_available: z.boolean(),
  is_visible_to_user: z.boolean(),
});

export const newProductFormSchema = newProductFirstStepFormSchema.merge(
  newProductSecondStepFormSchema,
);
