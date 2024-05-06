/*
  Warnings:

  - You are about to drop the `certificate_tempalates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "certificate_tempalates";

-- CreateTable
CREATE TABLE "certificate_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "html_code" STRING NOT NULL,
    "filename" STRING NOT NULL,
    "encoding" STRING NOT NULL,
    "mimetype" STRING NOT NULL,
    "size" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificate_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "certificate_templates_id_key" ON "certificate_templates"("id");
