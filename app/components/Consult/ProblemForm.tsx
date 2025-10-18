"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import problems from "../../data/problems";

interface Dentist {
  _id: string;
  user: { name: string };
  image: string;
  specialization: string[];
  problems: string[]; // can be ["Cavities,Toothache"] etc.
  clinicName?: string;
  clinicAddress?: string;
  states?: string[];
  experienceYears?: number;
}

const ProblemForm: React.FC = () => {
  const router = useRouter();
  const [problem, setProblem] = useState<string>("");
  const [otherProblem, setOtherProblem] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [filteredDentists, setFilteredDentists] = useState<Dentist[]>([]);
  const [showSpecialistCard, setShowSpecialistCard] = useState<boolean>(false);

  const selectedProblem = (problem || otherProblem).trim();

  // Fetch dentists based on the selected problem
  useEffect(() => {
    if (!selectedProblem) {
      setFilteredDentists([]);
      setShowSpecialistCard(false);
      return;
    }

    const fetchDentistsByProblem = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not set.");
        setError("Application is not configured correctly.");
        return;
      }

      try {
        const { data } = await axios.get(
          `${apiUrl}/api/v1/dentists/problem`,
          {
            params: { problem: selectedProblem },
          }
        );
        setFilteredDentists(data);
        setShowSpecialistCard(true);
      } catch (error) {
        console.error("Error fetching dentists by problem:", error);
        setError("Could not fetch dentist data.");
      }
    };

    fetchDentistsByProblem();
  }, [selectedProblem]);

  return (
    <div className="w-full max-w-4xl px-4 pt-8 pb-10 mx-auto mt-8 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-center mb-6 drop-shadow-lg">
          Got a Dental Problem? Get Help Online in Minutes!
        </h2>

        {/* --- Problem Form --- */}
        <div className="flex flex-col items-center justify-center w-full gap-4 sm:flex-row">
          <select
            className="w-full sm:flex-1 px-5 py-4 rounded-xl border-2 border-blue-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#15396A] font-semibold bg-white transition-all duration-300"
            value={problem}
            onChange={(e) => {
              setProblem(e.target.value);
              setOtherProblem("");
            }}
          >
            <option value="">Choose your Problem</option>
            {problems.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="w-full sm:flex-1 px-5 py-4 rounded-xl border-2 border-blue-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#15396A] font-semibold bg-white transition-all duration-300"
            placeholder="Any other problem"
            value={otherProblem}
            onChange={(e) => {
              setOtherProblem(e.target.value);
              setProblem("");
            }}
          />
        </div>

        {/* --- Matching Dentists --- */}
        {showSpecialistCard && (
          <div className="w-full mt-8">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-4 text-center">
              Matching Dentists
            </h3>

            {filteredDentists.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDentists.map((dentist) => (
                  <div
                    key={dentist._id}
                    className="flex flex-col items-center px-6 py-5 font-semibold text-center transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl hover:scale-105"
                  >
                    <Image
                      src={dentist.image}
                      alt={dentist.user?.name || "Dentist"}
                      width={90}
                      height={90}
                      className="object-cover mb-4 border-4 border-blue-200 rounded-full shadow-md"
                    />
                    <div className="mb-2 text-xl font-bold text-gray-800">
                      {dentist.user?.name}
                    </div>
                    <div className="mb-3 text-sm text-center text-gray-600">
                      {dentist.specialization?.join(", ")}
                    </div>
                    <div className="px-2 py-1 mb-3 text-xs text-center text-gray-500 bg-gray-100 rounded-full">
                      Problems:{" "}
                      {dentist.problems
                        .flatMap((p) => p.split(","))
                        .map((p) => p.trim())
                        .join(", ")}
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {dentist.clinicName || "Online Consultation"}
                    </div>
                    {dentist.experienceYears && (
                      <div className="mt-1 text-xs text-gray-500">
                        {dentist.experienceYears} years experience
                      </div>
                    )}
                    <button
                      onClick={() => router.push(`/consult/${dentist._id}`)}
                      className="w-full px-4 py-2 mt-4 text-sm font-bold text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Consult Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full mt-6 text-lg text-center text-gray-600">
                No dentists found for this problem.
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="px-4 py-2 mt-4 font-semibold text-red-600 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemForm;
