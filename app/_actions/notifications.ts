"use server"

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma"
import { NotificationType } from "../_types/notification"
import { getUserPreferences } from "./user-preferences"

interface Notification {
    title: string;
    message: string;
    isRead: boolean;
    type: NotificationType;
    userId: string;
}

const addNotification = async (notification: Notification) => {
    try {
        const userPreferences = await getUserPreferences(notification.userId);

        if (!userPreferences?.isNotificationsActive) {
            return;
        }

        await db.notification.create({
            data: notification
        })
        revalidatePath("/")
    } catch (error) {
        console.error("Erro ao adicionar notificação:", error)
    }
}

const getNotifications = async (userId: string) => {
    try {
        const notifications = await db.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return notifications
    } catch (error) {
        console.error("Erro ao buscar notificações:", error)
        return []
    }
}

const markNotificationAsRead = async (notificationId: string) => {
    try {
        await db.notification.update({
            where: {
                id: notificationId
            },
            data: {
                isRead: true
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.error("Erro ao marcar notificação como lida:", error)
    }
}

const markAllNotificationsAsRead = async (userId: string) => {
    try {
        await db.notification.updateMany({
            where: {
                userId
            },
            data: {
                isRead: true
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.error("Erro ao marcar todas as notificações como lidas:", error)
    }
}

const deleteNotifications = async (userId: string) => {
    try {
        await db.notification.deleteMany({
            where: {
                userId
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.error("Erro ao excluir notificações:", error)
    }
}

export {
    addNotification,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotifications
}