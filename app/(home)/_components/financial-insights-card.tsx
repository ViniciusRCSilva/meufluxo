import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel"

const FinancialInsightsCard = () => {
    return (
        <Card className="font-[family-name:var(--font-poppins)]">
            <CardHeader>
                <CardTitle className="text-xl text-font-foreground">Insights financeiros</CardTitle>
                <CardDescription className="text-font-muted">Análises e dicas para melhorar sua gestão financeira.</CardDescription>
            </CardHeader>
            <CardContent className="px-16">
                <Carousel opts={{ loop: true }} className="text-sm text-font">
                    <CarouselContent>
                        <CarouselItem>
                            <p>Você precisa economizar R$ 750,00 este mês para pagar as contas pendentes.</p>
                        </CarouselItem>
                        <CarouselItem>
                            <p>Você tem 2 metas definidas e 1 meta completa.</p>
                        </CarouselItem>
                        <CarouselItem>
                            <p>Você gastou menos este mês em relação ao mês anterior.</p>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious variant="outline" size="icon" className="text-font" />
                    <CarouselNext variant="outline" size="icon" className="text-font" />
                </Carousel>
            </CardContent>
        </Card>
    )
}

export default FinancialInsightsCard