"use client";
import React, { useState, useEffect, FormEvent, useRef } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ConsultBanner from "../components/Consult/ConsultBanner";
import DentistSlider from "../components/Consult/DentistSlider";
import StatsAndHowItWorks from "../components/Consult/StatsAndHowItWorks";
import AdvantagesVirtualConsultation from "../components/Consult/AdvantagesVirtualConsultation";
import VirtualCareReviewsSlider from "../components/Consult/VirtualCareReviewsSlider";
import FAQSection from "../components/Consult/ConsultFAQSection";
import ConsultNowBanner from "../components/Consult/ConsultNowBanner";
import ProblemForm from "../components/Consult/ProblemForm";
import SpecialityForm from "../components/Consult/SpecialityForm";

const ConsultPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const problemFormRef = useRef<HTMLDivElement>(null);

  const handleConsultNowClick = () => {
    if (problemFormRef.current) {
      problemFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pb-8 overflow-x-hidden bg-white">
      <ConsultBanner consultBannerImg="/consult-banner.png" />
      <div id="problem-form">
        <ProblemForm />
      </div>
      <SpecialityForm />

      {/* Dentist Slider */}
      <div className="flex flex-col items-center justify-center w-full mt-8">
        <div className="relative w-full max-w-4xl">
          <DentistSlider />
        </div>
      </div>

      <StatsAndHowItWorks />
      <AdvantagesVirtualConsultation />
      <VirtualCareReviewsSlider />
      <ConsultNowBanner />
      <FAQSection />
    </div>
  );
};

export default ConsultPage;
