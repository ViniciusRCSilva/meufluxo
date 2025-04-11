import { Banknote } from "lucide-react"
import { DialogCardTemplate } from "./dialog-card-template"

export const FinancialPreference = () => {
    return (
        <DialogCardTemplate
            title="Preferência financeira"
            icon={
                <div className="p-2 rounded-md bg-primary/10">
                    <Banknote className="h-6 w-6 text-link" />
                </div>
            }
            description="Selecionar moeda padrão, regras de limite e alertas"
        >
            Teste
        </DialogCardTemplate>
    )
}