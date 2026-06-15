import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Toaster from "@/components/Toaster";
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
