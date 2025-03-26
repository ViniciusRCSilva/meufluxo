"use client"

import { ColumnDef } from "@tanstack/react-table";
import { transactionValue, transactionCategory, transactionPaymentMethod } from "@/app/_utils/transactionHelper";

export const columns: ColumnDef<{ date: string; name: string; category: string; paymentMethod: string; value: number; recurrence: string; isPaid: boolean; dueDate: string; }>[] = [
    {
        accessorKey: "date",
        header: "Data",
    },
    {
        accessorKey: "name",
        header: "Descrição",
    },
    {
        accessorKey: "category",
        header: "Categoria",
        cell: ({ row }) => {
            return (
                <>
                    {transactionCategory(row.getValue("category"))}
                </>
            );
        },
    },
    {
        accessorKey: "paymentMethod",
        header: "Pagamento",
        cell: ({ row }) => {
            return (
                <>
                    {transactionPaymentMethod(row.getValue("paymentMethod"))}
                </>
            );
        },
    },
    {
        accessorKey: "value",
        header: "Valor",
        cell: ({ row }) => {
            return (
                <span>
                    {transactionValue(row.getValue("value"))}
                </span>
            );
        },
    },
    {
        accessorKey: "recurrence",
        header: "Recorrência",
        cell: ({ row }) => {
            return (
                <>
                    {row.getValue("recurrence")}
                </>
            );
        },
    },
    {
        accessorKey: "isPaid",
        header: "Pago",
        cell: ({ row }) => {
            return (
                <>
                    {row.getValue("isPaid") ? "Sim" : "Não"}
                </>
            );
        },
    },
    {
        accessorKey: "dueDate",
        header: "Vencimento",
        cell: ({ row }) => {
            return (
                <>
                    {row.getValue("dueDate")}
                </>
            );
        },
    },
]