"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
} from "@/app/_components/ui/chart"
import { formatCurrency } from "../_utils/formatCurrency"
import { useCurrencyPreference } from "../_hooks/useCurrencyPreference"

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
        label: "Entrada",
        color: "var(--color-success)",
    },
    expenses: {
        label: "Saída",
        color: "var(--color-destructive)",
    },
} satisfies ChartConfig

export function BarchartRevenueAndExpenses({ data }: BarchartRevenueAndExpensesProps) {
    const { currencyType } = useCurrencyPreference();
    return (
        <Card className="bg-card border-border/20 font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <CardTitle className="text-xl text-font-foreground font-semibold">
                    Entradas x Saídas
                </CardTitle>
                <CardDescription className="text-font-muted text-sm">
                    {data.length > 0 && (
                        `Mostrando dados de ${data[0].month} a ${data[data.length - 1].month}`
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                {data.length > 0 ? (
                    <ChartContainer config={chartConfig} className="w-full h-[250px] px-0">
                        <BarChart accessibilityLayer data={data} margin={{ top: 25 }}>
                            <CartesianGrid
                                vertical={false}
                                horizontal={true}
                                strokeDasharray="4"
                                stroke="var(--border)"
                                opacity={0.4}
                            />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={12}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                className="capitalize text-font-muted"
                                fontSize={12}
                            />
                            <YAxis
                                tickLine={false}
                                tickMargin={12}
                                axisLine={false}
                                tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                                className="text-font-muted"
                                fontSize={12}
                            />
                            <ChartTooltip
                                cursor={{
                                    fill: "var(--border)",
                                    opacity: 0.1,
                                    radius: 4
                                }}
                                content={({ payload }) => {
                                    if (payload && payload.length > 0) {
                                        return (
                                            <div className="rounded-lg bg-background/95 backdrop-blur-sm p-3 shadow-lg border border-border/50 font-[family-name:var(--font-poppins)]">
                                                <p className="text-font-foreground font-medium capitalize mb-2">
                                                    {payload[0].payload.month}
                                                </p>
                                                <div className="space-y-1.5">
                                                    {payload.map((entry, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            <div
                                                                className="h-2.5 w-2.5 rounded-full"
                                                                style={{ backgroundColor: entry.color }}
                                                            />
                                                            <p className="text-font-foreground/90 text-sm">
                                                                {chartConfig[entry.dataKey as keyof typeof chartConfig].label}:{' '}
                                                                <span className="font-medium">
                                                                    {formatCurrency({ value: entry.value as number, currencyType })}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="var(--color-revenue)"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={45}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                    formatter={(value: string) => formatCurrency({ value: Number(value), currencyType })}
                                />
                            </Bar>
                            <Bar
                                dataKey="expenses"
                                fill="var(--color-expenses)"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={45}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                    formatter={(value: string) => formatCurrency({ value: Number(value), currencyType })}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                ) : (
                    <div className="flex h-[250px] items-center justify-center">
                        <p className="text-font-muted text-sm">Nenhum dado disponível</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
