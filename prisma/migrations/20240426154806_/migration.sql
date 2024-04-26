-- CreateEnum
CREATE TYPE "status" AS ENUM ('upcoming', 'ongoing', 'closed', 'finished', 'cancelled', 'completed', 'completed_invoice', 'archive');

-- CreateEnum
CREATE TYPE "schedule_training_status" AS ENUM ('pending', 'refused', 'approved', 'rejected', 'waiting', 'completed', 'paymentStatus', 'cancellationRequest');

-- CreateEnum
CREATE TYPE "exam_result_status" AS ENUM ('approved', 'rejected', 'completed', 'cancelled', 'requested', 'accepted', 'waiting', 'notAttended', 'succeed', 'failed', 'certificateIssued');

-- CreateEnum
CREATE TYPE "inviter_type" AS ENUM ('company_admin', 'super_admin');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "certificate_status" AS ENUM ('VALID', 'INVALID', 'CANCELED');

-- CreateEnum
CREATE TYPE "currency" AS ENUM ('AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYI', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL');

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
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
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
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_group_trainings" (
    "id" STRING NOT NULL,
    "approvalCertificateId" STRING NOT NULL,
    "product_group_id" STRING NOT NULL,
    "product_group_name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_group_trainings_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "product_model_trainings" (
    "id" STRING NOT NULL,
    "training_id" STRING NOT NULL,
    "product_group_id" STRING NOT NULL,
    "product_model_id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_model_trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" STRING NOT NULL,
    "admin_confirmation" STRING NOT NULL,
    "profile_image" STRING NOT NULL,
    "banner_image" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "vat_number" STRING NOT NULL,
    "invoice_email" STRING NOT NULL,
    "address" STRING NOT NULL,
    "zip_code" STRING NOT NULL,
    "city" STRING NOT NULL,
    "country" STRING NOT NULL,
    "state" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "currency" "currency" NOT NULL,
    "status" STRING NOT NULL,
    "discount_level_a" INT4 NOT NULL,
    "discount_level_b" INT4 NOT NULL,
    "discount_level_c" INT4 NOT NULL,
    "is_deleted" BOOL NOT NULL,
    "registered" BOOL NOT NULL,
    "country_id" INT4 NOT NULL,
    "state_id" INT4 NOT NULL,
    "city_id" INT4 NOT NULL,
    "register_number" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "surname" STRING NOT NULL,
    "personal_title" STRING NOT NULL,
    "work_title" STRING NOT NULL,
    "email" STRING NOT NULL,
    "role_id" STRING NOT NULL,
    "company_id" STRING NOT NULL,
    "status" STRING NOT NULL,
    "mobile_phone" STRING NOT NULL,
    "office_phone" STRING NOT NULL,
    "profile_image" STRING NOT NULL,
    "password" STRING NOT NULL,
    "TwoFactorAuthentication" BOOL NOT NULL,
    "TwoFactorForced" BOOL NOT NULL,
    "TwoFactorAuthenticationSecret" STRING NOT NULL,
    "emailConfirmed" BOOL NOT NULL,
    "address" STRING NOT NULL,
    "adminConfirmed" STRING NOT NULL,
    "registered" BOOL NOT NULL,
    "accessFailedCount" INT4 NOT NULL,
    "access_failed_restrict" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOL NOT NULL,
    "inviter_id" STRING NOT NULL,
    "inviter_type" "inviter_type" NOT NULL,
    "approved_by" STRING NOT NULL,
    "approved_date" TIMESTAMP(3) NOT NULL,
    "declined_by" STRING NOT NULL,
    "declined_date" TIMESTAMP(3) NOT NULL,
    "country_id" INT4 NOT NULL,
    "state_id" INT4 NOT NULL,
    "type" "type" NOT NULL,
    "city_id" INT4 NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "zip_code" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "certificate_tempalates" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "html_code" STRING NOT NULL,
    "filename" STRING NOT NULL,
    "encoding" STRING NOT NULL,
    "mimetype" STRING NOT NULL,
    "size" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificate_tempalates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainings_id_key" ON "trainings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "schedule_trainings_id_key" ON "schedule_trainings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_groups_id_key" ON "product_groups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_group_trainings_id_key" ON "product_group_trainings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_models_id_key" ON "product_models"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_model_trainings_id_key" ON "product_model_trainings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_id_key" ON "certificates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "certificate_tempalates_id_key" ON "certificate_tempalates"("id");
