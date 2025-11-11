"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";

// Props interface
interface HeroBannerProps {
  consultBannerImg?: string | StaticImageData;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ consultBannerImg }) => {
  const { t } = useTranslation();
  const dentistImages: string[] = [
    "/dentist1.png",
    "/dentist2.png",
    "/dentist3.png",
    "/dentist4.png",
  ];

  return (
    <div className="relative mx-auto mt-8 overflow-hidden max-w-7xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C73D2] via-[#1E5BA8] to-[#15396A] rounded-3xl"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative flex flex-col items-center gap-8 px-6 py-12 lg:flex-row lg:px-12 lg:py-16">
        {/* Left Section */}
        <div className="flex flex-col items-start justify-center flex-1 w-full space-y-6 text-white">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
            <span className="text-sm font-semibold text-white">
              ✨ Trusted by 30,000+ Patients
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-transparent sm:text-4xl lg:text-6xl bg-gradient-to-r from-white to-blue-100 bg-clip-text">
            {t("consult.title") || "Expert Dental Care Online"}
          </h1>

          <p className="text-lg font-medium leading-relaxed text-blue-100 sm:text-xl lg:text-2xl">
            {t("consult.subtitle") ||
              "Get professional dental consultation from verified specialists"}
          </p>

          <div className="flex items-center gap-3 text-lg font-semibold text-yellow-300 sm:text-xl">
            <span className="text-2xl">💰</span>
            <span>{t("consult.price") || "Starting from ₹299"}</span>
          </div>

          {/* Dentist Avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {dentistImages.map((imgSrc, index) => (
                <div key={index} className="relative">
                  <Image
                    src={imgSrc}
                    alt={`Dentist ${index + 1}`}
                    className="object-cover w-12 h-12 bg-white border-2 border-white rounded-full shadow-lg"
                    width={48}
                    height={48}
                  />
                  {index === dentistImages.length - 1 && (
                    <div className="absolute flex items-center justify-center w-4 h-4 bg-green-400 border-2 border-white rounded-full -bottom-1 -right-1">
                      <span className="text-xs font-bold text-white">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">
                327+ Verified Dentists
              </span>
              <span className="text-sm text-blue-200">Available 24/7</span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#problem-form"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F4A300] to-[#FF6B35] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-none"
          >
            <span>Consult Now</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
            {[
              {
                icon: "🏅",
                text: "Verified Dentists",
                desc: "Board Certified",
              },
              {
                icon: "📄",
                text: "Digital Prescription",
                desc: "Instant Delivery",
              },
              { icon: "💬", text: "Free Follow-up", desc: "2 Days Support" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border bg-white/10 backdrop-blur-sm rounded-xl border-white/20"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {feature.text}
                  </span>
                  <span className="text-xs text-blue-200">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center flex-1 w-full">
          <div className="relative">
            {consultBannerImg ? (
              <div className="relative">
                <Image
                  src={consultBannerImg}
                  alt="Online Dental Consultation"
                  className="object-contain w-full max-w-md "
                  width={500}
                  height={500}
                />
                {/* Floating Elements */}
                {/* <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#F4A300] to-[#FF6B35] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-2xl"></span>
                </div> */}
                {/* <div className="absolute flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg -bottom-4 -left-4">
                  <span className="text-lg">💊</span>
                </div> */}
              </div>
            ) : (
              <div className="relative flex items-center justify-center w-full max-w-md border shadow-2xl lg:max-w-lg h-80 lg:h-96 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl border-white/20">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🦷</div>
                  <div className="text-xl font-bold text-white">
                    Banner Image Coming Soon
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
