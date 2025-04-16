import { AlertTriangle } from "lucide-react"
import CarouselTemplate from "./carousel-template"

const AlertsAndPrevetion = () => {
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
                <CarouselTemplate itens={[
                    <p key="1">Você está próximo de ultrapassar o limite de gastos em &quot;Alimentação&quot;.</p>,
                    <p key="2">Faltam R$ 300,00 para atingir o teto de despesas mensais.</p>,
                ]} />
            </div>
        </div>
    )
}

export default AlertsAndPrevetion