"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Separator } from "@/app/_components/ui/separator"
import Spinner from "@/app/_components/ui/spinner"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { getClerkErrorMessage } from "@/app/_utils/clerkErrors";
import ResetPasswordButton from "./reset-password-button";

const formSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z.string().min(8, {
        message: "Senha inválida",
    }),
})

const LoginForm = () => {
    const { isLoaded, signIn, setActive } = useSignIn()
    const router = useRouter()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isLoaded) return
        setIsLoading(true)

        try {
            const result = await signIn.create({
                identifier: values.email,
                password: values.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/")
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao fazer login.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return;
        setIsLoading(true);

        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao autenticar com o Google.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl tracking-tight font-[var(--font-poppins)]">Bem-vindo de volta</h1>
                <p className="text-sm text-font-muted font-[var(--font-poppins)]">Entre na sua conta para continuar</p>
            </div>

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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-sm font-medium">Senha</FormLabel>
                                    <ResetPasswordButton />
                                </div>
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
                                Entrando...
                            </>
                        ) : (
                            "Entrar"
                        )}
                    </Button>

                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full border-border/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card-foreground px-2 text-font-muted">
                        Ou continue com
                    </span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-border/20 hover:bg-card-hover transition-colors"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Spinner />
                        Entrando com Google...
                    </>
                ) : (
                    <>
                        <Image
                            src="/google.svg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Entrar com Google
                    </>
                )}
            </Button>

            <div className="w-full flex justify-between items-center">
                <span className="text-xs text-font-muted">
                    Não tem uma conta?
                </span>
                <Button type="button" variant="link" className="text-link hover:text-link-hover transition-colors">
                    <Link href="/cadastro">
                        Criar conta
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default LoginForm