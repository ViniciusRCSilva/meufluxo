import { Transaction } from "../_types/transaction";
import { TransactionType } from "@prisma/client";

const formatFinancialReport = (rawTransactions: Transaction[] | undefined) => {
    return rawTransactions?.map(transaction => ({
        id: transaction.id,
        name: transaction.name,
        date: transaction.createdAt.toLocaleDateString('pt-BR'),
        type: transaction.type,
        value: transaction.value
    }));
};

const getCurrentYearTransactions = (rawTransactions: Transaction[] | undefined, currentYear: number) => {
    return rawTransactions?.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate.getFullYear() === currentYear;
    });
};

const calculateYearTotals = (yearlyTransactions: Transaction[] | undefined) => {
    const entrances = yearlyTransactions?.filter(transaction => transaction.type === 'DEPOSIT')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;
    const exits = yearlyTransactions?.filter(transaction => transaction.type === 'EXPENSE')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;

    return { entrances, exits };
};

const MonthlyVariation = (rawTransactions: Transaction[] | undefined, currentMonth: number, currentYear: number) => {
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const sumMonth = (targetYear: number, targetMonth: number) =>
        rawTransactions?.filter(
            (t) =>
                t.type === 'DEPOSIT' &&
                new Date(t.createdAt).getFullYear() === targetYear &&
                new Date(t.createdAt).getMonth() + 1 === targetMonth
        )
            .reduce((acc, t) => acc + t.value, 0) || 0;

    const present = sumMonth(currentYear, currentMonth);
    const previous = sumMonth(previousYear, previousMonth);

    if (previous === 0) return present === 0 ? 0 : 100;

    const variacao = ((present - previous) / previous) * 100;
    return parseFloat(variacao.toFixed(2));
}

const getExpensesChartData = (currentYearTransactions: Transaction[] | undefined) => {
    const expenses = currentYearTransactions?.filter(transaction => transaction.type === 'EXPENSE') || [];

    const expensesByCategory = expenses.reduce((acc, transaction) => {
        if (!acc[transaction.category!]) {
            acc[transaction.category!] = 0;
        }
        acc[transaction.category!] += transaction.value;
        return acc;
    }, {} as Record<string, number>);

    // Cria um array de entradas ordenado por valor (maior para menor)
    const sortedExpenses = Object.entries(expensesByCategory)
        .sort(([, a], [, b]) => b - a);

    // Define as cores disponíveis do mais intenso ao mais claro
    const colors = [
        "var(--pie-chart-destructive-1)",
        "var(--pie-chart-destructive-2)",
        "var(--pie-chart-destructive-3)",
        "var(--pie-chart-destructive-4)",
        "var(--pie-chart-destructive-5)",
        "var(--pie-chart-destructive-6)"
    ];

    // Calcula o índice da cor baseado na posição do valor
    const expensesChartData = sortedExpenses.map(([category, total], index) => {
        // Calcula o índice da cor baseado na posição
        // Se tivermos mais categorias que cores, as últimas categorias usarão a última cor
        const colorIndex = Math.min(index, colors.length - 1);

        return {
            expenseName: category,
            expenses: total,
            fill: colors[colorIndex]
        };
    });

    return expensesChartData;

};

const getMonthlyNetProfitData = (transactions: Transaction[] | undefined) => {
    if (!transactions) return [];

    const monthlyData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.createdAt);
        const monthKey = date.toLocaleString('pt-BR', { month: 'long' });

        if (!acc[monthKey]) {
            acc[monthKey] = { entrances: 0, exits: 0 };
        }

        if (transaction.type === TransactionType.DEPOSIT) {
            acc[monthKey].entrances += transaction.value;
        } else {
            acc[monthKey].exits += transaction.value;
        }

        return acc;
    }, {} as Record<string, { entrances: number; exits: number }>);

    return Object.entries(monthlyData).map(([month, data]) => ({
        month: month.charAt(0).toUpperCase() + month.slice(1),
        netProfit: data.entrances - data.exits
    }));
};

export {
    formatFinancialReport,
    getCurrentYearTransactions,
    calculateYearTotals,
    MonthlyVariation,
    getExpensesChartData,
    getMonthlyNetProfitData
}