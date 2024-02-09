/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attribute_key_key" ON "Attribute"("key");
