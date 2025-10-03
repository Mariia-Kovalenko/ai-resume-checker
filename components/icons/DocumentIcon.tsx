import React from "react";

const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_d_83_405)">
            <rect
                x="1"
                y="1"
                width="22"
                height="22"
                rx="6"
                fill="#F4F4FF"
            />
            <path
                d="M13 5.5H8.25C7.55963 5.5 7 6.05963 7 6.75V17.25C7 17.9404 7.55963 18.5 8.25 18.5H15.75C16.4404 18.5 17 17.9404 17 17.25V9.5L13 5.5ZM12.5 10V6.5L16 10H12.5Z"
                fill="#716CE9"
                fillOpacity="0.87"
            />
        </g>
        <defs>
            <filter
                id="filter0_d_83_405"
                x="0.3"
                y="0.3"
                width="23.4"
                height="23.4"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="0.35" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.171832 0 0 0 0 0.171832 0 0 0 0 0.171832 0 0 0 0.2 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_83_405"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_83_405"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

export default DocumentIcon;
