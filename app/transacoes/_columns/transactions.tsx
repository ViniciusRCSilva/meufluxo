"use client"

import { ColumnDef } from "@tanstack/react-table";
import { HelpCircle } from "lucide-react";
import { transactionType, transactionValue, transactionCategory, transactionPaymentMethod } from "@/app/_helpers/transactionHelper";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_components/ui/tooltip";

export const columns: ColumnDef<{ date: string; name: string; category: string; paymentMethod: string; value: number; type: string; }>[] = [
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
        header: ({ }) => (
            <span className="flex items-center gap-2">
                Valor
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-font-muted cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="w-96 text-center">
                            <p>Todo valor de transações de depósito, despesa e investimento será acrescentado ou subtraído do seu saldo</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </span>
        ),
        cell: ({ row }) => {
            return (
                <span className={row.getValue("type") === "DEPOSIT" ? "text-success" : "text-destructive"}>
                    {row.getValue("type") === "DEPOSIT" ? "+ " : "- "} {transactionValue(row.getValue("value"))}
                </span>
            );
        },
    },
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {
            return (
                <>
                    {transactionType(row.getValue("type"))}
                </>
            );
        },
    },
]