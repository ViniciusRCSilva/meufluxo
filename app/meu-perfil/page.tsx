import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserCard from "./_components/user-card";
import NextBillsToPayCard from "./_components/next-bills-to-pay-card";
import LastTransactionsCard from "../_components/last-transactions-card";
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import DashboardCard from "../_components/dashboard-card";
import { AreaChartBalanceEvolution } from "./_components/area-chart-balance-evolution";
import { getTransactions } from "../_actions/transaction";
import { getBalance } from "../_actions/balance";
import { getBillsNotPaid } from "../_actions/bills";
import { getFinancialGoals } from "../_actions/financial-goals";
import { getMonthlyBalanceEvolution } from "../_utils/home-page-functions";

const MyProfile = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const balance = await getBalance(userId);
    const rawTransactions = await getTransactions(userId);
    const goals = await getFinancialGoals(userId);

    const lastTransactions = rawTransactions?.map(transaction => ({
        id: transaction.id,
        name: transaction.name,
        date: transaction.createdAt.toLocaleDateString('pt-BR'),
        type: transaction.type,
        value: transaction.value
    }));

    const currentMonthTransactions = rawTransactions?.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear;
    });

    const highestDepositOfTheMonth = currentMonthTransactions?.find(transaction => transaction.type === "DEPOSIT" && transaction.value === Math.max(...currentMonthTransactions?.filter(transaction => transaction.type === "DEPOSIT")?.map(transaction => transaction.value) || []));
    const highestExpenseOfTheMonth = currentMonthTransactions?.find(transaction => transaction.type === "EXPENSE" && transaction.value === Math.max(...currentMonthTransactions?.filter(transaction => transaction.type === "EXPENSE")?.map(transaction => transaction.value) || []));

    const rawBills = await getBillsNotPaid(userId);
    const monthlyBalanceData = getMonthlyBalanceEvolution(rawTransactions);

    const lastBills = rawBills?.map(bill => ({
        id: bill.id,
        name: bill.name,
        date: bill.dueDate.toLocaleDateString('pt-BR'),
        value: bill.value
    }));

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2.5fr] min-h-screen gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div>
                <UserCard
                    balanceCard={
                        <DashboardCard
                            title="Saldo atual"
                            icon={<PiggyBank className="h-16 w-16 text-warning" />}
                            iconBgColor="bg-warning/20"
                            content={balance?.amount || 0}
                        />
                    }
                    billsQuantity={rawBills?.length || 0}
                    goalsQuantity={goals?.length || 0}
                />
            </div>
            <div className="flex flex-col justify-between gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                    <NextBillsToPayCard bills={lastBills?.slice(0, 3) || []} />
                    <LastTransactionsCard transactions={lastTransactions?.slice(0, 3) || []} />
                    <div className="grid grid-cols-1 gap-4">
                        <DashboardCard
                            title="Maior depósito do mês"
                            icon={<TrendingUp className="h-16 w-16 text-success" />}
                            iconBgColor="bg-success/20"
                            content={highestDepositOfTheMonth?.value || 0}
                        />
                        <DashboardCard
                            title="Maior gasto do mês"
                            icon={<TrendingDown className="h-16 w-16 text-destructive" />}
                            iconBgColor="bg-destructive/20"
                            content={highestExpenseOfTheMonth?.value || 0}
                        />
                    </div>
                </div>
                <div className="mt-6 lg:mt-0">
                    <AreaChartBalanceEvolution data={monthlyBalanceData} />
                </div>
            </div>
        </div>
    )
}

export default MyProfile