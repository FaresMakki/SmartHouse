import * as React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";


export function NavLink({ href, children, button = false }: { href: string; children: React.ReactNode; button?: boolean }) {
    return (
        <motion.div whileTap={{ scale: 0.95 }}>
    <Button
        variant={button ? "default" : "ghost"}
    asChild
    className={`w-full justify-start ${button ? 'text-black bg-white hover:bg-gray-200 hover:text-black' : 'text-white hover:text-white hover:bg-white/10'}`}
>
    <Link href={href}>{children}</Link>
        </Button>
        </motion.div>
)
}
