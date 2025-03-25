"use client";

import { Button } from "@/app/_components/ui/button";
import { Loader2, Plus } from "lucide-react";
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
import { categoryOptions, categorySelect, paymentMethodOptions, paymentMethodSelect, typeOptions, typeSelect } from "@/app/_utils/selectHelper";
import { useState } from "react";
import { addTransaction } from "@/app/_actions/transaction";

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
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Plus className="w-6 h-6" /> Nova Transação
                    </DialogTitle>
                    <DialogDescription className="text-font-foreground mt-2">
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
                                        <FormLabel className="text-foreground/90">Descrição</FormLabel>
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
                                        <FormLabel className="text-foreground/90">Valor (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                                {...field}
                                            />
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
                                        <FormLabel className="text-foreground/90">Tipo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
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
                                        <FormLabel className="text-foreground/90">Categoria</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                                    <SelectValue placeholder="Selecione a categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
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
                                    <FormLabel className="text-foreground/90">Método de Pagamento</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                                <SelectValue placeholder="Selecione o método de pagamento" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
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

                        <DialogFooter className="gap-2 pt-4">
                            <Button type="button" variant="outline" className="bg-background" disabled={loading} onClick={resetForm}>Cancelar</Button>
                            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                                {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Adicionando...</span> : "Adicionar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTransactionButton;