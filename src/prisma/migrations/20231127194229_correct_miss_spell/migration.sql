/*
  Warnings:

  - You are about to drop the column `is_availbale` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "is_availbale",
ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true;
