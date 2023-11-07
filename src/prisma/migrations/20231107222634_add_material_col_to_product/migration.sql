/*
  Warnings:

  - Added the required column `material_en` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_fa` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "material_en" TEXT NOT NULL,
ADD COLUMN     "material_fa" TEXT NOT NULL;
