import { notFound } from "next/navigation";
import React from "react";

import { updateProduct } from "@/actions/product";
import Modal from "@/components/organs/Modal";
import { getDictionary, Locale } from "@/lib/locale";
import prisma from "@/prisma/client";
import { ProductFormSchema } from "@/types";

import Wizard from "../../_components/Wizard";

interface PropTypes {
  params: {
    lang: Locale;
    productId: string;
  };
}

export default async function Page({ params: { productId, lang } }: PropTypes) {
  const product = (await prisma.product.findUnique({
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
  })) as ProductFormSchema;
  if (!product) notFound();
  const dict = await getDictionary(lang);

  return (
    <Modal title="Edit Product">
      <Wizard dict={dict} defaultValues={product} onSubmit={updateProduct} />
    </Modal>
  );
}

export const dynamic = "force-dynamic";
