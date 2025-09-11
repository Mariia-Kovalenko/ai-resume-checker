import React from "react";

export default function ResumeDoc({ className = "w-8 h-8", ...props }) {
    return (
        <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <g filter="url(#filter0_d_108_671)">
                <rect
                    x="1"
                    y="1.35425"
                    width="30"
                    height="30"
                    rx="6"
                    fill="#F4F4FF"
                />
                <path
                    d="M17.25 8.22925H11.3125C10.4495 8.22925 9.75 8.92878 9.75 9.79175V22.9167C9.75 23.7797 10.4495 24.4792 11.3125 24.4792H20.6875C21.5505 24.4792 22.25 23.7797 22.25 22.9167V13.2292L17.25 8.22925ZM16.625 13.8542V9.47925L21 13.8542H16.625Z"
                    fill="#716CE9"
                    fillOpacity="0.87"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_108_671"
                    x="0.3"
                    y="0.654248"
                    width="31.4"
                    height="31.4"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="0.35" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.171832 0 0 0 0 0.171832 0 0 0 0 0.171832 0 0 0 0.2 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_108_671" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_108_671" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}
