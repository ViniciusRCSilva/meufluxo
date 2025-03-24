import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import FinancialGoalProgressBar from "./financial-goal-progress-bar"
import Link from "next/link"

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
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <Link href="/metas-financeiras" className="hover:underline hover:text-font-foreground">
                    <CardTitle className="text-xl text-font-foreground">Progresso das metas financeiras</CardTitle>
                </Link>
                <CardDescription className="text-font-muted">Acompanhe o progresso das suas principais metas.</CardDescription>
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