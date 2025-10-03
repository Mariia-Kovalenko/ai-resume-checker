'use client';
import React, { useState, useTransition } from 'react';
import ResumeFeedback from './resume-feedback';
import CoverLetter from './cover-letter';
import Loader from './loader';
import { generateCoverLetterAction } from '../../app/actions/generateCoverLetterAction';
import { Stars } from '../icons';

interface ResumeClientViewProps {
  id: string;
  fullName: string;
  score: number;
  strengths: string[];
  diffs: { remove: string; place: string }[];
  date: string;
  parsedText: string;
  desiredJob: string;
  coverLetter?: string;
  analyzeData?: any;
}

export default function ResumeClientView({
  id,
  fullName,
  score,
  strengths,
  diffs,
  date,
  parsedText,
  desiredJob,
  coverLetter: initialCoverLetter,
  analyzeData,
}: ResumeClientViewProps) {
  const [showCoverLetter, setShowCoverLetter] = useState(true);
  const [coverLetter, setCoverLetter] = useState(initialCoverLetter || '');
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCoverLetter = async () => {
    setError(null);
    startTransition(async () => {
      try {
        const letter = await generateCoverLetterAction(parsedText, desiredJob);
        const res = await fetch('/api/resumes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, coverLetter: letter, status: 'cover_letter' }),
        });
        if (!res.ok) throw new Error('Failed to save cover letter');
        setCoverLetter(letter);
        setShowCoverLetter(true);
      } catch (e: any) {
        setError(e.message || 'Failed to generate cover letter');
      }
    });
  };

  const handleShowCoverLetter = () => setShowCoverLetter(true);
  const handleBackToResume = () => setShowCoverLetter(false);
  const handleRegenerate = handleGenerateCoverLetter;

  if (loading) {
    return (
      <Loader
        title="Generating Cover Letter"
        text="We're crafting a personalized cover letter tailored to your resume and job description. Please wait..."
        progress={80}
      />
    );
  }

  if (showCoverLetter && coverLetter) {
    return (
      <CoverLetter
        fullName={fullName}
        date={date}
        jobTitle={desiredJob}
        coverLetter={coverLetter}
        onBack={handleBackToResume}
        onRegenerate={handleRegenerate}
        dashboardMode
      />
    );
  }

  return (
    <ResumeFeedback
      fullName={fullName}
      score={score}
      strengths={strengths}
      diffs={diffs}
      date={date}
      parsedText={parsedText}
      analyzeData={analyzeData}
      onGenerateCoverLetter={!coverLetter ? handleGenerateCoverLetter : undefined}
      onShowCoverLetter={coverLetter ? handleShowCoverLetter : undefined}
      dashboardMode
    />
  );
}
