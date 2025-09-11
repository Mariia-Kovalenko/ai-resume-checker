import React from "react";

export default function Stars({ className = "w-6 h-6", ...props }) {
    return (
        <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M16.5292 5.9434L17.4725 9L15.0016 7.10978L12.5275 9L13.4741 5.9434L11 4.0566H14.0551L15.0016 1L15.9449 4.0566H19L16.5292 5.9434Z"
                fill="white"
            />
            <path
                d="M11.804 7.56L8.776 9.76L9.932 13.324L6.904 11.124L3.872 13.324L5.028 9.76L2 7.56H5.744L6.904 4L8.06 7.56H11.804Z"
                fill="white"
            />
            <path
                d="M16 14.6757L13.8352 16.3273L14.6634 19L12.4986 17.3483L10.3366 19L11.162 16.3273L9 14.6757H11.6732L12.4986 12L13.3268 14.6757H16Z"
                fill="white"
            />
        </svg>
    );
}
