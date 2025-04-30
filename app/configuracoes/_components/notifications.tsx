"use client"

import { Bell } from "lucide-react"
import { DialogCardTemplate } from "./dialog-card-template"
import { Switch } from "@/app/_components/ui/switch"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { getUserPreferences, updateUserNotificationPreferences } from "../../_actions/user-preferences"

export const Notifications = () => {
    const { userId } = useAuth();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    useEffect(() => {
        const loadPreferences = async () => {
            if (!userId) return;
            const preferences = await getUserPreferences(userId);
            setIsNotificationsEnabled(preferences.isNotificationsActive);
        };

        loadPreferences();
    }, [userId]);

    const handleNotificationsChange = async (enabled: boolean) => {
        if (!userId) return;

        setIsNotificationsEnabled(enabled);

        await updateUserNotificationPreferences(userId, enabled);
    };

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
            <div className="flex flex-col space-y-2">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Notificações do sistema</p>
                    <p className="text-sm text-font-foreground">
                        Receba alertas sobre suas transações, contas e metas financeiras
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <p className={`text-sm ${!isNotificationsEnabled ? 'text-font' : 'text-font-muted'} transition-colors`}>Desativado</p>
                    <Switch
                        checked={isNotificationsEnabled}
                        onCheckedChange={handleNotificationsChange}
                    />
                    <p className={`text-sm ${isNotificationsEnabled ? 'text-font' : 'text-font-muted'} transition-colors`}>Ativado</p>
                </div>
            </div>
        </DialogCardTemplate>
    )
}