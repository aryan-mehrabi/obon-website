import { Prisma } from "@prisma/client";
import { unstable_cache as unstableCache } from "next/cache";

import prisma from "@/prisma/client";

export const getProducts = unstableCache(
  async (opt: Prisma.ProductFindManyArgs) => prisma.product.findMany(opt),
  ["products"],
  {
    tags: ["products", "products_categories", "products_attributes"],
  },
);

export const getProduct = unstableCache(
  async (opt: Prisma.ProductFindUniqueArgs) => prisma.product.findUnique(opt),
  ["products"],
  {
    tags: ["products", "products_categories", "products_attributes"],
  },
);

export const getAttributes = unstableCache(
  async (opt: Prisma.AttributeFindManyArgs = {}) => prisma.attribute.findMany(opt),
  ["attributes"],
  {
    tags: ["attributes", "products_attributes"],
  },
);

export const getAttribute = unstableCache(
  async (opt: Prisma.AttributeFindUniqueArgs) => prisma.attribute.findUnique(opt),
  ["attribute"],
  {
    tags: ["attributes", "products_attributes"],
  },
);

export const getCategories = unstableCache(
  async (opt: Prisma.CategoryFindManyArgs = {}) => prisma.category.findMany(opt),
  ["categories"],
  {
    tags: ["categories", "products_categories"],
  },
);

export const getCategory = unstableCache(
  async (opt: Prisma.CategoryFindUniqueArgs) => prisma.category.findUnique(opt),
  ["category"],
  {
    tags: ["categories", "products_categories"],
  },
);
