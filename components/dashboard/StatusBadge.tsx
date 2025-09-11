import React from "react";

interface StatusBadgeProps {
    status: "draft" | "in progress" | "done";
}

const statusStyles = {
    draft: "bg-gray-50 text-gray-500 border border-dashed border-gray-300",
    "in progress": "bg-yellow-50 text-[#D18109] border border-yellow-200",
    done: "bg-green-50 text-green-700 border border-green-200",
};

const statusIcons = {
    draft: (
        <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="7"
                cy="7.5"
                r="6.5"
                stroke="#636871"
                strokeDasharray="2 2"
            />
        </svg>
    ),
    "in progress": (
        <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="0.5"
                y="1"
                width="13"
                height="13"
                rx="6.5"
                stroke="#D18109"
            />
            <path
                d="M6.95909 3.50021C8.0199 3.48937 9.04156 3.90038 9.79933 4.64283C10.5571 5.38527 10.9889 6.39833 10.9997 7.45914C11.0106 8.51995 10.5996 9.54161 9.85712 10.2994C9.11468 11.0572 8.10162 11.489 7.04081 11.4998L6.99995 7.5L6.95909 3.50021Z"
                fill="#D18109"
            />
        </svg>
    ),
    done: (
        <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="0.5"
                y="1"
                width="13"
                height="13"
                rx="6.5"
                stroke="#258F5D"
            />
            <circle
                cx="6.99995"
                cy="7.5"
                r="4"
                transform="rotate(-90.5853 6.99995 7.5)"
                fill="#258F5D"
            />
        </svg>
    ),
};

const statusLabels = {
    draft: "Draft",
    "in progress": "In Progress",
    done: "Done",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
    <span
        className={`inline-flex items-center gap-[4px] p-[4px] rounded-md text-[12px] md:text-sm font-medium ${statusStyles[status]}`}
    >
        {statusIcons[status]}
        {statusLabels[status]}
    </span>
);

export default StatusBadge;
