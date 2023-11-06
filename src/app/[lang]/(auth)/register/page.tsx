import React from "react";

import RegisterForm from "@/components/auth/RegisterForm";
import { getDictionary, type Locale } from "@/lib/locale";

interface PropType {
  params: {
    lang: Locale;
  };
}

export default async function RegisterPage({ params: { lang } }: PropType) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex justify-center items-center">
      <RegisterForm dict={dict} />
    </div>
  );
}
