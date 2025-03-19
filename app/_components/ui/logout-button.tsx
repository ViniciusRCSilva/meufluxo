import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    return (
        <SignOutButton signOutOptions={{ redirectUrl: "/login" }}>
            <Button className="w-full h-11 bg-destructive hover:bg-destructive-hover text-primary-foreground font-[family-name:var(--font-poppins)] transition-colors">
                <LogOut className="mr-2" />
                Sair da conta
            </Button>
        </SignOutButton>
    );
};

export default LogoutButton;