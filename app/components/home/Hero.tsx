"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-white">
      <div className="container flex flex-col-reverse items-center justify-between px-4 py-16 mx-auto md:flex-row sm:px-6 lg:px-8">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start justify-center flex-1 max-w-lg text-center md:text-left md:pr-4">
          <h1 className="text-4xl font-extrabold text-[#2563d6] mb-4 leading-tight md:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="mb-8 text-lg text-gray-700 md:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dental-clinics"
              className="w-full px-8 py-3 text-lg font-semibold text-center text-white transition rounded-md shadow-lg bg-gradient-to-r from-[#F4A300] to-[#2C73D2] hover:from-[#2C73D2] hover:to-[#F4A300] sm:min-w-[280px]"
            >
              Explore Best Dental Clinics of India
            </Link>

            <Link
              href="/consult"
              className="w-full px-8 py-3 text-lg font-semibold text-center text-white transition rounded-md shadow-lg bg-gradient-to-r from-[#F4A300] to-[#2C73D2] hover:from-[#2C73D2] hover:to-[#F4A300] sm:min-w-[280px]"
            >
              {t("hero.bookConsultation")}
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex items-center justify-center w-full mb-8 md:w-auto md:mb-0">
          <Image
            src="/hero-section.jpg"
            alt="Hero section"
            width={540}
            height={400}
            className="w-full h-auto max-w-md rounded-lg shadow-2xl md:max-w-lg lg:max-w-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
