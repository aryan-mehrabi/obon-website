import { Locale } from "@prisma/client";
import React from "react";

import { createProduct } from "@/actions/product";
import Modal from "@/components/organs/Modal";
import { getAttributes, getCategories } from "@/data/product";
import { getDictionary } from "@/lib/locale";

import Wizard from "../_components/Wizard";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params: { lang } }: PropTypes) {
  const [categories, attributes, dict] = await Promise.all([
    getCategories(),
    getAttributes(),
    getDictionary(lang),
  ]);
  return (
    <Modal title={dict.pages.dashboardProducts.newProductModal.title}>
      <Wizard
        dict={dict}
        onSubmit={createProduct}
        attributes={attributes}
        categories={categories}
      />
    </Modal>
  );
}
