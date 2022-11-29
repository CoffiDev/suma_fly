/*
  Warnings:

  - The primary key for the `Airlines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Airlines` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[uuid]` on the table `Airlines` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Airlines` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Airlines" DROP CONSTRAINT "Airlines_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Airlines_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Airlines_uuid_key" ON "Airlines"("uuid");
