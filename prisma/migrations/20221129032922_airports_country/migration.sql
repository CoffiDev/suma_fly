/*
  Warnings:

  - Added the required column `country` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airport" ADD COLUMN     "country" TEXT NOT NULL;
