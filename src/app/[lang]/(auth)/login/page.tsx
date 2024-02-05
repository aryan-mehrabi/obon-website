import React, { Suspense } from "react";

import { getDictionary, type Locale } from "@/lib/locale";

import LoginForm from "./_components/LoginForm";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function LoginPage({ params: { lang } }: PropTypes) {
  const dict = await getDictionary(lang);
  return (
    <div className="flex justify-center items-center pt-10">
      <Suspense>
        <LoginForm dict={dict} />
      </Suspense>
    </div>
  );
}
