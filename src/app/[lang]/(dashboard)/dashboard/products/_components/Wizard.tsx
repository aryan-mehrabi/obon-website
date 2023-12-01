"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import * as z from "zod";

import Icon from "@/components/atoms/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [open, setOpen] = useState(false);
  const {
    pages: {
      dashboardProducts: { newProductButton, newProductModal },
    },
  } = dict;

  const onOpenChange = (bool: boolean) => {
    setOpen(bool);
    if (!bool) {
      setFormData(initVal);
      setStep(FormSteps.first);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          <Icon render={PlusIcon} className="w-4 h-4" />
          <span>{newProductButton}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{newProductModal.title}</DialogTitle>
        </DialogHeader>
        {step === FormSteps.first ? (
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
              setOpen,
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
