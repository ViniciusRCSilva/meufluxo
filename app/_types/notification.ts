export type NotificationType = 'BILL' | 'FINANCIAL_GOAL' | 'TRANSACTION';

export interface DBNotification {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    type: NotificationType;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}