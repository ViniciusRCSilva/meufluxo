"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Separator } from "./ui/separator";

interface LastTransactionsCardProps {
    transactions: {
        name: string;
        date: string;
        type: "DEPOSIT" | "EXPENSE" | "INVESTMENT";
        value: number;
    }[]
}

const LastTransactionsCard = ({ transactions }: LastTransactionsCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-font-muted font-[family-name:var(--font-poppins)]">Últimas transações</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-around h-full">
                {transactions.map((transaction) => (
                    <div className="flex flex-col gap-2 mb-2 lg:mb-0" key={transaction.name}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-font w-40 overflow-hidden text-ellipsis font-[family-name:var(--font-poppins)]">{transaction.name}</span>
                                <span className="text-sm text-font-muted font-[family-name:var(--font-poppins)]">{transaction.date}</span>
                            </div>
                            <span className={`font-semibold font-[family-name:var(--font-poppins)] ${transaction.type === "DEPOSIT" ? "text-success" : "text-destructive"}`}>{transaction.type === "DEPOSIT" ? "+" : "-"}R${transaction.value.toLocaleString()}</span>
                        </div>
                        <Separator />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default LastTransactionsCard
