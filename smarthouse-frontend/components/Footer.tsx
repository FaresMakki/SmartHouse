import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
    return (
        <footer className="relative text-gray-600 py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
            <div
                className="absolute bottom-[-15%] right-[5%] md:bottom-[-15%] md:right-[-15%] lg:bottom-[-90%] lg:right-[-18%] h-[500px] w-[1000px] sm:h-[300px] sm:w-[400px] md:h-[500px] md:w-[700px] lg:h-[600px] lg:w-[900px] bg-accentOrange opacity-40 md:opacity-50 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] transition-all duration-300"
            ></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Homely</h2>
                        <p className="mb-4">
                            Empowering smart homes with intuitive control and seamless integration.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-accentOrange transition-colors">
                                <Facebook size={24} />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-accentOrange transition-colors">
                                <Twitter size={24} />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-accentOrange transition-colors">
                                <Instagram size={24} />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-accentOrange transition-colors">
                                <Linkedin size={24} />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-accentOrange transition-colors">Home</Link></li>
                            <li><Link href="#" className="hover:text-accentOrange transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-accentOrange transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-accentOrange transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-accentOrange transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-accentOrange transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-accentOrange transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-black text-center">
                    <p>&copy; {new Date().getFullYear()} Homely. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}