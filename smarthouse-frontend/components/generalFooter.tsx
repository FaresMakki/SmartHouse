import React from "react";

export const Footer = () => (
    <footer className="relative bg-white border-t border-gray-200 mt-12 overflow-hidden">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-center text-gray-500 text-sm">
                © 2024 <span className={"font-semibold"}>Homely.</span> All rights reserved.
            </p>
        </div>
        <div
            className="absolute inset-0 h-[200px] w-[200px] md:h-[300px] md:w-[300px] bg-accentOrange opacity-40 md:opacity-50 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] -translate-x-1/2 translate-y-1/3 left-1/2"
        ></div>
    </footer>
);
