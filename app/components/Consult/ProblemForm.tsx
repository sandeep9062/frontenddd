"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import problems from "../../data/problems";

interface Dentist {
  _id: string;
  user: {
    _id: string;
    name: string;
    role: string;
  };
  clinicAddress: string;
  problems: string[];
  specialization: string[];
  experienceYears: number;
  image: string;
  clinicName: string;
  address: string;
  consultationCharges: number; // 💰 Added
  ratings: number; // ⭐ Added
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

  // ✅ Ensure unique problem options
  const uniqueProblems = Array.from(new Set(problems));

  // Fetch dentists based on selected problem
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
      <div className="relative overflow-hidden border border-blue-100 shadow-2xl bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23e0f2fe%22%20fill-opacity%3D%220.3%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        <div className="relative flex flex-col items-center justify-center p-8 lg:p-12">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-4">
              🦷 Quick Diagnosis
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-4">
              Got a Dental Problem?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
              Get help online in minutes! Describe your issue and we'll connect
              you with the right specialist.
            </p>
          </div>

          {/* Problem Form */}
          <div className="w-full max-w-4xl mb-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Problem Selector */}
              <div className="space-y-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
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
                    {uniqueProblems.map((p, index) => (
                      <option key={`${p}-${index}`} value={p}>
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
                <label className="block mb-2 text-sm font-semibold text-gray-700">
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
              <div className="mb-8 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-2">
                  Matching Specialists
                </h3>
                <p className="text-gray-600">
                  Dentists experienced with your specific issue
                </p>
              </div>

              {filteredDentists.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDentists.map((dentist) => (
                    <div
                      key={dentist._id}
                      className="relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-200 shadow-xl group rounded-3xl hover:shadow-2xl hover:-translate-y-2"
                    >
                      <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#3498db] to-[#2ecc71]"></div>

                      <div className="p-8">
                        {/* Dentist Image */}
                        <div className="flex justify-center mb-5">
                          <div className="relative">
                            <Image
                              src={dentist.image}
                              alt={dentist.user?.name || "Dentist"}
                              width={90}
                              height={90}
                              className="object-cover border-4 border-white rounded-full shadow-lg"
                            />
                            <div className="absolute flex items-center justify-center border-2 border-white rounded-full shadow-md w-7 h-7 bg-gradient-to-r from-green-400 to-green-500 -bottom-1 -right-1">
                              <span className="text-sm font-bold text-white">
                                ✓
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Dentist Info */}
                        <div className="flex flex-col justify-center flex-1 mb-6 text-center">
                          <h3 className="mb-2 text-2xl font-bold text-gray-800">
                            {dentist.user.name}
                          </h3>
                          <div className="mb-4 text-sm font-medium leading-relaxed text-gray-500">
                            {dentist.specialization.join(" • ")}
                          </div>

                          <div className="inline-flex items-center self-center px-5 py-2 mb-4 text-sm font-bold text-white rounded-full shadow-md bg-gradient-to-r from-blue-500 to-teal-500">
                            {dentist.experienceYears} Years Experience
                          </div>

                          {/* 💰 Consultation Charges and ⭐ Rating */}
                          <div className="flex items-center justify-center gap-6 mb-5">
                            {dentist.ratings && (
                              <div className="flex items-center text-lg font-bold text-yellow-500">
                                <svg
                                  className="w-5 h-5 mr-1.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.175 0l-3.39 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                                </svg>
                                {dentist.ratings.toFixed(1)}
                              </div>
                            )}

                            <div className="text-lg font-bold text-gray-800">
                              ₹{dentist.consultationCharges}
                              <span className="ml-1.5 text-sm text-gray-500 font-medium">
                                / consult
                              </span>
                            </div>
                          </div>

                          <div className="mb-1 text-sm font-medium text-gray-700">
                            {dentist.clinicName}
                          </div>
                          <div className="flex items-center justify-center text-xs text-gray-500">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {dentist.address}
                          </div>
                        </div>

                        {/* Clinic Info */}
                        <div className="mb-4">
                          <div className="mb-1 text-sm font-medium text-gray-700">
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
                          <div className="mb-2 text-xs text-gray-500">
                            Specializes in:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {dentist.problems
                              .flatMap((p) => p.split(","))
                              .map((p, index) => (
                                <span
                                  key={`${p}-${index}`}
                                  className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                                >
                                  {p.trim()}
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <button
                          onClick={() => router.push(`/consult/${dentist._id}`)}
                          className="w-full px-6 py-4 font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl hover:from-teal-600 hover:to-blue-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          Book a Consultation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mb-4 text-6xl">🔍</div>
                  <h4 className="mb-2 text-xl font-semibold text-gray-600">
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
            <div className="p-4 mt-6 border border-red-200 bg-red-50 rounded-xl">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-400"
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
                <span className="font-medium text-red-700">{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemForm;
