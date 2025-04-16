import { getBalance } from "@/app/_actions/balance"
import { getTransactions } from "../_actions/transaction"
import { Bill, TransactionType } from "@prisma/client"
import { getFinancialGoals } from "../_actions/financial-goals"
import { getBills, getBillsNotPaid } from "../_actions/bills"

interface ComparisonWithThePreviousMonthResult {
    difference: number
    spentPercentage: number
    expensesPercentage: number
}

interface GoalsAndObjectivesResult {
    goalAchieve: {
        goal: number,
        name: string
    }
    goalPercentage: {
        percentage: number,
        name: string
    }
    AchievedGoalsQt: number
}

interface SavingsAndEconomyResult {
    economyPercentage: number
    fixedCostPercentage: number
    monthsToGoal: number
    goalName: string
    amountToSave: number
}

interface RoutineAndPlanningResult {
    transactionsQt: number
    monthlyTransactions: number
    next7DaysBillsQt: number
}

const comparisonWithThePreviousMonth = async (userId: string): Promise<ComparisonWithThePreviousMonthResult> => {
    const currentDate = new Date()
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayPreviousMonth = new Date(firstDayCurrentMonth.getTime() - 1)

    /* Calcula a porcentagem de saldo da conta */
    const getCurrentBalance = await getBalance(userId)
    const getPreviousMonthBalance = await getBalance(userId, lastDayPreviousMonth)
    const currentAmount = getCurrentBalance?.amount ?? 0
    const previousAmount = getPreviousMonthBalance?.amount ?? 0
    const difference = currentAmount - previousAmount
    const spentPercentage = previousAmount === 0
        ? 0
        : Math.round(Math.abs((difference / previousAmount) * 100))

    /* Calcula a porcentagem de despesas  */
    const getAllTransactions = await getTransactions(userId)
    const getExpensesTotal = getAllTransactions?.filter(transaction =>
        transaction.type === TransactionType.EXPENSE
    ).reduce((acc, transaction) => acc + transaction.value, 0)
    const getLastMonthExpensesTotal = getAllTransactions?.filter(transaction =>
        transaction.type === TransactionType.EXPENSE &&
        transaction.createdAt <= lastDayPreviousMonth
    ).reduce((acc, transaction) => acc + transaction.value, 0)

    if (getExpensesTotal === 0 && getLastMonthExpensesTotal === 0) {
        return {
            difference,
            spentPercentage,
            expensesPercentage: 0
        }
    } else {
        const expensesPercentage = getExpensesTotal !== undefined && getLastMonthExpensesTotal !== undefined
            ? Math.round(Math.abs((getLastMonthExpensesTotal / getExpensesTotal) * 100))
            : 0

        return {
            difference,
            spentPercentage,
            expensesPercentage
        }
    }

}

const goalsAndObjectives = async (userId: string): Promise<GoalsAndObjectivesResult> => {
    const goals = await getFinancialGoals(userId)

    if (!goals) {
        return {
            goalAchieve: {
                goal: 0,
                name: ""
            },
            goalPercentage: {
                percentage: 0,
                name: ""
            },
            AchievedGoalsQt: 0
        }
    }

    const lastGoal = goals?.filter(goal => goal.goalAchievedDate === null).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
    const remainingToGoal = lastGoal?.goalAmount - lastGoal?.currentAmount

    const achievedGoalsQuantity = goals.filter(goal => goal.currentAmount == goal.goalAmount).length

    return {
        goalAchieve: {
            goal: remainingToGoal,
            name: lastGoal?.name ?? ""
        },
        goalPercentage: {
            percentage: Math.round((lastGoal?.currentAmount / lastGoal?.goalAmount) * 100),
            name: lastGoal?.name ?? ""
        },
        AchievedGoalsQt: achievedGoalsQuantity
    }
}

const savingsAndEconomy = async (userId: string): Promise<SavingsAndEconomyResult> => {
    const transactions = await getTransactions(userId)

    const currentMonthDeposits = transactions?.filter(transaction =>
        transaction.type === TransactionType.DEPOSIT &&
        transaction.createdAt >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ).reduce((acc, transaction) => acc + transaction.value, 0)

    const currentMonthExpenses = transactions?.filter(transaction =>
        transaction.type === TransactionType.EXPENSE &&
        transaction.createdAt >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ).reduce((acc, transaction) => acc + transaction.value, 0)

    /* Calcula a porcentagem da economia */
    if (currentMonthDeposits === 0 && currentMonthExpenses === 0) {
        return {
            economyPercentage: 0,
            fixedCostPercentage: 0,
            monthsToGoal: 0,
            goalName: "",
            amountToSave: 0
        }
    }
    const economy = currentMonthDeposits !== undefined && currentMonthExpenses !== undefined
        ? currentMonthDeposits - currentMonthExpenses
        : 0

    const economyPercentage = currentMonthDeposits !== undefined
        ? Math.round((economy / currentMonthDeposits) * 100)
        : 0

    /* Calcula a porcentagem dos gastos fixos */
    const fixedCosts = await getBills(userId)
    const currentBalance = await getBalance(userId)
    const fixedCostsTotal = fixedCosts?.reduce((acc, bill) => acc + bill.value, 0)
    const fixedCostPercentage = fixedCostsTotal !== undefined && currentBalance?.amount !== undefined
        ? Math.round((fixedCostsTotal / currentBalance.amount) * 100)
        : 0

    /* Calcula a estimativa de tempo para realizar uma meta e quanto se deve economizar para alcançá-la */
    const goals = await getFinancialGoals(userId)
    if (!goals) {
        return {
            economyPercentage,
            fixedCostPercentage,
            monthsToGoal: 0,
            goalName: "",
            amountToSave: 0
        }
    }
    const lastGoal = goals?.filter(goal => goal.goalAchievedDate === null).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
    const remainingToGoal = lastGoal ? lastGoal.goalAmount - lastGoal.currentAmount : 0

    const investment = remainingToGoal / 4;
    const weeksToGoal = remainingToGoal / investment;
    const monthsToGoal = Math.round(weeksToGoal / 4.34);

    return {
        economyPercentage,
        fixedCostPercentage,
        monthsToGoal,
        goalName: lastGoal?.name || "",
        amountToSave: investment
    }
}

const routineAndPlanning = async (userId: string): Promise<RoutineAndPlanningResult> => {
    /* Quantidade de transações */
    const transactions = await getTransactions(userId)
    const transactionsQt = transactions?.length ?? 0

    /* TODO: Fazer a média de transações mensais */
    const monthlyTransactions = transactions?.filter(transaction =>
        transaction.createdAt >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ).length ?? 0;

    /* Calculo das contas que vencem nos próximos 7 dias do mês atual */
    const bills = await getBillsNotPaid(userId)

    const billCalculum = (bill: Bill) => {
        return Math.floor((bill.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    }

    const next7DaysBillsQt = bills?.filter(bill => (
        billCalculum(bill) <= 7 && billCalculum(bill) > 0
    ))?.length ?? 0

    return {
        transactionsQt,
        monthlyTransactions,
        next7DaysBillsQt
    }
}
export {
    comparisonWithThePreviousMonth,
    goalsAndObjectives,
    savingsAndEconomy,
    routineAndPlanning
}