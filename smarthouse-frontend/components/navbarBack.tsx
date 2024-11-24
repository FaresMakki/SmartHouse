"use client";
import Link from "next/link";
import {ArrowLeft, Home, PlusCircle} from "lucide-react";
import React from "react";

interface NavbarProps {
    href?: string;
}

export function Navbar({ href = "/" }: NavbarProps) {
    return (
        <div className="flex justify-center mt-2">
            <nav className="text-black sticky top-0 z-50 m-2 bg-white rounded-full shadow-lg w-full max-w-4xl px-2">
                <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                    <Link href={href !== "/" ? "/home" : "/"} className="text-xl font-semibold flex items-center ms-1">
                        <Home className="my-2 mr-2"/>
                        Homely
                    </Link>

                    <div className="flex ml-auto">
                        <Link href={href} className="flex flex-row px-3 py-1.5 group border-2 rounded-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 ease-in-out">
                            <ArrowLeft className="inline mr-2 mt-1 h-4 w-4"/>
                            Back
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}