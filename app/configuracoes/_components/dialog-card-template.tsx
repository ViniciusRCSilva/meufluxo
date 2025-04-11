import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";

interface DialogCardTemplateProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (value: boolean) => void;
}

export const DialogCardTemplate = ({ title, description, icon, children, isOpen, onOpenChange }: DialogCardTemplateProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger className="w-full cursor-pointer hover:shadow-lg hover:scale-[101%] group transition-all">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex flex-col items-center text-font gap-2">
                            {icon}
                            {title}
                        </CardTitle>
                        <CardDescription className="text-center text-font-muted">{description}</CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {icon}
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-font-muted">{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}