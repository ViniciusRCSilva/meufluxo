"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { AlertTriangle, Loader2, Trash } from "lucide-react";
import { deleteFinancialGoal } from "@/app/_actions/financial-goals";
import { toast } from "sonner";
import { useState } from "react";
import { addToBalance } from "@/app/_actions/balance";
import { addNotification } from "@/app/_actions/notifications";

interface DeleteGoalButtonProps {
    id: string,
    goalName: string,
    goalCurrentAmount: number,
    userId: string
}

const DeleteGoalButton = ({ id, goalName, goalCurrentAmount, userId }: DeleteGoalButtonProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await deleteFinancialGoal(id)
            await addToBalance(userId, goalCurrentAmount)

            await addNotification({
                title: "Meta financeira deletada",
                message: `A meta financeira ${goalName} foi deletada`,
                isRead: false,
                type: "FINANCIAL_GOAL",
                userId: userId
            })

            toast.success("Meta deletada com sucesso")
            setOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Trash className="w-4 h-4 text-destructive" /></Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] max-w-[500px] p-0 bg-card">
                <DialogHeader className="p-8 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-semibold text-destructive">
                        <Trash className="w-7 h-7" />
                        Deletar Meta Financeira
                    </DialogTitle>
                    <DialogDescription className="text-font-foreground mt-3">
                        Tem certeza que deseja deletar a meta <span className="text-destructive">{goalName}</span>?
                    </DialogDescription>
                </DialogHeader>

                <div className="m-6 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="text-destructive text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Aviso: Esta ação não pode ser desfeita
                    </p>
                    <p className="mt-2 text-font text-sm">
                        Ao excluir a meta, todos os dados relacionados a ela serão perdidos permanentemente.
                    </p>
                </div>

                <DialogFooter className="flex gap-3 pt-2 pb-6 px-6">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="flex-1 h-11 gap-2 transition-all duration-200 hover:bg-secondary/80"
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        disabled={loading}
                        onClick={handleDelete}
                        className="flex-1 h-11 gap-2 transition-all duration-200 disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Deletando...
                            </>
                        ) : (
                            <>
                                <Trash className="w-4 h-4" />
                                Deletar
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteGoalButton