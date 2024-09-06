import type {Metadata} from "next";
import {GeistSans} from 'geist/font/sans';
import "./globals.css";

export const metadata: Metadata = {
    title: "Spring Bank",
    description: "Secure money management for everyone",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={GeistSans.className}>{children}</body>
        </html>
    );
}
