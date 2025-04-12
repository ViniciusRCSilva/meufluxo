"use client"

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { exportToPDF } from "@/app/_utils/export-to-pdf";
import { useUser } from "@clerk/nextjs";
import { FileDown, Loader2 } from "lucide-react";
import { useState } from "react";

const ExportToPDFButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const date = new Date();
    const year = date.getFullYear();

    const handleExportToPDF = () => {
        setIsLoading(true);
        exportToPDF(user?.firstName || user?.username || "", year.toString());
        setIsLoading(false);
    }

    return (
        <Dialog open={isLoading} onOpenChange={setIsLoading}>
            <DialogTrigger asChild>
                <Button disabled={isLoading} variant="outline" className="hover:bg-background text-font hover:text-font/80" onClick={handleExportToPDF}>
                    <div className="p-1 rounded-md bg-destructive/20">
                        <FileDown className="h-6 w-6 text-destructive" />
                    </div>
                    {isLoading ? "Exportando..." : "Exportar relatório"}
                </Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] sm:max-w-[425px]">
                <DialogHeader className="text-center space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-destructive/20">
                            <FileDown className="h-8 w-8 text-destructive" />
                        </div>
                        <DialogTitle className="text-2xl font-semibold tracking-tight">
                            Exportando seu relatório
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 pt-4">
                    <div className="flex flex-col items-center gap-2 text-destructive">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-sm">Relatório-Financeiro_{user?.firstName || user?.username}_{year}.pdf</span>
                    </div>
                    <span className="text-base">Aguarde enquanto preparamos seu relatório...</span>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default ExportToPDFButton;