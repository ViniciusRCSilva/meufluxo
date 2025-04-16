import { PiggyBank } from "lucide-react"
import CarouselTemplate from "./carousel-template"
import { formatCurrency } from "@/app/_utils/formatCurrency"

interface SavingsAndEconomyProps {
    economyPercentage: number
    fixedCostPercentage: number
    monthsToGoal: number
    goalName: string
    amountToSave: number
}

const SavingsAndEconomy = ({ economyPercentage, fixedCostPercentage, monthsToGoal, goalName, amountToSave }: SavingsAndEconomyProps) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-md bg-link/20">
                    <PiggyBank className="h-6 w-6 text-link" />
                </div>
                <h3 className="text-xl text-font-foreground">
                    Poupança e economia
                </h3>
            </div>
            <div className="flex-1">
                <CarouselTemplate itens={[
                    <p key="1">
                        Você alcançou <span className='text-link font-semibold'>{economyPercentage}%</span> de economia em relação ao que recebeu este mês.
                    </p>,
                    <p key="2">
                        Seus gastos fixos representam <span className="text-link font-semibold">{fixedCostPercentage}%</span> da sua renda.
                    </p>,
                    <p key="3">
                        {amountToSave > 0 ? (
                            <>
                                Considere guardar <span className="text-link font-semibold">{formatCurrency(amountToSave)}</span> por semana para bater a meta &quot;{goalName}&quot; <span className="text-link font-semibold">{monthsToGoal === 0 ? "em algumas semanas" : `em aproximadamente ${monthsToGoal !== 1 ? `${monthsToGoal} meses` : `${monthsToGoal} mês`}.`}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-font-muted">Você ainda não definiu metas.</span>
                            </>
                        )}
                    </p>,
                ]} />
            </div>
        </div>
    )
}

export default SavingsAndEconomy