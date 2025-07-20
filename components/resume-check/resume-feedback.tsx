import TotalScore from "./TotalScore";
import ImprovementsDiff from "./ImprovementsDiff";
import Image from "next/image";
import wand from '../../assets/wand.png'
import tools from '../../assets/tools.png'
import strong from '../../assets/strong.png'

interface ResumeFeedbackProps {
    fullName: string;
    score: number;
    strengths: string[];
    diffs: { remove: string; place: string }[];
    date: string;
    setStep: (step: number) => void;
}

export default function ResumeFeedback({
    fullName,
    score,
    strengths,
    diffs,
    date,
    setStep,
}: ResumeFeedbackProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Image
                    src={wand}
                    alt="upload file"
                    className="w-8 h-8 md:w-10 md:h-10"
                />
                <span>Your feedback is ready</span>
            </h2>
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] max-w-[90%] md:w-[600px] mx-auto mb-8">
                <h2 className="text-md md:text-xl font-medium text-center flex items-center justify-between gap-2 mb-6">
                    <span className="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
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
                                    fill-opacity="0.87"
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
                                    color-interpolation-filters="sRGB"
                                >
                                    <feFlood
                                        flood-opacity="0"
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
                                    <feComposite
                                        in2="hardAlpha"
                                        operator="out"
                                    />
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
                        Resume of {fullName}
                    </span>
                    <span className="text-sm text-gray-500">{date}</span>
                </h2>
                <TotalScore score={score} />
                <div className="mb-6">
                    <div className="font-semibold text-md md:text-lg flex items-center gap-2 mb-2">
                        <span role="img" aria-label="strengths">
                            <Image
                                src={strong}
                                alt="strengths"
                                className="w-4 h-4 md:w-6 md:h-6"
                            />
                        </span>{" "}
                        Strengths
                    </div>
                    <ul className="list-disc pl-5 text-sm md:text-base">
                        {strengths.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="font-semibold text-md md:text-lg flex items-center gap-2 mb-2">
                        <span role="img" aria-label="improvements">
                            <Image
                                src={tools}
                                alt="improvements"
                                className="w-4 h-4 md:w-6 md:h-6"
                            />
                        </span>{" "}
                        Suggestions for Improvements
                    </div>
                    <ImprovementsDiff diffs={diffs} />
                </div>

                {/* button */}
                <button className="uppercase flex items-center justify-center gap-2 mt-4 w-full bg-[var(--color-purple)] text-white font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80">
                    <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    update MY RESUME
                </button>
                <button
                    className="underline text-sm cursor-pointer mt-4 text-center block w-full"
                    onClick={() => setStep(1)}
                >
                    Back to review
                </button>
            </div>
        </div>
    );
}
