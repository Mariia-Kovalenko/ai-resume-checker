import React from "react";

export default function TestimonialsBlock() {
  return (
    <div className="flex flex-col items-center justify-center mt-6 w-full max-w-md mx-auto">
      {/* Stars */}
      <div className="flex items-center justify-center mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-0.5"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="#FFD600"
            />
          </svg>
        ))}
      </div>
      {/* Testimonial Text */}
      <p className="text-center text-gray-700 text-sm md:text-base mb-4">
        &ldquo;After uploading my resume to AI Resume Checker, I started getting interview requests within days. The personalized feedback and suggestions made my CV stand out. I landed my dream job faster than I ever expected!&rdquo;
      </p>
      {/* User Info */}
      <div className="flex items-center gap-2">
        <span className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {/* Default SVG avatar */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#E5E7EB" />
            <ellipse cx="16" cy="13" rx="6" ry="6" fill="#BDBDBD" />
            <ellipse cx="16" cy="25" rx="9" ry="5" fill="#BDBDBD" />
          </svg>
        </span>
        <span className="font-semibold text-gray-800 text-sm mt-1">Alex R.</span>
      </div>
    </div>
  );
} 