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
import { getNearestBill } from "../_actions/bills";
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

    // Agrupa transações por mês
    const monthlyTransactions = rawTransactions?.reduce((acc, transaction) => {
        const date = new Date(transaction.createdAt);
        const month = date.toLocaleDateString('pt-BR', { month: 'long' });
        
        if (!acc[month]) {
            acc[month] = {
                revenue: 0,
                expenses: 0
            };
        }

        if (transaction.type === 'DEPOSIT') {
            acc[month].revenue += transaction.value;
        } else {
            acc[month].expenses += transaction.value;
        }

        return acc;
    }, {} as Record<string, { revenue: number, expenses: number }>) || {};

    // Converte para o formato do gráfico
    const chartData = Object.entries(monthlyTransactions).map(([month, values]) => ({
        month,
        revenue: values.revenue,
        expenses: values.expenses
    }));

    // Calcula totais do mês atual
    const currentMonthTransactions = rawTransactions?.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear;
    });

    const entrances = currentMonthTransactions?.filter(transaction => transaction.type === 'DEPOSIT')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;
    const exits = currentMonthTransactions?.filter(transaction => transaction.type === 'EXPENSE')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;

    const bill = await getNearestBill(userId);

    // Filtra apenas as transações do tipo EXPENSE
    const expenses = currentMonthTransactions?.filter(transaction => transaction.type === 'EXPENSE') || [];

    // Agrupa despesas por categoria e calcula o total
    const expensesByCategory = expenses.reduce((acc, transaction) => {
        if (!acc[transaction.category]) {
            acc[transaction.category] = 0;
        }
        acc[transaction.category] += transaction.value;
        return acc;
    }, {} as Record<string, number>);

    // Define as cores para cada categoria
    const categoryColors = {
        HOUSING: "var(--pie-chart-destructive-1)",
        TRANSPORTATION: "var(--pie-chart-destructive-2)",
        FOOD: "var(--pie-chart-destructive-3)",
        UTILITIES: "var(--pie-chart-destructive-4)",
        HEALTHCARE: "var(--pie-chart-destructive-5)",
        ENTERTAINMENT: "var(--pie-chart-destructive-1)",
        EDUCATION: "var(--pie-chart-destructive-2)",
        DEBT: "var(--pie-chart-destructive-3)",
        SAVINGS: "var(--pie-chart-destructive-4)",
        OTHERS: "var(--pie-chart-destructive-5)",
    };

    // Converte para o formato do gráfico
    const expensesChartData = Object.entries(expensesByCategory)
        .map(([category, total]) => ({
            expenseName: category,
            expenses: total,
            fill: categoryColors[category as keyof typeof categoryColors] || "var(--pie-chart-destructive-5)"
        }));

    // Ordena por valor (maior para menor)
    expensesChartData.sort((a, b) => b.expenses - a.expenses);

    const goals = await getFinancialGoals(userId);

    const financialGoals = goals?.map(goal => ({
        name: goal.name,
        progress: (goal.currentAmount / goal.goalAmount) * 100
    }));

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
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6">
                <FinancialInsightsCard />
                <FinancialGoalsProgressCard goals={financialGoals?.slice(0, 3) || []} />
            </div>
        </div>
    );
};

export default Home;
