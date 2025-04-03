"use server"

import { db } from "../_lib/prisma"
import { NotificationType } from "../_types/notification"

interface Notification {
    title: string;
    message: string;
    isRead: boolean;
    type: NotificationType;
    userId: string;
}

const addNotification = async (notification: Notification) => {
    try {
        await db.notification.create({
            data: notification
        })
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