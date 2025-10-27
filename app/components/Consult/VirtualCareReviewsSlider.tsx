"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Review {
  text: string;
  author: string;
  rating: number;
  location: string;
}

const reviews: Review[] = [
  {
    text: "I was nervous to travel for dental treatment, but the Dental Tourism Clinic made everything easy and transparent. I got expert care, and the environment was clean, friendly, and modern.",
    author: "Tomoko Y.",
    rating: 5,
    location: "Japan",
  },
  {
    text: "The online consultation was very convenient. The dentist answered all my questions and helped me plan my treatment before I arrived in India.",
    author: "Michael S.",
    rating: 5,
    location: "UK",
  },
  {
    text: "I saved a lot of time and money by consulting virtually first. The advice was clear and the follow-up was excellent.",
    author: "Priya R.",
    rating: 5,
    location: "Australia",
  },
  {
    text: "The virtual care team was very supportive and made me feel comfortable throughout the process. Highly recommended!",
    author: "Ahmed K.",
    rating: 5,
    location: "UAE",
  },
];

const VirtualCareReviewsSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="w-full py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-6">
            💬 Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-6">
            Virtual Care Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied patients around the world
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative max-w-5xl mx-auto">
          {/* Review Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>

            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#2C73D2] to-[#008E97] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">"</span>
              </div>

              {/* Review Content */}
              <div className="text-center">
                {/* Patient Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Image
                      src="/doctor1.png"
                      alt={reviews[current].author}
                      width={80}
                      height={80}
                      className="object-cover rounded-full border-4 border-white shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-bold">✓</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    {renderStars(reviews[current].rating)}
                  </div>
                </div>

                {/* Review Text */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto italic">
                  "{reviews[current].text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <div className="text-xl sm:text-2xl font-bold text-[#15396A] mb-1">
                    {reviews[current].author}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {reviews[current].location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-xl border border-gray-200 hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 group"
            aria-label="Previous Review"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600 group-hover:text-[#2C73D2] transition-colors"
            >
              <path
                d="M14.5 8L10.5 12L14.5 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-xl border border-gray-200 hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 group"
            aria-label="Next Review"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600 group-hover:text-[#2C73D2] transition-colors"
            >
              <path
                d="M9.5 8L13.5 12L9.5 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-[#2C73D2] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold shadow-lg">
            <span className="mr-2">⭐</span>
            Trusted by patients from 25+ countries
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCareReviewsSlider;
