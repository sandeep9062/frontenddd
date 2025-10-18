"use client";

import React from "react";

interface Disclaimer {
  title: string;
  content: string;
  warning: string;
}

interface MedicalDisclaimerProps {
  page?: "general" | "consultation" | "treatment";
}

const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({ page = "general" }) => {
  const disclaimers: Record<string, Disclaimer> = {
    general: {
      title: "Medical Information Disclaimer",
      content:
        "The information provided on this platform is for educational and informational purposes only and is not intended as medical advice. This content should not be used to diagnose, treat, cure, or prevent any medical condition. Always consult with a qualified healthcare provider before making any medical decisions or treatment plans.",
      warning:
        "FOR INFORMATIONAL PURPOSES ONLY - NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE",
    },
    consultation: {
      title: "Consultation Service Disclaimer",
      content:
        "Our consultation service connects you with dental professionals but does not replace in-person medical examination. The advice provided through our platform should be considered as preliminary guidance only. Final diagnosis and treatment decisions must always be made by qualified healthcare providers in appropriate clinical settings.",
      warning:
        "NOT FOR MEDICAL EMERGENCIES - SEEK IMMEDIATE MEDICAL ATTENTION FOR URGENT CONDITIONS",
    },
    treatment: {
      title: "Treatment Information Disclaimer",
      content:
        "Treatment information, costs, and success rates presented on this platform are general estimates and may vary significantly based on individual medical conditions, chosen healthcare providers, and geographic locations. Actual treatment outcomes depend on numerous factors that can only be assessed through proper medical examination.",
      warning:
        "TREATMENT OUTCOMES MAY VARY - INDIVIDUAL RESULTS NOT GUARANTEED",
    },
  };

  const currentDisclaimer = disclaimers[page] || disclaimers.general;

  return (
    <div className="p-6 mb-6 border-l-4 border-red-500 rounded-r-lg bg-gradient-to-r from-red-50 to-orange-50">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-red-800">
            {currentDisclaimer.title}
          </h3>
          <p className="mb-4 leading-relaxed text-gray-700">
            {currentDisclaimer.content}
          </p>
          <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-sm font-bold text-center text-red-800">
              ⚠️ {currentDisclaimer.warning}
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">Important:</span>
            </div>
            <ul className="ml-6 space-y-1">
              <li>• This platform is not a healthcare provider</li>
              <li>• We do not provide medical diagnoses or treatments</li>
              <li>• All medical decisions should involve qualified professionals</li>
              <li>• Emergency medical situations require immediate professional care</li>
              <li>• Individual results may vary significantly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
