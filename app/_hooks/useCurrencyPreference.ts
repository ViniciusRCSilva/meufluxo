"use client"

import { CurrencyType } from "@prisma/client";
import { useEffect, useState } from "react";
import { getUserPreferences } from "../_actions/user-preferences";
import { useAuth } from "@clerk/nextjs";

export const useCurrencyPreference = () => {
    const { userId } = useAuth();
    const [currencyType, setCurrencyType] = useState<CurrencyType>(CurrencyType.BRL);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPreferences = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                const preferences = await getUserPreferences(userId);
                setCurrencyType(preferences.selectedCurrencyType);
            } catch (error) {
                console.error("Error loading currency preferences:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPreferences();
    }, [userId]);

    return {
        currencyType,
        isLoading
    };
};
