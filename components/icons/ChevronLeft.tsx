import React from "react";

export default function ChevronLeft({ className = "w-5 h-5", ...props }) {
    return (
        <svg
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M3.43443 0.244081C3.75987 -0.0813604 4.28751 -0.0813604 4.61295 0.244081C4.93838 0.569515 4.93838 1.09716 4.61295 1.42259L1.66669 4.36885L4.61295 7.31518C4.93838 7.6406 4.93838 8.16818 4.61295 8.49368C4.28751 8.8191 3.75987 8.8191 3.43443 8.49368L0.488192 5.54735C-0.162724 4.89651 -0.162724 3.84126 0.488192 3.19035L3.43443 0.244081Z"
                fill="#716CE9"
            />
        </svg>
    );
}
