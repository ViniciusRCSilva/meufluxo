/*
  Warnings:

  - Made the column `recurrence` on table `Bill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "BillRecurrence" ADD VALUE 'NONE';

-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "recurrence" SET NOT NULL;
