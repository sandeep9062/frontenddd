"use client";
import React from "react";
import Image from "next/image";

const MaldoniteSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[#2C73D2]">
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* Logo icon centered above */}
        <div className="relative w-32 h-32 mb-2 sparkle-animation sm:w-40 sm:h-40">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Company name and tagline aligned like the image */}
        <div className="text-left">
          <h1 className="text-3xl font-bold text-white sm:text-5xl">
            Dental Tourism
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MaldoniteSpinner;
