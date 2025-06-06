import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardCard from "@/app/_components/dashboard-card";
import { TrendingUp, TrendingDown, ChartLine, Percent } from "lucide-react";
import { BarchartRevenueAndExpenses } from "../_components/barchart-renevue-and-expenses";
import { ExpensesDivisionCard } from "@/app/_components/expenses-division-card";
import { getTransactions } from "../_actions/transaction";
import {
    getCurrentYearMonthlyTransactions,
    calculateYearTotals,
    MonthlyVariation,
    getExpensesChartData,
    getMonthlyNetProfitData,
    getCurrentYearTransactions,
} from "@/app/_utils/financial-report-functions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { AreaChartMonthResume } from "./_components/area-chart-month-resume";
import ExportToPDFButton from "./_components/export-to-pdf-button";

const FinancialReport = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const rawTransactions = await getTransactions(userId, "asc");

    const chartData = getCurrentYearMonthlyTransactions(rawTransactions, currentYear);
    const currentYearTransactions = getCurrentYearTransactions(rawTransactions, currentYear);
    const { entrances, exits } = calculateYearTotals(currentYearTransactions);
    const monthlyVariation = MonthlyVariation(rawTransactions, currentMonth, currentYear);
    const expensesChartData = getExpensesChartData(currentYearTransactions);
    const monthlyNetProfitData = getMonthlyNetProfitData(currentYearTransactions);

    return (
        <div id="relatorio-financeiro" className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex flex-col lg:flex-row gap-2 items-center lg:justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Relatório Financeiro</h1>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                            <HelpCircle className="h-6 w-6 text-font-muted" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64 text-center">
                            <p>visualize seu desempenho financeiro do ano.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <ExportToPDFButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-fit gap-6">
                <DashboardCard
                    title="Total de Entradas"
                    description={`no ano de ${currentYear}`}
                    icon={<TrendingUp className="h-16 w-16 text-success" />}
                    iconBgColor="bg-success/20"
                    content={entrances}
                />
                <DashboardCard
                    title="Total de Saídas"
                    description={`no ano de ${currentYear}`}
                    icon={<TrendingDown className="h-16 w-16 text-destructive" />}
                    iconBgColor="bg-destructive/20"
                    content={exits}
                />
                <DashboardCard
                    title="Lucro Líquido"
                    description={`no ano de ${currentYear}`}
                    icon={<ChartLine className="h-16 w-16 text-link" />}
                    iconBgColor="bg-link/20"
                    content={entrances - exits}
                />
                <DashboardCard
                    title="Variação mensal"
                    description={`no ano de ${currentYear}`}
                    icon={<Percent className="h-16 w-16 text-warning" />}
                    iconBgColor="bg-warning/20"
                    content={monthlyVariation}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[3.1fr_1fr] gap-6">
                <BarchartRevenueAndExpenses data={chartData} />
                <ExpensesDivisionCard data={expensesChartData} title="ano" />
            </div>
            <div className="w-full">
                <AreaChartMonthResume data={monthlyNetProfitData} />
            </div>
        </div>
    )
}

export default FinancialReport;