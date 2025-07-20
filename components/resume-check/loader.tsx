import React, { ReactNode } from "react";

interface LoaderProps {
    title: string;
    text: string;
    children?: ReactNode;
}

export default function Loader({ title, text, children }: LoaderProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] max-w-[90%] md:w-[600px] mx-auto mb-8">
            <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-3">
                    {title}
                </h2>
                <p className="text-gray-500 text-center mb-8 text-sm md:text-base max-w-lg">
                    {text}
                </p>
                {children}
            </div>
        </div>
    );
}
