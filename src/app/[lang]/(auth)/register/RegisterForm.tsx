"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { registerUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import en from "@/dictionaries/en.json";
import { registerFormSchema } from "@/lib/validations";

interface PropType {
  dict: typeof en;
}

export default function RegisterForm({
  dict: {
    pages: { register },
    form: dictForm,
  },
}: PropType) {
  const { toast } = useToast();
  const [, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    startTransition(async () => {
      const res = await registerUser(values);
      if (res.success) {
        toast({ title: register.successfullRegister });
        redirect("/login");
      } else {
        toast({ title: res.message, variant: "destructive" });
      }
    });
  }
  return (
    <Form {...form}>
      {/* eslint-disable @typescript-eslint/no-misused-promises */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-96 px-7 py-5 rounded shadow mt-16"
      >
        <h2 className="text-3xl">{register.title}</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictForm.fields.email}</FormLabel>
              <FormControl>
                <Input placeholder={dictForm.placeholders.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictForm.fields.password}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={dictForm.placeholders.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictForm.fields.confirm_password}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={dictForm.placeholders.confirm_password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {register.submit}
        </Button>
        <hr />
        <p className="leading-7">
          {register.have_account}
          <Button variant="link">
            <Link href="/login">{register.login_here}</Link>
          </Button>
        </p>
      </form>
    </Form>
  );
}
