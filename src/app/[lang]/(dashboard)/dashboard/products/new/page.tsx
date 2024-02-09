import { Locale } from "@prisma/client";
import React from "react";

import { createProduct } from "@/actions/product";
import Modal from "@/components/organs/Modal";
import { getAttributes } from "@/data/product";
import { getDictionary } from "@/lib/locale";

import Wizard from "../_components/Wizard";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params: { lang } }: PropTypes) {
  const [attributes, dict] = await Promise.all([
    getAttributes(),
    getDictionary(lang),
  ]);
  return (
    <Modal title={dict.pages.dashboardProducts.newProductModal.title}>
      <Wizard dict={dict} onSubmit={createProduct} attributes={attributes} />
    </Modal>
  );
}
