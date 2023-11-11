import React from "react";

import { getDictionary, type Locale } from "@/lib/locale";

import RegisterForm from "./RegisterForm";

interface PropType {
  params: {
    lang: Locale;
  };
}

export default async function RegisterPage({ params: { lang } }: PropType) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex justify-center items-center pt-10">
      <RegisterForm dict={dict} />
    </div>
  );
}
