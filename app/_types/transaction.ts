import { TransactionType, TransactionCategory, TransactionPaymentMethod } from '@prisma/client';

export type Transaction = {
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    value: number;
    category: TransactionCategory;
    type: TransactionType;
    paymentMethod: TransactionPaymentMethod;
};