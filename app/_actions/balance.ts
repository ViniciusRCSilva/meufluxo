"use server"

import { db } from "../_lib/prisma"

const addToBalance = async (userId: string, amount: number) => {
    try {
        const balance = await db.balance.findFirst({
            where: {
                userId: userId
            }
        });
        if (!balance) {
            await db.balance.create({
                data: {
                    amount: amount,
                    userId: userId
                }
            });
        } else {
            await db.balance.update({
                where: {
                    id: balance.id
                },
                data: {
                    amount: balance.amount + amount
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const removeFromBalance = async (userId: string, amount: number) => {
    try {
        const balance = await db.balance.findFirst({
            where: {
                userId: userId
            }
        });
        if (!balance) {
            await db.balance.create({
                data: {
                    amount: -amount,
                    userId: userId
                }
            });
        } else {
            await db.balance.update({
                where: {
                    id: balance.id
                },
                data: {
                    amount: balance.amount - amount
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const getBalance = async (userId: string, date?: Date) => {
    try {
        const balance = await db.balance.findFirst({
            where: {
                userId: userId,
                ...(date && {
                    createdAt: {
                        lte: date
                    }
                })
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return balance;
    } catch (error) {
        console.error(error);
    }
}

export { getBalance, addToBalance, removeFromBalance }