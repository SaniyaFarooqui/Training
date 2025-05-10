-- AlterTable
ALTER TABLE "product_group_trainings" ALTER COLUMN "product_group_id" DROP NOT NULL;
ALTER TABLE "product_group_trainings" ALTER COLUMN "product_group_name" DROP NOT NULL;
ALTER TABLE "product_group_trainings" ALTER COLUMN "createdAt" DROP NOT NULL;
ALTER TABLE "product_group_trainings" ALTER COLUMN "updatedAt" DROP NOT NULL;
ALTER TABLE "product_group_trainings" ALTER COLUMN "training_id" DROP NOT NULL;
