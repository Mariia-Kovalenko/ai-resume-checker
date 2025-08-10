import React from 'react';

interface ErrorBlockProps {
  message: string;
  details?: string;
  className?: string;
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({ message, details, className }) => (
  <div className={`bg-red-100 text-red-700 rounded-md p-6 text-center font-semibold max-w-lg mx-auto ${className || ''}`}>
    <div className="mb-2 text-2xl">⚠️</div>
    <div>{message}</div>
    {details && <div className="mt-2 text-sm text-gray-600">{details}</div>}
  </div>
);

export default ErrorBlock; 