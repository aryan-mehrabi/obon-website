/*
  Warnings:

  - You are about to drop the column `title` on the `Attribute` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "title",
ADD COLUMN     "title_en" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_fa" TEXT NOT NULL DEFAULT '';
