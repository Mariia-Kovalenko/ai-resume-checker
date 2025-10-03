// ImprovementsDiff component displays a scrollable list of diffs with a purple scrollbar.
import React from "react";
import { MinusIcon, PlusIcon } from "../icons";

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
                        <MinusIcon className="shrink-0" />
                        {diff.remove}
                    </div>
                    <div className="bg-green-100 text-green-700 rounded-sm px-2 md:px-3 py-2 flex items-start gap-2 text-sm md:text-base">
                        <PlusIcon className="shrink-0" />
                        {diff.place}
                    </div>
                </div>
            ))}
        </div>
    );
}
