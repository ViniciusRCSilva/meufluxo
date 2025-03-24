"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/_components/ui/card"
import { Separator } from "./ui/separator";
import Link from "next/link";

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
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <Link href="/transacoes" className="hover:underline hover:text-font-foreground">
                    <CardTitle className="text-xl text-font-foreground">Últimas transações</CardTitle>
                </Link>
                <CardDescription className="text-font-muted">Transações realizadas recentemente</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-around h-full">
                {transactions.map((transaction) => (
                    <div className="flex flex-col gap-2 mb-2 lg:mb-0" key={transaction.name}>
                        <div className="flex justify-between gap-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-font w-40 overflow-hidden text-ellipsis">{transaction.name}</span>
                                <span className="text-sm text-font-muted">{transaction.date}</span>
                            </div>
                            <span className={`font-semibold ${transaction.type === "DEPOSIT" ? "text-success" : "text-destructive"}`}>{transaction.type === "DEPOSIT" ? "+" : "-"}R$ {transaction.value.toLocaleString()}</span>
                        </div>
                        <Separator />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default LastTransactionsCard
