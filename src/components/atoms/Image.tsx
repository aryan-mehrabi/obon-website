import NextImage, { ImageProps } from "next/image";
import React from "react";

import PlaceholderImage from "@/assets/placeholder-image.jpg";

export default function Image({ src, ...props }: ImageProps) {
  return <NextImage src={src || PlaceholderImage} {...{ ...props }} />;
}
