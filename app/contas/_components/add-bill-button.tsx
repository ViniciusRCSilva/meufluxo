"use client"

import { Button } from "@/app/_components/ui/button";
import { Loader2, Plus, CalendarIcon, HelpCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/app/_components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/_components/ui/popover"
import { Calendar } from "@/app/_components/ui/calendar"
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
import { categoryOptions, categorySelect, paymentMethodOptions, paymentMethodSelect } from "@/app/_utils/selectHelper";
import { useState } from "react";
import { addBill } from "@/app/_actions/bills";
import { recurrenceOptions } from "@/app/_utils/billHelper";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/app/_lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/_components/ui/tooltip";
import { toast } from "sonner";

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
    dueDate: z.date({
        required_error: "A data de vencimento é obrigatória",
    }),
    recurrence: z.enum([
        "NONE",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "YEARLY"
    ]),
});

interface AddBillButtonProps {
    userId: string;
}

const AddBillButton = ({ userId }: AddBillButtonProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            value: "",
            dueDate: new Date(),
            recurrence: "NONE",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            await addBill({
                name: data.name,
                value: Number(data.value),
                category: data.category,
                paymentMethod: data.paymentMethod,
                dueDate: data.dueDate,
                recurrence: data.recurrence,
                isPaid: false,
                userId: userId
            })

            toast.success("Conta adicionada com sucesso");
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
                    Adicionar Conta
                </Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] min-w-[600px] p-0 bg-card">
                <DialogHeader className="p-8 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Plus className="w-7 h-7" /> Nova Conta
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
                            <TooltipContent className="w-2xl text-center space-y-1">
                                <p>Ao <span className="font-semibold">adicionar uma conta</span>, assim que o dia de vencimento chegar, o sistema <span className="font-semibold">irá descontar do seu saldo</span> o <span className="font-semibold">valor da conta</span>.</p>
                                <p><span className="font-semibold">Mas não se preocupe!</span> Notificaremos você quando o dia de vencimento estiver próximo.</p>
                            </TooltipContent>
                        </Tooltip>
                    </DialogTitle>
                    <DialogDescription className="text-font-muted mt-3">
                        Preencha os dados abaixo para adicionar uma nova conta.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8">
                        <div className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground/90 font-medium">Descrição</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Descrição da transação"
                                                    className="h-11 bg-input border-border/20 transition-all duration-200 hover:bg-input-hover focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground/90 font-medium">Valor</FormLabel>
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
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground/90 font-medium">Método de Pagamento</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-all duration-200 hover:bg-input-hover focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                                        <SelectValue placeholder="Selecione o método" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="font-[family-name:var(--font-poppins)]">
                                                    {paymentMethodOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                            className="transition-colors hover:bg-primary/10"
                                                        >
                                                            {paymentMethodSelect(option.value)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground/90 font-medium">Categoria</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-all duration-200 hover:bg-input-hover focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                                        <SelectValue placeholder="Selecione a categoria" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="font-[family-name:var(--font-poppins)]">
                                                    {categoryOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                            className="transition-colors hover:bg-primary/10"
                                                        >
                                                            {categorySelect(option.value)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="recurrence"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground/90 font-medium">
                                                Recorrência
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <HelpCircle className="h-4 w-4 text-font-muted" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="w-80">
                                                        <div className="flex flex-col gap-1 items-center">
                                                            <span className="text-center"><span className="font-semibold">Sem recorrência:</span> conta será criada uma vez.</span>
                                                            <span className="text-center"><span className="font-semibold">Diário:</span> conta será criada todos os dias até a data de vencimento.</span>
                                                            <span className="text-center"><span className="font-semibold">Semanal:</span> conta será criada a cada semana até a data de vencimento.</span>
                                                            <span className="text-center"><span className="font-semibold">Mensal:</span> conta será criada a cada mês até a data de vencimento.</span>
                                                            <span className="text-center"><span className="font-semibold">Anual:</span> conta será criada a cada ano até a data de vencimento.</span>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-all duration-200 hover:bg-input-hover focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                                        <SelectValue placeholder="Selecione a recorrência" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="font-[family-name:var(--font-poppins)]">
                                                    {recurrenceOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                            className="transition-colors hover:bg-primary/10"
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="text-foreground/90 font-medium">Data de Vencimento</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "h-11 w-full bg-input border-border/20 transition-all duration-200 hover:bg-input-hover focus:ring-2 focus:ring-primary/20 focus:border-primary pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP", { locale: ptBR })
                                                            ) : (
                                                                <span>Selecione uma data</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                        locale={ptBR}
                                                        className="font-[family-name:var(--font-poppins)]"
                                                        disabled={(date) => date < new Date()}
                                                        fromDate={new Date()}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </div>
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

export default AddBillButton