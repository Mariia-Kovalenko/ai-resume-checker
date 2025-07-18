'use client'
import React, { useState, useEffect, Suspense } from "react";
import StepsGrid from "../steps/steps-grid";
import ResumeUploader from "./resume-uploader";
import AnalyzeResume from "./analyze-resume";
import Loader from "./loader";

export default function ResumeCheck() {
    const [file, setFile] = useState<File | null>(null);
    const [jobTitle, setJobTitle] = useState<string>("");
    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [analyzeData, setAnalyzeData] = useState<{
        fullName: string;
        desiredJob: string;
        phone: string;
        email: string;
        location: string;
    } | null>(null);

    const handleParsedText = async (parsedText: string) => {
        setLoading(true);
        // Simulate AI request
        const aiResult = await new Promise<typeof analyzeData>((resolve) =>
            setTimeout(() => resolve({
                fullName: "John Doe",
                desiredJob: "Sales manager",
                phone: "",
                email: "email@email.com",
                location: "Kyiv"
            }), 17000)
        );
        setAnalyzeData(aiResult);
        setStep(1);
        setLoading(false);
    };

    useEffect(() => {
        console.log("step", step);
    }, [step]);

    return (
        <div>
            <StepsGrid steps={["Upload", "Review", "Download"]} activeStep={step} />
            {step === 0 && (
                loading ? (
                    <Loader />
                ) : (
                    <ResumeUploader
                        onFileChange={setFile}
                        onJobTitleChange={setJobTitle}
                        onParsedText={handleParsedText}
                    />
                )
            )}
            {step === 1 && analyzeData && (
                <AnalyzeResume
                    fullName={analyzeData.fullName}
                    desiredJob={analyzeData.desiredJob}
                    phone={analyzeData.phone}
                    email={analyzeData.email}
                    location={analyzeData.location}
                />
            )}
        </div>
    );
}