/*
  Warnings:

  - You are about to drop the column `elapsedTim` on the `Flights` table. All the data in the column will be lost.
  - Added the required column `elapsedTime` to the `Flights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flights" DROP COLUMN "elapsedTim",
ADD COLUMN     "elapsedTime" INTEGER NOT NULL;
