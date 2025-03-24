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

const chartData = [
    { month: "Janeiro", revenue: 186, expenses: 80 },
    { month: "Fevereiro", revenue: 305, expenses: 200 },
    { month: "Março", revenue: 237, expenses: 120 },
    { month: "Abril", revenue: 73, expenses: 190 },
    { month: "Maio", revenue: 209, expenses: 130 },
    { month: "Junho", revenue: 214, expenses: 140 },
]

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

export function BarchartRevenueAndExpenses() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-font-foreground font-semibold font-[family-name:var(--font-poppins)]">Receitas x Despesas</CardTitle>
                <CardDescription className="text-font-muted font-[family-name:var(--font-poppins)]">Janeiro - Junho 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full max-h-[220px] px-0">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            className="font-[family-name:var(--font-poppins)]"
                        />
                        <YAxis
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value.toLocaleString()}
                            className="font-[family-name:var(--font-poppins)]"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" className="text-font font-[family-name:var(--font-poppins)]" />}
                        />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
