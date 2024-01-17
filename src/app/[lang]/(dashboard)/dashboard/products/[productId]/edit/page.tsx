import { notFound } from "next/navigation";
import React from "react";

import { updateProduct } from "@/actions/product";
import Modal from "@/components/organs/Modal";
import { getProduct } from "@/data/product";
import { getDictionary, Locale } from "@/lib/locale";
import { ProductFormSchema } from "@/types";

import Wizard from "../../_components/Wizard";

interface PropTypes {
  params: {
    lang: Locale;
    productId: string;
  };
}

export default async function Page({ params: { productId, lang } }: PropTypes) {
  const product = (await getProduct({
    select: {
      title_en: true,
      title_fa: true,
      dimensions: true,
      description_en: true,
      description_fa: true,
      material_en: true,
      material_fa: true,
      is_available: true,
      is_visible_to_user: true,
      price: true,
      quantity: true,
      images: true,
    },
    where: {
      id: +productId,
    },
  })) as unknown as ProductFormSchema;
  if (!product) notFound();
  const dict = await getDictionary(lang);

  return (
    <Modal title={dict.pages.dashboardProductsEdit.title}>
      <Wizard dict={dict} defaultValues={product} onSubmit={updateProduct} />
    </Modal>
  );
}
