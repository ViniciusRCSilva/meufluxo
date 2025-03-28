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
        <div className="animate-page-transition grid md:grid-cols-[1.5fr_1fr] grid-cols-1 items-center min-h-screen">
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
                    <p className="font-light text-sm md:text-base font-[family-name:var(--font-poppins)]">Novo por aqui? Crie sua conta para começar a gerenciar suas finanças.</p>
                </div>
            </div>
            <div className="flex h-full w-full items-center justify-center bg-card-foreground md:min-h-screen">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;