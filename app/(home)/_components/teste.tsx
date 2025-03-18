"use client";

import LogoutButton from "@/app/_components/ui/logout-button";
import { useUser } from "@clerk/nextjs";

const Teste = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-col gap-4">
            {user?.firstName === null ? <h1>Olá {user?.username}</h1> : <h1>Olá {user?.firstName}</h1>}
            <h2 className="text-2xl font-bold">Bem-vindo(a) de volta</h2>
            <p className="text-sm text-muted-foreground">
                Aproveite o seu dia com o MeuFluxo
            </p>

            <LogoutButton />
        </div>
    );
};

export default Teste;