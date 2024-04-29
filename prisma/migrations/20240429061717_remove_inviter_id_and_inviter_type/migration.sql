/*
  Warnings:

  - You are about to drop the column `discount_level_a` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `discount_level_b` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `discount_level_c` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `inviter_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `inviter_type` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[permissionId]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "discount_level_a";
ALTER TABLE "companies" DROP COLUMN "discount_level_b";
ALTER TABLE "companies" DROP COLUMN "discount_level_c";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "inviter_id";
ALTER TABLE "users" DROP COLUMN "inviter_type";

-- CreateIndex
CREATE UNIQUE INDEX "roles_permissionId_key" ON "roles"("permissionId");
