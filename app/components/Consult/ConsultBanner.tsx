"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
// Props interface
interface HeroBannerProps {
  consultBannerImg?: string | StaticImageData;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ consultBannerImg }) => {
  const dentistImages: string[] = [
    "/dentist1.png",
    "/dentist2.png",
    "/dentist3.png",
    "/dentist4.png",
  ];

  return (
    <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row items-center gap-8 px-4 md:px-4 py-4 md:py-8 bg-[#2C73D2] rounded-2xl shadow-xl">
      {/* Left Section */}
      <div className="flex-1 min-h-[340px] flex flex-col items-start justify-center text-white w-full">
        <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">
          Skip the trip!
          <br />
          Take an online Dental Consultation
        </h1>

        <div className="mb-2 text-base font-semibold sm:text-lg md:text-xl">
          Private Consultation + Audio calls + Video calls
        </div>

        <div className="mb-4 text-sm sm:text-base md:text-lg">
          Starts at just Rs 399 / USD $4.80
        </div>

        {/* Dentist Avatars */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {dentistImages.map((imgSrc, index) => (
                <Image
                  key={index}
                  src={imgSrc}
                  alt={`Dentist ${index + 1}`}
                  className="object-cover w-12 h-12 bg-white rounded-full shadow-lg"
                  width={48}
                  height={48}
                />
              ))}
            </div>
          </div>
          <span className="ml-2 text-base font-bold text-white sm:text-lg">
            327+ Dentists
          </span>
        </div>

        {/* Button */}
        <a
          href="#problem-form"
          className="bg-gradient-to-r from-[#F4A300] to-[#2C73D2] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow drop-shadow-md hover:from-[#2C73D2] hover:to-[#F4A300] transition mb-6 border-none"
        >
          Consult Now
        </a>

        {/* Features */}
        <div className="flex flex-wrap gap-4 mt-2 text-sm sm:gap-6 sm:text-base">
          <span className="flex items-center gap-2">
            <span className="text-xl">🏅</span>Verified Dentist
          </span>
          <span className="flex items-center gap-2">
            <span className="text-xl">📄</span>Digital Prescription
          </span>
          <span className="flex items-center gap-2">
            <span className="text-xl">💬</span>Free Follow-up
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 min-h-[340px] flex items-center justify-center w-full mt-6 md:mt-0">
        {consultBannerImg ? (
          <Image
            src={consultBannerImg}
            alt="Online Dental Consultation"
            className="object-cover w-full max-w-xs shadow-lg sm:max-w-sm md:max-w-md rounded-2xl"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-48 sm:h-56 md:h-64 flex items-center justify-center bg-[#2C73D2] rounded-2xl border-2 border-[#2C73D2] text-white text-lg sm:text-xl font-bold">
            Banner Image Coming Soon
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
