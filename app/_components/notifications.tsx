"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Bell, Check, Eye, Loader2, Trash } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { notificationIcon } from "../_utils/notificationHelper";
import { DBNotification } from "../_types/notification";
import { deleteNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "../_actions/notifications";
import { Button } from "./ui/button";
import { useState } from "react";

interface NotificationProps {
    notifications: DBNotification[]
}

interface UserId {
    userId: string
}

const Notifications = ({ notifications, userId }: NotificationProps & UserId) => {
    const [loading, setLoading] = useState(false)

    const formattedNotifications = notifications.map(notification => ({
        id: notification.id,
        title: notification.title,
        type: notification.type,
        isRead: notification.isRead,
        description: notification.message,
        date: notification.createdAt.toLocaleDateString('pt-BR')
    }));

    const handleMarkAsRead = async (notificationId: string) => {
        setLoading(true)
        await markNotificationAsRead(notificationId)
        setLoading(false)
    }

    const handleMarkAllAsRead = async () => {
        setLoading(true)
        await markAllNotificationsAsRead(userId)
        setLoading(false)
    }

    const handleDeleteAllNotifications = async () => {
        setLoading(true)
        await deleteNotifications(userId)
        setLoading(false)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer group">
                <div className="relative">
                    <Bell className="w-5 h-5 text-font-foreground group-hover:text-font transition-colors" />
                    {notifications.some(notification => !notification.isRead) && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-link" />
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-4 w-[450px] font-[family-name:var(--font-poppins)]">
                <div className="space-y-4 p-2">
                    <div className="flex items-center justify-between">
                        <DropdownMenuLabel className="px-0">Notificações</DropdownMenuLabel>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!notifications.some(notification => !notification.isRead) || loading}
                                className="text-link h-8"
                                onClick={handleMarkAllAsRead}
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Eye className="w-4 h-4 mr-2" />
                                )}
                                Marcar todas
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={notifications.length === 0 || loading}
                                className="text-destructive h-8"
                                onClick={handleDeleteAllNotifications}
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash className="w-4 h-4 mr-2" />
                                )}
                                Limpar
                            </Button>
                        </div>
                    </div>
                    <DropdownMenuSeparator className="my-0" />
                </div>
                <ScrollArea className="h-80">
                    <DropdownMenuGroup className="flex flex-col gap-2 px-2">
                        {formattedNotifications.length === 0 ? (
                            <p className="text-sm text-font-foreground text-center border border-border/20 px-10 py-5 mt-4 rounded">Nenhuma notificação</p>
                        ) : (
                            formattedNotifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className="cursor-pointer p-3 hover:bg-card-foreground" onSelect={(e) => e.preventDefault()}>
                                    <div className="flex flex-col items-start gap-3">
                                        <div className="flex items-center gap-2">
                                            {notificationIcon(notification.type)}
                                            <p className="font-semibold text-font">{notification.title}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-font-foreground">{notification.description}</p>
                                            <p className="text-xs text-font-muted">{notification.date}</p>
                                        </div>
                                        {notification.isRead ? (
                                            <Button variant="outline" disabled className="text-link">
                                                <Check className="w-4 h-4" />
                                                Lida
                                            </Button>
                                        ) : (
                                            <Button variant="outline" disabled={loading} className="text-link" onClick={() => handleMarkAsRead(notification.id)}>
                                                {loading ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                                Marcar como lida
                                            </Button>
                                        )}
                                    </div>
                                </DropdownMenuItem>
                            ))
                        )}
                    </DropdownMenuGroup>
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;