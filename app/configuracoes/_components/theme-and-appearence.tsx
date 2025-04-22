"use client";

import { Palette, Sun, Moon, Check } from "lucide-react"
import { DialogCardTemplate } from "./dialog-card-template"
import { Button } from "@/app/_components/ui/button"
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Separator } from "@/app/_components/ui/separator";

type ColorTheme = "default" | "teal" | "pink" | "amber";

const colorThemes = [
    { name: "Azul", value: "default", color: "#0066ff", description: "Tema padrão do MeuFluxo" },
    { name: "Verde Água", value: "teal", color: "#06b6d4", description: "Suave e refrescante" },
    { name: "Rosa", value: "pink", color: "#ec4899", description: "Vibrante e moderno" },
    { name: "Âmbar", value: "amber", color: "#f59e0b", description: "Caloroso e acolhedor" },
];

export const ThemeAndAppearence = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();
    const [colorTheme, setColorTheme] = useState<ColorTheme>("default");

    // Efeito para inicialização
    useEffect(() => {
        setMounted(true)
        const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme;
        if (savedColorTheme) {
            setColorTheme(savedColorTheme);
            document.documentElement.setAttribute("data-theme", savedColorTheme);
        }
    }, [])

    // Efeito para sincronizar tema de cor quando o modo claro/escuro mudar
    useEffect(() => {
        if (colorTheme === "default") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", colorTheme);
        }
    }, [theme, colorTheme])

    const handleColorThemeChange = (newTheme: ColorTheme) => {
        setColorTheme(newTheme);
        localStorage.setItem("colorTheme", newTheme);
        
        if (newTheme === "default") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", newTheme);
        }
    };

    if (!mounted) return null

    return (
        <DialogCardTemplate
            title="Aparência e tema"
            icon={
                <div className="p-2 rounded-md bg-primary/10">
                    <Palette className="h-6 w-6 text-link" />
                </div>
            }
            description="Alternar tema e tamanho da fonte"
        >
            <div className="flex flex-col gap-6">
                {/* Modo claro/escuro */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Modo</p>
                    <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Escolha entre modo claro ou escuro
                        </p>

                        <div className="flex gap-2">
                            <Button
                                variant={theme === "light" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setTheme("light")}
                            >
                                <Sun className="h-5 w-5" />
                            </Button>
                            <Button
                                variant={theme === "dark" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setTheme("dark")}
                            >
                                <Moon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Cores do tema */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Cores</p>
                    <div className="flex flex-col gap-3">
                        <p className="text-muted-foreground text-sm">
                            Escolha a cor principal do tema
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            {colorThemes.map((item) => (
                                <Button
                                    key={item.value}
                                    variant="outline"
                                    className="relative h-24 w-full p-0 overflow-hidden hover:border-primary/50 transition-colors"
                                    onClick={() => handleColorThemeChange(item.value as ColorTheme)}
                                >
                                    <div 
                                        className="absolute inset-0 opacity-10" 
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <div className="relative flex flex-col items-center justify-center gap-2 p-2">
                                        <div className="flex items-center gap-2">
                                            <span 
                                                className="h-5 w-5 rounded-full border-2 border-border flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: item.color }}
                                            >
                                                {colorTheme === item.value && (
                                                    <Check className="h-3 w-3 text-white" />
                                                )}
                                            </span>
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground text-center">
                                            {item.description}
                                        </p>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DialogCardTemplate>
    )
}