import { Locale } from "@prisma/client";
import React from "react";

import { createCategory } from "@/actions/category";
import Modal from "@/components/organs/Modal";
import { getDictionary } from "@/lib/locale";

import CategoryForm from "../_components/CategoryForm";

const initValues = {
  title_fa: "",
  title_en: "",
};

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return (
    <Modal title={dict.pages.dashboardCategories.newCategoryButton}>
      <CategoryForm
        dict={dict}
        formData={initValues}
        onSubmit={createCategory}
      />
    </Modal>
  );
}
