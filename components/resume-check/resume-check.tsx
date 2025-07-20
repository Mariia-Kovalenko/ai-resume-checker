'use client'
import React, { useState, useEffect, Suspense } from "react";
import StepsGrid from "../steps/steps-grid";
import ResumeUploader from "./resume-uploader";
import AnalyzeResume from "./analyze-resume";
import Loader from "./loader";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function base64ToFile(base64: string, fileName: string, fileType: string): File {
  const arr = base64.split(",");
  const match = arr[0].match(/:(.*?);/);
  const mime = match ? match[1] : fileType || 'application/octet-stream';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

function usePersistedFile(key: string) {
  const [file, setFileState] = useState<File | null>(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const { name, type, base64 } = JSON.parse(stored);
          if (base64 && name && type) {
            const f = base64ToFile(base64, name, type);
            setFileState(f);
          }
        } catch {}
      }
    }
  }, [key]);
  const setFile = async (f: File | null) => {
    setFileState(f);
    if (f) {
      const base64 = await fileToBase64(f);
      localStorage.setItem(key, JSON.stringify({ name: f.name, type: f.type, base64 }));
    } else {
      localStorage.removeItem(key);
    }
  };
  return [file, setFile] as const;
}

function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}

function useIsHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

export default function ResumeCheck() {
    const hydrated = useIsHydrated();
    const [file, setFile] = usePersistedFile('resumeFile');
    const [jobTitle, setJobTitle] = usePersistedState<string>('jobTitle', "");
    const [step, setStep] = usePersistedState<number>('resumeStep', 0);
    const [loading, setLoading] = useState(false);
    const [analyzeData, setAnalyzeData] = usePersistedState<{
        fullName: string;
        desiredJob: string;
        phone: string;
        email: string;
        location: string;
    } | null>('analyzeData', null);
    const [parsedText, setParsedText] = usePersistedState<string>('parsedText', '');


    const handleParsedText = async (parsedText: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/analyze-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ parsedText }),
            });
            // const mockResponse = {
            //     fullName: "John Doe",
            //     desiredJob: "Sales manager",
            //     phone: "",
            //     email: "email@email.com",
            //     location: "Kyiv"
            // }
            if (!response.ok) {
                throw new Error('Failed to analyze resume');
            }
            const aiResult = await response.json();
            console.log('aiResult', aiResult);
            setAnalyzeData(aiResult.data);
            // save to db
            saveToDb(aiResult.data);
            setStep(1);
        } catch (error) {
            // Optionally, handle error state here (e.g., show a message)
            alert('There was an error analyzing your resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    async function saveToDb(data: any) {
      // Save to DB via API route
      await fetch('/api/add-resume', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  }

    useEffect(() => {
        console.log("step", step);
    }, [step]);

    if (!hydrated) {
      return null;
    }

    return (
        <div>
            <StepsGrid steps={["Upload", "Job Profile", "Review"]} activeStep={step} />
            {step === 0 && (
                loading ? (
                    <Loader />
                ) : (
                    <ResumeUploader
                        file={file}
                        setFile={setFile}
                        jobTitle={jobTitle}
                        setJobTitle={setJobTitle}
                        parsedText={parsedText}
                        setParsedText={setParsedText}
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
                    setStep={setStep}
                />
            )}
        </div>
    );
}