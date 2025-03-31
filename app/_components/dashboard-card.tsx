import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import { formatCurrency } from "@/app/_utils/formatCurrency";

interface DashboardCardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
    content: number;
}

const DashboardCard = ({ title, description, icon, content }: DashboardCardProps) => {
    const formattedContent = formatCurrency(content);

    return (
        <Card className="grid grid-cols-[0.5fr_2fr] items-center p-6 gap-0 font-[family-name:var(--font-poppins)]">
            {icon}
            <div>
                <CardHeader className="flex flex-col gap-0 mb-2">
                    <CardTitle className="text-xl text-font-foreground">{title}</CardTitle>
                    <CardDescription className="text-font-muted">{description}</CardDescription>
                </CardHeader>
                <CardContent className="text-2xl">
                    <p className="font-semibold text-font">
                        {title === "Conta a pagar" ? (
                            content === 0 ? "Nenhuma conta" : formattedContent
                        ) : (
                            content < 0 ? <span className="text-destructive">{formattedContent}</span> : formattedContent
                        )}
                    </p>
                </CardContent>
            </div>
        </Card>
    )
}

export default DashboardCard
