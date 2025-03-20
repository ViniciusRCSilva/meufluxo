import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"

const FinancialInsightsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-font-muted font-[family-name:var(--font-poppins)]">Insights financeiros</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-font-muted font-[family-name:var(--font-poppins)]">Análises e dicas para melhorar sua gestão financeira.</p>
            </CardContent>
        </Card>
    )
}

export default FinancialInsightsCard