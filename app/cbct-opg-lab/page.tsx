"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetCbctOpgLabsQuery } from "@/services/cbctOpgLabs";
import allStatesAndUTs from "@/app/data/allStatesAndUTs";
import { CbctOpgLab } from "@/types/cbctOpgLab";

const CbctOpgLabList: React.FC = () => {
  const { data: labs = [], error, isLoading } = useGetCbctOpgLabsQuery();

  console.log(labs, "labs-data");

  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const uniqueCities = [
    ...new Set(labs.map((lab: CbctOpgLab) => lab.location)),
  ];

  const filteredLabs = labs.filter((lab: CbctOpgLab) => {
    const matchesSearch = lab.name.toLowerCase().includes(search.toLowerCase());
    const matchesCity = city ? lab.location === city : true;
    const matchesState = selectedState ? lab.state === selectedState : true;
    return matchesSearch && matchesCity && matchesState;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-[#6548ee]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-red-600">
          Error loading labs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 bg-[#ede7f6] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#6548ee] text-center sm:text-left">
        CBCT & OPG Labs
      </h2>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row">
        <input
          type="text"
          placeholder="Search labs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border-2 border-[#6548ee] rounded-lg w-full sm:w-1/2 focus:outline-none focus:border-[#ff9800]"
        />

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border-2 border-[#6548ee] rounded-lg w-full sm:w-1/4 focus:outline-none focus:border-[#ff9800]"
        >
          <option value="">All Cities</option>
          {uniqueCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2 border-2 border-[#6548ee] rounded-lg w-full sm:w-1/4 focus:outline-none focus:border-[#ff9800]"
        >
          <option value="">All States/UTs</option>
          {allStatesAndUTs.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Labs List */}
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredLabs.map((lab: CbctOpgLab) => (
          <li
            key={lab.id}
            className="border border-gray-200 rounded-2xl shadow-lg bg-white flex flex-col justify-between transition hover:shadow-2xl hover:scale-[1.02] duration-200"
          >
            <img
              src={lab.img}
              alt={lab.name}
              className="object-cover w-full h-48 rounded-t-2xl"
            />
            <div className="flex flex-col gap-2 p-6">
              <div className="font-semibold text-xl text-[#6548ee]">
                {lab.name}
              </div>
              <div className="text-[#ff9800] font-medium">{lab.specialty}</div>
              <div className="text-gray-600">{lab.location}</div>
              <div className="font-semibold text-yellow-500">
                ⭐ Rating: {lab.rating}
              </div>
            </div>
            <div className="flex justify-between p-6 pt-0">
              <Link
                href={`/cbct-opg-labs/${lab.id}`}
                className="bg-[#6548ee] text-white px-4 py-2 rounded-lg hover:bg-[#ff9800] transition font-medium"
              >
                View Details
              </Link>
              <Link
                href={`/cbct-opg-labs/${lab.id}/book`}
                className="bg-[#ff9800] text-white px-4 py-2 rounded-lg hover:bg-[#6548ee] transition font-medium"
              >
                Book Appointment
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CbctOpgLabList;
