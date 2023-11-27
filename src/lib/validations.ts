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
  title_en: z.string().min(2).max(50),
  title_fa: z.string().min(2).max(50),
  price: z.number(),
  quantity: z.number(),
  images: z
    .array(z.custom<File>())
    .refine((files) => files.length !== 0, "req"),
});

export const newProductSecondStepFormSchema = z.object({
  material_en: z.string().min(1),
  material_fa: z.string().min(1),
  description_fa: z.string(),
  description_en: z.string(),
  width: z.number(),
  height: z.number(),
  length: z.number(),
  is_available: z.boolean(),
  is_visible_to_user: z.boolean(),
});
