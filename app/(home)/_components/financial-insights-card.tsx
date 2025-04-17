"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel"
import BalanceComparison from "./balance-comparison"
import GoalsAndObjectives from "./goals-and-objectives"
import SavingsAndEconomy from "./savings-and-economy"
import AlertsAndPrevention from "./alerts-and-prevention"
import RoutineAndPlanning from "./routine-and-planning"
import { useFinancialInsightsData } from '@/app/_utils/financial-insights-hooks'

interface FinancialInsightsCardProps {
    userId: string
}
const FinancialInsightsCard = ({ userId }: FinancialInsightsCardProps) => {
    const {
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
    } = useFinancialInsightsData(userId)

    return (
        <Card className="font-[family-name:var(--font-poppins)] w-full h-full overflow-hidden">
            <CardHeader className="flex-none">
                <CardTitle className="text-xl text-font-foreground">Insights financeiros</CardTitle>
                <CardDescription className="text-font-muted">Análises e dicas para melhorar sua gestão financeira.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <Carousel opts={{ loop: true }} className="h-full">
                    <CarouselContent className="h-full">
                        <CarouselItem className="h-full">
                            <BalanceComparison
                                difference={difference}
                                spentPercentage={spentPercentage}
                                expensesPercentage={expensesPercentage}
                            />
                        </CarouselItem>
                        <CarouselItem className="h-full">
                            <GoalsAndObjectives
                                remainingToGoal={remainingToGoal}
                                goalName={goalName}
                                goalPercentage={goalPercentage}
                                achievedGoalsQt={achievedGoalsQt}
                            />
                        </CarouselItem>
                        <CarouselItem className="h-full">
                            <SavingsAndEconomy
                                economyPercentage={economyPercentage}
                                fixedCostPercentage={fixedCostPercentage}
                                monthsToGoal={monthsToGoal}
                                goalName={goalName}
                                amountToSave={amountToSave}
                            />
                        </CarouselItem>
                        <CarouselItem className="h-full">
                            <AlertsAndPrevention
                                openBillsvalue={openBillsvalue}
                                lateBillsAlert={lateBillsAlert}
                            />
                        </CarouselItem>
                        <CarouselItem className="h-full">
                            <RoutineAndPlanning
                                transactionsQt={transactionsQt}
                                monthlyTransactions={monthlyTransactions}
                                next7DaysBillsQt={next7DaysBillsQt}
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <div className="flex items-center justify-between gap-2 mt-4">
                        <div className="flex items-center gap-2">
                            <CarouselPrevious variant="outline" size="icon" className="text-font-foreground static" />
                            <span className="text-xs text-font-foreground">Anterior</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-font-foreground">Próximo</span>
                            <CarouselNext variant="outline" size="icon" className="text-font-foreground static" />
                        </div>
                    </div>
                </Carousel>
            </CardContent>
        </Card>
    )
}

export default FinancialInsightsCard