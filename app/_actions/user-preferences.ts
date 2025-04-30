"use server"

import { db } from "../_lib/prisma"
import { CurrencyType } from "@prisma/client";

interface UserPreferences {
    id: string;
    userId: string;
    selectedCurrencyType: CurrencyType;
    transactionsThreshold: number | null;
    transactionThresholdValue: number | null;
    isNotificationsActive: boolean;
}

type CreateUserPreferencesData = Omit<UserPreferences, 'id' | 'userId'>;

const getUserPreferences = async (userId: string) => {
    const userPreferences = await db.userPreferences.findUnique({
        where: { userId },
    });

    if (!userPreferences) {
        return await createUserPreferences(userId, {
            selectedCurrencyType: CurrencyType.BRL,
            transactionsThreshold: null,
            transactionThresholdValue: null,
            isNotificationsActive: true
        });
    }

    return userPreferences;
};

const createUserPreferences = async (userId: string, data: CreateUserPreferencesData) => {
    const userPreferences = await db.userPreferences.create({
        data: {
            userId,
            ...data
        }
    });

    return userPreferences;
};

const updateUserPreferences = async (userId: string, data: CreateUserPreferencesData) => {
    try {
        const userPreferences = await getUserPreferences(userId);
        if (!userPreferences) {
            return await createUserPreferences(userId, data);
        }

        const updatedUserPreferences = await db.userPreferences.update({
            where: { userId },
            data,
        });

        return updatedUserPreferences;
    } catch (error) {
        console.error(error);
    }
}

export { getUserPreferences, updateUserPreferences };