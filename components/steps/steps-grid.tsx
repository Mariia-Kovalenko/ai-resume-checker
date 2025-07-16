import React from "react";
import StepItem from "./step-item";

export default function StepsGrid({ steps, activeStep = 0 }) {
  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto py-8">
      {steps.slice(0, 8).map((label, idx) => (
          <StepItem
            key={idx}
            label={label}
            active={idx === activeStep}
            completed={idx < activeStep}
            isLast={idx === steps.length - 1 || idx === 7}
            isFirst={idx === 0}
          />
      ))}
    </div>
  );
}
