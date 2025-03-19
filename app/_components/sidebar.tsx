"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/_components/ui/sheet"
import { Menu, Target } from "lucide-react";
import Image from "next/image";
import { Home, DollarSign, FileText, BarChart, Settings } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import LogoutButton from "./ui/logout-button";
import { Separator } from "./ui/separator";

const Sidebar = () => {
    const { user } = useUser();

    const items = [
        { icon: <Home className="w-5 h-5 text-link" />, label: "Início", href: "/" },
        { icon: <DollarSign className="w-5 h-5 text-link" />, label: "Contas", href: "/contas" },
        { icon: <FileText className="w-5 h-5 text-link" />, label: "Transações", href: "/transacoes" },
        { icon: <Target className="w-5 h-5 text-link" />, label: "Metas Financeiras", href: "/metas-financeiras" },
        { icon: <BarChart className="w-5 h-5 text-link" />, label: "Relatórios", href: "/relatorios" },
        { icon: <Settings className="w-5 h-5 text-link" />, label: "Configurações", href: "/configuracoes" },
    ];

    return (
        <div className="flex items-center justify-between w-full fixed top-0 left-0 py-5 px-10 z-50 bg-background/20 backdrop-blur-xs">
            <div className="flex items-center select-none">
                <Image src="/logo_meufluxo.svg" alt="Logo" width={64} height={64} />
                <p className="text-2xl italic font-[family-name:var(--font-montserrat-alternates)]">MeuFluxo</p>
            </div>
            <Sheet>
                <SheetTrigger className="bg-card-foreground rounded-md p-2 cursor-pointer hover:bg-card-foreground/80 transition-colors duration-300">
                    <Menu className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="flex items-center">
                            <Image src="/logo_meufluxo.svg" alt="Logo" width={64} height={64} />
                            <p className="text-2xl italic font-[family-name:var(--font-montserrat-alternates)]">Menu</p>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 px-5">
                        <Link href="/minha-conta" className="flex items-center gap-2 bg-card-foreground rounded-md p-4">
                            <Avatar>
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                            <div className="flex flex-col items-start">
                                <p className="font-[family-name:var(--font-poppins)]">{!user?.firstName ? user?.username : user?.firstName}</p>
                                <p className="text-xs text-font-muted font-[family-name:var(--font-poppins)]">{user?.emailAddresses?.[0].emailAddress}</p>
                            </div>
                        </Link>
                        {items.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-2 p-2 rounded-md font-[family-name:var(--font-poppins)] text-sm hover:bg-card-foreground/80 transition-colors duration-300"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}

                        <Separator className="my-4" />

                        <LogoutButton />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Sidebar;