import { Progress } from "@/app/_components/ui/progress"

interface FinancialGoalProgressBarProps {
    name: string;
    progress: number;
}

const FinancialGoalProgressBar = ({ name, progress }: FinancialGoalProgressBarProps) => {
    return (
        <div className="group relative p-4 rounded-lg hover:bg-muted/40 transition-colors">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-font-foreground font-medium text-sm truncate max-w-[180px] lg:max-w-[240px]">
                        {name}
                    </p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-link/10 text-link">
                        {progress.toFixed(1)}%
                    </span>
                </div>
                <div className="relative">
                    <Progress
                        value={progress}
                        className="h-2 bg-muted"
                    />
                </div>
            </div>
        </div>
    )
}

export default FinancialGoalProgressBar
