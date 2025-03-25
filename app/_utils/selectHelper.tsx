import { Banknote, BookOpen, CarFront, Clapperboard, CreditCard, ForkKnife, Hospital, House, LayoutGrid, PiggyBank, ScrollText, Shapes, TrendingDown, TrendingUp, Wrench } from "lucide-react";

const typeOptions = [
    { value: "DEPOSIT", label: "Déposito" },
    { value: "EXPENSE", label: "Despesa" },
    { value: "INVESTMENT", label: "Investimento" },
];

const categoryOptions = [
    { value: "HOUSING", label: "Moradia" },
    { value: "TRANSPORTATION", label: "Transporte" },
    { value: "FOOD", label: "Alimentação" },
    { value: "ENTERTAINMENT", label: "Entretenimento" },
    { value: "HEALTH", label: "Saúde" },
    { value: "UTILITY", label: "Utilidades" },
    { value: "SALARY", label: "Salário" },
    { value: "EDUCATION", label: "Educação" },
    { value: "OTHER", label: "Outros" },
];

const paymentMethodOptions = [
    { value: "CREDIT_CARD", label: "Cartão de Crédito" },
    { value: "DEBIT_CARD", label: "Cartão de Débito" },
    { value: "BANK_TRANSFER", label: "Transferência Bancária" },
    { value: "BANK_SLIP", label: "Boleto Bancário" },
    { value: "CASH", label: "Dinheiro" },
    { value: "PIX", label: "Pix" },
    { value: "OTHER", label: "Outro" },
];

const typeSelect = (type: string) => {
    switch (type) {
        case "DEPOSIT":
            return (
                <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Déposito
                </span>
            );
        case "EXPENSE":
            return (
                <span className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    Despesa
                </span>
            );
        case "INVESTMENT":
            return (
                <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Investimento
                </span>
            );
        default:
            return type;
    }
};

const categorySelect = (category: string) => {
    switch (category) {
        case "HOUSING":
            return (
                <span className="flex items-center gap-2">
                    <House className="w-4 h-4 text-link" />
                    Moradia
                </span>
            );
        case "TRANSPORTATION":
            return (
                <span className="flex items-center gap-2">
                    <CarFront className="w-4 h-4 text-link" />
                    Transporte
                </span>
            );
        case "FOOD":
            return (
                <span className="flex items-center gap-2">
                    <ForkKnife className="w-4 h-4 text-link" />
                    Alimento
                </span>
            );
        case "ENTERTAINMENT":
            return (
                <span className="flex items-center gap-2">
                    <Clapperboard className="w-4 h-4 text-link" />
                    Entretenimento
                </span>
            );
        case "HEALTH":
            return (
                <span className="flex items-center gap-2">
                    <Hospital className="w-4 h-4 text-link" />
                    Saúde
                </span>
            );
        case "UTILITY":
            return (
                <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-link" />
                    Utilidades
                </span>
            );
        case "SALARY":
            return (
                <span className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-link" />
                    Salário
                </span>
            );
        case "EDUCATION":
            return (
                <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-link" />
                    Educação
                </span>
            );
        case "OTHER":
            return (
                <span className="flex items-center gap-2">
                    <Shapes className="w-4 h-4 text-link" />
                    Outros
                </span>
            );
        default:
            return category;
    }
}

const paymentMethodSelect = (paymentMethod: string) => {
    switch (paymentMethod) {
        case "CREDIT_CARD":
            return (
                <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-link" />
                    Cartão de Crédito
                </span>
            );
        case "DEBIT_CARD":
            return (
                <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-link" />
                    Cartão de Débito
                </span>
            );
        case "BANK_TRANSFER":
            return (
                <span className="flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-warning" />
                    Transferência Bancária
                </span>
            );
        case "BANK_SLIP":
            return (
                <span className="flex items-center gap-2">
                    <ScrollText className="w-4 h-4 text-link" />
                    Boleto Bancário
                </span>
            );
        case "CASH":
            return (
                <span className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-success" />
                    Dinheiro
                </span>
            );
        case "PIX":
            return (
                <span className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-[#77b6ab] rotate-45" fill="#77b6ab" />
                    Pix
                </span>
            );
        case "OTHER":
            return (
                <span className="flex items-center gap-2">
                    <Shapes className="w-4 h-4 text-link" />
                    Outro
                </span>
            );
        default:
            return paymentMethod;
    }
};

export {
    typeOptions,
    categoryOptions,
    paymentMethodOptions,
    typeSelect,
    categorySelect,
    paymentMethodSelect
}