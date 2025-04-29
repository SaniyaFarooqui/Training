/*
  Warnings:

  - You are about to drop the column `exam_pass_rate` on the `trainings` table. All the data in the column will be lost.
  - You are about to drop the column `limit` on the `trainings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "exam_pass_rate";
ALTER TABLE "trainings" DROP COLUMN "limit";
