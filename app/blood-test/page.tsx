"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import allStatesAndUTs from "../data/allStatesAndUTs";
import axios from "axios";

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
  const [city, setCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/diagnostic-labs`
        );
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

  const uniqueCities = [...new Set(labs.map((lab) => lab.location))];

  const filteredLabs = labs.filter((lab) => {
    const matchesSearch = lab.name.toLowerCase().includes(search.toLowerCase());
    const matchesCity = city ? lab.location === city : true;
    const matchesState = selectedState ? lab.state === selectedState : true;
    return matchesSearch && matchesCity && matchesState;
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
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border rounded md:w-1/4"
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
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLabs.map((lab) => (
          <li
            key={lab._id}
            className="flex flex-col justify-between p-6 bg-white border rounded-lg shadow"
          >
            <Image
              src={lab.img}
              alt={lab.name}
              width={160}
              height={160}
              className="object-cover w-full h-40 mb-4 rounded"
            />
            <div>
              <div className="font-semibold text-xl mb-1 text-[#6548ee]">
                {lab.name}
              </div>
              <div className="mb-1 text-gray-600">
                {lab.location}, {lab.state}
              </div>
              <div className="mb-2 text-yellow-500">Rating: {lab.rating}</div>
            </div>
            <div>
              <Link
                href={`/diagnostic-labs/${lab._id}`}
                className="mr-2 inline-block bg-[#6548ee] text-white px-4 py-2 rounded hover:bg-[#ff9800] transition"
              >
                View Details
              </Link>
              {lab.bookUrl && lab.bookUrl !== "#" && (
                <Link
                  href={lab.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ff9800] text-white px-4 py-2 rounded hover:bg-[#6548ee] transition"
                >
                  Book Test
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodTestLabList;
