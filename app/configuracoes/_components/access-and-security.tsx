import { Lock } from "lucide-react"
import { DialogCardTemplate } from "./dialog-card-template"

export const AccessAndSecurity = () => {
    return (
        <DialogCardTemplate
            title="Segurança e acesso"
            icon={
                <div className="p-2 rounded-md bg-primary/10">
                    <Lock className="h-6 w-6 text-link" />
                </div>
            }
            description="Autenticação em dois fatores, sessões ativas e histórico de login"
        >
            Teste
        </DialogCardTemplate>
    )
}