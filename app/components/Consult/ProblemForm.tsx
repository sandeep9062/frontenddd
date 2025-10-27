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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedProblem = (problem || otherProblem).trim();

  // Fetch dentists based on the selected problem
  useEffect(() => {
    if (!selectedProblem) {
      setFilteredDentists([]);
      setShowSpecialistCard(false);
      return;
    }

    const fetchDentistsByProblem = async () => {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not set.");
        setError("Application is not configured correctly.");
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/dentists/problem`, {
          params: { problem: selectedProblem },
        });
        setFilteredDentists(data);
        setShowSpecialistCard(true);
        setError("");
      } catch (error) {
        console.error("Error fetching dentists by problem:", error);
        setError("Could not fetch dentist data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDentistsByProblem();
  }, [selectedProblem]);

  return (
    <div className="w-full max-w-6xl px-4 pt-12 pb-16 mx-auto mt-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl border border-blue-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23e0f2fe%22%20fill-opacity%3D%220.3%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        <div className="relative flex flex-col items-center justify-center p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-4">
              🦷 Quick Diagnosis
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-4">
              Got a Dental Problem?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Get help online in minutes! Describe your issue and we'll connect
              you with the right specialist.
            </p>
          </div>

          {/* Problem Form */}
          <div className="w-full max-w-4xl mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Problem Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose your dental problem
                </label>
                <div className="relative">
                  <select
                    className="w-full px-6 py-4 rounded-2xl border-2 border-blue-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-[#2C73D2] text-[#15396A] font-medium bg-white transition-all duration-300 hover:border-[#2C73D2] hover:shadow-xl appearance-none cursor-pointer"
                    value={problem}
                    onChange={(e) => {
                      setProblem(e.target.value);
                      setOtherProblem("");
                    }}
                  >
                    <option value="">Select a common problem</option>
                    {problems.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Custom Problem Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Or describe your specific issue
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-blue-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-[#2C73D2] text-[#15396A] font-medium bg-white transition-all duration-300 hover:border-[#2C73D2] hover:shadow-xl placeholder-gray-400"
                  placeholder="e.g., Sharp pain in upper left tooth"
                  value={otherProblem}
                  onChange={(e) => {
                    setOtherProblem(e.target.value);
                    setProblem("");
                  }}
                />
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center mt-8">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C73D2]"></div>
                  <span className="text-lg font-medium text-gray-600">
                    Finding the best dentists for you...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Matching Dentists */}
          {showSpecialistCard && !isLoading && (
            <div className="w-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-2">
                  Matching Specialists
                </h3>
                <p className="text-gray-600">
                  Dentists experienced with your specific issue
                </p>
              </div>

              {filteredDentists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDentists.map((dentist) => (
                    <div
                      key={dentist._id}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97]"></div>

                      <div className="p-6">
                        {/* Dentist Image */}
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <Image
                              src={dentist.image}
                              alt={dentist.user?.name || "Dentist"}
                              width={80}
                              height={80}
                              className="object-cover rounded-full border-4 border-blue-100 shadow-md"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="text-xs text-white font-bold">
                                ✓
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Dentist Info */}
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-gray-800 mb-1">
                            {dentist.user?.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {dentist.specialization?.join(", ")}
                          </p>
                          {dentist.experienceYears && (
                            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                              {dentist.experienceYears} years experience
                            </div>
                          )}
                        </div>

                        {/* Clinic Info */}
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            {dentist.clinicName || "Online Consultation"}
                          </div>
                          {dentist.clinicAddress && (
                            <div className="text-xs text-gray-500">
                              📍 {dentist.clinicAddress}
                            </div>
                          )}
                        </div>

                        {/* Problems */}
                        <div className="mb-4">
                          <div className="text-xs text-gray-500 mb-2">
                            Specializes in:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {dentist.problems
                              .flatMap((p) => p.split(","))
                              .map((p, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                >
                                  {p.trim()}
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => router.push(`/consult/${dentist._id}`)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white font-bold rounded-xl hover:from-[#008E97] hover:to-[#2C73D2] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Consult Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h4 className="text-xl font-semibold text-gray-600 mb-2">
                    No specialists found
                  </h4>
                  <p className="text-gray-500">
                    Try describing your problem differently or contact our
                    support team.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemForm;
