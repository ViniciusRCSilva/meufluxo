import { Skeleton } from "@/app/_components/ui/skeleton";

export default function Loading() {
    return (
        <div className="animate-page-transition flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-fit gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                            <Skeleton className="h-20 w-20 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <Skeleton className="h-[300px] w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <Skeleton className="h-4 w-32" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full" />
                        ))}
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <Skeleton className="h-[200px] w-full" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-[1fr_3fr] gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <Skeleton className="h-[200px] w-full" />
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <Skeleton className="h-[200px] w-full" />
                </div>
            </div>
        </div>
    );
}