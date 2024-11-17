"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Home, Menu, X} from "lucide-react";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {motion} from "framer-motion";
import {NavLink} from "@/utils-front/util";
import {useState} from "react";

export function Navbar() {

    return (
        <div className="flex justify-center mt-2">
            <nav
                className="text-black sticky top-0 z-50 m-2 bg-white rounded-full shadow-lg w-full max-w-4xl px-2">
                <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                    <Link href="/" className="text-xl font-semibold flex items-center ms-1">
                        <Home className="my-2 mr-2"/>
                        Homely
                    </Link>

                    <div className="flex ml-auto">
                        <Link href="/"
                              className="bg-accentOrange text-white rounded-full px-4 py-2 hover:bg-orange-500 transition-colors duration-200"
                        >
                            <ArrowLeft className="inline mr-2 h-4 w-4"/>
                            Back to Home
                        </Link>
                    </div>

                </div>
            </nav>
        </div>
    );
}
