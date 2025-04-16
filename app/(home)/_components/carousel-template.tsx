"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel"

interface CarouselProps {
    itens: React.ReactNode[]
}

const CarouselTemplate = ({ itens }: CarouselProps) => {
    return (
        <Carousel opts={{ loop: true }} className="text-sm text-font w-full">
            <CarouselContent>
                {itens.map((item, index) => (
                    <CarouselItem key={index} className="flex items-center justify-center">
                        <div className="p-8 text-center">
                            {item}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
                variant="ghost"
                size="sm"
                className="h-6 w-6 hover:bg-transparent hover:text-font-foreground absolute left-0 top-1/2 -translate-y-1/2"

            />
            <CarouselNext
                variant="ghost"
                size="sm"
                className="h-6 w-6 hover:bg-transparent hover:text-font-foreground absolute right-0 top-1/2 -translate-y-1/2"

            />
        </Carousel>
    )
}

export default CarouselTemplate
