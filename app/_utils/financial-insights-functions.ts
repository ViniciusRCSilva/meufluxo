import { getTransactions } from "../_actions/transaction"
import { TransactionType } from "@prisma/client"
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

interface AlertsAndPreventionResult {
    openBillsvalue: number
    lateBillsAlert: {
        name: string
        dueDate: Date
    }
}

const comparisonWithThePreviousMonth = async (userId: string): Promise<ComparisonWithThePreviousMonthResult> => {
    const currentDate = new Date()
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const firstDayPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const lastDayPreviousMonth = new Date(firstDayCurrentMonth.getTime() - 1)

    /* Obtém todas as transações */
    const getAllTransactions = await getTransactions(userId)

    // Função auxiliar para calcular o saldo de um período
    const calculateBalance = (transactions: typeof getAllTransactions) => {
        const balance = {
            total: 0,
            expenses: 0
        }

        transactions?.forEach(transaction => {
            if (transaction.type === TransactionType.DEPOSIT) {
                balance.total += transaction.value
            } else {
                balance.total -= transaction.value
                balance.expenses += transaction.value
            }
        })

        return balance
    }

    /* Calcula saldos e despesas dos meses atual e anterior */
    const currentMonthTransactions = getAllTransactions?.filter(transaction =>
        transaction.createdAt >= firstDayCurrentMonth &&
        transaction.createdAt <= currentDate
    ) ?? []

    const previousMonthTransactions = getAllTransactions?.filter(transaction =>
        transaction.createdAt >= firstDayPreviousMonth &&
        transaction.createdAt <= lastDayPreviousMonth
    ) ?? []

    const currentBalance = calculateBalance(currentMonthTransactions)
    const previousBalance = calculateBalance(previousMonthTransactions)

    // Calcula as variações
    const difference = currentBalance.total - previousBalance.total
    const spentPercentage = previousBalance.total === 0
        ? 0
        : Math.round((difference / Math.abs(previousBalance.total)) * 100)

    const expensesPercentage = previousBalance.expenses === 0
        ? (currentBalance.expenses > 0 ? 100 : 0) // Se não tinha despesas no mês anterior
        : Math.round(((currentBalance.expenses - previousBalance.expenses) / previousBalance.expenses) * 100)

    return {
        difference,
        spentPercentage,
        expensesPercentage
    }
}

