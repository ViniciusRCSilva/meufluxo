import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"

interface DashboardCardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
    content: string;
}

const DashboardCard = ({ title, description, icon, content }: DashboardCardProps) => {
    return (
        <Card className="grid grid-cols-[0.5fr_2fr] items-center p-6 gap-0 font-[family-name:var(--font-poppins)]">
            {icon}
            <div>
                <CardHeader className="flex flex-col gap-0 mb-2">
                    <CardTitle className="text-xl text-font-foreground">{title}</CardTitle>
                    <CardDescription className="text-font-muted">{description}</CardDescription>
                </CardHeader>
                <CardContent className="text-font text-2xl font-semibold">
                    <p>{content}</p>
                </CardContent>
            </div>
        </Card>
    )
}

export default DashboardCard
