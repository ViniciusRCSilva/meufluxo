import Image from "next/image";
import ResetPasswordForm from "./_components/reset-password-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ResetPassword = async () => {
    const { userId } = await auth();

    if (userId) {
        redirect("/");
    }

    return (
        <div className="grid grid-cols-[1.5fr_1fr] items-center min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-center hover:scale-105 transition-transform duration-300">
                <Image
                    src="/logo_meufluxo.svg"
                    alt="MeuFluxo Logo"
                    width={250}
                    height={250}
                    className="drop-shadow-lg"
                />
            </div>

            <div className="flex flex-col items-center justify-center">
                <ResetPasswordForm />
            </div>
        </div>
    );
};

export default ResetPassword;
