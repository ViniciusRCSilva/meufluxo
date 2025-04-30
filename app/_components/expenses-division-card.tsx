"use client"

import {
    Cell, 
    Pie, 
    PieChart 
} from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/app/_components/ui/chart"
import { transactionCategory } from "../_helpers/transactionHelper"
import Link from "next/link"

import { formatCurrency } from "../_utils/formatCurrency"
import { useCurrencyPreference } from "../_hooks/useCurrencyPreference"

interface ChartItem {
    expenseName: string
    expenses: number
    fill: string
}

interface ExpensesDivisionCardProps {
    data: ChartItem[]
    title: "mês" | "ano"
}

const chartConfig = {
    expenses: {
        label: "Despesas",
    },
} satisfies ChartConfig

export const ExpensesDivisionCard = ({ data, title }: ExpensesDivisionCardProps) => {
    const { currencyType } = useCurrencyPreference();
    return (
        <Card className="flex flex-col font-[family-name:var(--font-poppins)]">
            <CardHeader className="items-center pb-0">
                <Link href="/transacoes" className="hover:underline hover:text-font-foreground">
                    <CardTitle className="text-xl text-font-foreground">Despesas do {title}</CardTitle>
                </Link>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto h-[200px] px-0"
                >
                    {data.length === 0 ? (
                        <div className="flex items-center justify-center h-[200px] text-font-muted">
                            Nenhuma despesa para exibir
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <PieChart
                                width={300}
                                height={200}
                            >
                                <ChartTooltip
                                    content={({ payload }) => {
                                        if (payload && payload.length > 0) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="rounded-lg bg-background p-2 shadow-md border border-border font-[family-name:var(--font-poppins)]">
                                                    <div className="flex items-center gap-1">
                                                        <div
                                                            className="h-3 w-3 rounded-sm"
                                                            style={{
                                                                backgroundColor: data.fill,
                                                            }}
                                                        />
                                                        <span className="text-font-foreground font-semibold">
                                                            {transactionCategory(data.expenseName)}
                                                        </span>
                                                    </div>
                                                    <div className="mt-1 text-font-foreground text-sm">
                                                        {formatCurrency({ value: data.expenses, currencyType })}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Pie
                                    data={data}
                                    dataKey="expenses"
                                    nameKey="expenseName"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={35}
                                    outerRadius={70}
                                    labelLine={false}
                                >
                                    {data.map((entry) => (
                                        <Cell
                                            key={entry.expenseName}
                                            fill={entry.fill}
                                            stroke={entry.fill}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                    )}
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {data.map((entry) => (
                        <div key={entry.expenseName} className="flex flex-col items-center">
                            <div className="flex items-center gap-2">
                                <div
                                    className="h-3 w-3 rounded-sm"
                                    style={{ backgroundColor: entry.fill }}
                                />
                                <span className="text-sm text-font-foreground font-semibold">
                                    {transactionCategory(entry.expenseName)}
                                </span>
                            </div>
                            <span className="text-sm text-font-foreground">
                                {formatCurrency({ value: entry.expenses, currencyType })}
                            </span>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}
