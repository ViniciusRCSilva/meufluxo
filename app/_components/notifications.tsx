import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { notificationIcon } from "../_utils/notificationHelper";
import { DBNotification } from "../_types/notification";

interface NotificationProps {
    notifications: DBNotification[]
}

const Notifications = ({ notifications }: NotificationProps) => {
    const formattedNotifications = notifications.map(notification => ({
        id: notification.id,
        title: notification.title,
        type: notification.type,
        isRead: notification.isRead,
        description: notification.message,
        date: notification.createdAt.toLocaleDateString('pt-BR')
    }));

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
            <DropdownMenuContent align="end" className="mt-4 w-96 font-[family-name:var(--font-poppins)]">
                <DropdownMenuLabel >Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-80">
                    <DropdownMenuGroup className="flex flex-col gap-2 px-2">
                        {formattedNotifications.length === 0 ? (
                            <p className="text-sm text-font-foreground text-center border border-border/20 px-10 py-5 mt-4 rounded">Nenhuma notificação</p>
                        ) : (
                            formattedNotifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className="cursor-pointer p-3 hover:bg-card-foreground">
                                    <div className="flex flex-col items-start gap-3">
                                        <div className="flex items-center gap-2">
                                            {notificationIcon(notification.type)}
                                            <p className="font-semibold text-font">{notification.title}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-font-foreground">{notification.description}</p>
                                            <p className="text-xs text-font-muted">{notification.date}</p>
                                        </div>
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