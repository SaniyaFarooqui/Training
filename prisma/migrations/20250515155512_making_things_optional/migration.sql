-- AlterTable
ALTER TABLE "product_model_trainings" ALTER COLUMN "training_id" DROP NOT NULL;
ALTER TABLE "product_model_trainings" ALTER COLUMN "product_group_id" DROP NOT NULL;
ALTER TABLE "product_model_trainings" ALTER COLUMN "product_model_id" DROP NOT NULL;
ALTER TABLE "product_model_trainings" ALTER COLUMN "createdAt" DROP NOT NULL;
ALTER TABLE "product_model_trainings" ALTER COLUMN "updatedAt" DROP NOT NULL;
