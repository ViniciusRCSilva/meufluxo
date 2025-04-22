import { Transaction } from "../_types/transaction";
import { FinancialGoal, TransactionType } from "@prisma/client";

export const getMonthlyBalanceEvolution = (
    transactions: Transaction[] | undefined,
    financialGoals: FinancialGoal[] | undefined
) => {
    if (!transactions) return [];

    const monthlyBalances: Record<string, number> = {};

    transactions.forEach(transaction => {
        const date = new Date(transaction.createdAt);
        const monthKey = date.toLocaleDateString('pt-BR', { month: 'long' });

        if (!monthlyBalances[monthKey]) {
            monthlyBalances[monthKey] = 0;
        }

        if (transaction.type === TransactionType.DEPOSIT) {
            monthlyBalances[monthKey] += transaction.value;
        } else {
            monthlyBalances[monthKey] -= transaction.value;
        }
    });

    financialGoals?.forEach(goal => {
        const updateDate = new Date(goal.updatedAt);
        const monthKey = updateDate.toLocaleDateString('pt-BR', { month: 'long' });

        if (!monthlyBalances[monthKey]) {
            monthlyBalances[monthKey] = 0;
        }

        monthlyBalances[monthKey] -= goal.currentAmount;
    });

    let cumulativeBalance = 0;
    return Object.entries(monthlyBalances)
        .map(([month, balance]) => {
            cumulativeBalance += balance;
            return {
                month: month.charAt(0).toUpperCase() + month.slice(1),
                balance: cumulativeBalance
            };
        })
        .sort((a, b) => {
            const months = [
                'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
            ];
            return months.indexOf(a.month.toLowerCase()) - months.indexOf(b.month.toLowerCase());
        });
};