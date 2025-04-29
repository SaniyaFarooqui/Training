/*
  Warnings:

  - Added the required column `exam_pass_rate` to the `trainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limit` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "exam_pass_rate" STRING NOT NULL;
ALTER TABLE "trainings" ADD COLUMN     "limit" STRING NOT NULL;
