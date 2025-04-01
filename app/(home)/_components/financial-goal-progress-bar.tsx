import { Progress } from "@/app/_components/ui/progress"

interface FinancialGoalProgressBarProps {
    name: string;
    progress: number;
}

const FinancialGoalProgressBar = ({ name, progress }: FinancialGoalProgressBarProps) => {
    return (
        <div className="grid grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_4fr_1fr] gap-4 items-center">
            <p className="text-font w-20 lg:w-40 text-ellipsis overflow-hidden font-[family-name:var(--font-poppins)] text-left">{name}</p>
            <Progress value={progress} />
            <p className="text-font-muted font-[family-name:var(--font-poppins)] text-right">{progress}%</p>
        </div>
    )
}

export default FinancialGoalProgressBar
