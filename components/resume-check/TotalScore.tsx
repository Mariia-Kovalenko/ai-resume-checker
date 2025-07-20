// TotalScore component displays the score with a colored progress bar based on the score value.
import React from "react";

interface TotalScoreProps {
  score: number;
}

export default function TotalScore({ score }: TotalScoreProps) {
  // Color logic: purple >70, yellow 40-70, red <40
  let color = "bg-[var(--color-purple)]";
  if (score < 40) color = "bg-red-400";
  else if (score < 70) color = "bg-yellow-400";

  return (
    <div className="mb-4 bg-[#FDFDFE] border-1 border-[var(--color-light-purple)] rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold text-black">Total Score</span>
        <span className={`text-lg font-semibold ${color === "bg-[var(--color-purple)]" ? "text-[var(--color-purple)]" : color === "bg-yellow-400" ? "text-yellow-500" : "text-red-500"}`}>{score}</span>
      </div>
      <div className="w-full h-1 bg-gray-100 rounded-full">
        <div
          className={`${color} h-1 rounded-full transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
} 