import { Plus } from "lucide-react";
import { Button } from "../_components/ui/button";
import DataTableTransactions from "./_components/data-table-transactions";
import { columns } from "./_columns/transactions";

type TransactionType = "DEPOSIT" | "EXPENSE" | "INVESTMENT";
type TransactionCategory = "HOUSING" | "TRANSPORTATION" | "FOOD" | "ENTERTAINMENT" | "HEALTH" | "UTILITY" | "SALARY" | "EDUCATION" | "OTHER";
type TransactionPaymentMethod = "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER" | "BANK_SLIP" | "CASH" | "PIX" | "OTHER";

const Transacoes = () => {
    const data: Array<{
        date: string;
        name: string;
        category: TransactionCategory;
        paymentMethod: TransactionPaymentMethod;
        type: TransactionType;
        value: number;
    }> = [
            {
                date: "11/03/2025",
                name: "Salário",
                category: "SALARY",
                paymentMethod: "BANK_TRANSFER",
                value: 3200,
                type: "DEPOSIT",
            },
            {
                date: "11/03/2025",
                name: "Água",
                category: "FOOD",
                paymentMethod: "PIX",
                value: 200,
                type: "EXPENSE",
            },
            {
                date: "11/03/2025",
                name: "Aluguel",
                category: "HOUSING",
                paymentMethod: "CREDIT_CARD",
                value: 300,
                type: "EXPENSE",
            },
            {
                date: "11/03/2025",
                name: "Viagem",
                category: "OTHER",
                paymentMethod: "PIX",
                value: 1000,
                type: "INVESTMENT",
            },
        ];

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Transações</h1>
                <Button>
                    <Plus className="w-5 h-5" />
                    Adicionar transação
                </Button>
            </div>
            <div>
                <DataTableTransactions columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Transacoes;