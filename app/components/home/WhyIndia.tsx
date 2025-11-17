"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const WhyIndia: React.FC = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      title: "Affordable Dental Treatments",
      desc: t("whyIndia.affordableTreatmentsDesc"),
      img: "/Affordable Treatment.png",
      bgColor: "bg-amber-100",
    },
    {
      title: t("whyIndia.expertDentists"),
      desc: t("whyIndia.expertDentistsDesc"),
      img: "/Expert Dentist.png",
      bgColor: "bg-blue-100",
    },
    {
      title: t("whyIndia.tourismDental"),
      desc: t("whyIndia.tourismDentalDesc"),
      img: "/Tourism.png",
      bgColor: "bg-green-100",
    },
    {
      title: t("whyIndia.topClinics"),
      desc: t("whyIndia.topClinicsDesc"),
      img: "../Assisted Travel Plans.png",
      bgColor: "bg-purple-100",
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
              className="flex flex-col items-center p-6 text-center transition-transform transform bg-white shadow-lg rounded-2xl hover:scale-105"
            >
              <div
                className={`flex items-center justify-center w-24 h-24 mb-6 rounded-full shadow-md ${reason.bgColor}`}
              >
                <img
                  src={reason.img}
                  alt={reason.title}
                  className="object-contain w-16 h-16"
                />
              </div>
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
