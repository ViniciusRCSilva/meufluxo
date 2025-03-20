import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardCard from "@/app/_components/dashboard-card";
import { PiggyBank, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { BarchartRevenueAndExpenses } from "./_components/barchart-renevue-and-expenses";
import LastTransactionsCard from "@/app/_components/last-transactions-card";
import { ExpensesDivisionCard } from "@/app/_components/expenses-division-card";
import FinancialInsightsCard from "./_components/financial-insights-card";
import FinancialGoalsProgressCard from "./_components/financial-goals-progress-card";

type TransactionType = "DEPOSIT" | "EXPENSE" | "INVESTMENT";

const Home = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const lastTransactionsTest: Array<{
        name: string;
        date: string;
        type: TransactionType;
        value: number;
    }> = [
            {
                name: "Salário",
                date: "11/03/2025",
                type: "DEPOSIT",
                value: 3200
            },
            {
                name: "Água",
                date: "11/03/2025",
                type: "EXPENSE",
                value: 250
            },
            {
                name: "Aluguel",
                date: "11/03/2025",
                type: "EXPENSE",
                value: 500
            },
        ]

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-fit gap-6">
                <DashboardCard title="Saldo atual" icon={<PiggyBank className="h-20 w-20 text-warning" />} content="R$ 0,00" />
                <DashboardCard title="Entradas" icon={<TrendingUp className="h-20 w-20 text-success" />} content="R$ 0,00" />
                <DashboardCard title="Saídas" icon={<TrendingDown className="h-20 w-20 text-destructive" />} content="R$ 0,00" />
                <DashboardCard title="Conta a pagar" description="Água - 11/03/2025" icon={<Calendar className="h-20 w-20 text-link" />} content="R$ 0,00" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarchartRevenueAndExpenses />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LastTransactionsCard transactions={lastTransactionsTest} />
                    <ExpensesDivisionCard />
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-[1fr_3fr] gap-6">
                <FinancialInsightsCard />
                <FinancialGoalsProgressCard />
            </div>
        </div>
    );
};

export default Home;
