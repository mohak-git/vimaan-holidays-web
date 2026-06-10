import Layout from "@/components/Layout";
import { Fraunces, Inter } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
    title: "Vimaan Holidays",
    description:
        "Reimagining how the world travels. Discover, plan, and book your entire journey in one seamless experience.",
    icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
            <body className="min-h-screen overflow-x-hidden">
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
