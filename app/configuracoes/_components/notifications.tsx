import { Bell } from "lucide-react"
import { DialogCardTemplate } from "./dialog-card-template"

export const Notifications = () => {
    return (
        <DialogCardTemplate
            title="Notificações"
            icon={
                <div className="p-2 rounded-md bg-primary/10">
                    <Bell className="h-6 w-6 text-link" />
                </div>
            }
            description="Ativar ou desativar notificações"
        >
            Teste
        </DialogCardTemplate>
    )
}