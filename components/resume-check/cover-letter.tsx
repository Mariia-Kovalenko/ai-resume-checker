import React from "react";
import DocumentIcon from "../icons/DocumentIcon";
import { CopyIcon, Stars } from "../icons";

interface CoverLetterProps {
  fullName: string;
  date: string;
  jobTitle: string;
  coverLetter: string;
  onBack?: () => void;
  onRegenerate?: () => void;
  dashboardMode?: boolean;
}

const CoverLetter: React.FC<CoverLetterProps> = ({ fullName, date, jobTitle, coverLetter, onBack, onRegenerate, dashboardMode }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    if (navigator && navigator.clipboard) {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] max-w-[90%] md:w-[650px] mx-auto mb-8">
      <h2 className="text-md md:text-xl font-medium text-center flex items-center justify-between gap-2 mb-6 relative">
        <span className="flex items-center gap-2 text-left text-sm md:text-lg">
          <DocumentIcon />
          Cover Letter for {fullName}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs md:text-s text-gray-500">{date}</span>
        </span>
      </h2>
      <div className="mb-4 text-sm md:text-base text-gray-700">
        <span className="font-semibold">Position: </span>{jobTitle}
      </div>
      <div className="whitespace-pre-line text-sm md:text-base text-gray-900 border border-[var(--color-light-purple)] bg-[var(--background)] rounded-md p-4 mb-6 relative">
        {coverLetter}

        <button
            onClick={handleCopy}
            className="ml-2 p-1 rounded bg-white hover:border-[var(--color-purple)] hover:cursor-pointer border-[var(--color-light-purple)] border-1 transition absolute top-2 right-2"
            aria-label="Copy cover letter"
            type="button"
          >
            <CopyIcon width={20} height={20} />
            {copied && (
              <span className="absolute right-0 top-7 bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">Copied!</span>
            )}
          </button>
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
      {dashboardMode && onRegenerate && (
          <button
            onClick={onRegenerate}
            className="uppercase flex items-center justify-center gap-2 mt-4 w-full border-[1.5px] border-[var(--color-purple)] text-[var(--color-purple)] font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80"
            type="button"
          >
            <Stars color="purple" />
            regenerate
          </button>
        )}
        {onBack && (
          <button
            onClick={onBack}
            className="underline text-sm cursor-pointer w-full md:w-auto text-center border border-transparent bg-transparent rounded-md py-2 px-4"
          >
            Back to resume
          </button>
        )}
      </div>
    </div>
  );
};

export default CoverLetter;
