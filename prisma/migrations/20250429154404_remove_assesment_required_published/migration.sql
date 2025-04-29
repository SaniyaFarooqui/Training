/*
  Warnings:

  - You are about to drop the column `assesment_required` on the `trainings` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `trainings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "assesment_required";
ALTER TABLE "trainings" DROP COLUMN "published";
