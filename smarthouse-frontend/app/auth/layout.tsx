import { Navbar } from "@/components/navbarBack";
import * as React from "react";
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
});


export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div
            className={`${quicksand.className} antialiased relative selection:bg-accentOrange selection:bg-opacity-20`}
        >
            <main className="relative z-10">{children}</main>
        </div>
    );
}
