import { Locale } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

import { updateAttribute } from "@/actions/attribute";
import Modal from "@/components/organs/Modal";
import { getAttribute } from "@/data/product";
import { getDictionary } from "@/lib/locale";

import AttributeForm from "../../_components/AttributeForm";

export default async function Page({
  params: { attributeId, lang },
}: {
  params: { attributeId: string; lang: Locale };
}) {
  const dict = await getDictionary(lang);
  const attribute = await getAttribute({ where: { id: +attributeId } });

  if (!attribute) notFound();

  return (
    <div>
      <Modal title={dict.pages.dashboardAttributesEdit.title}>
        <AttributeForm
          dict={dict}
          formData={attribute}
          onSubmit={updateAttribute}
        />
      </Modal>
    </div>
  );
}
