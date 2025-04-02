import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    return (
        <SignOutButton signOutOptions={{ redirectUrl: "/login" }}>
            <Button variant="outline" className="w-full h-11 text-destructive hover:text-destructive font-[family-name:var(--font-poppins)] transition-colors">
                <LogOut className="mr-2" />
                Sair da conta
            </Button>
        </SignOutButton>
    );
};

export default LogoutButton;