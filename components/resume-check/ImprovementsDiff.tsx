// ImprovementsDiff component displays a scrollable list of diffs with a purple scrollbar.
import React from "react";

interface DiffBlock {
    remove: string;
    place: string;
}

interface ImprovementsDiffProps {
    diffs: DiffBlock[];
}

export default function ImprovementsDiff({ diffs }: ImprovementsDiffProps) {
    return (
        <div className="max-h-[300px] overflow-y-auto pr-2 improvements-scrollbar">
            {diffs.map((diff, idx) => (
                <div key={idx} className="mb-4">
                    <div className="bg-red-100 text-red-700 rounded-sm px-2 md:px-3 py-2 flex items-start gap-2 mb-1 text-sm md:text-base">
                        {/* <span className="font-bold">-</span> {diff.remove} */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0"
                        >
                            <path
                                d="M14.7826 10.9783H5.2174C4.67392 10.9783 4.23914 10.5435 4.23914 9.99999C4.23914 9.45651 4.67392 9.02173 5.2174 9.02173H14.7826C15.3261 9.02173 15.7609 9.45651 15.7609 9.99999C15.7609 10.5435 15.3261 10.9783 14.7826 10.9783Z"
                                fill="#C80A0A"
                            />
                        </svg>
                        {diff.remove}
                    </div>
                    <div className="bg-green-100 text-green-700 rounded-sm px-2 md:px-3 py-2 flex items-start gap-2 text-sm md:text-base">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0"
                        >
                            <path
                                d="M15.8333 9.16659H10.8333V4.16659C10.8333 3.94557 10.7455 3.73361 10.5892 3.57733C10.433 3.42105 10.221 3.33325 9.99998 3.33325C9.77897 3.33325 9.567 3.42105 9.41072 3.57733C9.25444 3.73361 9.16665 3.94557 9.16665 4.16659V9.16659H4.16665C3.94563 9.16659 3.73367 9.25438 3.57739 9.41066C3.42111 9.56694 3.33331 9.77891 3.33331 9.99992C3.33331 10.2209 3.42111 10.4329 3.57739 10.5892C3.73367 10.7455 3.94563 10.8333 4.16665 10.8333H9.16665V15.8333C9.16665 16.0543 9.25444 16.2662 9.41072 16.4225C9.567 16.5788 9.77897 16.6666 9.99998 16.6666C10.221 16.6666 10.433 16.5788 10.5892 16.4225C10.7455 16.2662 10.8333 16.0543 10.8333 15.8333V10.8333H15.8333C16.0543 10.8333 16.2663 10.7455 16.4226 10.5892C16.5789 10.4329 16.6666 10.2209 16.6666 9.99992C16.6666 9.77891 16.5789 9.56694 16.4226 9.41066C16.2663 9.25438 16.0543 9.16659 15.8333 9.16659Z"
                                fill="#339972"
                            />
                        </svg>
                        {diff.place}
                    </div>
                </div>
            ))}
        </div>
    );
}
