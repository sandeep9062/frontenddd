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
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          {/* Loading Animation */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-[#2C73D2] border-t-transparent rounded-full animate-spin"></div>
              <div
                className="absolute inset-2 border-4 border-[#008E97] border-t-transparent rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
              <div
                className="absolute inset-4 border-4 border-[#F4A300] border-t-transparent rounded-full animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#2C73D2]">
              Loading Your Dental Care
            </h2>
            <p className="text-gray-600">
              Preparing the best consultation experience for you...
            </p>

            {/* Loading Steps */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-2 h-2 bg-[#2C73D2] rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-[#008E97] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#F4A300] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative">
        <ConsultBanner consultBannerImg="/consult-banner.png" />
      </section>

      {/* Problem Form Section */}
      <section id="problem-form" ref={problemFormRef} className="relative">
        <ProblemForm />
      </section>

      {/* Speciality Form Section */}
      <section className="relative">
        <SpecialityForm />
      </section>

      {/* Dentist Slider Section */}
      <section className="relative">
        <DentistSlider />
      </section>

      {/* Stats and How It Works Section */}
      <section className="relative">
        <StatsAndHowItWorks />
      </section>

      {/* Advantages Section */}
      <section className="relative">
        <AdvantagesVirtualConsultation />
      </section>

      {/* Reviews Section */}
      <section className="relative">
        <VirtualCareReviewsSlider />
      </section>

      {/* CTA Banner Section */}
      <section className="relative">
        <ConsultNowBanner />
      </section>

      {/* FAQ Section */}
      <section className="relative">
        <FAQSection />
      </section>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default ConsultPage;
