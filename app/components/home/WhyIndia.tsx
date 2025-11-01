"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const WhyIndia: React.FC = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      title:"Affordable Dental Treatments",
      desc: t("whyIndia.affordableTreatmentsDesc"),
      img: "/Affordable Treatment.png",
    },
    {
      title: t("whyIndia.expertDentists"),
      desc: t("whyIndia.expertDentistsDesc"),
      img: "/Expert Dentist.png",
    },
    {
      title: t("whyIndia.tourismDental"),
      desc: t("whyIndia.tourismDentalDesc"),
      img: "/Tourism + Treatment.png",
    },
    {
      title: t("whyIndia.topClinics"),
      desc: t("whyIndia.topClinicsDesc"),
      img: "../Assisted Travel Plans.png",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-[#2C73D2] sm:text-4xl md:text-5xl">
            {t("whyIndia.title")}
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 text-center transition-transform transform bg-white border-t-4 border-[#F4A300] rounded-2xl shadow-lg hover:scale-105"
            >
              <img
                src={reason.img}
                alt={reason.title}
                className="object-contain w-32 h-32 mb-4"
              />
              <h3 className="text-lg font-bold text-[#2C73D2] mb-2">
                {reason.title}
              </h3>
              <p className="text-base text-gray-700">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyIndia;
