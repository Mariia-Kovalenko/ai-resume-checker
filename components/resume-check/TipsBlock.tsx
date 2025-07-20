import React from "react";

export default function TipsBlock() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-6 w-full max-w-md mx-auto">
      <div className="text-sm text-gray-700 font-semibold mb-2">Tips for a great CV:</div>
      <div className="bg-[var(--color-lightPurple)] rounded-lg p-4 pt-0 w-full">
        <div className="flex flex-col gap-6">
          {/* Dos */}
          <div className="flex-1">
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-start gap-2"><svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Tailor your CV to the specific job you’re applying for</li>
              <li className="flex items-start gap-2"><svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Highlight measurable achievements and key skills</li>
              <li className="flex items-start gap-2"><svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Keep your CV concise (1–2 pages) and well-organized</li>
            </ul>
          </div>
          {/* Don'ts */}
          <div className="flex-1">
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-start gap-2"><svg className="h-4 w-4 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>Don’t include irrelevant personal information (age, marital status, photo)</li>
              <li className="flex items-start gap-2"><svg className="h-4 w-4 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>Don’t use generic phrases like “hardworking” without examples</li>
              <li className="flex items-start gap-2"><svg className="h-4 w-4 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>Don’t leave unexplained gaps in your employment history</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 