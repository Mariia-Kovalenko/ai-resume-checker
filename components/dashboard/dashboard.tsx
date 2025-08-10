import { getResumes } from "../../lib/resumes";
import React from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

// Define the Resume interface
export interface Resume {
    id: string;
    desiredJob: string;
    createdAt?: string;
    status?: string;
    score: number;
    // Add other fields as needed
}

// ResumeRow component
function ResumeRow({ resume }: { resume: Resume }) {
    return (
        <tr
            data-id={resume.id}
            key={resume.id}
            className="border-b border-[#E6E6FA] last:border-0"
        >
            <td className="sticky left-0 bg-white z-10 sticky-shadow-right min-w-[180px] font-semibold flex items-center gap-2 py-3 px-4">
                <span className="inline-block w-8 h-8 rounded-md flex items-center justify-center">
                    <svg
                        width="32"
                        height="33"
                        viewBox="0 0 32 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                </span>
                <span className="font-semibold truncate text-sm md:text-base">
                    {resume.desiredJob}
                </span>
            </td>
            <td className="min-w-[120px] py-3 px-4 whitespace-nowrap text-sm md:text-base">
                {resume.createdAt
                    ? new Date(resume.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                      })
                    : ""}
            </td>
            <td className="min-w-[120px] py-3 px-4 whitespace-nowrap">
                {/* Placeholder: replace 'draft' with resume.status when available */}
                <StatusBadge status="draft" />
            </td>
            <td className="min-w-[100px] py-3 px-4 whitespace-nowrap">
                <span
                    className={`inline-block px-[6px] py-[4px] min-w-[25px] text-center rounded-md text-[12px] md:text-sm font-semibold ${
                        resume.score < 50
                            ? "bg-red-50 text-red-500"
                            : "bg-[#EDECFC] text-[var(--color-purple)]"
                    }`}
                >
                    {resume.score ?? (
                        <span className="text-red-500">-</span>
                    )}
                </span>
            </td>
            <td className="min-w-[100px] py-3 px-4 flex gap-2 whitespace-nowrap justify-center">
                <Link
                    href={`/dashboard/${resume.id}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 hover:bg-gray-100"
                >
                    <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18.7667 10.0208C17.0834 6.1125 13.9167 3.6875 10.5001 3.6875C7.08339 3.6875 3.91672 6.1125 2.23339 10.0208C2.1875 10.126 2.16382 10.2395 2.16382 10.3542C2.16382 10.4689 2.1875 10.5824 2.23339 10.6875C3.91672 14.5958 7.08339 17.0208 10.5001 17.0208C13.9167 17.0208 17.0834 14.5958 18.7667 10.6875C18.8126 10.5824 18.8363 10.4689 18.8363 10.3542C18.8363 10.2395 18.8126 10.126 18.7667 10.0208ZM10.5001 15.3542C7.85839 15.3542 5.35839 13.4458 3.91672 10.3542C5.35839 7.2625 7.85839 5.35417 10.5001 5.35417C13.1417 5.35417 15.6417 7.2625 17.0834 10.3542C15.6417 13.4458 13.1417 15.3542 10.5001 15.3542ZM10.5001 7.02083C9.84078 7.02083 9.19632 7.21633 8.64816 7.5826C8.09999 7.94887 7.67275 8.46947 7.42046 9.07856C7.16816 9.68764 7.10215 10.3579 7.23077 11.0045C7.35939 11.6511 7.67686 12.245 8.14303 12.7112C8.60921 13.1774 9.20315 13.4948 9.84975 13.6235C10.4964 13.7521 11.1666 13.6861 11.7757 13.4338C12.3848 13.1815 12.9053 12.7542 13.2716 12.2061C13.6379 11.6579 13.8334 11.0134 13.8334 10.3542C13.8334 9.47011 13.4822 8.62227 12.8571 7.99714C12.232 7.37202 11.3841 7.02083 10.5001 7.02083ZM10.5001 12.0208C10.1704 12.0208 9.84819 11.9231 9.57411 11.7399C9.30002 11.5568 9.0864 11.2965 8.96026 10.992C8.83411 10.6874 8.8011 10.3523 8.86541 10.029C8.92972 9.70571 9.08846 9.40874 9.32154 9.17566C9.55463 8.94257 9.8516 8.78383 10.1749 8.71952C10.4982 8.65522 10.8333 8.68822 11.1379 8.81437C11.4424 8.94051 11.7027 9.15413 11.8858 9.42822C12.069 9.7023 12.1667 10.0245 12.1667 10.3542C12.1667 10.7962 11.9911 11.2201 11.6786 11.5327C11.366 11.8452 10.9421 12.0208 10.5001 12.0208Z"
                            fill="#636871"
                            fillOpacity="0.8"
                        />
                    </svg>
                </Link>
                <button className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 hover:bg-gray-100">
                    <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_108_677)">
                            <path
                                d="M16.2501 4.85431H12.5001V3.60181C12.4825 3.12167 12.2752 2.6681 11.9237 2.34052C11.5723 2.01295 11.1052 1.8381 10.6251 1.85431H8.37506C7.89488 1.8381 7.42786 2.01295 7.07638 2.34052C6.72491 2.6681 6.51766 3.12167 6.50006 3.60181V4.85431H2.75006C2.55115 4.85431 2.36038 4.93332 2.21973 5.07398C2.07908 5.21463 2.00006 5.40539 2.00006 5.60431C2.00006 5.80322 2.07908 5.99398 2.21973 6.13464C2.36038 6.27529 2.55115 6.35431 2.75006 6.35431H3.50006V14.6043C3.50006 15.201 3.73711 15.7733 4.15907 16.1953C4.58103 16.6173 5.15332 16.8543 5.75006 16.8543H13.2501C13.8468 16.8543 14.4191 16.6173 14.8411 16.1953C15.263 15.7733 15.5001 15.201 15.5001 14.6043V6.35431H16.2501C16.449 6.35431 16.6397 6.27529 16.7804 6.13464C16.921 5.99398 17.0001 5.80322 17.0001 5.60431C17.0001 5.40539 16.921 5.21463 16.7804 5.07398C16.6397 4.93332 16.449 4.85431 16.2501 4.85431ZM8.00006 3.60181C8.00006 3.48181 8.15756 3.35431 8.37506 3.35431H10.6251C10.8426 3.35431 11.0001 3.48181 11.0001 3.60181V4.85431H8.00006V3.60181ZM14.0001 14.6043C14.0001 14.8032 13.921 14.994 13.7804 15.1346C13.6397 15.2753 13.449 15.3543 13.2501 15.3543H5.75006C5.55115 15.3543 5.36038 15.2753 5.21973 15.1346C5.07908 14.994 5.00006 14.8032 5.00006 14.6043V6.35431H14.0001V14.6043Z"
                                fill="#636871"
                                fillOpacity="0.8"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_108_677">
                                <rect
                                    width="18"
                                    height="18"
                                    fill="white"
                                    transform="translate(0.500061 0.354248)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </td>
        </tr>
    );
}

export default async function Dashboard() {
    const resumes = await getResumes();

    console.log(resumes);

    return (
        <div className="px-4 py-8">
            <div className="pl-[20px]">
                <h1 className="text-xl md:text-3xl font-bold mb-2">
                    Anna’s Dashboard
                </h1>
                <p className="text-gray-500 mb-6 text-sm md:text-base">
                    Here you can browse your resumes
                </p>
            </div>
            {resumes.length === 0 && <p>No resumes found.</p>}
            <div className="bg-white rounded-xl shadow-sm mt-4">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b border-[#E6E6FA]">
                                <th className="sticky left-0 bg-white z-10 sticky-shadow-right rounded-tl-xl z-10 min-w-[180px] text-left py-3 px-4 font-medium text-gray-500 text-sm md:text-base">
                                    Job title
                                </th>
                                <th className="min-w-[120px] text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap text-sm md:text-base">
                                    Created
                                </th>
                                <th className="min-w-[120px] text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap text-sm md:text-base">
                                    Status
                                </th>
                                <th className="min-w-[100px] text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap text-sm md:text-base">
                                    Score
                                </th>
                                <th className="min-w-[100px] py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumes.map((resume: Resume) => (
                                <ResumeRow resume={resume} key={resume.id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
