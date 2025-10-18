"use client";

import React from "react";

const ConsultNowBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#2C73D2] py-18 px-2 flex flex-col items-center justify-center rounded-xl shadow-lg mb-12">
      <h2 className="mb-2 text-xl font-bold leading-snug text-center text-white sm:text-2xl md:text-3xl">
        Why wait? Your smile deserves care!
      </h2>
      <p className="mb-6 text-sm text-center text-white sm:text-base md:text-lg">
        Connect with India's top dentist online
      </p>
      <a
        href="#problem-form"
        className="px-8 sm:px-12 py-3 sm:py-4 border-2 border-[#F4A300] text-[#F4A300] text-lg sm:text-xl font-bold rounded-lg bg-white hover:bg-[#F4A300] hover:text-white transition shadow-md"
      >
        Consult Now
      </a>
    </div>
  );
};

export default ConsultNowBanner;
