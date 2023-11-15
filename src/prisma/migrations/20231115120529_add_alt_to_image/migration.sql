/*
  Warnings:

  - Made the column `width` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "alt" TEXT,
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL;
