"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import Loader from "./Loader";
import { ResumeDoc, Eye, Trash } from "../icons";

export interface Resume {
    id: string;
    desiredJob: string;
    createdAt?: string;
    status?: string;
    score: number;
    strengths?: string[];
    diffs?: any[];
}

function ResumeRow({ resume, onDelete }: { resume: Resume, onDelete: (id: string) => void }) {
    return (
        <tr
            data-id={resume.id}
            key={resume.id}
            className="border-b border-[#E6E6FA] last:border-0"
        >
            <td className="sticky left-0 bg-white z-10 sticky-shadow-right min-w-[180px] max-w-[250px] font-semibold py-3 px-3 border-r border-[#E6E6FA]">
                <div className="flex items-center gap-2">
                    <span className="inline-block w-8 h-8 rounded-md flex items-center justify-center">
                        <ResumeDoc />
                    </span>
                    <span className="font-semibold truncate text-sm md:text-base">
                        {resume.desiredJob}
                    </span>
                </div>
            </td>
            <td className="min-w-[120px] py-3 px-3 whitespace-nowrap text-sm md:text-base">
                {resume.createdAt
                    ? new Date(resume.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                      })
                    : ""}
            </td>
            <td className="min-w-[120px] py-3 px-3 whitespace-nowrap">
                <StatusBadge status={resume.status || 'analysed'} />
            </td>
            <td className="min-w-[100px] py-3 px-3 whitespace-nowrap">
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
            <td className="min-w-[100px] py-3 px-3 flex gap-2 whitespace-nowrap justify-center">
                <Link
                    href={`/dashboard/${resume.id}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 hover:bg-gray-100"
                >
                    <Eye />
                </Link>
                <button
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 hover:bg-gray-100"
                    onClick={() => onDelete(resume.id)}
                >
                    <Trash />
                </button>
            </td>
        </tr>
    );
}

export default function Dashboard() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/resumes")
            .then((res) => res.json())
            .then((data) => {
                setResumes(data.resumes || []);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load resumes");
                setLoading(false);
            });
    }, []);

    const handleDelete = (id: string) => {
        setPendingDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!pendingDeleteId) return;
        const res = await fetch(`/api/delete-resume?id=${pendingDeleteId}`, { method: "DELETE" });
        if (res.ok) {
            setResumes((prev) => prev.filter((r) => r.id !== pendingDeleteId));
        } else {
            alert("Failed to delete resume");
        }
        setShowModal(false);
        setPendingDeleteId(null);
    };

    const cancelDelete = () => {
        setShowModal(false);
        setPendingDeleteId(null);
    };

    return (
        <div className="px-4 py-8 max-w-[1200px] mx-auto">
            <div className="pl-[20px]">
                <h1 className="text-xl md:text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-500 mb-6 text-sm md:text-base">Here you can browse your resumes</p>
            </div>
            {loading && <Loader />}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && resumes.length === 0 && <p>No resumes found.</p>}
            {!loading && resumes.length > 0 && 
                <div className="overflow-x-auto w-full shadow-md rounded-xl">
                    <table className="min-w-full border-collapse bg-white mt-0">
                        <thead>
                            <tr className="border-b border-[#E6E6FA]">
                                <th className="sticky left-0 bg-white z-10 sticky-shadow-right min-w-[160px] max-w-[250px] text-left py-3 px-3 font-medium text-gray-500 text-sm md:text-base border-r border-[#E6E6FA]">
                                    Job title
                                </th>
                                <th className="min-w-[120px] text-left py-3 px-3 font-medium text-gray-500 whitespace-nowrap text-sm md:text-base">
                                    Created
                                </th>
                                <th className="min-w-[120px] text-left py-3 px-3 font-medium text-gray-500 whitespace-nowrap text-sm md:text-base">
                                    Status
                                </th>
                                <th className="min-w-[100px] text-left py-3 px-3 font-medium text-gray-500 whitespace-nowrap text-sm md:text-base">
                                    Score
                                </th>
                                <th className="min-w-[100px] py-3 px-3 font-medium text-gray-500 whitespace-nowrap text-sm md:text-base">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumes.map((resume) => (
                                <ResumeRow resume={resume} key={resume.id} onDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            {showModal && (
                <div style={{ background: "rgba(117, 117, 117, 0.5)" }} className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4">Delete Resume</h2>
                        <p className="mb-6">Are you sure you want to delete this resume? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={cancelDelete} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
