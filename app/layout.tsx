import type { Metadata } from "next";
import { Poppins, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from "@/app/_components/sidebar";

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
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat_alternates.variable} dark antialiased`}
      >
        <ClerkProvider>
          {(await currentUser()) ? <Sidebar /> : null}
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
