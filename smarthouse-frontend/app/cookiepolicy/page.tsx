import React from 'react';
import { Navbar } from "@/components/navbarBack";
import { Footer } from "@/components/general-footer";

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-12 py-12 mt-4 max-w-4xl bg-white rounded-3xl shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex justify-center">
                    Cookie Policy
                </h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. What Are Cookies?</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Cookies are small data files that are placed on your device when you visit a website. They are widely used to enhance your browsing experience, provide functionality, and collect analytics about how the website is used.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2. How We Use Cookies</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We use cookies to improve the SmartHouse App’s functionality, analyze user behavior, and remember your preferences. These cookies enable us to provide a personalized and seamless experience.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">3. Types of Cookies We Use</h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                        <li><strong>Essential Cookies:</strong> Necessary for the website to function correctly.</li>
                        <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the website.</li>
                        <li><strong>Functionality Cookies:</strong> Enable advanced features and personalization.</li>
                        <li><strong>Advertising Cookies:</strong> Used to deliver relevant ads based on your interests.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">4. Managing Your Cookies</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect the functionality of the SmartHouse App.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">5. Third-Party Cookies</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Some cookies on our website are placed by third-party services. These cookies may track your usage of other websites as well. Please review the respective third-party privacy policies for more information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">6. Updates to This Policy</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We may update this Cookie Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">7. Contact Us</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        If you have any questions or concerns about this Cookie Policy, please contact us at <a href="mailto:support@smarthouseapp.com" className="text-gray-800 underline">support@smarthouseapp.com.</a>
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
}
