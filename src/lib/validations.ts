import { Attribute, Locale } from "@prisma/client";
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

export const productFirstStepFormSchema = z.object({
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

export const productSecondStepFormSchema = z.object({
  is_available: z.boolean(),
  is_visible_to_user: z.boolean(),
  metadata: z
    .record(
      z.object({
        id: z.number().optional(),
        value: z.string(),
        attributeId: z.number(),
      }),
    )
    .or(z.record(z.never())),
  categories: z.array(
    z.object({
      id: z.number(),
      title_en: z.string(),
      title_fa: z.string(),
    }),
  ),
});

export const productFormSchema = productFirstStepFormSchema.merge(
  productSecondStepFormSchema,
);

const metadata = z.object({
  id: z.number().optional(),
  attributeId: z.number(),
  value: z.string(),
});

export const productMetadataFormSchema = (attr: Attribute[]) => z.object({
  metadata: z.object(
    attr.reduce(
      (acc, { key, required }) => ({
        ...acc,
        [key]: required ? metadata : metadata.optional(),
      }),
      {},
    ),
  ),
});

export const attributeFormSchema = z.object({
  title_fa: z.string().min(1),
  title_en: z.string().min(1),
  key: z
    .string()
    .min(1)
    .regex(/^[a-z]+(_|[a-z]+)*$/, { message: "only small english characters" }),
  required: z.boolean(),
  locale: z.nativeEnum(Locale),
});

export const categoryFormSchema = z.object({
  title_fa: z.string().min(1),
  title_en: z.string().min(1),
});
