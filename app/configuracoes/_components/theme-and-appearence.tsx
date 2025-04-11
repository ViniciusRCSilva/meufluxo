"use client";

import { Palette, Sun, Moon } from "lucide-react"
import { DialogCardTemplate } from "./dialog-card-template"
import { Button } from "@/app/_components/ui/button"
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeAndAppearence = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

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
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Aparência</p>
                <div className="flex items-center gap-2">
                    <p className="text-muted-foreground text-sm">
                        Customize como o MeuFluxo vai aparecer para você
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
        </DialogCardTemplate>
    )
}