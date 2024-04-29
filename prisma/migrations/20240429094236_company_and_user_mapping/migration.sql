/*
  Warnings:

  - A unique constraint covering the columns `[company_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_company_id_key" ON "users"("company_id");
