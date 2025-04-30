"use client"

import { getBalance, removeFromBalance } from "@/app/_actions/balance";
import { updateBill } from "@/app/_actions/bills";
import { addNotification } from "@/app/_actions/notifications";
import { addTransaction } from "@/app/_actions/transaction";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogContent } from "@/app/_components/ui/dialog"
import { billRecurrence, handleRecurrence } from "@/app/_helpers/billHelper";
import { toast } from "sonner";
import { useState } from "react";
import { Bill } from "@prisma/client";
import { Banknote, Calendar, Check, Loader2, RefreshCcw } from "lucide-react";
import { formatCurrency } from "@/app/_utils/formatCurrency";
import { useCurrencyPreference } from "@/app/_hooks/useCurrencyPreference";

interface ConfirmPaymentButtonProps {
    bill: Bill;
}

const ConfirmPaymentButton = ({ bill }: ConfirmPaymentButtonProps) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { currencyType } = useCurrencyPreference();

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
                    className="hover:bg-card hover:text-font py-6"
                    variant="outline"
                    disabled={bill.isPaid}
                >
                    {bill.isPaid ? (
                        <span className="flex items-center gap-2">
                            <div className="p-2 rounded-md bg-success/20">
                                <Check className="w-4 h-4 text-success" />
                            </div>
                            Pago
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <div className="p-2 rounded-md bg-success/20">
                                <Check className="w-4 h-4 text-success" />
                            </div>
                            Confirmar pagamento
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-success/20">
                            <Check className="w-8 h-8 text-success" />
                        </div>
                        <DialogTitle className="text-2xl font-semibold">
                            Confirmar pagamento
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-base text-font-muted pt-2.5">
                        Você está prestes a confirmar o pagamento da conta <span className="text-font-foreground font-medium">{bill.name}</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col mt-4">
                    <div className="flex items-center justify-between p-4 text-font-muted">
                        <div className="flex items-center gap-2">
                            <Banknote className="w-4 h-4" />
                            <span className="text-font-muted">Valor:</span>
                        </div>
                        <div className="bg-card dark:bg-card-foreground rounded-lg p-2">
                            <span className="text-font-foreground font-medium">
                                {formatCurrency({ value: bill.value, currencyType })}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 text-font-muted">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-font-muted">Vencimento:</span>
                        </div>
                        <div className="bg-card dark:bg-card-foreground rounded-lg p-2">
                            <span className="text-font-foreground font-medium">
                                {bill.dueDate.toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 text-font-muted">
                        <div className="flex items-center gap-2">
                            <RefreshCcw className="w-4 h-4" />
                            <span className="text-font-muted">Recorrência:</span>
                        </div>
                        <div className="bg-card dark:bg-card-foreground rounded-lg p-2">
                            <span className="text-font-foreground font-medium">
                                {billRecurrence(bill.recurrence)}
                            </span>
                        </div>
                    </div>
                    {bill.recurrence !== "NONE" && (
                        <p className="text-sm bg-link/20 text-link rounded-md p-4">
                            A conta {bill.name} será gerada automaticamente após o pagamento.
                        </p>
                    )}
                </div>
                <DialogFooter className="flex gap-3 pt-6">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="flex-1 h-11 gap-2 transition-all duration-200 hover:text-font hover:bg-background hover:opacity-70"
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