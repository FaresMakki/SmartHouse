import React from 'react';

const NotAvailable = ({ message = "Nothing Available Here", subMessage = "Try to add something." }) => {
    return (
        <div>
            <div className="text-center py-8">
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
                        {message}
                    </p>
                    <p className="text-gray-500">
                        {subMessage}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotAvailable;
