import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Teste from "./_components/teste";

const Home = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-poppins)]">
            <Teste />
        </div>
    );
};

export default Home;
