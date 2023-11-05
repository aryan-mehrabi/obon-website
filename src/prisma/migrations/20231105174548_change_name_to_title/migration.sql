/*
  Warnings:

  - You are about to drop the column `english_name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `persian_name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `english_name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `persian_name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `title_en` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_fa` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_fa` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "english_name",
DROP COLUMN "persian_name",
ADD COLUMN     "title_en" TEXT NOT NULL,
ADD COLUMN     "title_fa" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "english_name",
DROP COLUMN "persian_name",
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_fa" TEXT,
ADD COLUMN     "title_en" TEXT NOT NULL,
ADD COLUMN     "title_fa" TEXT NOT NULL;
