"use client";

import React from "react";

const WhyIndia: React.FC = () => {
  const sectionSpacing = "mt-8 mb-12"; // You can adjust spacing if needed

  const reasons = [
    {
      title: "Affordable Treatments",
      desc: "Save up to 70% on world-class dental treatments.",
      img: "../Affordable Treatment.png",
    },
    {
      title: "Expert Dentists You can Trust",
      desc: "Precision, passion and a perfect smile — lead by experts.",
      img: "../Expert Dentist.png",
    },
    {
      title: "Tourism + Dental Treatment",
      desc: "Recover your smile & joy while exploring India’s beauty.",
      img:"../Tourism + Treatment.png",
    },
    {
      title: "Top Dental Clinics Across India",
      desc: "Top rated dental clinics across India for expert care & trusted smile.",
      img: "../Assisted Travel Plans.png",
    },
  ];

  return (
    <section
      className={`w-full max-w-full mx-0 sm:max-w-5xl sm:mx-auto pt-6 pb-8 px-2 sm:px-4 mt-0 mb-4 ${sectionSpacing}`}
    >
      {/* Section Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C73D2] mb-1 font-[Poppins]">
          Why India is the Global Hub for Dental Tourism?
        </h2>
      </div>

      {/* Reasons Grid */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#F4A300] min-h-[340px] justify-start"
          >
            <img
              src={reason.img}
              alt={reason.title}
              className="w-[160px] h-[160px] object-contain mb-4"
            />
            <h3 className="text-lg font-bold text-[#2C73D2] mb-2 text-center">
              {reason.title}
            </h3>
            <p className="text-base text-center text-gray-700">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyIndia;
