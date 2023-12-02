"use client";

import React, { useState } from "react";
import * as z from "zod";

import en from "@/dictionaries/en.json";
import { newProductFormSchema } from "@/lib/validations";
import { FormSteps } from "@/types";

import WizardFirstStep from "./WizardFirstStep";
import WizardSecondStep from "./WizardSecondStep";

const initVal = {
  title_en: "",
  title_fa: "",
  price: 0,
  quantity: 1,
  images: {
    files: [],
    default: null,
  },
  material_en: "",
  material_fa: "",
  description_en: "",
  description_fa: "",
  dimensions: null,
  is_available: true,
  is_visible_to_user: true,
};

export default function Wizard({ dict }: { dict: typeof en }) {
  const [formData, setFormData] = useState<z.infer<typeof newProductFormSchema>>(initVal);
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
      }}
    />
  );
}
