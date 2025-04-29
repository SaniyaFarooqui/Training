/*
  Warnings:

  - Added the required column `late_cancellation_rate` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "late_cancellation_rate" STRING NOT NULL;
