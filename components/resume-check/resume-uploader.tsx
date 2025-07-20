"use client";
import React, { useRef, useState, ChangeEvent, DragEvent } from "react";
import { getFileIcon, formatSize } from "../../utils/fileUtils";
import {
    ACCEPTED_TYPES,
    MAX_SIZE_BYTES,
} from "../../utils/constants";
import Image from 'next/image';
import girlLaptop from '/assets/girl-laptop-emojii.png';

interface ResumeUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  jobTitle: string;
  setJobTitle: (title: string) => void;
  parsedText: string;
  setParsedText: (text: string) => void;
  onFileChange?: (file: File | null) => void;
  onJobTitleChange?: (title: string) => void;
  onParsedText?: (text: string) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  file,
  setFile,
  jobTitle,
  setJobTitle,
  parsedText,
  setParsedText,
  onFileChange,
  onJobTitleChange,
  onParsedText,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxChars = 300;

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!ACCEPTED_TYPES.includes(f.type)) {
      alert("Only PDF and DOCX files are allowed.");
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      alert("File size must be less than 25MB.");
      return;
    }
    setFile(f);
    onFileChange && onFileChange(f);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    handleFile(f);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover")
      setDragActive(true);
    else setDragActive(false);
  };

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value.slice(0, maxChars);
    setJobTitle(val);
    onJobTitleChange && onJobTitleChange(val);
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    onFileChange && onFileChange(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.text) {
        setParsedText(data.text);
        onParsedText && onParsedText(data.text);
      }
    } catch (err) {
      alert("Error parsing file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="text-xl md:text-2xl font-bold text-center flex items-center justify-center gap-2">
        <Image
          src={girlLaptop}
          alt="upload file"
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <span>Upload File</span>
      </h2>
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] max-w-[90%] md:w-[500px] mx-auto mb-8">
        <div
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors duration-200 hover:bg-[var(--color-light-purple-hover)] ${
            dragActive
              ? "border-[var(--color-purple)] bg-[var(--color-light-purple)]"
              : "border-[var(--color-purple)] bg-[transparent]"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{ cursor: "pointer", minHeight: 250 }}
        >
          <input
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ref={fileInputRef}
            className="hidden"
            onChange={handleChange}
          />
          <div className="flex flex-col items-center">
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_15_68)">
                <path
                  d="M18.3127 7.06241C11.5813 7.06241 6.125 12.5001 6.125 19.2501C6.125 19.2501 6.12388 19.2388 6.125 19.4256C2.78038 21.1131 0.5 24.4993 0.5 28.6247C0.5 34.2497 5.117 38.9376 10.8123 38.9376H36.1248C41.3021 38.9376 45.5 34.6249 45.5 29.5624C45.5 25.6249 43.0683 22.215 39.6404 20.7143C39.7738 20.3397 39.875 19.8126 39.875 19.2501C39.875 15.4999 36.9371 12.6874 33.3123 12.6874C31.8161 12.6874 30.4323 13.039 29.3281 13.9767C27.3723 9.85128 23.1744 7.06241 18.3127 7.06241ZM23 16.4376L30.4998 25.8122H26.7502V35.1868H19.2498V25.8128H15.5002L23 16.4376Z"
                  fill="#716CE9"
                />
              </g>
              <defs>
                <clipPath id="clip0_15_68">
                  <rect
                    width="45"
                    height="45"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="text-[var(--color-grey)] font-medium mt-4 text-center text-sm md:text-base">
              Drag & drop or click to upload files
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between text-xs md:text-sm text-gray-400 mt-2">
          <span>Supported formats: PDF, DOCX</span>
          <span>Max: 25MB</span>
        </div>
        {/* File preview card */}
        {file && (
          <div className="flex items-center gap-4 border border-[var(--color-light-purple)] bg-[var(--background)] rounded-md px-2 md:px-4 py-3 mt-4">
            <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] border-1 shrink-0 rounded-md border-[var(--color-light-purple)] bg-white flex items-center justify-center">
              {getFileIcon(file.type)}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-black truncate text-wrap text-sm md:text-md">
                {file.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatSize(file.size)}
              </div>
            </div>
            <button
              className="p-2 rounded bg-white border-1 cursor-pointer border-[var(--color-light-purple)] hover:border-[var(--color-purple)] transition"
              onClick={handleRemoveFile}
              aria-label="Remove file"
              tabIndex={0}
            >
              {/* Trash icon */}
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_15_60)">
                  <path
                    d="M16.25 4.85077H12.5V3.59827C12.4824 3.11813 12.2752 2.66456 11.9237 2.33698C11.5722 2.00941 11.1052 1.83456 10.625 1.85077H8.375C7.89481 1.83456 7.4278 2.00941 7.07632 2.33698C6.72485 2.66456 6.51759 3.11813 6.5 3.59827V4.85077H2.75C2.55109 4.85077 2.36032 4.92978 2.21967 5.07044C2.07902 5.21109 2 5.40185 2 5.60077C2 5.79968 2.07902 5.99044 2.21967 6.1311C2.36032 6.27175 2.55109 6.35077 2.75 6.35077H3.5V14.6008C3.5 15.1975 3.73705 15.7698 4.15901 16.1918C4.58097 16.6137 5.15326 16.8508 5.75 16.8508H13.25C13.8467 16.8508 14.419 16.6137 14.841 16.1918C15.2629 15.7698 15.5 15.1975 15.5 14.6008V6.35077H16.25C16.4489 6.35077 16.6397 6.27175 16.7803 6.1311C16.921 5.99044 17 5.79968 17 5.60077C17 5.40185 16.921 5.21109 16.7803 5.07044C16.6397 4.92978 16.4489 4.85077 16.25 4.85077ZM8 3.59827C8 3.47827 8.1575 3.35077 8.375 3.35077H10.625C10.8425 3.35077 11 3.47827 11 3.59827V4.85077H8V3.59827ZM14 14.6008C14 14.7997 13.921 14.9904 13.7803 15.1311C13.6397 15.2717 13.4489 15.3508 13.25 15.3508H5.75C5.55109 15.3508 5.36032 15.2717 5.21967 15.1311C5.07902 14.9904 5 14.7997 5 14.6008V6.35077H14V14.6008Z"
                    fill="#636871"
                    fillOpacity="0.8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15_60">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(0.5 0.350769)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        )}
        <div className="mt-8">
          <label
            className="block font-semibold text-sm mb-2"
            htmlFor="job-title"
          >
            Job Title or Description
          </label>
          <div className="relative">
            <textarea
              id="job-title"
              className="w-full bg-[var(--background)] rounded-md border-1 border-gray-200 p-2 md:p-4 text-sm resize-none transition-all duration-200 outline-[transparent] outline-2 focus:outline-[var(--color-purple)]"
              placeholder="Enter job title or derscription"
              maxLength={maxChars}
              rows={5}
              value={jobTitle}
              onChange={handleTextarea}
            />
            <span className="absolute left-3 bottom-4 text-xs text-gray-300 select-none">
              {jobTitle.length}/{maxChars}
            </span>
          </div>
        </div>
        <button
          className={`uppercase mt-8 w-full bg-[var(--color-purple)] text-white font-semibold rounded-md py-3 text-[14px] cursor-pointer transition-colors duration-200 hover:opacity-80 ${
            !file || !jobTitle ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!file || !jobTitle}
          onClick={handleAnalyze}
        >
          {loading ? "ANALYZING..." : "ANALYZE FILE"}
        </button>
      </div>
    </div>
  );
};

export default ResumeUploader; 