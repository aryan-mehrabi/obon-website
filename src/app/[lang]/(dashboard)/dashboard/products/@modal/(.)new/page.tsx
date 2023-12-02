import React from "react";

import Modal from "@/components/organs/Modal";
import { getDictionary, Locale } from "@/lib/locale";

import Wizard from "../../_components/Wizard";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params: { lang } }: PropTypes) {
  const dict = await getDictionary(lang);
  return (
    <Modal title={dict.pages.dashboardProducts.newProductModal.title}>
      <Wizard dict={dict} />
    </Modal>
  );
}
