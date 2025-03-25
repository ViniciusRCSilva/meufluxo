import { Skeleton } from "@/app/_components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";

export default function Loading() {
    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-10 w-[180px]" />
            </div>
            <div className="border border-border/20 rounded-lg overflow-hidden">
                <ScrollArea className="w-full">
                    {/* Table header */}
                    <div className="border-b-2 border-border/20 bg-card-foreground">
                        <div className="h-12 px-4 flex items-center gap-4">
                            <Skeleton className="h-5 w-[80px]" /> {/* Data */}
                            <Skeleton className="h-5 w-[120px]" /> {/* Descrição */}
                            <Skeleton className="h-5 w-[100px]" /> {/* Categoria */}
                            <Skeleton className="h-5 w-[100px]" /> {/* Pagamento */}
                            <Skeleton className="h-5 w-[80px]" /> {/* Valor */}
                            <Skeleton className="h-5 w-[80px]" /> {/* Tipo */}
                        </div>
                    </div>
                    {/* Table rows */}
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="border-b border-border/20 transition-colors hover:bg-secondary/30"
                        >
                            <div className="w-full justify-between p-4 flex items-center">
                                <Skeleton className="h-4 w-[80px]" /> {/* Data */}
                                <Skeleton className="h-4 w-[120px]" /> {/* Descrição */}
                                <Skeleton className="h-4 w-[100px]" /> {/* Categoria */}
                                <Skeleton className="h-4 w-[100px]" /> {/* Pagamento */}
                                <Skeleton className="h-4 w-[80px]" /> {/* Valor */}
                                <Skeleton className="h-4 w-[80px]" /> {/* Tipo */}
                            </div>
                        </div>
                    ))}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
