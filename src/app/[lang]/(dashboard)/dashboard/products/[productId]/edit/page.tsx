import { Locale } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

import { updateProduct } from "@/actions/product";
import Modal from "@/components/organs/Modal";
import { getAttributes, getProduct } from "@/data/product";
import { getDictionary } from "@/lib/locale";
import {
  TAttribute, TImage, TMetadata, TProduct,
} from "@/types";

import Wizard from "../../_components/Wizard";

interface PropTypes {
  params: {
    lang: Locale;
    productId: string;
  };
}

export default async function Page({ params: { productId, lang } }: PropTypes) {
  const [product, attributes] = await Promise.all([
    getProduct({
      where: {
        id: +productId,
      },
      include: {
        images: true,
        metadata: {
          include: {
            attribute: true,
          },
        },
      },
    }) as unknown as TProduct<TImage & TMetadata<TAttribute>>,
    getAttributes(),
  ]);

  if (!product) notFound();
  const dict = await getDictionary(lang);
  const modifiedProduct = {
    ...product,
    metadata: product.metadata.reduce(
      (acc, curr) => ({ ...acc, [curr.attribute.key]: curr }),
      {},
    ),
  };
  return (
    <Modal title={dict.pages.dashboardProductsEdit.title}>
      <Wizard
        attributes={attributes}
        dict={dict}
        defaultValues={modifiedProduct}
        onSubmit={updateProduct}
      />
    </Modal>
  );
}
