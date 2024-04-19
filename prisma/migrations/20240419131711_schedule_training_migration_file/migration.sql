-- CreateEnum
CREATE TYPE "schedule_training_status" AS ENUM ('pending', 'refused', 'approved', 'rejected', 'waiting', 'completed', 'paymentStatus', 'cancellationRequest');

-- CreateEnum
CREATE TYPE "exam_result_status" AS ENUM ('approved', 'rejected', 'completed', 'cancelled', 'requested', 'accepted', 'waiting', 'notAttended', 'succeed', 'failed', 'certificateIssued');

-- CreateTable
CREATE TABLE "schedule_trainings" (
    "id" STRING NOT NULL,
    "trainingId" STRING NOT NULL,
    "user_id" STRING NOT NULL,
    "company_id" STRING NOT NULL,
    "status" "schedule_training_status" NOT NULL,
    "payment_status" STRING NOT NULL DEFAULT 'unpaid',
    "accepted_by" STRING NOT NULL,
    "accepted_date" STRING NOT NULL,
    "approved_by" STRING NOT NULL,
    "approved_date" STRING NOT NULL,
    "rejected_by" STRING NOT NULL,
    "rejected_date" STRING NOT NULL,
    "training_fees" FLOAT8 NOT NULL,
    "payment_status_updated_by" STRING NOT NULL,
    "payment_status_updated_date" STRING NOT NULL,
    "cancellation_request_by" STRING NOT NULL,
    "cancellation_request_date" STRING NOT NULL,
    "user_training_fee" FLOAT8 NOT NULL,
    "exam_result" FLOAT8 NOT NULL,
    "exam_result_status" "exam_result_status" NOT NULL,
    "invoice_done" BOOL NOT NULL,
    "payment_recieved" BOOL NOT NULL,
    "invoice_number" STRING NOT NULL,
    "approved_reasons" STRING NOT NULL,
    "purchase_number" STRING NOT NULL,
    "joining_waiting_list_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_trainings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_trainings_id_key" ON "schedule_trainings"("id");

-- CreateIndex
CREATE INDEX "schedule_trainings_trainingId_idx" ON "schedule_trainings"("trainingId");
