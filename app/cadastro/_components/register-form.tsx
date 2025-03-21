"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
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
import { Separator } from "@/app/_components/ui/separator";
import Spinner from "@/app/_components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { getClerkErrorMessage } from "@/app/_utils/clerkErrors";
import { MailSearch, UserRoundPlus } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
    username: z.string().min(4, {
        message: "O nome deve ter no mínimo 4 caracteres",
    }),
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z.string().min(8, {
        message: "A senha deve ter no mínimo 8 caracteres",
    }),
});

const formVerificationSchema = z.object({
    pin: z.string().min(6, {
        message: "O código deve ter no mínimo 6 caracteres",
    }),
});

const RegisterForm = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter()
    const [error, setError] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
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
            const result = await signUp.create({
                emailAddress: values.email,
                username: values.username,
                password: values.password,
            });

            if (result.status === "missing_requirements") {
                await signUp.prepareVerification({ strategy: "email_code" });

                setPendingVerification(true);
            } else if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao criar conta.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onVerifyEmail = async (values: z.infer<typeof formVerificationSchema>) => {
        if (!isLoaded || !signUp) {
            setError("Erro ao verificar e-mail. Tente novamente.");
            return;
        }
        setIsLoading(true);

        try {
            const result = await signUp.attemptVerification({ strategy: "email_code", code: values.pin });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                toast.success(`Conta criada para ${result.emailAddress}.`);
                router.push("/");
            } else {
                setError("Código incorreto. Tente novamente.");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao verificar e-mail.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;

        try {
            await signUp.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
            toast.success("Conta criada com sucesso.");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao autenticar com o Google.");
            }
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 font-[family-name:var(--font-poppins)]">
            <div className="space-y-2 text-center">
                {pendingVerification ? (
                    <div className="flex flex-col items-center">
                        <MailSearch className="w-8 h-8" />
                        <h1 className="text-2xl tracking-tight">Verifique seu e-mail</h1>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <UserRoundPlus className="w-8 h-8" />
                        <h1 className="text-2xl tracking-tight">Crie sua conta</h1>
                    </div>
                )}
                <p className="text-sm text-font-muted font-[var(--font-poppins)]">
                    {pendingVerification
                        ? "Digite o código enviado para seu e-mail."
                        : "Registre-se para começar"}
                </p>
            </div>

            {error && (
                <div className="text-xs text-destructive">
                    {error}
                </div>
            )}

            {!pendingVerification ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Seu Nome"
                                            className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                            disabled={isLoading}
                                            {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-destructive" />
                                </FormItem>
                            )}
                        />
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
                                            {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-destructive" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                            disabled={isLoading}
                                            {...field} />
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
                                    Criando Conta...
                                </>
                            ) : (
                                "Criar Conta"
                            )}
                        </Button>
                    </form>
                </Form>
            ) : (
                <div className="w-full space-y-6">
                    <Form {...formVerification}>
                        <form onSubmit={formVerification.handleSubmit(onVerifyEmail)} className="space-y-6">
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
                                    "Verificar E-mail"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            )}

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full border-border/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card-foreground px-2 text-font-muted">
                        Ou registre-se com
                    </span>
                </div>
            </div>
            <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-border/20 hover:bg-card-hover transition-colors"
                onClick={handleGoogleSignUp}
            >
                <Image src="/google.svg" alt="Google" width={24} height={24} />
                Google
            </Button>

            <div className="w-full flex justify-between items-center">
                <span className="text-xs text-font-muted">
                    Já tem uma conta?
                </span>
                <Button type="button" variant="link" className="text-link hover:text-link-hover transition-colors">
                    <Link href="/login">
                        Entrar
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default RegisterForm;
