"use client"

import { getBalance, removeFromBalance } from "@/app/_actions/balance";
import { updateBill } from "@/app/_actions/bills";
import { addNotification } from "@/app/_actions/notifications";
import { addTransaction } from "@/app/_actions/transaction";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogContent } from "@/app/_components/ui/dialog"
import { handleRecurrence } from "@/app/_utils/billHelper";
import { toast } from "sonner";
import { useState } from "react";
import { Bill } from "@prisma/client";
import { Check, Hourglass, Loader2 } from "lucide-react";

interface ConfirmPaymentButtonProps {
    bill: Bill;
}

const ConfirmPaymentButton = ({ bill }: ConfirmPaymentButtonProps) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleConfirmPayment = async () => {
        try {
            setLoading(true);

            const balance = await getBalance(bill.userId);

            if (!balance || balance.amount < bill.value) {
                toast.error("Saldo insuficiente");
                return;
            }

            await updateBill(bill.id, {
                name: bill.name,
                value: bill.value,
                dueDate: new Date(bill.dueDate),
                category: bill.category,
                paymentMethod: bill.paymentMethod,
                recurrence: bill.recurrence || "",
                isPaid: true,
                userId: bill.userId
            });

            await addTransaction({
                name: bill.name,
                value: bill.value,
                category: bill.category,
                type: "EXPENSE",
                paymentMethod: bill.paymentMethod,
                userId: bill.userId
            });

            await removeFromBalance(bill.userId, bill.value);

            toast.success("Pagamento confirmado com sucesso");

            await addNotification({
                title: "Pagamento confirmado",
                message: `O pagamento da conta ${bill.name} foi confirmado`,
                isRead: false,
                type: "BILL",
                userId: bill.userId
            })

            await handleRecurrence(bill);

            setLoading(false);
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao confirmar pagamento");
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-primary text-primary-foreground"
                    variant="outline"
                    disabled={bill.isPaid}
                >
                    {bill.isPaid ? (
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-success" />
                            Pago
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Hourglass className="w-4 h-4 text-warning" />
                            Confirmar pagamento
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Confirmar pagamento</DialogTitle>
                    <DialogDescription className="text-base text-font-muted pt-2.5">
                        Você está prestes a confirmar o pagamento da conta <span className="text-font-foreground font-medium">{bill.name}</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 bg-secondary/30 rounded-lg">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between bg-card-foreground rounded-lg p-4">
                            <span className="text-font-muted">Valor:</span>
                            <span className="text-font-foreground font-medium">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bill.value)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between bg-card-foreground rounded-lg p-4">
                            <span className="text-font-muted">Vencimento:</span>
                            <span className="text-font-foreground font-medium">
                                {bill.dueDate.toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex gap-3 pt-6">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="flex-1 h-11 transition-all duration-200 hover:bg-secondary/80"
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        className="flex-1 h-11 gap-2 bg-primary transition-all duration-200 hover:bg-primary/90 disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Confirmando...
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                Confirmar
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmPaymentButton;