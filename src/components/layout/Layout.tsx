import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Toaster from "@/components/layout/Toaster";
import TopBar from "@/components/layout/TopBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <TopBar />
            <Header />
            {children}
            <Toaster />
            <Footer />
        </>
    );
}
