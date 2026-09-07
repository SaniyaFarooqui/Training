/*
  Warnings:

  - Added the required column `url` to the `certificates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certificates" ADD COLUMN     "url" STRING NOT NULL;
