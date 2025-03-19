import Image from "next/image";
import LoginForm from "./_components/login-form";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const Login = async () => {
    const { userId } = await auth();

    if (userId) {
        redirect("/");
    }

    return (
        <div className="grid md:grid-cols-[1.5fr_1fr] grid-cols-1 items-center min-h-screen">
            <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 p-8 md:p-0">
                <Image
                    src="/logo_meufluxo.svg"
                    alt="MeuFluxo Logo"
                    width={250}
                    height={250}
                    className="drop-shadow-lg w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
                />
                <div className="flex flex-col gap-4 text-center select-none">
                    <h1 className="text-4xl md:text-5xl italic font-[family-name:var(--font-montserrat-alternates)]">MeuFluxo</h1>
                    <p className="font-light text-sm md:text-base font-[family-name:var(--font-poppins)]">Simplificando o controle financeiro com clareza e eficiência.</p>
                </div>
            </div>
            <div className="flex h-full w-full items-center justify-center bg-card-foreground md:min-h-screen">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;