"use client"

import { useAuth } from "@clerk/nextjs"
import { CurrencyType } from "@prisma/client"
import { DollarSign, Euro, Coins } from "lucide-react"
import { useEffect, useState } from "react"
import { getUserPreferences, updateUserCurrencyPreferences } from "../../_actions/user-preferences"
import { DialogCardTemplate } from "./dialog-card-template"
import { Button } from "@/app/_components/ui/button"

export const FinancialPreference = () => {
    const { userId } = useAuth();
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>(CurrencyType.BRL);

    useEffect(() => {
        const loadPreferences = async () => {
            if (!userId) return;
            const preferences = await getUserPreferences(userId);
            setSelectedCurrency(preferences.selectedCurrencyType);
        };

        loadPreferences();
    }, [userId]);

    const handleCurrencyChange = async (value: string) => {
        if (!userId) return;

        const currencyType = value as CurrencyType;
        setSelectedCurrency(currencyType);

        await updateUserCurrencyPreferences(userId, currencyType);
    };

    return (
        <DialogCardTemplate
            title="Preferência financeira"
            icon={
                <div className="p-2 rounded-md bg-primary/10">
                    <Coins className="h-6 w-6 text-link" />
                </div>
            }
            description="Selecionar moeda padrão, regras de limite e alertas"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Moeda padrão</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-4">
                        <Button
                            variant={selectedCurrency === CurrencyType.BRL ? "default" : "outline"}
                            onClick={() => handleCurrencyChange(CurrencyType.BRL)}
                            className="w-full h-20 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <p className="h-6 w-6">R$</p>
                            <div className="flex flex-col items-center">
                                <span className="font-medium">Real</span>
                                <span className="text-xs opacity-80">BRL</span>
                            </div>
                        </Button>
                        <Button
                            variant={selectedCurrency === CurrencyType.USD ? "default" : "outline"}
                            onClick={() => handleCurrencyChange(CurrencyType.USD)}
                            className="w-full h-20 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <DollarSign className="h-6 w-6" />
                            <div className="flex flex-col items-center">
                                <span className="font-medium">Dólar</span>
                                <span className="text-xs opacity-80">USD</span>
                            </div>
                        </Button>
                        <Button
                            variant={selectedCurrency === CurrencyType.EUR ? "default" : "outline"}
                            onClick={() => handleCurrencyChange(CurrencyType.EUR)}
                            className="w-full h-20 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <Euro className="h-6 w-6" />
                            <div className="flex flex-col items-center">
                                <span className="font-medium">Euro</span>
                                <span className="text-xs opacity-80">EUR</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </DialogCardTemplate>
    )
}