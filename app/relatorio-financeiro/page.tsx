import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardCard from "@/app/_components/dashboard-card";
import { TrendingUp, TrendingDown, ChartLine, Percent, FileDown } from "lucide-react";
import { BarchartRevenueAndExpenses } from "../_components/barchart-renevue-and-expenses";
import { ExpensesDivisionCard } from "@/app/_components/expenses-division-card";
import { getTransactions } from "../_actions/transaction";
import {
    getMonthlyTransactions,
    getCurrentMonthTransactions,
    calculateMonthlyTotals,
    getExpensesChartData,
} from "@/app/_utils/homePageFunctions";
import { Button } from "../_components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { HelpCircle } from "lucide-react";

const FinancialReport = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const rawTransactions = await getTransactions(userId);

    const chartData = getMonthlyTransactions(rawTransactions);
    const currentMonthTransactions = getCurrentMonthTransactions(rawTransactions, currentMonth, currentYear);
    const { entrances, exits } = calculateMonthlyTotals(currentMonthTransactions);
    const expensesChartData = getExpensesChartData(currentMonthTransactions);

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Relatório Financeiro</h1>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                            <HelpCircle className="h-6 w-6 text-font-muted" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64 text-center">
                            <p>Relatório financeiro que mostra o desempenho financeiro de um mês.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Button variant="outline" className="text-destructive hover:text-destructive/80">
                    <FileDown className="h-6 w-6" />
                    Exportar PDF
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-fit gap-6">
                <DashboardCard
                    title="Total de Entradas"
                    icon={<TrendingUp className="h-16 w-16 text-success" />}
                    iconBgColor="bg-success/20"
                    content={entrances}
                />
                <DashboardCard
                    title="Total de Saídas"
                    icon={<TrendingDown className="h-16 w-16 text-destructive" />}
                    iconBgColor="bg-destructive/20"
                    content={exits}
                />
                <DashboardCard
                    title="Lucro Líquido"
                    icon={<ChartLine className="h-16 w-16 text-link" />}
                    iconBgColor="bg-link/20"
                    content={entrances - exits}
                />
                <DashboardCard
                    title="Variação mensal"
                    icon={<Percent className="h-16 w-16 text-warning" />}
                    iconBgColor="bg-warning/20"
                    content={entrances - exits}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[3.1fr_1fr] gap-6">
                <BarchartRevenueAndExpenses data={chartData} />
                <ExpensesDivisionCard data={expensesChartData} />
            </div>
            <div className="w-full">
            </div>
        </div>
    );
};

export default FinancialReport;
