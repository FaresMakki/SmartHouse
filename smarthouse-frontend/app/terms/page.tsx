import React from 'react'
import {Navbar} from "@/components/navbarBack";
import {Footer} from "@/components/general-footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="container mx-auto px-12 py-12 mt-4 max-w-4xl bg-white rounded-3xl shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex justify-center">Terms and Conditions</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        By accessing and using the SmartHouse App, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our application.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2. Use of the Application</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The SmartHouse App is designed to help you manage and control smart devices in your home. You agree to use the application only for its intended purpose and in compliance with all applicable laws and regulations.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">3. Privacy Policy</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Your use of the SmartHouse App is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">4. Intellectual Property</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        All content, features, and functionality of the SmartHouse App, including but not limited to text, graphics, logos, and software, are owned by or licensed to us and are protected by copyright, trademark, and other intellectual property laws.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">5. Limitation of Liability</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the SmartHouse App.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">6. Changes to Terms</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the new Terms and Conditions on this page. Your continued use of the SmartHouse App after any such changes constitutes your acceptance of the new Terms and Conditions.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">7. Contact Us</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@smarthouseapp.com" className="text-gray-800 underline">support@homely.com.</a>
                    </p>
                </section>
            </main>

            <Footer/>
        </div>
    )
}