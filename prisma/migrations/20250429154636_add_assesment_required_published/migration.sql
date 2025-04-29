/*
  Warnings:

  - Added the required column `assesment_required` to the `trainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "assesment_required" STRING NOT NULL;
ALTER TABLE "trainings" ADD COLUMN     "published" STRING NOT NULL;
