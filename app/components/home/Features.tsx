"use client";

import React from "react";
import Link from "next/link";

// --- Features Data ---
const features = [
  {
    image: "../consult.png",
    title: "Instant Video Consultation",
    desc: "Consult dentist online from anywhere.",
    link: "/consult",
  },
  {
    image: "../clinic.png",
    title: "Trusted Dental Clinic Near You",
    desc: "Book appointments with leading dental clinics.",
    link: "/dental-clinics",
  },
  {
    image: "../scan.png",
    title: "3D Dental Scan Near You",
    desc: "Locate CBCT & OPG dental scan centers.",
    link: "/cbct-opg-lab",
  },
  {
    image:"../bloodtest.png",
    title: (
      <>
        Blood Test
        <br />
        Near You
      </>
    ),
    desc: "Book a blood test at a lab close to you.",
    link: "/blood-test",
  },
];

// --- Feature Component ---
interface FeatureProps {
  sectionSpacing?: string;
}

const Feature: React.FC<FeatureProps> = ({ sectionSpacing = "" }) => {
  return (
    <section
      className={`w-full max-w-full mx-0 sm:max-w-5xl sm:mx-auto pb-8 px-2 sm:px-4 mt-4 mb-4 overflow-x-hidden ${sectionSpacing}`}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C73D2] mb-2">
          Leading Dental Clinics
        </h2>
        <p className="text-base text-gray-700 sm:text-lg md:text-lg">
          Explore trusted dental clinics, book video consultations, locate scan centers, and find nearby labs — all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 sm:gap-8">
        {features.map((feature, idx) => (
          <Link
            key={idx}
            href={feature.link || "#"}
            className="flex flex-col items-center bg-[#f7f7f7] rounded-2xl shadow-lg p-6 hover:shadow-2xl transition group"
          >
            <div className="flex items-center justify-center mb-4">
              <img
                src={feature.image}
                alt={typeof feature.title === "string" ? feature.title : "Feature"}
                className="w-auto mx-auto mb-8 h-28"
              />
            </div>
            <div className="text-lg font-bold text-[#2C73D2] mb-2 text-center">
              {feature.title}
            </div>
            <div className="text-base text-[#333333] text-center mb-2">
              {feature.desc}
            </div>
            <span className="mt-auto px-4 py-2 rounded-lg bg-gradient-to-r from-[#2C73D2] to-[#F4A300] text-white font-semibold shadow drop-shadow-md hover:from-[#F4A300] hover:to-[#2C73D2] transition">
              Learn More
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Feature;
