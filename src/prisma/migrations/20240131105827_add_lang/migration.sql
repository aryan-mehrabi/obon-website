-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('fa', 'en');

-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "locale" "Locale" NOT NULL DEFAULT 'fa';
