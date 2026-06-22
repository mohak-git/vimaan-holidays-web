import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <TopBar />
            <Header />
            {children}
            <Footer />
        </>
    );
}
