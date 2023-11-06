import React from "react";

import LoginForm from "@/components/auth/LoginForm";
import { getDictionary, type Locale } from "@/lib/locale";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function LoginPage({ params: { lang } }: PropTypes) {
  const dict = await getDictionary(lang);
  return (
    <div className="flex justify-center items-center pt-10">
      <LoginForm dict={dict} />
    </div>
  );
}
