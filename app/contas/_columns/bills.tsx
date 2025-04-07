"use client"

import { ColumnDef } from "@tanstack/react-table";
import { transactionValue, transactionCategory, transactionPaymentMethod } from "@/app/_utils/transactionHelper";
import ConfirmPaymentButton from "../_components/confirm-payment-button";
import { Bill } from "@prisma/client";
import { billRecurrence } from "@/app/_utils/billHelper";
import CancelRecurrenceButton from "../_components/cancel-recurrence-button";

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
        header: "",
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-end gap-2">
                    <ConfirmPaymentButton bill={row.original} />
                    {!row.getValue("isPaid") && row.getValue("recurrence") !== "NONE" && (
                        <CancelRecurrenceButton bill={row.original} />
                    )}
                </div>
            );
        },
    }
]