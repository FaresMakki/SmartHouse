import Link from 'next/link'
import {FrownIcon} from 'lucide-react'
import {Navbar} from "@/components/navbarBack";
import {Footer} from "@/components/general-footer";

export default function NotFound() {


    // Lezem ntestiw ken user mloggi wela lee


    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200">404</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mt-4"> Sorry, page not found
                        :(.</p>
                    <Link
                        href="/"
                        className="mt-8 inline-block px-6 py-3 text-base font-medium rounded-full border-2 text-orange-600 border-orange-600 hover:text-white hover:bg-orange-600 transition-colors duration-300"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}