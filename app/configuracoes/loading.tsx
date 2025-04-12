import { Skeleton } from "@/app/_components/ui/skeleton";

export default function Loading() {
    return (
        <div className="animate-page-transition flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <Skeleton className="h-7 w-32" /> {/* Title */}

            <div className="flex mt-4 items-center justify-center">
                <div className="max-w-2xl flex flex-col w-full items-center gap-4">
                    {/* Edit Profile Card */}
                    <div className="w-full">
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                    </div>

                    {/* Financial Preference and Theme Cards */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Skeleton className="h-[200px] rounded-xl" />
                        <Skeleton className="h-[200px] rounded-xl" />
                    </div>

                    {/* Access & Security and Notifications Cards */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Skeleton className="h-[200px] rounded-xl" />
                        <Skeleton className="h-[200px] rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
