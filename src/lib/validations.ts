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
