"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/app/_components/ui/chart"

interface ChartData {
    month: string
    revenue: number
    expenses: number
}

interface BarchartRevenueAndExpensesProps {
    data: ChartData[]
}

const chartConfig = {
    revenue: {
        label: "Receita",
        color: "var(--color-success)",
    },
    expenses: {
        label: "Despesa",
        color: "var(--color-destructive)",
    },
} satisfies ChartConfig

export function BarchartRevenueAndExpenses({ data }: BarchartRevenueAndExpensesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-font-foreground font-semibold font-[family-name:var(--font-poppins)]">Entradas x Saídas</CardTitle>
                <CardDescription className="text-font-muted font-[family-name:var(--font-poppins)]">Mostrando dados de {data[0].month} a {data[data.length - 1].month}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full max-h-[220px] px-0">
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            className="font-[family-name:var(--font-poppins)] capitalize"
                        />
                        <YAxis
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                            className="font-[family-name:var(--font-poppins)]"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" className="text-font font-[family-name:var(--font-poppins)] capitalize" />}
                        />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
