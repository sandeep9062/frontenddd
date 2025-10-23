"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-2 mt-12 bg-white md:flex-row md:px-8 md:gap-10">
      {/* Left: Text Content */}
      <div className="flex flex-col items-start justify-center flex-1 order-2 max-w-lg md:order-1 md:pr-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2563d6] mb-2 leading-tight mt-[-40px]">
          Smile Confidently with India’s Top
          <br className="hidden sm:block" /> Dental Tourism Clinics
        </h1>

        <p className="mb-6 text-lg text-gray-700 md:text-xl">
          Affordable, world-class dental care with personalized travel
          assistance. Trusted by thousands of international patients.
        </p>

        <div className="flex flex-col w-full gap-4 mb-6 sm:flex-row">
          <Link
            href="/dental-clinics"
            className="px-8 py-3 rounded-md bg-gradient-to-r from-[#F4A300] to-[#2C73D2] text-white font-semibold text-lg shadow hover:from-[#2C73D2] hover:to-[#F4A300] transition text-center"
          >
            Explore Dental Clinics
          </Link>

          <Link
            href="/consult"
            className="px-8 py-3 rounded-md bg-gradient-to-r from-[#F4A300] to-[#2C73D2] text-white font-semibold text-lg shadow hover:from-[#2C73D2] hover:to-[#F4A300] transition text-center"
          >
            Book Online Video Consultation
          </Link>
        </div>
      </div>

      {/* Right: Image */}
      <div className="flex items-center justify-center order-1 w-full mt-4 md:w-auto md:mt-0 md:order-2">
        <Image
          src="/hero-section.jpg" 
          alt="Hero section"
          width={540}
          height={400}
          className="max-w-[420px] md:max-w-[480px] lg:max-w-[540px] rounded-lg shadow-lg"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
