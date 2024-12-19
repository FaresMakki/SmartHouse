"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, LayoutDashboard, DoorOpen, Lightbulb, User, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="relative group">
        {children}
    </Link>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3001/user/logout", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Logout failed.");
            }

            router.push("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    function DropdownItems({ mobile = false }: { mobile?: boolean }) {
        return (
            <>
                <DropdownMenuItem className={`${mobile ? "text-lg" : ""}`} onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </>
        );
    }

    const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
        <div className={`${mobile ? "flex flex-col space-y-4 w-full" : "flex items-center space-x-2"}`}>
            {[
                { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { name: "Rooms", href: "/rooms", icon: DoorOpen },
                { name: "Personal Devices", href: "/devices", icon: Lightbulb },
            ].map((item) => (
                <Link href={item.href} key={item.name}>
                    <Button
                        variant="ghost"
                        className={`rounded-full text-black bg-white
                            ${mobile ? "hover:bg-gray-200 w-full justify-start" : "hover:bg-white hover:underline underline-offset-2"} 
                            shadow-none text-lg flex items-center relative transition-all duration-200 ${mobile ? "px-4 py-2" : "px-4"}`}
                    >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span className="capitalize">{item.name}</span>
                    </Button>
                </Link>
            ))}
        </div>
    );

    return (
        <div className="flex justify-center mt-2">
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-black sticky top-0 z-50 m-2 bg-white rounded-full shadow-lg w-full max-w-5xl px-2"
            >
                <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                    <Link href="/home" className="text-xl font-semibold flex items-center ms-1">
                        <Home className="my-2 mr-2" />
                        Homely
                    </Link>

                    {/* Centered Group for Desktop */}
                    <div className="hidden md:flex flex-1 justify-center space-x-4">
                        <NavItems />
                    </div>

                    {/* Profile Dropdown for Desktop */}
                    <div className="hidden md:flex ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="rounded-full">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownItems mobile={false} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button
                                variant="outline"
                                size="icon"
                                className="hover:bg-white bg-white text-black rounded-full transition-colors duration-200"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-[240px] sm:w-[300px] bg-white p-4 rounded-l-3xl shadow-lg transition-transform duration-300 transform translate-x-2"
                        >
                            <SheetTitle className="hidden">Menu</SheetTitle>

                            {/* Flex container for buttons, aligned to the left */}
                            <div className="flex flex-col items-start space-y-4 mt-8">
                                <NavItems mobile={true} />
                                <Button
                                    variant="ghost"
                                    className="justify-start text-black text-lg hover:bg-gray-200 rounded-full px-4 py-2 w-full"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-5 w-5 mr-2" />
                                    Logout
                                </Button>
                            </div>

                            <SheetClose asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-4 text-black hover:bg-gray-200 rounded-full transition-colors duration-200"
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
