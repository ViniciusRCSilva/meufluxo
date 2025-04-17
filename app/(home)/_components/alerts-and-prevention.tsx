import { AlertTriangle } from "lucide-react"
import CarouselTemplate from "./carousel-template"
import { formatCurrency } from "@/app/_utils/formatCurrency"

interface AlertsAndPreventionProps {
    openBillsvalue: number
    lateBillsAlert: {
        name: string
        dueDate: Date
    } | null
}

const AlertsAndPrevention = ({ openBillsvalue, lateBillsAlert }: AlertsAndPreventionProps) => {
    // Formata a data de vencimento para dd/mm/yyyy
    const formatDueDate = (date: Date) => {
        return new Date(date).toLocaleDateString('pt-BR')
    }

    // Prepara os alertas baseado nos dados
    const alerts = []

    // Alerta de contas em aberto
    if (openBillsvalue > 0) {
        alerts.push(
            <p key="open-bills">
                Você tem <span className="text-link font-semibold">{formatCurrency(openBillsvalue)}</span> em contas em aberto.
            </p>
        )
    }

    // Alerta de contas atrasadas
    if (lateBillsAlert?.name && lateBillsAlert?.dueDate) {
        alerts.push(
            <p key="late-bill">
                A conta <span className="text-link font-semibold">{lateBillsAlert.name}</span> está atrasada desde {formatDueDate(lateBillsAlert.dueDate)}.
            </p>
        )
    }

    // Se não houver alertas, mostra mensagem padrão
    if (alerts.length === 0) {
        alerts.push(
            <p key="no-alerts" className="text-font-foreground">
                Não há alertas no momento. Continue mantendo suas contas em dia!
            </p>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-md bg-link/20">
                    <AlertTriangle className="h-6 w-6 text-link" />
                </div>
                <h3 className="text-xl text-font-foreground">
                    Alertas e prevenção
                </h3>
            </div>
            <div className="flex-1">
                <CarouselTemplate itens={alerts} />
            </div>
        </div>
    )
}

export default AlertsAndPrevention