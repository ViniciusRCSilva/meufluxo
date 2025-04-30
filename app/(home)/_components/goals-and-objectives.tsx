"use client"

import { Target } from "lucide-react"
import CarouselTemplate from "./carousel-template"
import { formatCurrency } from "@/app/_utils/formatCurrency"
import { useCurrencyPreference } from "@/app/_hooks/useCurrencyPreference"

interface GoalsAndObjectivesProps {
    remainingToGoal: number
    goalName: string
    goalPercentage: number
    achievedGoalsQt: number
}

const GoalsAndObjectives = ({ remainingToGoal, goalName, goalPercentage, achievedGoalsQt }: GoalsAndObjectivesProps) => {
    const { currencyType } = useCurrencyPreference();

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-md bg-link/20">
                    <Target className="h-6 w-6 text-link" />
                </div>
                <h3 className="text-xl text-font-foreground">
                    Metas e objetivos
                </h3>
            </div>
            <div className="flex-1">
                {(remainingToGoal || goalPercentage || achievedGoalsQt) > 0 ? (
                    <CarouselTemplate itens={[
                        <p key="1">
                            Faltam <span className="text-link font-semibold">{formatCurrency({ value: remainingToGoal, currencyType })}</span> para alcançar sua meta &quot;{goalName}&quot;.
                        </p>,
                        <p key="2">
                            Você concluiu <span className="text-link font-semibold">{goalPercentage}%</span> da sua meta &quot;{goalName}&quot;.
                        </p>,
                        <p key="3">
                            {achievedGoalsQt > 1 ? "Parabéns! Você completou" : "Você completou"} <span className="text-link font-semibold">{achievedGoalsQt}</span> {achievedGoalsQt !== 1 ? "metas" : "meta"} este mês.
                        </p>,
                    ]} />
                ) : (
                    <>
                        <p key="1" className="text-font-muted">
                            Você ainda não definiu metas.
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default GoalsAndObjectives