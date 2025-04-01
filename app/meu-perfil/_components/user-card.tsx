"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/app/_components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";
import { Calendar } from "lucide-react";
import LogoutButton from "@/app/_components/ui/logout-button";
import Link from "next/link";
import EditProfile from "./edit-profile";

interface UserCardProps {
    balanceCard: React.ReactNode;
    billsQuantity: number;
    goalsQuantity: number;
}

const UserCard = ({ balanceCard, billsQuantity, goalsQuantity }: UserCardProps) => {
    const { user } = useUser();

    const joinDate = new Date(user?.createdAt || '').toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long'
    });

    return (
        <Card className="flex flex-col items-center text-font lg:px-10 h-full font-[family-name:var(--font-poppins)]">
            <CardHeader className="flex flex-col items-center w-full">
                <div className="flex w-full justify-end items-center gap-2 mb-4 cursor-pointer text-link">
                    <EditProfile />
                </div>
                <div className="relative">
                    <Avatar className="w-20 h-20 border-2 border-border/20">
                        <AvatarImage src={user?.imageUrl} />
                    </Avatar>
                </div>
                <CardTitle className="font-bold text-xl mt-4">{user?.fullName || user?.username}</CardTitle>
                <CardDescription className="text-font-foreground">{user?.emailAddresses[0].emailAddress}</CardDescription>

                <div className="w-full flex justify-center mt-4">
                    <div className="flex items-center gap-2 text-sm text-font-muted">
                        <Calendar className="w-4 h-4" />
                        <span>Membro desde {joinDate}</span>
                    </div>
                </div>
            </CardHeader>
            <div className="w-[80%] flex items-center my-2 lg:my-6">
                <Separator />
            </div>
            <CardContent className="flex flex-col justify-around gap-6 w-full h-full">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Link href="/metas-financeiras" className="text-center p-4 bg-secondary rounded-lg group">
                        <p className="text-2xl font-bold group-hover:text-link transition-colors">{goalsQuantity}</p>
                        <p className="text-sm text-font-muted group-hover:text-link transition-colors">Metas Financeiras</p>
                    </Link>
                    <Link href="/contas" className="text-center p-4 bg-secondary rounded-lg group">
                        <p className="text-2xl font-bold group-hover:text-link transition-colors">{billsQuantity}</p>
                        <p className="text-sm text-font-muted group-hover:text-link transition-colors">Contas registradas</p>
                    </Link>
                </div>

                {balanceCard}

                <LogoutButton />
            </CardContent>
        </Card>
    )
}

export default UserCard