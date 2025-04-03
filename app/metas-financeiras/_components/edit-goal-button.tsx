"use client"

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { addToBalance, removeFromBalance } from "@/app/_actions/balance";
import { updateFinancialGoal } from "@/app/_actions/financial-goals";
import { addNotification } from "@/app/_actions/notifications";

const formSchema = z.object({
    name: z.string().min(1, "O nome da meta é obrigatória"),
    currentAmount: z.string().min(1, "O valor atual é obrigatório"),
    goalAmount: z.string().min(1, "O valor da meta é obrigatório"),
});

interface UserId {
    userId: string
}

interface UserBalance {
    balance: number
}

interface Goal {
    goal: {
        id: string
        name: string
        currentAmount: number
        goalAmount: number
    }
}

const EditGoalButton = ({ userId, balance, goal }: UserId & UserBalance & Goal) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: goal.name,
            currentAmount: goal.currentAmount.toString(),
            goalAmount: goal.goalAmount.toString(),
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            if (Number(data.currentAmount) > Number(data.goalAmount)) {
                setError("O valor atual não pode ser maior que o valor da meta");
                return;
            }

            if (Number(data.currentAmount) > balance) {
                setError("Saldo insuficiente para atualizar a meta");
                return;
            }

            await updateFinancialGoal({
                id: goal.id,
                name: data.name,
                currentAmount: Number(data.currentAmount),
                goalAmount: Number(data.goalAmount),
                goalAchievedDate: (Number(data.currentAmount) === Number(data.goalAmount)) ? new Date() : undefined,
                userId: userId
            })

            if (Number(data.currentAmount) < goal.currentAmount) {
                await addToBalance(userId, -(Number(data.currentAmount) - goal.currentAmount));
            } else {
                await removeFromBalance(userId, Number(data.currentAmount) - goal.currentAmount);
            }

            await addNotification({
                title: "Meta financeira atualizada",
                message: `A meta financeira ${data.name} foi atualizada`,
                isRead: false,
                type: "FINANCIAL_GOAL",
                userId: userId
            }, "/metas-financeiras")

            toast.success("Meta financeira atualizada com sucesso");
            resetForm();
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        form.reset({
            name: goal.name,
            currentAmount: goal.currentAmount.toString(),
            goalAmount: goal.goalAmount.toString(),
        })
    }, [form, goal]);

    const resetForm = () => {
        form.reset();
        setError("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Edit className="w-4 h-4 text-warning" /></Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] max-w-[500px] p-0 bg-card">
                <DialogHeader className="p-8 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-semibold text-warning">
                        <Edit className="w-7 h-7" /> Atualizar Meta Financeira
                    </DialogTitle>
                    <DialogDescription className="text-font-muted mt-3">
                        Preencha os dados abaixo para atualizar sua meta financeira.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nome da meta"
                                            className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="currentAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor atual</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <p className="text-font-foreground">R$</p>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="goalAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor meta</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <p className="text-font-foreground">R$</p>
                                                <Input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                className="flex-1 h-11 transition-all duration-200 hover:bg-secondary/80"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 h-11 gap-2 bg-primary transition-all duration-200 hover:bg-primary/90 disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <Edit className="w-4 h-4" />
                                        Atualizar
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditGoalButton