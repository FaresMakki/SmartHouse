"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";
import {Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { NavLink } from "@/utils-front/util";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
        <div
            className={`${
                mobile ? "flex flex-col space-y-4" : "flex items-center"
            }`}
        >
            {["features", "policies", "terms"].map((item) => (
                <NavLink href={`#${item}`} key={item}>
                    <Button
                        className={`rounded-full text-black bg-white
                        ${mobile ? "hover:bg-gray-200" : "hover:bg-white hover:underline underline-offset-2"} 
                        shadow-none text-lg flex justify-center w-full 
                        relative transition-all duration-200 ${
                            mobile ? "" : "group"
                        }`}
                    >
                        <span className="capitalize">{item}</span>
                    </Button>
                </NavLink>
            ))}
        </div>
    );

    return (
        <div className="flex justify-center mt-2">
            <motion.nav className="text-black sticky top-0 z-50 m-2 bg-white rounded-full shadow-lg w-full max-w-4xl px-2">
                <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                    <Link href="/" className="text-xl font-semibold flex items-center ms-1">
                        <Home className="my-2 mr-2" />
                        Homely
                    </Link>

                    {/* Centered Group for Desktop */}
                    <div className="hidden md:flex flex-1 justify-center space-x-4">
                        <NavItems />
                    </div>

                    {/* Sign In button for Desktop */}
                    <div className="hidden md:flex ml-auto">
                        <Link href="/auth/login">
                            <Button
                                className="bg-accentOrange text-white rounded-full px-6 py-2 font-semibold hover:bg-orange-500 transition-colors duration-200"
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="bg-black border-none">
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden hover:bg-white bg-white text-black rounded-full transition-colors duration-200"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[240px] sm:w-[300px] bg-white p-4 rounded-l-3xl shadow-lg transition-transform duration-300 transform translate-x-2"
                        >
                            <SheetTitle className={"hidden"}>Menu</SheetTitle>
                            <div className="flex flex-col space-y-4 mt-8">
                                <NavItems mobile />
                                <Link href="/auth/login">
                                    <Button
                                        className="bg-accentOrange text-white rounded-full px-6 py-2 hover:bg-orange-500 transition-colors duration-200 w-full"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                            <SheetClose asChild className="hover:text-white">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-4 text-white hover:bg-white/10 transition-colors duration-200"
                                >
                                    <X className="h-6 w-6" />
                                    <span className="sr-only">Close menu</span>
                                </Button>
                            </SheetClose>
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.nav>
        </div>
    );
}
