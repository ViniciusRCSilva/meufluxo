import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import FinancialGoalProgressBar from "./financial-goal-progress-bar"

const FinancialGoalsProgressCard = () => {
    const goals = [
        {
            title: "Viagem",
            progress: 50
        },
        {
            title: "Reserva",
            progress: 75
        },
        {
            title: "Investimento",
            progress: 25
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-font-foreground font-[family-name:var(--font-poppins)]">Progresso das metas financeiras</CardTitle>
                <CardDescription className="text-font-muted font-[family-name:var(--font-poppins)]">Acompanhe o progresso das suas principais metas.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {goals.map((goal) => (
                    <FinancialGoalProgressBar key={goal.title} title={goal.title} progress={goal.progress} />
                ))}
            </CardContent>
        </Card>
    )
}

export default FinancialGoalsProgressCard