import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html className="h-screen">
            <body className="h-full">{children}</body>
        </html>
    );
}
