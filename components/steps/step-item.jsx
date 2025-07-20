import React from "react";

export default function StepItem({
    label,
    active,
    completed,
    isFirst,
    isLast,
}) {
    return (
        <div className="flex flex-col items-center flex-1">
            <div className="flex items-center justify-center w-full relative h-[36px]">
                {/* {!isLast && ( */}
                <div
                    className={`absolute top-1/2 ${
                        isFirst
                            ? "w-[50%] right-0 left-auto"
                            : isLast
                            ? "w-[50%] left-0 right-auto   "
                            : "w-[100%] left-0"
                    } h-0.5 bg-[var(--color-purple)] -translate-y-1/2`}
                />
                {/* )} */}
                <div className="z-10 flex items-center justify-center rounded-full transition-all duration-200 w-10 h-10 border-3 border-[var(--background)] rounded-full w-fit h-fit">
                    {active || completed ? (
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="25"
                                height="25"
                                rx="12.5"
                                fill="#716CE9"
                            />
                            <path
                                d="M10.9326 16.0986C10.8154 16.2158 10.6494 16.3135 10.5029 16.3135C10.3564 16.3135 10.1904 16.2109 10.0684 16.0938L7.33398 13.3594L8.20313 12.4902L10.5078 14.7949L16.6016 8.65723L17.4561 9.54102L10.9326 16.0986Z"
                                fill="white"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="31"
                            height="31"
                            viewBox="0 0 31 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="15.5"
                                cy="15.5"
                                r="15.5"
                                fill="#E2E3FA"
                            />
                            <rect
                                x="3.5"
                                y="3.5"
                                width="24"
                                height="24"
                                rx="12"
                                fill="white"
                            />
                            <rect
                                x="3.5"
                                y="3.5"
                                width="24"
                                height="24"
                                rx="12"
                                stroke="#716CE9"
                            />
                            <path
                                d="M13.9326 19.0986C13.8154 19.2158 13.6494 19.3135 13.5029 19.3135C13.3564 19.3135 13.1904 19.2109 13.0684 19.0938L10.334 16.3594L11.2031 15.4902L13.5078 17.7949L19.6016 11.6572L20.4561 12.541L13.9326 19.0986Z"
                                fill="#716CE9"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <div className="mt-2 text-center text-[var(--color-black)] font-semibold text-base whitespace-nowrap">
                {label}
            </div>
        </div>
    );
}
