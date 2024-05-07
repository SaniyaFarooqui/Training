/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `schedule_trainings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "schedule_trainings_user_id_key" ON "schedule_trainings"("user_id");
