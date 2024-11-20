import type { Metadata } from "next";
import "./globals.css";
import * as React from "react";
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: "Homely",
    description: "A cool smart-house project",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${quicksand.className} antialiased relative selection:bg-accentOrange selection:bg-opacity-20`}
        >
        {/* Responsive Grid Background */}
        <div
            className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] md:bg-[size:18px_28px] lg:bg-[size:20px_32px]"
        >
            {/* Pinned Gradient Circle */}
            <div
                className="absolute top-[-2%] md:top-[-8%] lg:top-[-10%] left-1/2 -translate-x-1/2 h-[200px] w-[300px] sm:h-[300px] sm:w-[400px] md:h-[500px] md:w-[700px] lg:h-[600px] lg:w-[900px] bg-[#FF8343] opacity-40 md:opacity-30 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] transition-all duration-300"
            ></div>
        </div>

        <main className="relative z-10">{children}</main>
        </body>
        </html>
    );
}
