"use client"

import {
    comparisonWithThePreviousMonth,
    goalsAndObjectives,
    routineAndPlanning,
    savingsAndEconomy,
    alertsAndPrevention
} from './financial-insights-functions'
import { useState, useEffect } from 'react'

/* Funções de busca */
const fetchComparison = async (userId: string) => {
    const result = await comparisonWithThePreviousMonth(userId)
    return {
        difference: result.difference,
        spentPercentage: result.spentPercentage,
        expensesPercentage: result.expensesPercentage
    }
}

const fetchGoalsAndObjectives = async (userId: string) => {
    const result = await goalsAndObjectives(userId)
    return {
        remainingToGoal: result.goalAchieve.goal,
        goalName: result.goalAchieve.name,
        goalPercentage: result.goalPercentage.percentage,
        achievedGoalsQt: result.AchievedGoalsQt
    }
}

const fetchSavingsAndEconomy = async (userId: string) => {
    const result = await savingsAndEconomy(userId)
    return {
        economyPercentage: result.economyPercentage,
        fixedCostPercentage: result.fixedCostPercentage,
        monthsToGoal: result.monthsToGoal,
        goalName: result.goalName,
        amountToSave: result.amountToSave
    }
}

const fetchRoutineAndPlanning = async (userId: string) => {
    const result = await routineAndPlanning(userId)
    return {
        transactionsQt: result.transactionsQt,
        monthlyTransactions: result.monthlyTransactions,
        next7DaysBillsQt: result.next7DaysBillsQt
    }
}

const fetchAlertsAndPrevention = async (userId: string) => {
    const result = await alertsAndPrevention(userId)
    return {
        openBillsvalue: result.openBillsvalue,
        lateBillsAlert: result.lateBillsAlert
    }
}

/* Hooks */
export const useFinancialInsightsData = (userId: string) => {
    /* Comparativo com o mês anterior */
    const [difference, setDifference] = useState<number>(0)
    const [spentPercentage, setSpentPercentage] = useState<number>(0)
    const [expensesPercentage, setExpensesPercentage] = useState<number>(0)
    /* Metas e Objetivos */
    const [remainingToGoal, setRemainingToGoal] = useState<number>(0)
    const [goalName, setGoalName] = useState<string>("")
    const [goalPercentage, setGoalPercentage] = useState<number>(0)
    const [achievedGoalsQt, setAchievedGoalsQt] = useState<number>(0)
    /* Poupança e economia */
    const [economyPercentage, setEconomyPercentage] = useState<number>(0)
    const [fixedCostPercentage, setFixedCostPercentage] = useState<number>(0)
    const [monthsToGoal, setMonthsToGoal] = useState<number>(0)
    const [amountToSave, setAmountToSave] = useState<number>(0)
    /* Rotina e planejamento */
    const [transactionsQt, setTransactionsQt] = useState<number>(0)
    const [monthlyTransactions, setMonthlyTransactions] = useState<number>(0)
    const [next7DaysBillsQt, setNext7DaysBillsQt] = useState<number>(0)
    /* Alertas e prevenção */
    const [openBillsvalue, setOpenBillsvalue] = useState<number>(0)
    const [lateBillsAlert, setLateBillsAlert] = useState<{
        name: string
        dueDate: Date
    } | null>(null)

    /* Carrega os dados */
    useEffect(() => {
        const loadData = async () => {
            const comparisonResult = await fetchComparison(userId)
            setDifference(comparisonResult.difference)
            setSpentPercentage(comparisonResult.spentPercentage)
            setExpensesPercentage(comparisonResult.expensesPercentage)

            const goalsResult = await fetchGoalsAndObjectives(userId)
            setRemainingToGoal(goalsResult.remainingToGoal)
            setGoalName(goalsResult.goalName)
            setGoalPercentage(goalsResult.goalPercentage)
            setAchievedGoalsQt(goalsResult.achievedGoalsQt)

            const savingsResult = await fetchSavingsAndEconomy(userId)
            setEconomyPercentage(savingsResult.economyPercentage)
            setFixedCostPercentage(savingsResult.fixedCostPercentage)
            setMonthsToGoal(savingsResult.monthsToGoal)
            setGoalName(savingsResult.goalName)
            setAmountToSave(savingsResult.amountToSave)

            const routineResult = await fetchRoutineAndPlanning(userId)
            setTransactionsQt(routineResult.transactionsQt)
            setMonthlyTransactions(routineResult.monthlyTransactions)
            setNext7DaysBillsQt(routineResult.next7DaysBillsQt)

            const alertsResult = await fetchAlertsAndPrevention(userId)
            setOpenBillsvalue(alertsResult.openBillsvalue)
            setLateBillsAlert(alertsResult.lateBillsAlert)
        }

        loadData()
    }, [userId])

    return {
        difference,
        spentPercentage,
        expensesPercentage,
        remainingToGoal,
        goalName,
        goalPercentage,
        achievedGoalsQt,
        economyPercentage,
        fixedCostPercentage,
        monthsToGoal,
        amountToSave,
        transactionsQt,
        monthlyTransactions,
        next7DaysBillsQt,
        openBillsvalue,
        lateBillsAlert
    }
}