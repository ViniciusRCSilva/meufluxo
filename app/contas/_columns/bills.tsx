"use client"

import { ColumnDef } from "@tanstack/react-table";
import { transactionValue, transactionCategory, transactionPaymentMethod } from "@/app/_utils/transactionHelper";
import ConfirmPaymentButton from "../_components/confirm-payment-button";
import { Bill } from "@prisma/client";
import { billRecurrence } from "@/app/_utils/billHelper";

export const columns: ColumnDef<Bill>[] = [
    {
        accessorKey: "createdAt",
        header: "Data de criação",
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as Date;
            return <>{date.toLocaleDateString("pt-BR")}</>;
        },
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
                    {billRecurrence(row.getValue("recurrence"))}
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
                    {(row.getValue("dueDate") as Date).toLocaleDateString("pt-BR")}
                </>
            );
        },
    },
    {
        accessorKey: "isPaid",
        header: "Pago",
        cell: ({ row }) => {
            return (
                <ConfirmPaymentButton bill={row.original} />
            );
        },
    }
]