import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { formatCurrency } from "@/app/_utils/formatCurrency"
import { Progress } from "@/app/_components/ui/progress"

interface GoalCardProps {
    name: string
    createdAt: Date
    goalAchievedDate?: Date | null
    currentAmount: number
    goalAmount: number
}

const GoalCard = ({ name, createdAt, goalAchievedDate, currentAmount, goalAmount }: GoalCardProps) => {
    const formattedCurrentAmount = formatCurrency(currentAmount)
    const formattedGoalAmount = formatCurrency(goalAmount)
    const goalPercentage = (currentAmount / goalAmount) * 100

    return (
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-font-foreground">
                        {name}
                    </h1>

                    <p className="text-sm text-font-muted font-light">
                        {goalPercentage >= 100 ?
                            (<span className="text-success">Meta atingida em {goalAchievedDate?.toLocaleDateString()}</span>)
                            :
                            "Criada em " + createdAt.toLocaleDateString()
                        }
                    </p>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-font-muted">Progresso: <span className={`${goalPercentage >= 100 ? "text-font" : "text-font-foreground"}`}>{formattedCurrentAmount}</span> / <span className="text-font">{formattedGoalAmount}</span></p>
                <div className={`flex flex-col gap-2 text-font ${goalPercentage >= 100 && "text-success"}`}>
                    <Progress
                        className="h-2"
                        value={goalPercentage}
                    />
                    <p className="text-sm">{goalPercentage.toFixed(2)}%</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default GoalCard