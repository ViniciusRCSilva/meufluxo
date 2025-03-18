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
                foreground: "#F8FAFC",
                primary: {
                    DEFAULT: "#4F46E5",
                    foreground: "#F8FAFC",
                    hover: "#4338CA",
                    ring: "rgba(79, 70, 229, 0.2)"
                },
                success: {
                    DEFAULT: "#22C55E",
                    foreground: "#F8FAFC",
                    hover: "#16A34A",
                    ring: "rgba(34, 197, 94, 0.2)"
                },
                destructive: {
                    DEFAULT: "#EF4444",
                    foreground: "#F8FAFC",
                    hover: "#DC2626",
                    ring: "rgba(239, 68, 68, 0.2)"
                },
                warning: {
                    DEFAULT: "#ECB92C",
                    foreground: "#0F172A",
                    hover: "#CA8A04",
                    ring: "rgba(236, 185, 44, 0.2)"
                },
                border: {
                    DEFAULT: "#94A3B8",
                    hover: "#64748B",
                    ring: "rgba(148, 163, 184, 0.2)"
                },
                link: {
                    DEFAULT: "#60A5FA",
                    hover: "#3B82F6",
                    ring: "rgba(96, 165, 250, 0.2)"
                },
                font: {
                    DEFAULT: "#F8FAFC",
                    foreground: "#94A3B8",
                    muted: "#64748B"
                },
                card: {
                    DEFAULT: "#0F172A",
                    foreground: "#0B101E",
                    hover: "#1E293B",
                    ring: "rgba(15, 23, 42, 0.2)"
                },
                input: {
                    DEFAULT: "#1E293B",
                    hover: "#334155",
                    ring: "rgba(30, 41, 59, 0.2)"
                }
            },
            keyframes: {
                "caret-blink": {
                    "0%,70%,100%": { opacity: "1" },
                    "20%,50%": { opacity: "0" },
                },
            },
            animation: {
                "caret-blink": "caret-blink 1.25s ease-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;