import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardCard from "@/app/_components/dashboard-card";
import { PiggyBank, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { BarchartRevenueAndExpenses } from "./_components/barchart-renevue-and-expenses";
import LastTransactionsCard from "@/app/_components/last-transactions-card";
import { ExpensesDivisionCard } from "@/app/_components/expenses-division-card";
import FinancialInsightsCard from "./_components/financial-insights-card";
import FinancialGoalsProgressCard from "./_components/financial-goals-progress-card";
import { getBalance } from "../_actions/balance";
import { getTransactions } from "../_actions/transaction";
import { getBills } from "../_actions/bills";
import { getFinancialGoals } from "../_actions/financial-goals";

const Home = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const balance = await getBalance(userId);
    const rawTransactions = await getTransactions(userId);

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

    const entrances = currentMonthTransactions?.filter(transaction => transaction.type === 'DEPOSIT')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;
    const exits = currentMonthTransactions?.filter(transaction => transaction.type === 'EXPENSE')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;

    const bills = await getBills(userId);

    if (!bills) {
        return null;
    }

    const goals = await getFinancialGoals(userId);

    const financialGoals = goals?.map(goal => ({
        name: goal.name,
        progress: (goal.currentAmount / goal.goalAmount) * 100
    }));

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-fit gap-6">
                <DashboardCard title="Saldo atual" icon={<PiggyBank className="h-16 w-16 text-warning" />} content={balance?.amount || 0} />
                <DashboardCard title="Entradas" description={`no mês de ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}`} icon={<TrendingUp className="h-16 w-16 text-success" />} content={entrances} />
                <DashboardCard title="Saídas" description={`no mês de ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}`} icon={<TrendingDown className="h-16 w-16 text-destructive" />} content={exits} />
                <DashboardCard title="Conta a pagar" description={bills?.length > 0 ? `${bills?.[0]?.name} - ${bills?.[0]?.createdAt?.toLocaleDateString('pt-BR')}` : ""} icon={<Calendar className="h-16 w-16 text-link" />} content={bills?.[0]?.value || 0} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarchartRevenueAndExpenses />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LastTransactionsCard transactions={lastTransactions?.slice(0, 3) || []} />
                    <ExpensesDivisionCard />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6">
                <FinancialInsightsCard />
                <FinancialGoalsProgressCard goals={financialGoals || []} />
            </div>
        </div>
    );
};

export default Home;
