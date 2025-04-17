"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { TransactionCategory, TransactionType, TransactionPaymentMethod } from "@prisma/client"
import { addToBalance, removeFromBalance } from "./balance";

interface Transaction {
    name: string;
    value: number;
    category: TransactionCategory;
    type: TransactionType;
    paymentMethod: TransactionPaymentMethod;
    userId: string;
}

const addTransaction = async (params: Transaction) => {
    try {
        if (params.type === TransactionType.EXPENSE) {
            await removeFromBalance(params.userId, params.value);
        } else if (params.type === TransactionType.DEPOSIT) {
            await addToBalance(params.userId, params.value);
        }

        const newTransaction = await db.transaction.create({
            data: {
                name: params.name,
                value: params.value,
                category: params.category,
                type: params.type,
                paymentMethod: params.paymentMethod,
                userId: params.userId
            }
        });

        revalidatePath("/transacoes");
        return newTransaction;
    } catch (error) {
        console.error(error);
    }
}

const getTransactions = async (userId: string, orderBy?: "asc" | "desc") => {
    try {
        const transactions = await db.transaction.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: orderBy || "desc"
            }
        });
        return transactions;
    } catch (error) {
        console.error(error);
    }
}

export {
    addTransaction,
    getTransactions
}