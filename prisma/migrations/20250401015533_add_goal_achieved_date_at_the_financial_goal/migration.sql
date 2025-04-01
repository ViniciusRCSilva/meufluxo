/*
  Warnings:

  - Added the required column `goalAchievedDate` to the `FinancialGoal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinancialGoal" ADD COLUMN     "goalAchievedDate" TIMESTAMP(3) NOT NULL;
