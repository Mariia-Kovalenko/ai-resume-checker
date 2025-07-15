import React from "react";

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H26C28.2091 0 30 1.79086 30 4V26C30 28.2091 28.2091 30 26 30H4C1.79086 30 0 28.2091 0 26V4Z"
                    fill="#716CE9"
                />
                <path
                    d="M11.4596 22H8.92836L13.537 8.90909H16.4646L21.0796 22H18.5484L15.0519 11.5938H14.9497L11.4596 22ZM11.5427 16.8672H18.4461V18.772H11.5427V16.8672Z"
                    fill="white"
                />
            </svg>
        </div>
    );
}
