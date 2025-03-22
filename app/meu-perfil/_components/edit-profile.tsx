"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { SquarePen, Loader2, KeyRound, Camera } from "lucide-react";
import { useUser, useClerk, useSignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "sonner";
import { getClerkErrorMessage } from "@/app/_utils/clerkErrors";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/_components/ui/avatar";

const EditProfile = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const { isLoaded, signIn } = useSignIn();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setName(user.username || "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!user) return;

        const trimmedName = name.trim();
        if (!trimmedName) {
            setError("O nome não pode estar vazio");
            return;
        }

        if (trimmedName === user.username) {
            setError("O nome é igual ao atual");
            return;
        }

        try {
            setIsLoading(true);
            await user.update({
                username: trimmedName
            });
            setIsOpen(false);
            toast.success("Nome atualizado com sucesso!");
            router.refresh();
        } catch (err: unknown) {
            console.error("Erro ao atualizar perfil:", err);
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao atualizar o nome. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!user || !isLoaded) return;

        try {
            setIsLoading(true);
            setError("");

            const identifier = user.primaryEmailAddress?.emailAddress || "";

            await signOut();

            await signIn.create({
                strategy: "reset_password_email_code",
                identifier,
            });

            router.push("/redefinir-senha");
            toast.success(`Código de verificação enviado para o email ${identifier}`);
        } catch (err: unknown) {
            console.error("Erro ao solicitar redefinição de senha:", JSON.stringify(err, null, 2));
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao solicitar redefinição de senha. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user || !e.target.files?.[0]) return;

        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            setError("A imagem deve ter no máximo 5MB");
            return;
        }

        if (!file.type.startsWith("image/")) {
            setError("O arquivo deve ser uma imagem");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            await user.setProfileImage({
                file: e.target.files[0]
            });

            toast.success("Foto de perfil atualizada com sucesso!");
            router.refresh();
        } catch (err: unknown) {
            console.error("Erro ao atualizar foto:", JSON.stringify(err, null, 2));
            if (err instanceof Error) {
                setError(getClerkErrorMessage(err.message));
            } else {
                setError("Erro ao atualizar foto. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const initForm = () => {
        setIsOpen(!isOpen);
        setError("");
        setName(user?.username || "");
    };

    const resetForm = () => {
        setError("");
        setName(user?.username || "");
    };

    return (
        <Dialog open={isOpen} onOpenChange={initForm}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="link"
                    className="text-xs text-link hover:text-link-hover transition-colors group flex items-center gap-2"
                >
                    <SquarePen className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Editar perfil</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="font-[family-name:var(--font-poppins)] max-w-md">
                <DialogHeader className="pb-6">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <SquarePen className="w-5 h-5" />
                        <span>Editar Perfil</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-font-muted">
                        Personalize seu perfil atualizando sua foto e informações.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-8">
                    {/* Seção da Foto */}
                    <div className="flex flex-col items-center gap-4 pb-6 border-b border-border/20">
                        <div className="relative group">
                            <Avatar className="w-28 h-28 border-2 border-border/20">
                                <AvatarImage src={user?.imageUrl} className="object-cover" />
                                <AvatarFallback className="text-2xl">
                                    {user?.username?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <label
                                htmlFor="avatar"
                                className="absolute bottom-0 right-0 p-2.5 rounded-full bg-card-foreground hover:bg-card-foreground/80 transition-all duration-300 cursor-pointer shadow-md group-hover:scale-105"
                            >
                                <Camera className="w-4 h-4" />
                                <Input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={isLoading}
                                />
                            </label>
                        </div>
                        {error && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Seção do Nome */}
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                                    <span>Nome de usuário</span>
                                    {name !== user?.username && name.trim() && (
                                        <span className="text-xs text-font-muted">(modificado)</span>
                                    )}
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setError("");
                                        }}
                                        className="h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                        placeholder="Digite seu nome"
                                        maxLength={20}
                                        disabled={isLoading}
                                        autoComplete="username"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !name.trim() || name.trim() === user?.username}
                                        className="h-11 min-w-[100px] transition-all"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                <span>Salvando...</span>
                                            </>
                                        ) : (
                                            "Salvar"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        {/* Seção da Senha */}
                        <div className="space-y-2 pt-4 border-t border-border/20">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <KeyRound className="w-4 h-4" />
                                <span>Senha</span>
                            </Label>
                            <Button
                                onClick={handleResetPassword}
                                disabled={isLoading}
                                variant="outline"
                                className="w-full h-11 hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Processando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Solicitar redefinição da senha</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-start mt-8">
                    <DialogClose asChild>
                        <Button
                            onClick={resetForm}
                            type="button"
                            variant="ghost"
                            disabled={isLoading}
                            className="hover:bg-secondary/80 transition-colors"
                        >
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;