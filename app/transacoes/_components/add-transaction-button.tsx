"use client";

import { Button } from "@/app/_components/ui/button";
import { HelpCircle, Loader2, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/app/_components/ui/dialog"
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
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/app/_components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { categoryOptions, categorySelect, paymentMethodOptions, paymentMethodSelect, typeOptions, typeSelect } from "@/app/_utils/selectHelper";
import { useState } from "react";
import { addTransaction } from "@/app/_actions/transaction";
import { toast } from "sonner";
import { addNotification } from "@/app/_actions/notifications";

const formSchema = z.object({
    name: z.string().min(1, "A descrição é obrigatória"),
    value: z.string().min(1, "O valor é obrigatório"),
    category: z.enum([
        "HOUSING",
        "TRANSPORTATION",
        "FOOD",
        "ENTERTAINMENT",
        "HEALTH",
        "UTILITY",
        "SALARY",
        "EDUCATION",
        "OTHER"
    ], {
        required_error: "A categoria é obrigatória",
    }),
    type: z.enum(["DEPOSIT", "EXPENSE", "INVESTMENT"], {
        required_error: "O tipo é obrigatório",
    }),
    paymentMethod: z.enum([
        "CREDIT_CARD",
        "DEBIT_CARD",
        "BANK_TRANSFER",
        "BANK_SLIP",
        "CASH",
        "PIX",
        "OTHER"
    ], {
        required_error: "O método de pagamento é obrigatório",
    }),
});

interface userIdProps {
    userId: string;
}

const AddTransactionButton = ({ userId }: userIdProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            value: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            await addTransaction({
                name: data.name,
                value: Number(data.value),
                category: data.category,
                type: data.type,
                paymentMethod: data.paymentMethod,
                userId: userId
            })

            await addNotification({
                title: "Transação foi realizada",
                message: `A transação ${data.name} foi realizada`,
                isRead: false,
                type: "TRANSACTION",
                userId: userId
            }, "/transacoes")

            toast.success("Transação realizada com sucesso");
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
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="w-5 h-5" />
                    Adicionar transação
                </Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] max-w-[500px] p-0 bg-card">
                <DialogHeader className="p-8 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Plus className="w-7 h-7" /> Nova Transação
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
                            <TooltipContent className="w-80 text-center">
                                <p>Ao <span className="font-semibold">adicionar uma transação</span>, o sistema irá <span className="font-semibold">depositar</span> ou <span className="font-semibold">descontar</span> o <span className="font-semibold">valor da transação</span> em seu saldo atual.</p>
                            </TooltipContent>
                        </Tooltip>
                    </DialogTitle>
                    <DialogDescription className="text-font-muted mt-3">
                        Preencha os dados abaixo para adicionar uma nova transação.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-6">
                        <div className="grid gap-5 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Descrição da transação"
                                                className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor</FormLabel>
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

                        <div className="grid gap-5 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="font-[family-name:var(--font-poppins)]">
                                                {typeOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {typeSelect(option.value)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                                    <SelectValue placeholder="Selecione a categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="font-[family-name:var(--font-poppins)]">
                                                {categoryOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {categorySelect(option.value)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Método de Pagamento</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                                <SelectValue placeholder="Selecione o método de pagamento" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="font-[family-name:var(--font-poppins)]">
                                            {paymentMethodOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {paymentMethodSelect(option.value)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


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
    );
};

export default AddTransactionButton;