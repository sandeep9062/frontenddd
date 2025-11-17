"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// --- Features Data ---
const getFeatures = (t: any) => [
  {
    image: "/Expert Dentist.png",
    title: t("features.instantConsultation"),
    desc: t("features.instantConsultationDesc"),
    link: "/consult",
    bgColor: "bg-blue-100",
  },
  {
    image: "/Dental Implants.png",
    title: "Trusted Smile, Local Care",
    desc: t("features.trustedClinicsDesc"),
    link: "/dental-clinics",
    bgColor: "bg-green-100",
  },
  {
    image: "/3d teeth.png",
    title: t("features.dentalScans"),
    desc: t("features.dentalScansDesc"),
    link: "/cbct-opg-lab",
    bgColor: "bg-purple-100",
  },
  {
    image: "/Affordable Treatment.png",
    title: t("features.bloodTest"),
    desc: t("features.bloodTestDesc"),
    link: "/blood-test",
    bgColor: "bg-rose-100",
  },
];

// --- Feature Component ---
interface FeatureProps {
  sectionSpacing?: string;
}

const Feature: React.FC<FeatureProps> = ({ sectionSpacing = "" }) => {
  const { t } = useTranslation();
  const features = getFeatures(t);

  return (
    <section className={`w-full py-16 bg-gray-50 ${sectionSpacing}`}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-[#2C73D2] sm:text-4xl md:text-5xl">
            Leading Dental Clinics
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-700">
            Explore trusted dental clinics, book video consultations, locate
            scan centers, and find nearby blood test labs — all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {features.map((feature, idx) => (
            <Link
              key={idx}
              href={feature.link || "#"}
              className="group flex flex-col items-center p-8 text-center transition-all duration-300 bg-white shadow-md rounded-2xl hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-[#2C73D2]"
            >
              <div
                className={`flex items-center justify-center w-24 h-24 mb-6 rounded-full shadow-md ${feature.bgColor}`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-contain w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2C73D2] mb-3">
                {feature.title}
              </h3>
              <p className="mb-6 text-base text-gray-700">{feature.desc}</p>
              <div
                className="w-full px-6 py-3 mt-auto text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md
               bg-gradient-to-r from-[#2C73D2] to-[#008F9B] group-hover:from-[#008F9B] group-hover:to-[#2C73D2]"
              >
                Book Now
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
