import type { Metadata } from "next";
import { Poppins, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from "@/app/_components/sidebar";
import { Toaster } from "@/app/_components/ui/sonner";
import { getNotifications } from "./_actions/notifications";
import { DBNotification } from "./_types/notification";
import { ScrollArea } from "./_components/ui/scroll-area";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat_alternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MeuFluxo",
  description: "",
  icons: {
    icon: "/logo_meufluxo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${poppins.variable} ${montserrat_alternates.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClerkProvider>
              {children}
              <Toaster toastOptions={{ className: "font-[family-name:var(--font-poppins)]" }} />
            </ClerkProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  const notifications: DBNotification[] = await getNotifications(user.id);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat_alternates.variable} antialiased h-screen flex`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider>
            <Sidebar notifications={notifications} />
            <main className="flex-1 h-screen relative">
              <ScrollArea className="h-full w-full">
                {children}
              </ScrollArea>
            </main>
            <Toaster toastOptions={{ className: "font-[family-name:var(--font-poppins)]" }} />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
