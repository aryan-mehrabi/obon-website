/*
  Warnings:

  - You are about to drop the column `description_en` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description_fa` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `material_en` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `material_fa` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description_en",
DROP COLUMN "description_fa",
DROP COLUMN "dimensions",
DROP COLUMN "material_en",
DROP COLUMN "material_fa";

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_productId_attributeId_key" ON "Metadata"("productId", "attributeId");

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
