import React from 'react';
import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import {Table} from "lucide-react";

const NotAvailable = () => {
    return (

            <div>
                <div colSpan={4} className="text-center  w-screen py-8">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17v-6a3 3 0 013-3h3m-3 0a3 3 0 00-3 3v6m-4 2h16m-8-8v2m0 4h.01"
                            />
                        </svg>
                        <p className="text-gray-600 text-lg font-semibold">
                            Nothing available here
                        </p>
                        <p className="text-gray-500">
                            Try To Add Something.
                        </p>
                    </div>
                </div>
            </div>

    );
};

export default NotAvailable;