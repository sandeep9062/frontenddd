"use client";

import React, { useState, useMemo } from "react";
import ClinicSlider from "./ClinicSlider";
import { useGetClinicsQuery } from "../../../services/clinicApi";
import { Clinic } from "../../../types/clinic";
import allStatesAndUTs from "../../data/allStatesAndUTs";
import { Search } from "lucide-react";

interface FindTopDentalProps {
  sectionSpacing?: string;
  isMobile?: boolean;
}

const FindTopDental: React.FC<FindTopDentalProps> = ({
  sectionSpacing = "",
  isMobile = false,
}) => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const { data: clinics = [], error, isLoading } = useGetClinicsQuery();

  const filteredClinics = useMemo(() => {
    return clinics.filter((c: Clinic) => {
      const searchLower = search.toLowerCase();
      const stateLower = selectedState.toLowerCase();
      const nameMatch = c.name?.toLowerCase().includes(searchLower) || false;
      const locationMatch =
        c.location?.toLowerCase().includes(searchLower) || false;
      const stateMatch = selectedState
        ? c.state?.toLowerCase().includes(stateLower)
        : true;
      return (nameMatch || locationMatch) && stateMatch;
    });
  }, [search, selectedState, clinics]);

  const uniqueStates = useMemo(() => {
    return allStatesAndUTs;
  }, []);

  if (isLoading) {
    return (
      <section className="flex items-center justify-center w-full py-12">
        <p className="text-lg text-[#2C73D2]">Loading clinics...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center w-full py-12">
        <p className="text-lg text-red-600">
          Error loading clinics. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section
      className={`w-full max-w-full mx-0 sm:max-w-7xl sm:mx-auto py-8 px-4 ${sectionSpacing}`}
    >
      <div className="flex flex-col items-center w-full p-6 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-100 rounded-3xl sm:p-10">
        <div className="flex flex-row items-center justify-center">
          <h2 className="mb-2 text-3xl font-bold text-center text-[#2C73D2] sm:text-4xl md:text-5xl">
            Find Top Dental Clinics in{" "}
          </h2>
          <span className="mb-5 text-7xl sm:text-7xl md:text-7xl">🇮🇳</span>
        </div>
        <p className="max-w-2xl mb-8 text-center text-gray-600 text-md sm:text-lg">
          Book appointments with India’s Finest Clinics – Verified, Rated and
          Recommended. Where Clinical Skill Meets Patient Trust.
        </p>

        {/* Search Bar */}
        <form
          className="flex flex-col items-center w-full max-w-3xl gap-4 mb-10 md:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="Search by Clinic Name or State"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 text-lg text-gray-700 placeholder-gray-500 bg-white border-2 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-5 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-full shadow-sm md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All States/UTs</option>
            {uniqueStates.map((state: string) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </form>

        {/* Slider */}
        <div className="w-full">
          {filteredClinics.length > 0 ? (
            <ClinicSlider clinics={filteredClinics} />
          ) : (
            <div className="py-10 text-center">
              <p className="text-xl font-semibold text-gray-700">
                No clinics found matching your criteria.
              </p>
              <p className="text-gray-500">
                Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FindTopDental;
