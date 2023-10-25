"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import en from "@/dictionaries/en.json";
import { credentialsSchema } from "@/lib/validations";

interface PropType {
  dict: typeof en;
}

export default function LoginForm({
  dict: {
    pages: { login },
  },
}: PropType) {
  const router = useRouter();
  const params = useSearchParams();
  const callbackParam = params.get("callback") || "/";
  const form = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof credentialsSchema>) {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (res?.ok) {
      router.push(callbackParam);
    }
  }
  return (
    <Form {...form}>
      {/* eslint-disable @typescript-eslint/no-misused-promises */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-96 px-7 py-5 rounded shadow mt-16"
      >
        <h2 className="text-3xl">{login.title}</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{login.email}</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
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
              <FormLabel>{login.password}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={login.password_placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {login.submit}
        </Button>
        <hr />
        <p className="leading-7">
          {login.no_account}
          <Button variant="link">
            <Link href="/register">{login.register_here}</Link>
          </Button>
        </p>
      </form>
    </Form>
  );
}
