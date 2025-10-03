'use client'
import React, { useState, useEffect, Suspense } from "react";
import StepsGrid from "../steps/steps-grid";
import ResumeUploader from "./resume-uploader";
import AnalyzeResume from "./analyze-resume";
import Loader from "./loader";
import TipsBlock from "./TipsBlock";
import ResumeFeedback from "./resume-feedback";
import { resumeFeedbackMock } from "../../mocks/resumeFeedbackMock";
import TestimonialsBlock from "./TestimonialsBlock";
import ErrorBlock from "./ErrorBlock";
import { analyzeResumeAction } from '../../app/actions/analyzeResumeAction';
import { generateFeedbackAction } from '../../app/actions/generateFeedbackAction';
import { addResumeAction } from '../../app/actions/addResumeAction';
import CoverLetter from "./cover-letter";
import { generateCoverLetterAction } from '../../app/actions/generateCoverLetterAction';

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

const exampleDiff = [
  {
    remove: "Managed a portfolio of 50+ clients...",
    place: "Built and retained 50+ client accounts via personalized outreach.",
  },
  {
    remove: "Developed and executed sales strategies, resulting in a 25% increase in annual revenue.",
    place: "Executed new strategies resulting in a 25% revenue boost",
  }
]

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
    const [resumeFeedback, setResumeFeedback] = usePersistedState<any>('resumeFeedback', null);
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [feedbackError, setFeedbackError] = useState<string | null>(null);
    const [analyzeError, setAnalyzeError] = useState<string | null>(null);
    // Add state for cover letter loading
    const [coverLetterLoading, setCoverLetterLoading] = useState(false);


    const handleParsedText = async (parsedText: string) => {
        setLoading(true);
        setAnalyzeError(null);
        try {
            const aiResult = await analyzeResumeAction(parsedText);
            setAnalyzeData(aiResult);
            setStep(1);
        } catch (error) {
            setAnalyzeError((error as Error)?.message || 'There was an error analyzing your resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReviewResume = async (form: any) => {
      setFeedbackLoading(true);
      setFeedbackError(null);
      try {
        const result = await generateFeedbackAction(form, parsedText, exampleDiff);
        setResumeFeedback(result);
        // Save to DB after feedback is set
        if (analyzeData && parsedText) {
          await saveToDb({
            ...analyzeData,
            parsedText,
            score: result.score,
            strengths: result.strengths,
            diffs: result.diffs,
            status: 'analysed',
          });
        }
        setStep(2);
      } catch (e: any) {
        setFeedbackError(e.message || 'Failed to generate feedback');
        alert('There was an error generating feedback. Please try again.');
      } finally {
        setFeedbackLoading(false);
      }
    };

    // Handler for generating cover letter from feedback step
    const handleGenerateCoverLetter = async () => {
      setCoverLetterLoading(true);
      setFeedbackError(null);
      try {
        const coverLetter = await generateCoverLetterAction(parsedText, jobTitle);
        setResumeFeedback((prev: any) => ({ ...prev, coverLetter }));
        if (analyzeData && parsedText) {
          await saveToDb({
            ...analyzeData,
            parsedText,
            score: resumeFeedback.score,
            strengths: resumeFeedback.strengths,
            diffs: resumeFeedback.diffs,
            coverLetter,
            status: 'cover_letter',
          });
        }
        setStep(3);
      } catch (e: any) {
        setFeedbackError(e.message || 'Failed to generate cover letter');
        alert('There was an error generating the cover letter. Please try again.');
      } finally {
        setCoverLetterLoading(false);
      }
    };

    async function saveToDb(data: any) {
      try {
        await addResumeAction(data);
      } catch {
        throw new Error('Failed to save to DB');
      }
    }

    useEffect(() => {
        console.log("step", step);
    }, [step]);

    if (!hydrated) {
      return null;
    }

    return (
        <div>
            <StepsGrid steps={["Upload", "Job Profile", "Review", "Cover Letter"]} activeStep={step} />
            {step === 0 && (
                loading ? (
                    <Loader 
                        title="Analyzing Resume"
                        text="We're analyzing your resume and creating a smart base resume template. This will help get all the information you need to apply for a job."
                    >
                        <TipsBlock />
                    </Loader>
                ) : (
                    <>
                      {analyzeError && (
                        <ErrorBlock 
                          message="Sorry, there was an error analyzing your resume."
                          details={analyzeError}
                        />
                      )}
                      <ResumeUploader
                        file={file}
                        setFile={async (f) => {
                          setAnalyzeError(null);
                          await setFile(f);
                        }}
                        jobTitle={jobTitle}
                        setJobTitle={setJobTitle}
                        parsedText={parsedText}
                        setParsedText={setParsedText}
                        onParsedText={handleParsedText}
                      />
                    </>
                )
            )}
            {step === 1 && analyzeData && (
                feedbackLoading ? (
                  <Loader
                    title="Generating Resume Feedback"
                    text="We're reviewing your information and generating detailed suggestions to improve your CV. Please wait..."
                    progress={60}
                  >
                    <TestimonialsBlock />
                  </Loader>
                ) : (
                  <AnalyzeResume
                    fullName={analyzeData.fullName}
                    desiredJob={analyzeData.desiredJob}
                    phone={analyzeData.phone}
                    email={analyzeData.email}
                    location={analyzeData.location}
                    onReview={handleReviewResume}
                    setStep={setStep}
                  />
                )
            )}
            {step === 2 && (
                coverLetterLoading ? (
                  <Loader
                    title="Generating Cover Letter"
                    text="We're crafting a personalized cover letter tailored to your resume and job description. Please wait..."
                    progress={80}
                  />
                ) : feedbackError ? (
                  <ErrorBlock 
                    message="Sorry, there was an error generating your resume feedback."
                    details={feedbackError}
                  />
                ) : (
                  resumeFeedback && <ResumeFeedback {...resumeFeedback} analyzeData={analyzeData} parsedText={parsedText} setStep={setStep} onGenerateCoverLetter={handleGenerateCoverLetter} />
                )
            )}
            {step === 3 && resumeFeedback && (
                <CoverLetter
                  fullName={analyzeData?.fullName || ''}
                  date={resumeFeedback.date}
                  jobTitle={jobTitle}
                  coverLetter={resumeFeedback.coverLetter || ''}
                  onBack={() => setStep(2)}
                />
            )}
        </div>
    );
}