/*
  Warnings:

  - Added the required column `training_id` to the `product_group_trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_group_trainings" ADD COLUMN     "training_id" STRING NOT NULL;
