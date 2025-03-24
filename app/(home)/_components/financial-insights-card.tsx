import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"

const FinancialInsightsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-font-foreground font-[family-name:var(--font-poppins)]">Insights financeiros</CardTitle>
                <CardDescription className="text-font-muted font-[family-name:var(--font-poppins)]">Análises e dicas para melhorar sua gestão financeira.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-font font-[family-name:var(--font-poppins)]">Você precisa economizar R$ 750,00 este mês para pagar as contas pendentes.</p>
            </CardContent>
        </Card>
    )
}

export default FinancialInsightsCard