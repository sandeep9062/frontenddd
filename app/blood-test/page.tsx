
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
        const res = await axios.get("/api/diagnostic-labs");
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
    return matchesSearch  && matchesState;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Loading labs...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#ede7f6] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-[#6548ee]">
        Diagnostic & Blood Test Labs
      </h2>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Search labs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded md:w-1/2"
        />

      

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full px-4 py-2 border rounded md:w-1/4"
        >
          <option value="">All States/UTs</option>
          {allStatesAndUTs.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Lab List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLabs.map((lab) => (
          <BloodTestLabCard key={lab._id} lab={lab} />
        ))}
      </div>
    </div>
  );
};

export default BloodTestLabList;
