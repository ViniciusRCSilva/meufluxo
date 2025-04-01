import { Skeleton } from "../_components/ui/skeleton"

const LoadingFinancialGoals = () => {
    return (
        <div className="animate-page-transition flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-10 w-[180px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LoadingFinancialGoals
