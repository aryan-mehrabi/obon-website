import NextImage, { ImageProps, StaticImageData } from "next/image";
import React from "react";

import PlaceholderImage from "@/assets/placeholder-image.jpg";

interface PropTypes extends Omit<ImageProps, "src"> {
  src: string | StaticImageData | null | undefined;
}

export default function Image({ src, ...props }: PropTypes) {
  return <NextImage src={src || PlaceholderImage} {...{ ...props }} />;
}
