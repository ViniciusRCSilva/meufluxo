import { NextResponse } from "next/server";
import { db } from "@/app/_lib/prisma";
import { notifyNearbyBill } from "@/app/_helpers/billHelper";

export async function GET() {
    try {
        console.log('Iniciando verificação de contas...');

        // Busca todas as contas não pagas do banco
        const bills = await db.bill.findMany({
            where: {
                isPaid: false
            }
        });

        console.log(`Encontradas ${bills.length} contas não pagas`);

        // Testa a notificação para cada conta
        const results = await Promise.all(
            bills.map(async (bill) => {
                console.log(`\nProcessando conta: ${bill.name}`);
                await notifyNearbyBill(bill);
                return {
                    billName: bill.name,
                    dueDate: bill.dueDate,
                    userId: bill.userId
                };
            })
        );

        return NextResponse.json({
            success: true,
            message: "Verificação de contas concluída",
            totalBills: bills.length,
            checkedBills: results
        });
    } catch (error) {
        console.error("Erro ao testar notificações:", error);
        return NextResponse.json(
            { error: "Erro ao testar notificações", details: JSON.stringify(error, null, 2) },
            { status: 500 }
        );
    }
}