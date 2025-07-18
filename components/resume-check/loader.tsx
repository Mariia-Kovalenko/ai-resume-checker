export default function Loader() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] md:w-[500px] max-w-full mx-auto mb-8 flex flex-col items-center justify-center">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-3">Analyzing Resume</h2>
      <p className="text-gray-500 text-center mb-8 text-sm md:text-base max-w-lg">
        We're analyzing your resume and creating a smart base resume template. This will help get all the information you need to apply for a job.
      </p>
      {/* Animated progress bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-10">
        <div className="h-full bg-[var(--color-purple)] animate-loader-progress" style={{ width: '60%' }} />
      </div>
      {/* Tips for best results */}
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
      <style jsx>{`
        @keyframes loader-progress {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 100%; }
        }
        .animate-loader-progress {
          animation: loader-progress 2s infinite alternate;
        }
      `}</style>
    </div>
  );
} 