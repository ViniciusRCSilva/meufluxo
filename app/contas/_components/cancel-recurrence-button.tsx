"use client"

import { Button } from "@/app/_components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/app/_components/ui/dialog"
import { useState } from "react";
import { Bill } from "@prisma/client";
import { AlertTriangle, Calendar, Loader2, RefreshCcw, X } from "lucide-react";
import { cancelRecurrence } from "@/app/_actions/bills";
import { toast } from "sonner";
import { addNotification } from "@/app/_actions/notifications";
import { billRecurrence } from "@/app/_utils/billHelper";

interface CancelRecurrenceButtonProps {
    bill: Bill;
}

const CancelRecurrenceButton = ({ bill }: CancelRecurrenceButtonProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancelRecurrence = async () => {
        try {
            setLoading(true);

            await cancelRecurrence(bill.id);
            await addNotification({
                title: "Recorrência foi cancelada",
                message: `A recorrência da conta ${bill.name} foi cancelada`,
                isRead: false,
                type: "BILL",
                userId: bill.userId
            })

            toast.success("Recorrência cancelada com sucesso");
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao cancelar recorrência");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-primary text-primary-foreground"
                    variant="outline"
                    disabled={bill.isPaid || bill.recurrence === "NONE"}
                >
                    <RefreshCcw className="w-4 h-4 text-destructive" />
                    {bill.recurrence === "NONE" ? "Sem recorrência" : "Cancelar recorrência"}
                </Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-8 h-8" />
                        <DialogTitle className="text-2xl font-semibold">Cancelar recorrência</DialogTitle>
                    </div>
                    <DialogDescription className="text-base text-font-muted pt-2.5">
                        Você está prestes a cancelar a recorrência da conta <span className="text-font-foreground font-medium">{bill.name}</span>.
                        Esta ação não pode ser desfeita e a conta deixará de ser gerada automaticamente.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-6 space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-font-muted">
                                <Calendar className="w-4 h-4" />
                                <span>Recorrência atual</span>
                            </div>
                            <span className="text-font-foreground font-medium bg-card-foreground px-3 py-1.5 rounded-md">
                                {billRecurrence(bill.recurrence)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-font-muted">
                                <RefreshCcw className="w-4 h-4" />
                                <span>Nova recorrência</span>
                            </div>
                            <span className="text-destructive font-medium bg-card-foreground px-3 py-1.5 rounded-md">
                                Sem recorrência
                            </span>
                        </div>
                    </div>
                    <div className="bg-destructive/10 text-destructive rounded-lg p-4">
                        <p className="text-sm">Ao cancelar a recorrência:</p>
                        <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                            <li>A conta não será mais gerada automaticamente</li>
                            <li>As próximas ocorrências não serão criadas</li>
                            <li>As ocorrências anteriores não serão afetadas</li>
                        </ul>
                    </div>
                </div>
                <DialogFooter className="flex gap-3 pt-6">
                    <Button
                        variant="outline"
                        className="flex-1 h-11 transition-all duration-200 hover:bg-secondary/80"
                        onClick={() => setOpen(false)}
                    >
                        Manter recorrência
                    </Button>
                    <Button
                        onClick={handleCancelRecurrence}
                        disabled={loading}
                        className="flex-1 h-11 gap-2 bg-destructive transition-all duration-200 hover:bg-destructive/90 disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Cancelando...
                            </>
                        ) : (
                            <>
                                <X className="w-4 h-4" />
                                Confirmar cancelamento
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CancelRecurrenceButton