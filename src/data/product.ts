import { Prisma } from "@prisma/client";
import { unstable_cache as unstableCache } from "next/cache";

import prisma from "@/prisma/client";

export const getProducts = unstableCache(
  async (opt: Prisma.ProductFindManyArgs) => prisma.product.findMany(opt),
  ["products"],
  {
    tags: ["products"],
  },
);

export const getProduct = unstableCache(
  async (opt: Prisma.ProductFindUniqueArgs) => prisma.product.findUnique(opt),
  ["products"],
  {
    tags: ["products"],
  },
);
