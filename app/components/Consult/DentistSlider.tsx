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

  useEffect(() => {
    const fetchDentists = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not set.");
        setError("Application is not configured correctly.");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/v1/dentists`);
        setDentists(response.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };

    fetchDentists();
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const handleConsultClick = (dentist: DentistProfile) => {
    // ✅ Navigate to consultation form page
    router.push(`/consult/${dentist._id}`);
  };

  return (
    <div className="flex flex-col items-center w-full pb-8 mt-10 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2C73D2] text-center mb-10">
        Your Trusted Dentists
      </h2>

      <div className="relative flex items-center justify-center w-full gap-4">
        {/* Previous Button */}
        <button
          className="absolute left-[-32px] top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-100 transition"
          onClick={prevSlide}
          aria-label="Previous"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="white" />
            <path
              d="M14.5 7L9.5 12L14.5 17"
              stroke="#A0AEC0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dentist Cards */}
        {slides.length > 0 &&
          slides[current].map((dentist) => (
            <div
              key={dentist._id}
              className="bg-white border border-blue-200 rounded-xl px-8 py-6 text-blue-900 font-semibold shadow w-[300px] h-[420px] flex flex-col items-center justify-start transition-all duration-300"
            >
              <Image
                src={dentist.image || "/default-profile.png"} // Fallback image
                alt={dentist.user.name}
                className="object-cover mb-4 border-4 border-white rounded-full shadow w-28 h-28"
                width={112}
                height={112}
                priority
              />
              <div className="flex flex-col justify-center flex-1 text-center">
                <span className="font-bold text-lg text-[#15396A]">
                  {dentist.user.name}
                </span>
                <div className="text-[#15396A] text-sm whitespace-pre-line mt-1 mb-2">
                  {dentist.specialization.join(", ")}
                </div>
                <div className="text-[#2C73D2] font-semibold mt-2">
                  {dentist.experienceYears} Years
                </div>
              </div>
              <button
                className="bg-gradient-to-r from-[#2C73D2] to-[#F4A300] text-white font-semibold px-3 py-1 rounded-md shadow hover:from-[#F4A300] hover:to-[#2C73D2] transition flex items-center justify-center gap-1 border border-[#F4A300] mt-3 text-xs"
                style={{
                  fontSize: "0.85rem",
                  marginTop: "auto",
                  minWidth: "90px",
                }}
                onClick={() => handleConsultClick(dentist)}
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="mr-1"
                >
                  <path d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm2 0v10h12V5H4zm3 2a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V7zm4 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V7z" />
                </svg>
                Consult Now
              </button>
            </div>
          ))}

        {/* Next Button */}
        <button
          className="absolute right-[-32px] top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-100 transition"
          onClick={nextSlide}
          aria-label="Next"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="white" />
            <path
              d="M9.5 7L14.5 12L9.5 17"
              stroke="#A0AEC0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DentistSlider;
