import { Locale } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

import { updateCategory } from "@/actions/category";
import Modal from "@/components/organs/Modal";
import { getCategory } from "@/data/product";
import { getDictionary } from "@/lib/locale";

import CategoryForm from "../../_components/CategoryForm";

export default async function Page({
  params: { lang, categoryId },
}: {
  params: { categoryId: string; lang: Locale };
}) {
  const category = await getCategory({ where: { id: +categoryId } });
  const dict = await getDictionary(lang);
  if (!category) notFound();
  return (
    <Modal title={dict.pages.dashboardCategoriesEdit.title}>
      <CategoryForm dict={dict} formData={category} onSubmit={updateCategory} />
    </Modal>
  );
}
