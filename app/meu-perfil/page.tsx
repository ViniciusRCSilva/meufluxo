import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserCard from "./_components/user-card";
import NextBillsToPayCard from "./_components/next-bills-to-pay-card";
import LastTransactionsCard from "../_components/last-transactions-card";
import { TrendingDown, TrendingUp } from "lucide-react";
import DashboardCard from "../_components/dashboard-card";
import { AreaChartBalanceEvolution } from "./_components/area-chart-balance-evolution";

type TransactionType = "DEPOSIT" | "EXPENSE" | "INVESTMENT";

const MyProfile = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const billsTest: Array<{
        name: string;
        date: string;
        value: number;
    }> = [
            {
                name: "Água",
                date: "05/03/2025",
                value: 250
            },
            {
                name: "Aluguel",
                date: "12/03/2025",
                value: 500
            },
            {
                name: "Internet",
                date: "15/03/2025",
                value: 100
            },
        ]

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
                date: "05/03/2025",
                type: "EXPENSE",
                value: 250
            },
            {
                name: "Aluguel",
                date: "12/03/2025",
                type: "EXPENSE",
                value: 500
            },
        ]

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2.5fr] min-h-screen gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div>
                <UserCard />
            </div>
            <div className="flex flex-col justify-between gap-6 lg:gap-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NextBillsToPayCard bills={billsTest} />
                    <LastTransactionsCard transactions={lastTransactionsTest} />
                    <div className="grid grid-cols-1 gap-4">
                        <DashboardCard
                            title="Maior depósito do mês"
                            icon={<TrendingUp className="h-16 w-16 text-success" />}
                            content="R$ 3.200"
                        />
                        <DashboardCard
                            title="Maior gasto do mês"
                            icon={<TrendingDown className="h-16 w-16 text-destructive" />}
                            content="R$ 500"
                        />
                    </div>
                </div>
                <div className="mt-6 lg:mt-0">
                    <AreaChartBalanceEvolution />
                </div>
            </div>
        </div>
    )
}

export default MyProfile