"use server";

import { BillRecurrence, TransactionCategory, TransactionPaymentMethod } from "@prisma/client";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

interface Bill {
    name: string;
    value: number;
    dueDate: Date;
    category: TransactionCategory;
    paymentMethod: TransactionPaymentMethod;
    recurrence: BillRecurrence;
    isPaid: boolean;
    userId: string;
}

const addBill = async (params: Bill) => {
    try {
        const newBill = await db.bill.create({
            data: {
                name: params.name,
                value: params.value,
                dueDate: params.dueDate,
                category: params.category,
                paymentMethod: params.paymentMethod,
                recurrence: params.recurrence || "",
                isPaid: params.isPaid,
                userId: params.userId
            }
        });
        revalidatePath("/contas");
        return newBill;
    } catch (error) {
        console.error(error);
    }
}

const getBills = async (userId: string) => {
    try {
        const bills = await db.bill.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return bills;
    } catch (error) {
        console.error(error);
    }
}

const getBillsNotPaid = async (userId: string) => {
    try {
        const bills = await db.bill.findMany({
            where: {
                userId: userId,
                isPaid: false
            },
            orderBy: {
                dueDate: "asc"
            }
        });
        return bills;
    } catch (error) {
        console.error(error);
    }
}

const getNearestBill = async (userId: string) => {
    try {
        const bills = await db.bill.findMany({
            where: {
                userId: userId,
                isPaid: false
            },
            orderBy: {
                dueDate: "asc"
            }
        });
        return bills[0];
    } catch (error) {
        console.error(error);
    }
}

export {
    addBill,
    getBills,
    getBillsNotPaid,
    getNearestBill
}