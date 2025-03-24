"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    { expenseName: "Aluguel", expenses: 275, fill: "var(--pie-chart-destructive-1)" },
    { expenseName: "Água", expenses: 200, fill: "var(--pie-chart-destructive-2)" },
    { expenseName: "Energia", expenses: 187, fill: "var(--pie-chart-destructive-3)" },
    { expenseName: "Internet", expenses: 173, fill: "var(--pie-chart-destructive-4)" },
    { expenseName: "Outros", expenses: 90, fill: "var(--pie-chart-destructive-5)" },
]

const chartConfig = {
    expenses: {
        label: "Despesas",
    },
    aluguel: {
        label: "Aluguel",
        color: "var(--pie-chart-destructive-1)",
    },
    agua: {
        label: "Água",
        color: "var(--pie-chart-destructive-2)",
    },
    energia: {
        label: "Energia",
        color: "var(--pie-chart-destructive-3)",
    },
    internet: {
        label: "Internet",
        color: "var(--pie-chart-destructive-4)",
    },
    outros: {
        label: "Outros",
        color: "var(--pie-chart-destructive-5)",
    },
} satisfies ChartConfig

export function ExpensesDivisionCard() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl text-font-foreground font-[family-name:var(--font-poppins)]">Divisão de despesas</CardTitle>
                <CardDescription className="text-font-muted font-[family-name:var(--font-poppins)]">Análise da distribuição de despesas.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-h-[200px] px-0"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent className="text-font" hideLabel />}
                        />
                        <Pie
                            data={chartData}
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
                                        className="text-sm font-semibold font-[family-name:var(--font-poppins)]"
                                    >
                                        R$ {payload.expenses}
                                    </text>
                                )
                            }}
                            nameKey={(item) => <p className="text-font font-[family-name:var(--font-poppins)]">{item.expenseName}</p>}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="grid grid-cols-3 gap-2 text-sm">
                {chartData.map((item) => (
                    <div key={item.expenseName} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span className="text-font font-[family-name:var(--font-poppins)]">{item.expenseName}</span>
                    </div>
                ))}
            </CardFooter>
        </Card>
    )
}