const goalsAndObjectives = async (userId: string): Promise<GoalsAndObjectivesResult> => {
    const goals = await getFinancialGoals(userId)

    if (!goals || goals.length === 0) {
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

    // Encontra a meta mais recente que ainda não foi alcançada
    const activeGoals = goals.filter(goal => goal.goalAchievedDate === null)
    const lastGoal = activeGoals.length > 0
        ? activeGoals.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
        : null

    // Calcula o valor restante para atingir a meta
    const remainingToGoal = lastGoal
        ? Math.max(0, lastGoal.goalAmount - lastGoal.currentAmount)
        : 0

    // Calcula a quantidade de metas já alcançadas
    const achievedGoalsQuantity = goals.filter(goal =>
        goal.currentAmount >= goal.goalAmount || goal.goalAchievedDate !== null
    ).length

    // Calcula a porcentagem de progresso da meta atual
    const goalPercentage = lastGoal
        ? Math.min(100, Math.round((lastGoal.currentAmount / lastGoal.goalAmount) * 100))
        : 0

    return {
        goalAchieve: {
            goal: remainingToGoal,
            name: lastGoal?.name ?? ""
        },
        goalPercentage: {
            percentage: goalPercentage,
            name: lastGoal?.name ?? ""
        },
        AchievedGoalsQt: achievedGoalsQuantity
    }
}

const savingsAndEconomy = async (userId: string): Promise<SavingsAndEconomyResult> => {
    const currentDate = new Date()
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const transactions = await getTransactions(userId)

    // Calcula receitas e despesas do mês atual
    const currentMonthDeposits = transactions?.filter(transaction =>
        transaction.type === TransactionType.DEPOSIT &&
        transaction.createdAt >= firstDayCurrentMonth
    ).reduce((acc, transaction) => acc + transaction.value, 0) ?? 0

    const currentMonthExpenses = transactions?.filter(transaction =>
        transaction.type === TransactionType.EXPENSE &&
        transaction.createdAt >= firstDayCurrentMonth
    ).reduce((acc, transaction) => acc + transaction.value, 0) ?? 0

    /* Calcula a porcentagem da economia */
    if (currentMonthDeposits === 0) {
        return {
            economyPercentage: 0,
            fixedCostPercentage: 0,
            monthsToGoal: 0,
            goalName: "",
            amountToSave: 0
        }
    }

    // Calcula economia (receitas - despesas)
    const economy = currentMonthDeposits - currentMonthExpenses

    // Calcula porcentagem da economia em relação à receita
    const economyPercentage = Math.round((economy / currentMonthDeposits) * 100)

    /* Calcula a porcentagem dos gastos fixos em relação à receita mensal */
    const fixedCosts = await getBills(userId)
    const monthlyFixedCosts = fixedCosts
        ?.filter(bill => bill.recurrence !== 'NONE' && bill.recurrence !== 'YEARLY')
        ?.reduce((acc, bill) => acc + bill.value, 0) ?? 0

    const fixedCostPercentage = currentMonthDeposits > 0
        ? Math.round((monthlyFixedCosts / currentMonthDeposits) * 100)
        : 0

    /* Calcula a estimativa de tempo para realizar uma meta e quanto se deve economizar */
    const goals = await getFinancialGoals(userId)
    if (!goals || goals.length === 0) {
        return {
            economyPercentage,
            fixedCostPercentage,
            monthsToGoal: 0,
            goalName: "",
            amountToSave: 0
        }
    }

    // Encontra a meta ativa mais recente
    const activeGoals = goals.filter(goal => goal.goalAchievedDate === null)
    const lastGoal = activeGoals.length > 0
        ? activeGoals.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
        : null

    if (!lastGoal) {
        return {
            economyPercentage,
            fixedCostPercentage,
            monthsToGoal: 0,
            goalName: "",
            amountToSave: 0
        }
    }

    const remainingToGoal = Math.max(0, lastGoal.goalAmount - lastGoal.currentAmount)

    // Calcula quanto precisa economizar por mês baseado na média de economia atual
    const monthlyEconomy = economy > 0 ? economy : currentMonthDeposits * 0.1 // Se não há economia, assume 10% da receita
    const monthsToGoal = monthlyEconomy > 0
        ? Math.ceil(remainingToGoal / monthlyEconomy)
        : 0

    // Sugere um valor mensal para economizar baseado no objetivo de tempo
    const targetMonths = 12 // Define um objetivo de 12 meses
    const suggestedMonthlySaving = Math.ceil(remainingToGoal / targetMonths)

    return {
        economyPercentage,
        fixedCostPercentage,
        monthsToGoal,
        goalName: lastGoal.name,
        amountToSave: Math.max(suggestedMonthlySaving, monthlyEconomy)
    }
}

const alertsAndPrevention = async (userId: string): Promise<AlertsAndPreventionResult> => {
    const currentDate = new Date()
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

    /* Verifica se há alguma dívida ativa */
    const bills = await getBills(userId)
    const openBills = bills?.filter(bill => !bill.isPaid && bill.recurrence !== 'NONE') ?? []

    /* Verifica se há alguma dívida vencida */
    const lateBills = openBills.filter(bill => bill.dueDate < firstDayCurrentMonth)

    return {
        openBillsvalue: openBills.reduce((acc, bill) => acc + bill.value, 0),
        lateBillsAlert: {
            name: lateBills[0]?.name ?? '',
            dueDate: lateBills[0]?.dueDate ?? null
        }
    }
}

const routineAndPlanning = async (userId: string): Promise<RoutineAndPlanningResult> => {
    const currentDate = new Date()
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const firstDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)

    /* Quantidade total de transações */
    const transactions = await getTransactions(userId)
    const transactionsQt = transactions?.length ?? 0

    /* Calcula a média de transações mensais dos últimos 2 meses */
    const lastMonthTransactions = transactions?.filter(transaction =>
        transaction.createdAt >= firstDayLastMonth &&
        transaction.createdAt < firstDayCurrentMonth
    ).length ?? 0

    const currentMonthTransactions = transactions?.filter(transaction =>
        transaction.createdAt >= firstDayCurrentMonth
    ).length ?? 0

    // Calcula a média considerando os dois meses
    const monthlyTransactions = Math.round((lastMonthTransactions + currentMonthTransactions) / 2)

    /* Calcula as contas que vencem nos próximos 7 dias */
    const bills = await getBillsNotPaid(userId)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const next7Days = new Date(today)
    next7Days.setDate(today.getDate() + 7)

    const next7DaysBillsQt = bills?.filter(bill => {
        const dueDate = new Date(bill.dueDate)
        dueDate.setHours(0, 0, 0, 0)
        return dueDate >= today && dueDate <= next7Days
    }).length ?? 0

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
    alertsAndPrevention,
    routineAndPlanning
}