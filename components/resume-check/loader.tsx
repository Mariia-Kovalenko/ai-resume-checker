import React, { ReactNode } from "react";

interface LoaderProps {
    title: string;
    text: string;
    children?: ReactNode;
    progress?: number; // 0-100, optional
}

export default function Loader({
    title,
    text,
    children,
    progress = 40,
}: LoaderProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] max-w-[90%] md:w-[650px] mx-auto mb-8">
            <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-3">
                    {title}
                </h2>
                <p className="text-gray-500 text-center mb-8 text-sm md:text-base max-w-lg">
                    {text}
                </p>
                {/* Progress Bar */}
                <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                    <div
                        className="animate-loader-progress h-full bg-[var(--color-purple)] transition-all duration-700"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                {children}
            </div>
            <style jsx>{`
                @keyframes loader-progress {
                    0% {
                        width: 0%;
                    }
                    50% {
                        width: 60%;
                    }
                    100% {
                        width: 100%;
                    }
                }
                .animate-loader-progress {
                    animation: loader-progress 2s infinite alternate;
                }
            `}</style>
        </div>
    );
}
