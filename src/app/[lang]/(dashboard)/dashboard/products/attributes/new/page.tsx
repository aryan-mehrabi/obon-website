import { Locale } from "@prisma/client";
import React from "react";

import { createAttribute } from "@/actions/attribute";
import Modal from "@/components/organs/Modal";
import { getDictionary } from "@/lib/locale";
import { AttributeFormSchema } from "@/types";

import AttributeForm from "../_components/AttributeForm";

const initValue: AttributeFormSchema = {
  required: false,
  title_en: "",
  title_fa: "",
  key: "",
  locale: Locale.fa,
};

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return (
    <div>
      <Modal title={dict.pages.dashboardAttributes.newAttributeButton}>
        <AttributeForm
          dict={dict}
          formData={initValue}
          onSubmit={createAttribute}
        />
      </Modal>
    </div>
  );
}
