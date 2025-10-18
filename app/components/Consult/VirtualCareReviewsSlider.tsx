"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Review {
  text: string;
  author: string;
}

const reviews: Review[] = [
  {
    text: "I was nervous to travel for dental treatment, but the Dental Tourism Clinic made everything easy and transparent. I got expert care, and the environment was clean, friendly, and modern.",
    author: "Tomoko. Y., Japan",
  },
  {
    text: "The online consultation was very convenient. The dentist answered all my questions and helped me plan my treatment before I arrived in India.",
    author: "Michael S., UK",
  },
  {
    text: "I saved a lot of time and money by consulting virtually first. The advice was clear and the follow-up was excellent.",
    author: "Priya R., Australia",
  },
  {
    text: "The virtual care team was very supportive and made me feel comfortable throughout the process. Highly recommended!",
    author: "Ahmed K., UAE",
  },
];

const VirtualCareReviewsSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col items-center w-full px-2 bg-white py-14">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2C73D2] text-center mb-10">
        Virtual Care Reviews
      </h2>

      <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#2C73D2] text-[#888] text-2xl font-bold shadow hover:bg-[#2C73D2] hover:text-white transition mr-6"
          aria-label="Previous Review"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="#2C73D2"
              strokeWidth="2"
              fill="white"
            />
            <path
              d="M14.5 8L10.5 12L14.5 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Review content */}
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <Image
            src="/doctor1.png"
            alt={reviews[current].author}
            width={64}
            height={64}
            className="object-cover mb-3 bg-white border border-blue-200 rounded-full"
          />
          <p className="text-[#444] text-lg md:text-2xl text-center mb-6 max-w-2xl font-normal">
            {reviews[current].text}
          </p>
          <div className="text-[#15396A] text-xl md:text-2xl font-bold text-center">
            {reviews[current].author}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#2C73D2] text-[#888] text-2xl font-bold shadow hover:bg-[#2C73D2] hover:text-white transition ml-6"
          aria-label="Next Review"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="#2C73D2"
              strokeWidth="2"
              fill="white"
            />
            <path
              d="M9.5 8L13.5 12L9.5 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VirtualCareReviewsSlider;
