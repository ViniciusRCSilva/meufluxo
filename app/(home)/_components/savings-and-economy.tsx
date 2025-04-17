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
                        {economyPercentage > 0 ? (
                            <>Você conseguiu economizar <span className='text-link font-semibold'>{economyPercentage}%</span> da sua renda este mês. {economyPercentage >= 20 ? "Excelente trabalho!" : "Continue assim!"}</>
                        ) : (
                            <>Suas despesas superaram sua renda em <span className='text-link font-semibold'>{Math.abs(economyPercentage)}%</span>. Tente reduzir alguns gastos.</>
                        )}
                    </p>,
                    <p key="2">
                        {fixedCostPercentage > 0 ? (
                            <>Seus gastos fixos mensais consomem <span className="text-link font-semibold">{fixedCostPercentage}%</span> da sua renda. {fixedCostPercentage > 50 ? "Considere revisar alguns gastos." : "Está dentro do recomendado."}</>
                        ) : (
                            <>Você não tem gastos fixos registrados.</>
                        )}
                    </p>,
                    <p key="3">
                        {amountToSave > 0 ? (
                            <>
                                Para atingir sua meta &quot;{goalName}&quot;, sugerimos guardar <span className="text-link font-semibold">{formatCurrency(amountToSave)}</span> por mês. {monthsToGoal > 0 ? `Assim você alcançará o objetivo em aproximadamente ${monthsToGoal !== 1 ? `${monthsToGoal} meses` : `${monthsToGoal} mês`}.` : ""}
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