"use client"

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { HelpCircle, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addFinancialGoal } from "@/app/_actions/financial-goals";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { removeFromBalance } from "@/app/_actions/balance";
import { addNotification } from "@/app/_actions/notifications";
import { useCurrencyPreference } from "@/app/_hooks/useCurrencyPreference";
import { CurrencyType } from "@prisma/client";

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

const AddGoalButton = ({ userId, balance }: UserId & UserBalance) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { currencyType } = useCurrencyPreference();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            currentAmount: "",
            goalAmount: "",
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
                setError("Saldo insuficiente para adicionar a meta");
                return;
            }

            await addFinancialGoal({
                name: data.name,
                currentAmount: Number(data.currentAmount),
                goalAmount: Number(data.goalAmount),
                userId: userId
            })

            await removeFromBalance(userId, Number(data.currentAmount));

            await addNotification({
                title: "Meta financeira adicionada",
                message: `A meta financeira ${data.name} foi adicionada com sucesso`,
                isRead: false,
                type: "FINANCIAL_GOAL",
                userId: userId
            })

            toast.success("Meta financeira adicionada com sucesso");
            resetForm();
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        form.reset();
        setError("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="w-5 h-5" /> Adicionar meta</Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] max-w-[500px] p-0">
                <DialogHeader className="p-8 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <div className="p-2 rounded-md bg-primary/10">
                            <Plus className="w-7 h-7 text-primary" />
                        </div>
                        Nova Meta Financeira
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="p-0 h-6 w-6 text-font-muted hover:decoration-0 hover:text-font-muted/80"
                                    tabIndex={-1}
                                >
                                    <HelpCircle className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="w-96 text-center">
                                <p>Ao <span className="font-semibold">adicionar uma meta financeira</span>, você terá a opção de utilizar <span className="font-semibold">parte do seu saldo atual</span> para <span className="font-semibold">contribuir diretamente com a realização dessa meta</span>.</p>
                            </TooltipContent>
                        </Tooltip>
                    </DialogTitle>
                    <DialogDescription className="text-font-muted mt-3">
                        Preencha os dados abaixo para adicionar uma nova meta financeira.
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
                                                <p className="text-font-foreground">
                                                    {currencyType === CurrencyType.BRL ? "R$" : currencyType === CurrencyType.USD ? "$" : "€"}
                                                </p>
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
                                                <p className="text-font-foreground">
                                                    {currencyType === CurrencyType.BRL ? "R$" : currencyType === CurrencyType.USD ? "$" : "€"}
                                                </p>
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
                                className="flex-1 h-11 gap-2 transition-all duration-200 hover:text-font hover:bg-background hover:opacity-70"
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
                                        <Plus className="w-4 h-4" />
                                        Adicionar
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

export default AddGoalButton