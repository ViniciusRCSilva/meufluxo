"use client"

import { Skeleton } from "@/app/_components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"

export default function FinancialReportLoading() {
    return (
        <div className="animate-page-transition flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="h-10 w-40" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-fit gap-6">
                {[...Array(4)].map((_, index) => (
                    <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
                        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-16 w-16 rounded-lg" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-7 w-32 mb-1" />
                            <Skeleton className="h-4 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[3.1fr_1fr] gap-6">
                {/* Bar Chart */}
                <Card className="bg-background/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-72" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[220px] w-full" />
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="bg-background/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <Skeleton className="h-[200px] w-[200px] rounded-full" />
                        <div className="grid grid-cols-2 gap-2 w-full mt-4">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Skeleton className="h-2 w-2 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Area Chart */}
            <Card className="bg-background/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        </div>
    )
}
