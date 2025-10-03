"use client";
import React, { useRef, useState, ChangeEvent, DragEvent } from "react";
import { getFileIcon, formatSize } from "../../utils/fileUtils";
import {
    ACCEPTED_TYPES,
    MAX_SIZE_BYTES,
} from "../../utils/constants";
import Image from 'next/image';
import girlLaptop from '/assets/girl-laptop-emojii.png';
import { TrashAlt } from "../icons";
import DocumentIcon from "../icons/DocumentIcon";

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
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 w-[90%] max-w-[90%] md:w-[650px] mx-auto mb-8">
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
            <DocumentIcon style={{ width: 46, height: 46 }} />
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
              <TrashAlt />
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