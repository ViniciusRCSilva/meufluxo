import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0F172A",
                primary: "#4F46E5",
                success: "#22C55E",
                destructive: "#EF4444",
                warning: "#ECB92C",
                border: "#94A3B8",
                link: "#60A5FA",
                font: {
                    DEFAULT: "#F8FAFC",
                    foreground: "#94A3B8",
                },
                card: {
                    background: "#0F172A",
                    foreground: "#0B101E",
                }
            }
        },
    },
    plugins: [],
};

export default config;