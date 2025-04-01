import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

interface FinancialGoal {
    id: string;
    name: string;
    currentAmount: number;
    goalAmount: number;
    goalAchievedDate: Date | undefined;
    userId: string;
}

const addFinancialGoal = async (params: FinancialGoal) => {
    try {
        const achievementDate = params.currentAmount >= params.goalAmount ? new Date() : undefined;

        const newGoal = await db.financialGoal.create({
            data: {
                name: params.name,
                currentAmount: params.currentAmount,
                goalAmount: params.goalAmount,
                goalAchievedDate: achievementDate,
                userId: params.userId
            }
        });
        revalidatePath("/metas-financeiras");
        return newGoal;
    } catch (error) {
        console.error(error);
    }
}

const getFinancialGoals = async (userId: string) => {
    try {
        const goals = await db.financialGoal.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return goals;
    } catch (error) {
        console.error(error);
    }
}

const updateFinancialGoal = async (params: FinancialGoal) => {
    try {
        const goal = await db.financialGoal.findUnique({
            where: {
                id: params.id
            }
        });

        if (!goal) {
            return null;
        }

        const achievementDate = goal.currentAmount >= goal.goalAmount ? new Date() : undefined;

        const updatedGoal = await db.financialGoal.update({
            where: {
                id: params.id
            },
            data: {
                name: params.name,
                currentAmount: params.currentAmount,
                goalAmount: params.goalAmount,
                goalAchievedDate: achievementDate,
                userId: params.userId
            }
        });
        revalidatePath("/metas-financeiras");
        return updatedGoal;
    } catch (error) {
        console.error(error);
    }
}

const deleteFinancialGoal = async (id: string) => {
    try {
        const deletedGoal = await db.financialGoal.delete({
            where: {
                id: id
            }
        });
        revalidatePath("/metas-financeiras");
        return deletedGoal;
    } catch (error) {
        console.error(error);
    }
}

export {
    addFinancialGoal,
    getFinancialGoals,
    updateFinancialGoal,
    deleteFinancialGoal
}