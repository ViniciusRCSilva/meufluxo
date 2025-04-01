import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import FinancialGoalProgressBar from "./financial-goal-progress-bar"
import Link from "next/link"

interface Goal {
    name: string;
    progress: number;
}

const FinancialGoalsProgressCard = ({ goals }: { goals: Goal[] }) => {
    return (
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <Link href="/metas-financeiras" className="hover:underline hover:text-font-foreground">
                    <CardTitle className="text-xl text-font-foreground">Progresso das metas financeiras</CardTitle>
                </Link>
                <CardDescription className="text-font-muted">Acompanhe o progresso das suas principais metas.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {goals.length === 0 && (
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-font-muted">Nenhuma meta financeira cadastrada</p>
                    </div>
                )}
                {goals.map((goal) => (
                    <FinancialGoalProgressBar key={goal.name} name={goal.name} progress={goal.progress} />
                ))}
            </CardContent>
        </Card>
    )
}

export default FinancialGoalsProgressCard