"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import allStatesAndUTs from "../data/allStatesAndUTs";
import axios from "../../lib/axios";
import BloodTestLabCard from "../components/home/BloodTestLabCard";

interface Lab {
  _id: string;
  name: string;
  location: string;
  state: string;
  rating: number;
  img: string;
  bookUrl?: string;
  website?: string;
  whatsapp?: string;
  mapUrl?: string;
}

const BloodTestLabList: React.FC = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [search, setSearch] = useState<string>("");

  const [selectedState, setSelectedState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/diagnostic-labs");
        if (res.data.success) {
          setLabs(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch labs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  const filteredLabs = labs.filter((lab) => {
    const matchesSearch = lab.name.toLowerCase().includes(search.toLowerCase());

    const matchesState = selectedState ? lab.state === selectedState : true;
    return matchesSearch && matchesState;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ede7f6]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#6548ee]"></div>
      </div>
    );
  }

  return (
    <div
      className="p-4 md:p-8 bg-[#f4f1fa] min-h-screen"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5a38e5] mb-2">
            Find a Diagnostic Lab Near You
          </h1>
          <p className="text-lg text-gray-600">
            Search for blood test and diagnostic centers across India.
          </p>
        </div>

        {/* Filters */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <input
                type="text"
                placeholder="Search by lab name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6548ee]"
              />
              <svg
                className="absolute w-5 h-5 text-gray-400 top-3.5 left-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6548ee]"
              >
                <option value="">All States/UTs</option>
                {allStatesAndUTs.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {selectedState && (
                <button
                  onClick={() => setSelectedState("")}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

      {/* Lab List */}
      {filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredLabs.map((lab) => (
            <div
              key={lab._id}
              className="transition-transform duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <BloodTestLabCard lab={lab} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-500">No labs found.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default BloodTestLabList;
