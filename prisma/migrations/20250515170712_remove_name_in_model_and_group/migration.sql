/*
  Warnings:

  - You are about to drop the column `product_group_name` on the `product_model_trainings` table. All the data in the column will be lost.
  - You are about to drop the column `product_models_name` on the `product_model_trainings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_model_trainings" DROP COLUMN "product_group_name";
ALTER TABLE "product_model_trainings" DROP COLUMN "product_models_name";
