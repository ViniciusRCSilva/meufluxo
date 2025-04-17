import { ArrowLeftRight } from "lucide-react"
import CarouselTemplate from "./carousel-template"
import { formatCurrency } from "@/app/_utils/formatCurrency"

interface BalanceComparisonProps {
    difference: number
    spentPercentage: number
    expensesPercentage: number
}

const BalanceComparison = ({ difference, spentPercentage, expensesPercentage }: BalanceComparisonProps) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-md bg-link/20">
                    <ArrowLeftRight className="h-6 w-6 text-link" />
                </div>
                <h3 className="text-xl text-font-foreground">
                    Comparativo com o mês anterior
                </h3>
            </div>
            <div className="flex-1">
                <CarouselTemplate itens={[
                    <p key="1">
                        Seu saldo {difference >= 0 ? "aumentou" : "diminuiu"} <span className="text-link font-semibold">{formatCurrency(Math.abs(difference))}</span> em relação ao mês passado.
                        {difference > 0 ? " Bom trabalho!" : ""}
                    </p>,
                    <p key="2">
                        Você {difference >= 0 ? "economizou" : "gastou"} <span className="text-link font-semibold">{spentPercentage}%</span> {difference >= 0 ? "a mais" : "a menos"} do que no mês anterior.
                        {difference >= 0 ? " Continue assim!" : ""}
                    </p>,
                    <p key="3">Suas despesas {expensesPercentage > 0 ? "aumentaram" : "diminuíram"} <span className="text-link font-semibold">{Math.abs(expensesPercentage)}%</span> em relação ao mês anterior.</p>,
                ]} />
            </div>
        </div>
    )
}

export default BalanceComparison