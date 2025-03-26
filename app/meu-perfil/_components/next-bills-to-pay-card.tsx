"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import Link from "next/link";

interface NextBillsToPayCardProps {
    bills: {
        name: string;
        date: string;
        value: number;
    }[]
}

const NextBillsToPayCard = ({ bills }: NextBillsToPayCardProps) => {
    return (
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <Link href="/contas" className="hover:underline hover:text-font-foreground">
                    <CardTitle className="text-xl text-font-foreground">Próximas contas</CardTitle>
                </Link>
                <CardDescription className="text-font-muted">Contas que vencem em breve</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-around h-full">
                {bills.length > 0 ? (
                    bills.map((bill) => (
                        <div className="flex flex-col gap-2 mb-2" key={bill.name}>
                            <div className="flex justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-font w-40 overflow-hidden text-ellipsis">{bill.name}</span>
                                    <span className="text-sm text-font-muted">{bill.date}</span>
                                </div>
                                <span className="font-semibold text-destructive">R$ {bill.value.toLocaleString()}</span>
                            </div>
                            <Separator />
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center h-full">
                        <span className="text-font-muted">Nenhuma conta encontrada.</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default NextBillsToPayCard;