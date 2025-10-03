'use client';
import TotalScore from "./TotalScore";
import ImprovementsDiff from "./ImprovementsDiff";
interface ResumeFeedbackProps {
    fullName: string;
    score: number;
    strengths: string[];
    diffs: { remove: string; place: string }[];
    date: string;
    analyzeData?: {
        fullName: string;
        desiredJob: string;
        phone: string;
        email: string;
        location: string;
    };
    parsedText?: string;
    setStep?: (step: number) => void;
    onGenerateCoverLetter?: () => void;
    onShowCoverLetter?: () => void;
    dashboardMode?: boolean;
}
import Image from "next/image";

import strong from "../../assets/strong.png";
import tools from "../../assets/tools.png";

import DocumentIcon from "../icons/DocumentIcon";
import { Stars } from "../icons";

export default function ResumeFeedback({
    fullName,
    score,
    strengths,
    diffs,
    date,
    analyzeData,
    parsedText,
    setStep,
    onGenerateCoverLetter,
    onShowCoverLetter,
    dashboardMode,
}: ResumeFeedbackProps) {

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] max-w-[90%] md:w-[650px] mx-auto mb-8">
            <h2 className="text-md md:text-xl font-medium text-center flex items-center justify-between gap-2 mb-6">
                <span className="flex items-center gap-2 text-left text-sm md:text-lg">
                    <DocumentIcon />
                    Resume of {fullName}
                </span>
                <span className="text-xs md:text-s text-gray-500">{date}</span>
            </h2>
            <TotalScore score={score} />
            <div className="mb-6">
                <div className="font-semibold text-md md:text-lg flex items-center gap-2 mb-3">
                    <Image src={strong} alt="wand" width={24} height={24} />
                    Strengths
                </div>
                <ul className="list-disc pl-5 text-sm md:text-base">
                    {strengths && strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>
            {diffs && (
                <div>
                    <div className="font-semibold text-md md:text-lg flex items-center gap-2 mb-3">
                        <Image src={tools} alt="tools" width={24} height={24} />
                        Suggestions for Improvements
                    </div>
                        <ImprovementsDiff diffs={diffs} />
                </div>
            )}
            {/* button */}
            {dashboardMode ? (
                onShowCoverLetter ? (
                    <button
                        className="uppercase flex items-center justify-center gap-2 mt-4 w-full bg-[var(--color-purple)] text-white font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80"
                        onClick={onShowCoverLetter}
                    >
                        show cover letter
                    </button>
                ) : onGenerateCoverLetter ? (
                    <button
                        className="uppercase flex items-center justify-center gap-2 mt-4 w-full bg-[var(--color-purple)] text-white font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80"
                        onClick={onGenerateCoverLetter}
                    >
                        <Stars />
                        generate cover letter
                    </button>
                ) : null
            ) : (
                <button
                    className="uppercase flex items-center justify-center gap-2 mt-4 w-full bg-[var(--color-purple)] text-white font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80"
                    onClick={onGenerateCoverLetter}
                    disabled={!onGenerateCoverLetter}
                >
                    <Stars />
                    generate cover letter
                </button>
            )}

            {/* back to profile */}
            {setStep && (
                <button 
                onClick={() => setStep?.(1)}
                className="underline text-sm cursor-pointer mt-4 w-full text-center">
                    Back to profile
                </button>
            )}
        </div>
    );
}
