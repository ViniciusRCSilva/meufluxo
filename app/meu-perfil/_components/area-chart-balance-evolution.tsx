"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
    { month: "Janeiro", balance: 186 },
    { month: "Fevereiro", balance: 305 },
    { month: "Março", balance: 237 },
    { month: "Abril", balance: 73 },
    { month: "Maio", balance: 209 },
    { month: "Junho", balance: 214 },
]

const chartConfig = {
    balance: {
        label: "Saldo",
        color: "var(--color-primary)",
    },
} satisfies ChartConfig

export function AreaChartBalanceEvolution() {
    return (
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <div className="grid flex-1 gap-1 text-center sm:text-left text-font-muted">
                    <CardTitle className="text-font-foreground">Evolução do saldo</CardTitle>
                    <CardDescription>
                        Mostrando a evolução do saldo ao decorrer do ano
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full max-h-[300px] px-0">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" className="text-font" />}
                        />
                        <Area
                            dataKey="balance"
                            type="natural"
                            fill="var(--color-primary)"
                            fillOpacity={0.4}
                            stroke="var(--color-primary)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
