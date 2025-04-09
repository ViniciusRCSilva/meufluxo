"use client"

import { Pie, PieChart } from "recharts"

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

interface ChartItem {
    expenseName: string
    expenses: number
    fill: string
}

interface ExpensesDivisionCardProps {
    data: ChartItem[]
}

const chartConfig = {
    expenses: {
        label: "Despesas",
    },
} satisfies ChartConfig

export function ExpensesDivisionCard({ data }: ExpensesDivisionCardProps) {
    return (
        <Card className="flex flex-col font-[family-name:var(--font-poppins)]">
            <CardHeader className="items-center pb-0">
                <Link href="/transacoes" className="hover:underline hover:text-font-foreground">
                    <CardTitle className="text-xl text-font-foreground">Despesas do mês</CardTitle>
                </Link>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-h-[200px] px-0"
                >
                    {data.length === 0 ? (
                        <div className="flex items-center justify-center h-[200px] text-font-muted">
                            Nenhuma despesa para exibir
                        </div>
                    ) : (
                        <PieChart>
                            <ChartTooltip
                                content={({ payload }) => {
                                    if (payload && payload.length > 0) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="rounded-lg bg-background p-2 shadow-md border border-border font-[family-name:var(--font-poppins)]">
                                                <div className="flex items-center gap-1">
                                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.fill }} />
                                                    <p className="text-font-foreground font-semibold">
                                                        {transactionCategory(data.expenseName)}
                                                    </p>
                                                </div>
                                                <p className="text-font-foreground text-sm">
                                                    {formatCurrency(data.expenses)}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Pie
                                data={data}
                                dataKey="expenses"
                                labelLine={false}
                                label={({ payload, ...props }) => {
                                    return (
                                        <text
                                            cx={props.cx}
                                            cy={props.cy}
                                            x={props.x}
                                            y={props.y}
                                            textAnchor={props.textAnchor}
                                            dominantBaseline={props.dominantBaseline}
                                            fill="var(--font)"
                                            className="text-sm font-semibold"
                                        >
                                            {formatCurrency(payload.expenses)}
                                        </text>
                                    )
                                }}
                                nameKey={(item) => <p className="text-font">{transactionCategory(item.expenseName)}</p>}
                            />
                        </PieChart>
                    )}
                </ChartContainer>
            </CardContent>
            {data.length > 0 && (
                <CardFooter className="grid grid-cols-2 gap-2 text-sm">
                    {data.map((item) => (
                        <div key={item.expenseName} className="flex items-center justify-center gap-2">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                            <span className="text-font">{transactionCategory(item.expenseName)}</span>
                        </div>
                    ))}
                </CardFooter>
            )}
        </Card>
    )
}
