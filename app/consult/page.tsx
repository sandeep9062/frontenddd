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
