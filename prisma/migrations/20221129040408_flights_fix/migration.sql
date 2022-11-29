/*
  Warnings:

  - You are about to drop the column `airlainDelay` on the `Flights` table. All the data in the column will be lost.
  - Added the required column `airlineDelay` to the `Flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flights" DROP COLUMN "airlainDelay",
ADD COLUMN     "airlineDelay" INTEGER NOT NULL;
