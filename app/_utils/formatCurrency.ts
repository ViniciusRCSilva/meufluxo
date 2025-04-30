import { CurrencyType } from "@prisma/client";

type FormatCurrencyOptions = {
    value: number;
    currencyType?: CurrencyType;
}

export const formatCurrencyByType = (value: number, currencyType: CurrencyType = CurrencyType.BRL) => {
    switch (currencyType) {
        case CurrencyType.BRL:
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        case CurrencyType.USD:
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(value);
        case CurrencyType.EUR:
            return new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(value);
        default:
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
    }
}

export const formatCurrency = ({ value, currencyType = CurrencyType.BRL }: FormatCurrencyOptions) => {
    return formatCurrencyByType(value, currencyType);
}