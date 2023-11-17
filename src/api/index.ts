import { ProductWithImage } from "@/types";

type Result = { data: ProductWithImage[] };

export const fetchProducts = async (id: string): Promise<Result> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  url.searchParams.set("id", id);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json() as Promise<Result>;
};
