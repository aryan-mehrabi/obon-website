"use client";

import React, { useState } from "react";
import * as z from "zod";

import { newProductFirstStepFormSchema } from "@/lib/validations";
import { FormSteps } from "@/types";

import WizardFirstStep from "./WizardFirstStep";

export default function Wizard() {
  const [formData, setFormData] = useState<
    z.infer<typeof newProductFirstStepFormSchema>
  >({
    title_en: "",
    title_fa: "",
    price: 0,
    quantity: 0,
    images: [],
  });
  const [step, setStep] = useState(FormSteps.first);

  return step === FormSteps.first ? (
    <WizardFirstStep {...{ formData, setFormData, setStep }} />
  ) : (
    <p>second step</p>
  );
}
