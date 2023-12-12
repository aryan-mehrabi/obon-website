"use client";

import React, { useState } from "react";

import en from "@/dictionaries/en.json";
import {
  ErrorResponse,
  FormSteps,
  ProductFormSchema,
  SuccessResponse,
} from "@/types";

import WizardFirstStep from "./WizardFirstStep";
import WizardSecondStep from "./WizardSecondStep";

const initVal = {
  title_en: "",
  title_fa: "",
  price: 0,
  quantity: 1,
  images: [],
  material_en: "",
  material_fa: "",
  description_en: "",
  description_fa: "",
  dimensions: null,
  is_available: true,
  is_visible_to_user: true,
};

export default function Wizard({
  dict,
  defaultValues = initVal,
  onSubmit,
}: {
  defaultValues?: ProductFormSchema;
  dict: typeof en;
  onSubmit: (
    values: FormData,
    id?: number,
  ) => Promise<SuccessResponse | ErrorResponse>;
}) {
  const [formData, setFormData] = useState(defaultValues);
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
      }}
    />
  );
}
