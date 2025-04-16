import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardCard from "@/app/_components/dashboard-card";
import { PiggyBank, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { BarchartRevenueAndExpenses } from "../_components/barchart-renevue-and-expenses";
import LastTransactionsCard from "@/app/_components/last-transactions-card";
import { ExpensesDivisionCard } from "@/app/_components/expenses-division-card";
import FinancialInsightsCard from "./_components/financial-insights-card";
import FinancialGoalsProgressCard from "./_components/financial-goals-progress-card";
import { getBalance } from "../_actions/balance";
import { getTransactions } from "../_actions/transaction";
import { getNearestBill } from "../_actions/bills";
import { getFinancialGoals } from "../_actions/financial-goals";
import {
    formatLastTransactions,
    getMonthlyTransactions,
    getCurrentMonthTransactions,
    calculateMonthlyTotals,
    getExpensesChartData,
    formatFinancialGoals
} from "@/app/_utils/home-page-functions";

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

    const lastTransactions = formatLastTransactions(rawTransactions);
    const chartData = getMonthlyTransactions(rawTransactions);
    const currentMonthTransactions = getCurrentMonthTransactions(rawTransactions, currentMonth, currentYear);
    const { entrances, exits } = calculateMonthlyTotals(currentMonthTransactions);
    const bill = await getNearestBill(userId);
    const expensesChartData = getExpensesChartData(currentMonthTransactions);
    const goals = await getFinancialGoals(userId);
    const financialGoals = formatFinancialGoals(goals);

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-fit gap-6">
                <DashboardCard
                    title="Saldo atual"
                    icon={<PiggyBank className="h-16 w-16 text-warning" />}
                    iconBgColor="bg-warning/20"
                    content={balance?.amount || 0}
                />
                <DashboardCard
                    title="Entradas"
                    description={`no mês de ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}`}
                    icon={<TrendingUp className="h-16 w-16 text-success" />}
                    iconBgColor="bg-success/20"
                    content={entrances}
                />
                <DashboardCard
                    title="Saídas"
                    description={`no mês de ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}`}
                    icon={<TrendingDown className="h-16 w-16 text-destructive" />}
                    iconBgColor="bg-destructive/20"
                    content={exits}
                />
                <DashboardCard
                    title="Conta a pagar"
                    description={bill ? `${bill.name} - ${bill.dueDate.toLocaleDateString('pt-BR')}` : ""}
                    icon={<Calendar className="h-16 w-16 text-link" />}
                    iconBgColor="bg-link/20"
                    content={bill?.value || 0}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarchartRevenueAndExpenses data={chartData} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LastTransactionsCard transactions={lastTransactions?.slice(0, 3) || []} />
                    <ExpensesDivisionCard data={expensesChartData} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-6">
                <FinancialInsightsCard userId={userId} />
                <FinancialGoalsProgressCard goals={financialGoals?.slice(0, 3) || []} />
            </div>
        </div>
    );
};

export default Home;
