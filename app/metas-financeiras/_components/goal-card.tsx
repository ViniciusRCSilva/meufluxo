"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { formatCurrency } from "@/app/_utils/formatCurrency"
import { useCurrencyPreference } from "@/app/_hooks/useCurrencyPreference"
import { Progress } from "@/app/_components/ui/progress"
import EditGoalButton from "./edit-goal-button"
import DeleteGoalButton from "./delete-goal-button"
import { Calendar } from "lucide-react"

interface UserId {
    userId: string
}

interface UserBalance {
    balance: number
}

interface GoalCardProps {
    id: string
    name: string
    createdAt: Date
    goalAchievedDate?: Date | null
    currentAmount: number
    goalAmount: number
}

const GoalCard = ({ id, name, createdAt, goalAchievedDate, currentAmount, goalAmount, userId, balance }: GoalCardProps & UserId & UserBalance) => {
    const { currencyType } = useCurrencyPreference();
    const formattedCurrentAmount = formatCurrency({ value: currentAmount, currencyType })
    const formattedGoalAmount = formatCurrency({ value: goalAmount, currencyType })
    const goalPercentage = (currentAmount / goalAmount) * 100
    const goal = { id: id, name: name, createdAt: createdAt, goalAchievedDate: goalAchievedDate, currentAmount: currentAmount, goalAmount: goalAmount }

    return (
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-semibold text-font-foreground">
                            {name}
                        </h1>

                        <p className="text-sm text-font-muted font-light">
                            {goalPercentage >= 100 ?
                                (<span className="text-success flex items-center gap-1"><Calendar className="w-4 h-4" /> Meta atingida em {goalAchievedDate?.toLocaleDateString()}</span>)
                                :
                                (<span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Criada em {createdAt.toLocaleDateString()}</span>)
                            }
                        </p>
                    </div>
                    <div className="space-x-2">
                        <EditGoalButton userId={userId} balance={balance} goal={goal} />
                        <DeleteGoalButton id={id} goalName={name} goalCurrentAmount={currentAmount} userId={userId} />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-font-muted">Progresso: <span className={`${goalPercentage >= 100 ? "text-font" : "text-font-foreground"}`}>{formattedCurrentAmount}</span> / <span className="text-font">{formattedGoalAmount}</span></p>
                <div className={`flex flex-col gap-2 text-font ${goalPercentage >= 100 && "text-success"}`}>
                    <Progress
                        className="h-2"
                        value={goalPercentage}
                    />
                    <p className="text-xs font-medium w-fit px-2 py-0.5 rounded-full bg-link/10 text-link">{goalPercentage.toFixed(2)}%</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default GoalCard