import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserCard from "./_components/user-card";

const MyProfile = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    return (
        <div className="grid grid-cols-[1fr_2fr] min-h-screen gap-6 px-4 sm:px-10 pt-28 pb-10">
            <div>
                <UserCard />
            </div>
            <div></div>
        </div>
    )
}

export default MyProfile