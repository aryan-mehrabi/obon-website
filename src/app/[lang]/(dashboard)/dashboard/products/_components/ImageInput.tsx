import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";

import Icon from "@/components/atoms/Icon";
import DropZone from "@/components/molecules/DropZone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import en from "@/dictionaries/en.json";
import { ProductFirstStepFormSchema } from "@/types";

interface PropTypes {
  dict: typeof en;
  form: UseFormReturn<ProductFirstStepFormSchema>;
}

export default function ImageInput({ dict, form }: PropTypes) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    pages: {
      dashboardProducts: {
        productForm: { images: imagesDict },
      },
    },
  } = dict;

  const images = form.watch("images");

  const onClickDelete = (id: string | number) => {
    const isDeletedDefault = images.find((image) => image.id === id)
      ?.is_default;
    const newImages = images.filter((image) => image.id !== id);
    if (isDeletedDefault && newImages[0]) newImages[0].is_default = true;
    form.setValue("images", newImages);
  };

  const onClickSetDefault = (id: string | number) => {
    const newImages = images.map((image) => (image.id === id
      ? { ...image, is_default: true }
      : { ...image, is_default: false }));
    form.setValue("images", newImages);
  };

  const onChangeFiles = (
    eFiles: FileList,
    {
      onChange,
      value,
    }: { onChange: (e: typeof images) => void; value: typeof images },
  ) => {
    const files = Array.from(eFiles);
    const imagesFile = files.map((file) => ({
      id: file.name,
      file,
      is_default: false,
    }));
    if (!value.some((image) => image.is_default)) {
      imagesFile[0].is_default = true;
    }
    onChange([...value, ...imagesFile]);
  };
  return (
    <FormField
      control={form.control}
      name="images"
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({
        field: {
          value, onChange, ref, ...field
        },
      }) => (
        <FormItem className="col-span-2 ">
          <FormLabel>{imagesDict.title}</FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {images.map((image) => (
                <div key={image.id} className="relative">
                  <div className="absolute top-0 right-0 rtl:left-0 m-1 flex items-center gap-1">
                    {image.is_default && <Badge>Default</Badge>}
                    <Button
                      type="button"
                      variant="destructive"
                      className="p-1 w-6 h-6"
                      onClick={() => onClickDelete(image.id)}
                    >
                      <Icon render={TrashIcon} className="w-4 h-4" />
                    </Button>
                  </div>
                  <button
                    type="button"
                    className="w-full h-32 rounded overflow-hidden"
                    onClick={() => onClickSetDefault(image.id)}
                  >
                    <img
                      alt=""
                      src={
                        image.url ? image.url : URL.createObjectURL(image.file!)
                      }
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              ))}

              <DropZone
                onChange={(files) => {
                  onChangeFiles(files, { value, onChange });
                }}
              >
                <div className="mx-auto flex flex-col items-center justify-center text-center gap-2">
                  <input
                    ref={(input) => {
                      inputRef.current = input;
                      ref(input);
                    }}
                    placeholder="fileInput"
                    className="hidden"
                    type="file"
                    multiple
                    onChange={(e) => onChangeFiles(e.target.files!, { value, onChange })}
                    accept="image/*"
                    {...field}
                  />
                  <Icon render={ImageIcon} className="w-5 h-5" />
                  <p className="text-sm text-muted-foreground">
                    {imagesDict.placeholder}
                  </p>
                  <Button
                    onClick={() => inputRef.current?.click()}
                    variant="link"
                    type="button"
                  >
                    {imagesDict.cta}
                  </Button>
                </div>
              </DropZone>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
