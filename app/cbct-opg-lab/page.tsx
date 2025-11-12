"use client";

import React, { useState } from "react";

import { useGetCbctOpgLabsQuery } from "@/services/cbctOpgLabs";
import allStatesAndUTs from "@/app/data/allStatesAndUTs";
import { CbctOpgLab } from "@/types/cbctOpgLab";
import CbctOpgLabCard from "../components/home/CbctOpgLabCard";
import { Search, Filter } from "lucide-react";

const CbctOpgLabList: React.FC = () => {
  const { data: labs = [], error, isLoading } = useGetCbctOpgLabsQuery();

  //console.log(labs, "labs-data");

  const [search, setSearch] = useState<string>("");

  const [selectedState, setSelectedState] = useState<string>("");

  const filteredLabs = labs.filter((lab: CbctOpgLab) => {
    const matchesSearch = lab.name.toLowerCase().includes(search.toLowerCase());

    const matchesState = selectedState ? lab.state === selectedState : true;
    return matchesSearch && matchesState;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#6548ee] mx-auto mb-4"></div>
          <div className="text-2xl font-bold text-[#6548ee]">
            Loading CBCT & OPG Labs...
          </div>
          <div className="mt-2 text-gray-600">
            Please wait while we fetch the latest information
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100">
        <div className="max-w-md p-6 mx-auto text-center">
          <div className="mb-4 text-6xl text-red-500">⚠️</div>
          <div className="mb-2 text-2xl font-bold text-red-600">
            Oops! Something went wrong
          </div>
          <div className="mb-4 text-gray-600">
            We're having trouble loading the labs. Please try refreshing the
            page.
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-lg">
        <div className="px-6 py-8 mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#6548ee] mb-4">
              CBCT & OPG Centers
            </h1>
            <p className="max-w-lg mx-auto text-lg text-gray-600">
              Find the best CBCT and OPG diagnostic centers near you.
            </p>
            <p className="max-w-lg mx-auto text-lg text-gray-600">
              Professional imaging services with state-of-the-art equipment.
            </p>
          </div>

          {/* Enhanced Filters */}
          <div className="bg-gradient-to-r from-[#2C73D2] to-[#ff9800] p-6 rounded-2xl shadow-lg">
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search labs by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 backdrop-blur-sm"
                />
              </div>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-3 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 backdrop-blur-sm"
              >
                <option value="">All States/UTs</option>
                {allStatesAndUTs.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 text-sm text-white/80">
              Showing {filteredLabs.length} of {labs.length} labs
            </div>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        {filteredLabs.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl text-gray-400">🔍</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-600">
              No labs found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredLabs.map((lab: CbctOpgLab) => (
              <CbctOpgLabCard key={lab._id} lab={lab} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CbctOpgLabList;
