-- CreateEnum
CREATE TYPE "status" AS ENUM ('upcoming', 'ongoing', 'closed', 'finished', 'cancelled', 'completed', 'completed_invoice', 'archive');

-- CreateEnum
CREATE TYPE "schedule_training_status" AS ENUM ('pending', 'refused', 'approved', 'rejected', 'waiting', 'completed', 'paymentStatus', 'cancellationRequest');

-- CreateEnum
CREATE TYPE "exam_result_status" AS ENUM ('approved', 'rejected', 'completed', 'cancelled', 'requested', 'accepted', 'waiting', 'notAttended', 'succeed', 'failed', 'certificateIssued');

-- CreateEnum
CREATE TYPE "certificate_status" AS ENUM ('VALID', 'INVALID', 'CANCELED');

-- CreateTable
CREATE TABLE "trainings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subject" STRING NOT NULL,
    "details" STRING NOT NULL,
    "participant_fees" DECIMAL(65,30) NOT NULL,
    "currency" STRING NOT NULL,
    "free_cancellation" TIMESTAMP(3) NOT NULL,
    "late_cancellation_rate" INT4 NOT NULL,
    "language" STRING NOT NULL,
    "type" STRING NOT NULL,
    "limit" INT4 NOT NULL,
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

-- CreateTable
CREATE TABLE "product_groups" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_models" (
    "id" STRING NOT NULL,
    "product_group_id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" STRING NOT NULL,
    "training_id" STRING NOT NULL,
    "certificate_name" STRING NOT NULL,
    "certificate_no" STRING NOT NULL,
    "user_name" STRING NOT NULL,
    "company_name" STRING NOT NULL,
    "issued_by" STRING NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "issued_date" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3) NOT NULL,
    "user_id" STRING NOT NULL,
    "company_id" STRING NOT NULL,
    "status" "certificate_status" NOT NULL,
    "is_archived" BOOL NOT NULL,
    "template_id" STRING NOT NULL,
    "needRecreate" BOOL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainings_id_key" ON "trainings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_trainings_id_key" ON "schedule_trainings"("id");

-- CreateIndex
CREATE INDEX "schedule_trainings_trainingId_idx" ON "schedule_trainings"("trainingId");

-- CreateIndex
CREATE UNIQUE INDEX "product_groups_id_key" ON "product_groups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_models_id_key" ON "product_models"("id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_id_key" ON "certificates"("id");
