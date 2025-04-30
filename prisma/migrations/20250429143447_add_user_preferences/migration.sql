-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USD', 'EUR', 'BRL');

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "selectedCurrencyType" "CurrencyType" NOT NULL,
    "transactionsThreshold" INTEGER,
    "transactionThresholdValue" DOUBLE PRECISION,
    "isNotificationsActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);
