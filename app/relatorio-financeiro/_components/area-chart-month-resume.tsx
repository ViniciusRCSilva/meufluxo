"use client"

import { Area, AreaChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

import { formatCurrency } from "@/app/_utils/formatCurrency"
import { useCurrencyPreference } from "@/app/_hooks/useCurrencyPreference"

interface ChartData {
    month: string
    netProfit: number
}

interface AreaChartMonthResumeProps {
    data: ChartData[]
}

const chartConfig = {
    netProfit: {
        label: "Lucro Líquido",
        color: "var(--color-primary)",
    },
} satisfies ChartConfig

export function AreaChartMonthResume({ data }: AreaChartMonthResumeProps) {
    const { currencyType } = useCurrencyPreference();
    return (
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <div className="grid flex-1 gap-1">
                    <CardTitle className="text-xl text-font-foreground font-semibold">
                        Evolução do Lucro Líquido
                    </CardTitle>
                    <CardDescription className="text-font-muted text-sm">
                        Mostrando a evolução do lucro líquido ao decorrer do ano
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                {data.length === 0 ? (
                    <div className="flex h-[250px] items-center justify-center">
                        <p className="text-font-muted text-sm">Nenhum dado disponível</p>
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="w-full h-[300px] px-0">
                        <AreaChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                        >
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
                                axisLine={false}
                                tickMargin={12}
                                tickFormatter={(value) => value.slice(0, 3)}
                                className="text-font-muted"
                                fontSize={12}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                                tickFormatter={(value) => formatCurrency({ value, currencyType })}
                                className="text-font-muted"
                                fontSize={12}
                            />
                            <ChartTooltip
                                cursor={{
                                    stroke: "var(--border)",
                                    strokeWidth: 1,
                                    strokeDasharray: "4",
                                    opacity: 0.4,
                                }}
                                content={({ payload }) => {
                                    if (payload && payload.length > 0) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="rounded-lg bg-background/95 backdrop-blur-sm p-3 shadow-lg border border-border/50 font-[family-name:var(--font-poppins)]">
                                                <p className="text-font-foreground font-medium capitalize mb-2">
                                                    {data.month}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-2.5 w-2.5 rounded-full"
                                                        style={{ backgroundColor: "var(--color-primary)" }}
                                                    />
                                                    <p className="text-font-foreground/90 text-sm">
                                                        Lucro Líquido:{" "}
                                                        <span className="font-medium">
                                                            {formatCurrency({ value: data.netProfit, currencyType })}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Area
                                dataKey="netProfit"
                                type="natural"
                                fill="var(--color-primary)"
                                fillOpacity={0.2}
                                stroke="var(--color-primary)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--background)",
                                    stroke: "var(--color-primary)",
                                    strokeWidth: 2,
                                    r: 4,
                                }}
                                activeDot={{
                                    fill: "var(--color-primary)",
                                    stroke: "var(--background)",
                                    strokeWidth: 2,
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                    formatter={(value: string) => formatCurrency({ value: Number(value), currencyType })}
                                />
                            </Area>
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
