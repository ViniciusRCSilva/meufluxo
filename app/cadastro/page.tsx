import Image from "next/image";
import RegisterForm from "./_components/register-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Register = async () => {
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
                <div className="flex flex-col gap-4 text-center md:text-left select-none">
                    <h1 className="text-5xl italic font-[family-name:var(--font-montserrat-alternates)]">MeuFluxo</h1>
                    <p className="font-light font-[family-name:var(--font-poppins)]">Simplificando o controle financeiro com clareza e eficiência.</p>
                </div>
            </div>
            <div className="flex h-full w-full items-center justify-center bg-card-foreground">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;