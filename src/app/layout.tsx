import Layout from "@/components/Layout";
import { Fraunces, Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
            <body className="min-h-screen overflow-x-hidden">
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
