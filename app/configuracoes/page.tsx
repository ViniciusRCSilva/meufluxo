import { EditProfile } from "./_components/edit-profile";
import { FinancialPreference } from "./_components/financial-preference";
import { ThemeAndAppearence } from "./_components/theme-and-appearence";
import { AccessAndSecurity } from "./_components/access-and-security";
import { Notifications } from "./_components/notifications";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Configurations = async () => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/login");
    }

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <h1 className="text-xl font-semibold">Configurações</h1>

            <div className="flex mt-4 items-center justify-center">
                <div className="max-w-2xl flex flex-col w-full items-center gap-4">
                    <EditProfile />

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <FinancialPreference />
                        <ThemeAndAppearence />
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <AccessAndSecurity />
                        <Notifications />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configurations;