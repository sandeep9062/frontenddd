"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface Disclaimer {
  title: string;
  content: string;
  warning: string;
}

interface MedicalDisclaimerProps {
  page?: "general" | "consultation" | "treatment";
}

const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({
  page = "general",
}) => {
  const { t } = useTranslation();

  const disclaimers: Record<string, Disclaimer> = {
    general: {
      title: t("medicalDisclaimer.generalTitle"),
      content: t("medicalDisclaimer.generalContent"),
      warning: t("medicalDisclaimer.generalWarning"),
    },
    consultation: {
      title: t("medicalDisclaimer.consultationTitle"),
      content: t("medicalDisclaimer.consultationContent"),
      warning: t("medicalDisclaimer.consultationWarning"),
    },
    treatment: {
      title: t("medicalDisclaimer.treatmentTitle"),
      content: t("medicalDisclaimer.treatmentContent"),
      warning: t("medicalDisclaimer.treatmentWarning"),
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
              <li>
                • All medical decisions should involve qualified professionals
              </li>
              <li>
                • Emergency medical situations require immediate professional
                care
              </li>
              <li>• Individual results may vary significantly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
