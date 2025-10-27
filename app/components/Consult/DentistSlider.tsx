"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

interface DentistProfile {
  _id: string;
  user: {
    _id: string;
    name: string;
    role: string;
  };
  specialization: string[];
  experienceYears: number;
  image: string;
  clinicName: string;
  address: string;
}

// ✅ Custom Hook to Split Array Responsively
const useResponsiveChunk = (
  arr: DentistProfile[],
  desktopSize: number,
  mobileSize: number
): DentistProfile[][] => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const size = isMobile ? mobileSize : desktopSize;
  const result: DentistProfile[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const DentistSlider: React.FC = () => {
  const [dentists, setDentists] = useState<DentistProfile[]>([]);
  const slides = useResponsiveChunk(dentists, 3, 1);
  const [current, setCurrent] = useState<number>(0);
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDentists = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not set.");
        setError("Application is not configured correctly.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/v1/dentists`);
        setDentists(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching dentists:", error);
        setError("Could not fetch dentist data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDentists();
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const handleConsultClick = (dentist: DentistProfile) => {
    router.push(`/consult/${dentist._id}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full pb-8 mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C73D2]"></div>
            <span className="text-lg font-medium text-gray-600">
              Loading our trusted dentists...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center w-full pb-8 mt-16 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Unable to load dentists
          </h3>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full pb-8 mt-16">
      {/* Background */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-blue-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23dbeafe%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        <div className="relative px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-4">
              👨‍⚕️ Our Team
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-4">
              Your Trusted Dentists
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our verified dental professionals ready to provide you with
              expert care
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative flex items-center justify-center w-full">
            {/* Previous Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 group"
              onClick={prevSlide}
              aria-label="Previous"
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
                  d="M14.5 7L9.5 12L14.5 17"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dentist Cards */}
            <div className="flex items-center justify-center gap-8 px-16">
              {slides.length > 0 &&
                slides[current].map((dentist) => (
                  <div
                    key={dentist._id}
                    className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden w-[320px] h-[480px]"
                  >
                    {/* Card Header Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#2C73D2] to-[#008E97]"></div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>

                    <div className="relative flex flex-col items-center justify-start p-8 h-full">
                      {/* Dentist Image */}
                      <div className="relative mb-6">
                        <div className="relative">
                          <Image
                            src={dentist.image || "/default-profile.png"}
                            alt={dentist.user.name}
                            className="object-cover rounded-full border-4 border-white shadow-2xl w-32 h-32"
                            width={128}
                            height={128}
                            priority
                          />
                          {/* Online Status */}
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                            <span className="text-xs text-white font-bold">
                              ✓
                            </span>
                          </div>
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#F4A300] to-[#FF6B35] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <span className="text-sm">⭐</span>
                        </div>
                      </div>

                      {/* Dentist Info */}
                      <div className="flex flex-col justify-center flex-1 text-center mb-6">
                        <h3 className="font-bold text-2xl text-[#15396A] mb-2">
                          {dentist.user.name}
                        </h3>
                        <div className="text-[#2C73D2] text-sm font-medium mb-3 leading-relaxed">
                          {dentist.specialization.join(", ")}
                        </div>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-3">
                          {dentist.experienceYears} Years Experience
                        </div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {dentist.clinicName}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {dentist.address}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        className="group/btn w-full px-6 py-4 bg-gradient-to-r from-[#2C73D2] to-[#F4A300] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        onClick={() => handleConsultClick(dentist)}
                      >
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="group-hover/btn:scale-110 transition-transform"
                        >
                          <path d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm2 0v10h12V5H4zm3 2a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V7zm4 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V7z" />
                        </svg>
                        Consult Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Next Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 group"
              onClick={nextSlide}
              aria-label="Next"
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
                  d="M9.5 7L14.5 12L9.5 17"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          {slides.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-[#2C73D2] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DentistSlider;
