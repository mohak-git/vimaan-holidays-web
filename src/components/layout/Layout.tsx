import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Toaster from "@/components/layout/Toaster";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Toaster />
            <Footer />
        </>
    );
}
