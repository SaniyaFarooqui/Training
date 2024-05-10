-- AlterTable
ALTER TABLE "certificate_templates" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "certificates" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "product_group_trainings" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "product_groups" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "product_model_trainings" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "product_models" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "schedule_trainings" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "trainings" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;
