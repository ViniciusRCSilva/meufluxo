"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import Spinner from "@/app/_components/ui/spinner";
import { getClerkErrorMessage } from "@/app/_utils/clerkErrors";

const formSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
});

const ResetPasswordButton = () => {
    const { isLoaded, signIn } = useSignIn();
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isLoaded) return;
        setIsLoading(true);
        setError("");

        try {
            await signIn.create({
                strategy: "reset_password_email_code",
                identifier: values.email,
            });

            router.push("/redefinir-senha");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao iniciar recuperação de senha. Verifique o e-mail inserido.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="link" className="text-xs text-link hover:text-link-hover transition-colors">
                    Esqueceu a senha?
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-[var(--font-poppins)]">Resetar Senha</DialogTitle>
                    <DialogDescription className="text-sm text-font-muted font-[var(--font-poppins)]">
                        Digite seu e-mail para receber o código de recuperação.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="text-xs text-destructive">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="seuemail@email.com"
                                            className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-destructive" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    Enviando...
                                </>
                            ) : (
                                "Enviar Código"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ResetPasswordButton;