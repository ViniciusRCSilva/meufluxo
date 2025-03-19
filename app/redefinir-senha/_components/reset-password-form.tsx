"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/app/_components/ui/input-otp"
import { Input } from "@/app/_components/ui/input";
import Spinner from "@/app/_components/ui/spinner";
import { getClerkErrorMessage } from "@/app/_utils/clerkErrors";
import { KeyRound, MailSearch } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
    password: z.string().min(8, {
        message: "A senha deve ter no mínimo 8 caracteres",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

const formVerificationSchema = z.object({
    pin: z.string().min(6, {
        message: "O código deve ter 6 caracteres",
    }),
});

const ResetPasswordForm = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(true);
    const [forceRender, setForceRender] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const formVerification = useForm<z.infer<typeof formVerificationSchema>>({
        resolver: zodResolver(formVerificationSchema),
        defaultValues: {
            pin: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isLoaded) return;
        setIsLoading(true);

        try {
            const result = await signIn.resetPassword({
                password: values.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                toast.success(`Senha redefinida para ${result.identifier}.`);
                router.push("/");
            }
        } catch (err: unknown) {
            console.error("Erro capturado:", JSON.stringify(err, null, 2));
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao redefinir senha.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onVerifyCode = async (values: z.infer<typeof formVerificationSchema>) => {
        if (!isLoaded) return;
        setIsLoading(true);

        try {
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: values.pin,
            });

            console.log("Resultado da verificação:", result);

            if (result.status === "needs_new_password") {
                setPendingVerification(false);
                setForceRender((prev) => prev + 1);
            } else {
                setError("Código inválido ou expirado. Tente novamente.");
            }
        } catch (err: unknown) {
            console.error("Erro ao verificar código:", JSON.stringify(err, null, 2));
            setError("Erro ao verificar código.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div key={forceRender} className="w-full max-w-md p-8 space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl tracking-tight font-[var(--font-poppins)]">
                    {pendingVerification ? (
                        <div className="flex flex-col items-center">
                            <MailSearch className="w-8 h-8" />
                            <h1 className="text-2xl tracking-tight">Verifique seu e-mail</h1>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <KeyRound className="w-8 h-8" />
                            <h1 className="text-2xl tracking-tight">Redefinir Senha</h1>
                        </div>
                    )}
                </h1>
                <p className="text-sm text-font-muted font-[var(--font-poppins)]">
                    {pendingVerification
                        ? "Digite o código enviado para seu e-mail."
                        : "Digite sua nova senha"}
                </p>
            </div>

            {error && (
                <div className="text-xs text-destructive">
                    {error}
                </div>
            )}

            {pendingVerification ? (
                <Form {...formVerification}>
                    <form onSubmit={formVerification.handleSubmit(onVerifyCode)} className="space-y-6">
                        <FormField
                            control={formVerification.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full items-center">
                                    <FormLabel className="text-sm font-medium">Código de Verificação</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field} disabled={isLoading}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription className="text-xs text-font-muted text-center">
                                        Por favor, insira o código de verificação enviado para seu e-mail.
                                    </FormDescription>
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
                                    Verificando...
                                </>
                            ) : (
                                "Verificar Código"
                            )}
                        </Button>
                    </form>
                </Form>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Nova Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-destructive" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Confirmar Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
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
                                    Redefinindo Senha...
                                </>
                            ) : (
                                "Redefinir Senha"
                            )}
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default ResetPasswordForm;
