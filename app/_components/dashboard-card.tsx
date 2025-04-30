"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import { formatCurrency } from "@/app/_utils/formatCurrency";
import { useCurrencyPreference } from "../_hooks/useCurrencyPreference";

interface DashboardCardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
    content: number;
    iconBgColor: string;
}

const DashboardCard = ({ title, description, icon, content, iconBgColor }: DashboardCardProps) => {
    const { currencyType } = useCurrencyPreference();
    const formattedContent = formatCurrency({ value: content, currencyType });

    return (
        <Card className="grid grid-cols-[0.5fr_2fr] items-center p-6 gap-0 font-[family-name:var(--font-poppins)]">
            <div className={`flex items-center p-4 rounded-lg ${iconBgColor}`}>
                {icon}
            </div>
            <div>
                <CardHeader className="flex flex-col gap-0 mb-2">
                    <CardTitle className="text-xl text-font-foreground">{title}</CardTitle>
                    <CardDescription className="text-font-muted">{description}</CardDescription>
                </CardHeader>
                <CardContent className="text-2xl">
                    <p className="font-semibold text-font">
                        {title === "Variação mensal" ? (
                            content === 0 ? "0%" : `${content}%`
                        ) : (
                            title === "Conta a pagar" ? (
                                content === 0 ? "Nenhuma conta" : formattedContent
                            ) : (
                                content < 0 ? <span className="text-destructive">{formattedContent}</span> : formattedContent
                            )
                        )}
                    </p>
                </CardContent>
            </div>
        </Card>
    )
}

export default DashboardCard
