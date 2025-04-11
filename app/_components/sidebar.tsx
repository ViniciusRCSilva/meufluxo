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
import Notifications from "./notifications";
import { DBNotification } from "../_types/notification";

interface SidebarProps {
    notifications: DBNotification[]
}

const Sidebar = ({ notifications }: SidebarProps) => {
    const { user } = useUser();

    const items = [
        { icon: <Home className="w-5 h-5 text-link" />, label: "Início", href: "/" },
        { icon: <DollarSign className="w-5 h-5 text-link" />, label: "Contas", href: "/contas" },
        { icon: <FileText className="w-5 h-5 text-link" />, label: "Transações", href: "/transacoes" },
        { icon: <Target className="w-5 h-5 text-link" />, label: "Metas Financeiras", href: "/metas-financeiras" },
        { icon: <BarChart className="w-5 h-5 text-link" />, label: "Relatório Financeiro", href: "/relatorio-financeiro" },
        { icon: <Settings className="w-5 h-5 text-link" />, label: "Configurações", href: "/configuracoes" },
    ];

    return (
        <>
            {user && (
                <div className="flex items-center justify-between w-full fixed top-0 left-0 py-4 px-8 z-50 bg-background/60 backdrop-blur-md border-b border-border/40">
                    <Link href="/" className="flex items-center gap-2 select-none hover:opacity-80 transition-opacity">
                        <span className="rounded-full bg-foreground dark:bg-background">
                            <Image src="/logo_meufluxo.svg" alt="Logo" width={48} height={48} className="w-12 h-12" />
                        </span>
                        <p className="text-xl font-medium italic font-[family-name:var(--font-montserrat-alternates)]">MeuFluxo</p>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Notifications notifications={notifications} userId={user.id} />
                        <Sheet>
                            <SheetTrigger className="cursor-pointer text-font-foreground hover:text-font transition-colors">
                                <Menu className="w-5 h-5" />
                            </SheetTrigger>
                            <SheetContent className="px-4 border-l border-border/40">
                                <SheetHeader className="mb-6">
                                    <SheetTitle className="flex items-center gap-2">
                                        <span className="rounded-full bg-foreground dark:bg-background">
                                            <Image src="/logo_meufluxo.svg" alt="Logo" width={40} height={40} className="w-10 h-10" />
                                        </span>
                                        <p className="text-xl font-medium italic font-[family-name:var(--font-montserrat-alternates)]">Menu</p>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-2 px-1">
                                    <Link
                                        href="/meu-perfil"
                                        className="flex items-center gap-3 bg-card hover:bg-card/50 dark:hover:bg-card-foreground rounded-lg p-4 transition-colors duration-200 group"
                                    >
                                        <Avatar className="border-2 border-border/20 group-hover:border-primary transition-colors">
                                            <AvatarImage src={user?.imageUrl} />
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <p className="font-medium font-[family-name:var(--font-poppins)]">
                                                {!user?.firstName ? user?.username : user?.firstName}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">
                                                {user?.emailAddresses?.[0].emailAddress}
                                            </p>
                                        </div>
                                    </Link>

                                    <nav className="flex flex-col gap-1 mt-2">
                                        {items.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="flex items-center gap-3 p-3 rounded-md font-[family-name:var(--font-poppins)] text-sm hover:bg-card dark:hover:bg-card-foreground transition-all duration-200 group"
                                            >
                                                <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                    {item.icon}
                                                </div>
                                                {item.label}
                                            </Link>
                                        ))}
                                    </nav>

                                    <Separator className="my-4 opacity-50" />

                                    <LogoutButton />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;