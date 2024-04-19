-- CreateEnum
CREATE TYPE "status" AS ENUM ('upcoming', 'ongoing', 'closed', 'finished', 'cancelled', 'completed', 'completed_invoice', 'archive');

-- CreateTable
CREATE TABLE "trainings" (
    "id" STRING NOT NULL,
    "subject" STRING NOT NULL,
    "details" STRING NOT NULL,
    "participant_fees" DECIMAL(65,30) NOT NULL,
    "currency" STRING NOT NULL,
    "free_cancellation" TIMESTAMP(3) NOT NULL,
    "late_cancellation_rate" INT8 NOT NULL,
    "language" STRING NOT NULL,
    "type" STRING NOT NULL,
    "limit" INT8 NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "certification_expration_time" TIMESTAMP(3) NOT NULL,
    "training_leader" STRING NOT NULL,
    "exam_pass_rate" INT4 NOT NULL,
    "assesment_required" BOOL NOT NULL,
    "published" BOOL NOT NULL,
    "status" "status" NOT NULL,
    "photo" STRING NOT NULL,
    "country" STRING NOT NULL,
    "state" STRING NOT NULL,
    "city" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainings_id_key" ON "trainings"("id");
