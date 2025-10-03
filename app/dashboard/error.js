"use client";

import Image from "next/image";
import error from "../../assets/error.png";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] md:w-[650px] max-w-full mx-auto mb-8">
                <Image src={error} alt="upload file" className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-6" />
                <h2 className="text-xl md:text-2xl font-bold text-center flex items-center justify-center gap-2 mb-6">
                    Oops! An error occurred
                </h2>
                <p className="text-gray-500 text-center mb-6 text-md md:text-lg">
                    Sorry, there was an error generating your resume feedback.
                </p>
            </div>
        </div>
    );
}