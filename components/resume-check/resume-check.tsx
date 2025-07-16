'use client'
import React, { useState, useEffect } from "react";
import StepsGrid from "../steps/steps-grid";
import ResumeUploader from "./ResumeUploader";

export default function ResumeCheck() {
    const [file, setFile] = useState<File | null>(null);
    const [jobTitle, setJobTitle] = useState<string>("");
    const [step, setStep] = useState<number>(0);

    const handleStepChange = (newStep: number) => {
        console.log("newStep", newStep);
        setStep(newStep);
    }

    useEffect(() => {
        console.log("step", step);
    }, [step]);

    return (
        <div>
            <StepsGrid steps={["Upload", "Review", "Download"]} activeStep={step} />
            {step === 0 && <ResumeUploader onFileChange={setFile} onJobTitleChange={setJobTitle} onStepChange={handleStepChange} />}
            {step === 1 && <div>Review</div>}
            {/* {step === 2 && <ResumeDownloader />} */}
        </div>
    )
}