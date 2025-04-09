import { Transaction } from "../_types/transaction";
import { TransactionType } from "@prisma/client";

const formatLastTransactions = (rawTransactions: Transaction[] | undefined) => {
    return rawTransactions?.map(transaction => ({
        id: transaction.id,
        name: transaction.name,
        date: transaction.createdAt.toLocaleDateString('pt-BR'),
        type: transaction.type,
        value: transaction.value
    }));
};

const getMonthlyTransactions = (rawTransactions: Transaction[] | undefined) => {
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

    return Object.entries(monthlyTransactions).map(([month, values]) => ({
        month,
        revenue: values.revenue,
        expenses: values.expenses
    }));
};

const getCurrentMonthTransactions = (rawTransactions: Transaction[] | undefined, currentMonth: number, currentYear: number) => {
    return rawTransactions?.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear;
    });
};

const calculateMonthlyTotals = (currentMonthTransactions: Transaction[] | undefined) => {
    const entrances = currentMonthTransactions?.filter(transaction => transaction.type === 'DEPOSIT')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;
    const exits = currentMonthTransactions?.filter(transaction => transaction.type === 'EXPENSE')
        .reduce((total, transaction) => total + transaction.value, 0) || 0;

    return { entrances, exits };
};

const getExpensesChartData = (currentMonthTransactions: Transaction[] | undefined) => {
    const expenses = currentMonthTransactions?.filter(transaction => transaction.type === 'EXPENSE') || [];

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

const formatFinancialGoals = (goals: {
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    currentAmount: number;
    goalAmount: number;
    goalAchievedDate: Date | null;
}[] | undefined) => {
    return goals?.map(goal => ({
        name: goal.name,
        progress: (goal.currentAmount / goal.goalAmount) * 100
    }));
};

const getMonthlyBalanceEvolution = (transactions: Transaction[] | undefined) => {
    if (!transactions) return [];

    const monthlyData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.createdAt);
        const monthKey = date.toLocaleString('pt-BR', { month: 'long' });

        if (!acc[monthKey]) {
            acc[monthKey] = { balance: 0 };
        }

        if (transaction.type === TransactionType.DEPOSIT) {
            acc[monthKey].balance += transaction.value;
        } else {
            acc[monthKey].balance -= transaction.value;
        }

        return acc;
    }, {} as Record<string, { balance: number }>);

    // Calcular o saldo acumulado
    let runningBalance = 0;
    return Object.entries(monthlyData).map(([month, data]) => {
        runningBalance += data.balance;
        return {
            month: month.charAt(0).toUpperCase() + month.slice(1),
            balance: runningBalance
        };
    });
};

export {
    formatLastTransactions,
    getMonthlyTransactions,
    getCurrentMonthTransactions,
    calculateMonthlyTotals,
    getExpensesChartData,
    getMonthlyBalanceEvolution,
    formatFinancialGoals,
}