"use client";

import { Attribute, Category } from "@prisma/client";
import React, { useState } from "react";

import en from "@/dictionaries/en.json";
import {
  ErrorResponse,
  FormSteps,
  ProductFormSchema,
  SuccessResponse,
  TFormData,
} from "@/types";

import WizardFirstStep from "./WizardFirstStep";
import WizardSecondStep from "./WizardSecondStep";

const initVal = {
  title_en: "",
  title_fa: "",
  price: 0,
  quantity: 1,
  images: [],
  is_available: true,
  is_visible_to_user: true,
  metadata: {},
  categories: [],
};

interface PropTypes {
  attributes: Attribute[];
  categories: Category[];
  defaultValues?: ProductFormSchema;
  dict: typeof en;
  onSubmit: (
    values: FormData,
    id?: number,
  ) => Promise<SuccessResponse | ErrorResponse>;
}

export default function Wizard({
  attributes,
  categories,
  dict,
  defaultValues = initVal,
  onSubmit,
}: PropTypes) {
  const [formData, setFormData] = useState<TFormData>({
    dirtyFields: [],
    fields: defaultValues,
  });
  const [step, setStep] = useState(FormSteps.first);

  return step === FormSteps.first ? (
    <WizardFirstStep
      {...{
        formData,
        setFormData,
        setStep,
        dict,
      }}
    />
  ) : (
    <WizardSecondStep
      {...{
        formData,
        setFormData,
        setStep,
        dict,
        onSubmit,
        attributes,
        categories,
      }}
    />
  );
}
