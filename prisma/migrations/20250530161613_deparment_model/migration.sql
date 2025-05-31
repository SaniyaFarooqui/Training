/*
  Warnings:

  - A unique constraint covering the columns `[departmentId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "departmentId" STRING;

-- CreateTable
CREATE TABLE "departments" (
    "id" UUID NOT NULL,
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_id_key" ON "departments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_departmentId_key" ON "users"("departmentId");
