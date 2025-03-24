import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import { Skeleton } from "@/app/_components/ui/skeleton"

const Loading = () => {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2.5fr] min-h-screen gap-6 px-4 sm:px-10 pt-28 pb-10">
            {/* User Card Skeleton */}
            <div>
                <Card className="flex flex-col items-center text-font lg:px-10 h-full">
                    <CardHeader className="flex flex-col items-center w-full">
                        <div className="flex w-full justify-end items-center gap-2 mb-4">
                            <Skeleton className="h-8 w-8" />
                        </div>
                        <div className="flex flex-col items-center">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <Skeleton className="h-6 w-48 mt-4" />
                            <Skeleton className="h-4 w-36 mt-2" />
                        </div>
                        <div className="w-full flex justify-center mt-4">
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </CardHeader>
                    <div className="w-[80%] flex items-center my-2 lg:my-6">
                        <Skeleton className="h-[1px] w-full" />
                    </div>
                    <CardContent className="flex flex-col justify-around gap-6 w-full h-full">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Skeleton className="h-24" />
                            <Skeleton className="h-24" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex flex-col justify-between gap-6 lg:gap-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Next Bills Card Skeleton */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-36 mt-2" />
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <Skeleton className="h-[1px] w-full" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Last Transactions Card Skeleton */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-36 mt-2" />
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between gap-2">
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <Skeleton className="h-[1px] w-full" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Dashboard Cards Skeleton */}
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2].map((i) => (
                            <Card key={i}>
                                <div className="flex items-start gap-4 p-6">
                                    <Skeleton className="h-16 w-16" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-36" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-6 w-28 mt-4" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Area Chart Skeleton */}
                <div className="mt-6 lg:mt-0">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-36 mt-2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[300px] w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Loading
