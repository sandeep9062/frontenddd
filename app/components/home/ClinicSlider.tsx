"use client";

import React, { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Clinic } from "../../../types/clinic";
import ClinicCard from "./ClinicCard";
import useResponsive from "../../hooks/useResponsive";

interface ClinicSliderProps {
  clinics: Clinic[];
}

const ClinicSlider: React.FC<ClinicSliderProps> = ({ clinics }) => {
  const [current, setCurrent] = useState(0);
  const clinicsPerSlide = useResponsive();
  const totalSlides = useMemo(
    () => Math.ceil(clinics.length / clinicsPerSlide),
    [clinics.length, clinicsPerSlide]
  );

  const nextSlide = () =>
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const currentClinics = useMemo(
    () =>
      clinics.slice(
        current * clinicsPerSlide,
        current * clinicsPerSlide + clinicsPerSlide
      ),
    [clinics, current, clinicsPerSlide]
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-2 text-blue-600 transition-all duration-300 -translate-y-1/2 bg-blue-100 border-2 border-transparent rounded-full shadow-lg top-1/2 hover:bg-blue-600 hover:text-white focus:outline-none"
          aria-label="Previous Slide"
        >
          <FaChevronLeft size={24} />
        </button>

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex-shrink-0 w-full"
              >
                <div className="flex justify-center gap-8 px-4">
                  {clinics
                    .slice(
                      slideIndex * clinicsPerSlide,
                      slideIndex * clinicsPerSlide + clinicsPerSlide
                    )
                    .map((clinic) => (
                      <div
                        key={clinic._id}
                        className="w-full transition-opacity duration-500 ml-7 mr-7 left"
                      >
                        <ClinicCard clinic={clinic} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-2 text-blue-600 transition-all duration-300 -translate-y-1/2 bg-blue-100 border-2 border-transparent rounded-full shadow-lg top-1/2 hover:bg-blue-600 hover:text-white focus:outline-none"
          aria-label="Next Slide"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ClinicSlider;
