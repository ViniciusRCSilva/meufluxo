import { Calendar } from "lucide-react"
import CarouselTemplate from "./carousel-template"

interface RoutineAndPlanningProps {
    transactionsQt: number
    monthlyTransactions: number
    next7DaysBillsQt: number
}

const RoutineAndPlanning = ({ transactionsQt, monthlyTransactions, next7DaysBillsQt }: RoutineAndPlanningProps) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-md bg-link/20">
                    <Calendar className="h-6 w-6 text-link" />
                </div>
                <h3 className="text-xl text-font-foreground">
                    Rotina e planejamento
                </h3>
            </div>
            <div className="flex-1">
                <CarouselTemplate itens={[
                    <p key="1">
                        Você realizou <span className="text-link font-semibold">{transactionsQt} transações</span> no total. Nos últimos dois meses, sua média foi de <span className="text-link font-semibold">{monthlyTransactions} transações</span> por mês.
                    </p>,
                    <p key="2">
                        Planeje os próximos gastos: {
                            next7DaysBillsQt === 0 ?
                                <><span className="text-link font-semibold">Nenhuma conta</span> está prestes a vencer nos próximos 7 dias</> :
                                <><span className="text-link font-semibold">{next7DaysBillsQt !== 1 ? `${next7DaysBillsQt} contas` : `${next7DaysBillsQt} conta`}</span> {next7DaysBillsQt !== 1 ? 'vencem' : 'vence'} nos próximos 7 dias.</>
                        }
                    </p>,
                ]} />
            </div>
        </div>
    )
}

export default RoutineAndPlanning