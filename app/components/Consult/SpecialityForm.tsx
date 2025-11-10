"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import specialities from "../../data/specialities";
import Image from "next/image";

interface Dentist {
  _id: string;
  user: {
    _id: string;
    name: string;
    role: string;
  };
  specialization: string[];
  clinicAddress: string;
  experienceYears: number;
  image: string;
  clinicName: string;
  address: string;
  consultationCharges: number; // 💰 Added
  ratings: number; // ⭐ Added
}

const SpecialityForm: React.FC = () => {
  const router = useRouter();
  const [speciality, setSpeciality] = useState<string>("");
  const [otherSpeciality, setOtherSpeciality] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ✅ Handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!speciality && !otherSpeciality) {
      setError("Please select or enter a speciality.");
      return;
    }

    const finalSpeciality = speciality || otherSpeciality;
    setError("");
    router.push(
      `/dentist-list?speciality=${encodeURIComponent(finalSpeciality)}`
    );
  };

  // ✅ Fetch dentists from backend
  useEffect(() => {
    const fetchDentists = async () => {
      const finalSpeciality = speciality || otherSpeciality;
      if (!finalSpeciality) {
        setDentists([]);
        return;
      }

      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error("❌ Critical Error: NEXT_PUBLIC_API_URL is not set.");
        setError("Configuration error: Unable to fetch dentists.");
        setIsLoading(false);
        return;
      }

      try {
        console.log(
          `Fetching dentists from ${apiUrl}/api/v1/dentists?speciality=${finalSpeciality}`
        );
        const { data } = await axios.get(
          `${apiUrl}/api/v1/dentists?speciality=${finalSpeciality}`
        );

        if (Array.isArray(data)) {
          setDentists(data);
        } else if (Array.isArray(data?.dentists)) {
          setDentists(data.dentists);
        } else {
          console.warn("⚠️ Unexpected dentist data format:", data);
          setDentists([]);
        }
        setError("");
      } catch (err) {
        console.error("❌ Error fetching dentists:", err);
        setError("Could not fetch dentist data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDentists();
  }, [speciality, otherSpeciality]);

  // ✅ Dentist cards UI
  const doctorCards =
    dentists.length > 0 ? (
      dentists.map((doctor) => (
        <div
          key={doctor._id}
          className="relative overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:scale-105"
        >
          {/* Card Header */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#008E97] to-[#2C73D2]"></div>

          <div className="p-6">
            {/* Doctor Image */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Image
                  src={doctor.image || "/default-doctor.png"}
                  alt={doctor.user?.name || "Dentist"}
                  width={120}
                  height={120}
                  className="object-cover border-4 border-teal-100 rounded-full shadow-md"
                />
                <div className="absolute flex items-center justify-center w-8 h-8 bg-green-400 border-2 border-white rounded-full -bottom-1 -right-1">
                  <span className="text-base font-bold text-white">✓</span>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            {/* Dentist Info */}
            <div className="flex flex-col justify-center flex-1 mb-6 text-center">
              <h3 className="font-bold text-2xl text-[#15396A] mb-2">
                {doctor.user.name}
              </h3>
              <div className="text-[#2C73D2] text-sm font-medium mb-3 leading-relaxed">
                {doctor.specialization.join(", ")}
              </div>

              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-3">
                {doctor.experienceYears} Years Experience
              </div>

              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="flex items-center text-[#F4A300] font-semibold">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.175 0l-3.39 2.463c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                  {typeof doctor.ratings === "number"
                    ? doctor.ratings.toFixed(1) + " / 5"
                    : "N/A"}
                </div>

                <div className="text-[#15396A] font-semibold">
                  ₹{doctor.consultationCharges ?? "—"}
                  <span className="ml-1 text-sm text-gray-500">
                    per consult
                  </span>
                </div>
              </div>

              <div className="mb-1 text-sm font-medium text-gray-700">
                {doctor.clinicName}
              </div>
            </div>

            {/* Clinic Info */}
            <div className="mb-4">
              <div className="mb-1 text-sm font-medium text-gray-700">
                {doctor.clinicName || "Online Consultation"}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push(`/consult/${doctor._id}`)}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#008E97] to-[#2C73D2] text-white font-bold rounded-xl hover:from-[#2C73D2] hover:to-[#008E97] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Consult Now
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="py-12 text-center col-span-full">
        <div className="mb-4 text-6xl">🔍</div>
        <h4 className="mb-2 text-xl font-semibold text-gray-600">
          No specialists found
        </h4>
        <p className="text-gray-500">
          Try selecting a different speciality or contact our support team.
        </p>
      </div>
    );

  return (
    <div className="w-full max-w-6xl px-4 pt-12 pb-16 mx-auto mt-12">
      <div className="relative overflow-hidden border border-teal-100 shadow-2xl bg-gradient-to-br from-white via-teal-50 to-cyan-100 rounded-3xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ccfbf1%22%20fill-opacity%3D%220.3%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        <div className="relative flex flex-col items-center justify-center p-8 lg:p-12">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#008E97] to-[#2C73D2] text-white rounded-full text-sm font-semibold mb-4">
              🩺 Specialist Search
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#008E97] to-[#2C73D2] mb-4">
              Find a Specialist Dentist
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
              Browse by speciality to find the perfect dentist for your specific
              needs.
            </p>
          </div>

          {/* Speciality Form */}
          <form className="w-full max-w-4xl mb-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Speciality Selector */}
              <div className="space-y-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Choose your dental speciality
                </label>
                <div className="relative">
                  <select
                    className="w-full px-6 py-4 rounded-2xl border-2 border-teal-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-[#008E97] text-[#15396A] font-medium bg-white transition-all duration-300 hover:border-[#008E97] hover:shadow-xl appearance-none cursor-pointer"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                  >
                    <option value="">Select a speciality</option>
                    {specialities.sort().map((s) => (
                      <option key={s} value={s}>
                        {s}
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

              {/* Custom Speciality Input */}
              <div className="space-y-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Or enter a specific speciality
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-teal-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-[#008E97] text-[#15396A] font-medium bg-white transition-all duration-300 hover:border-[#008E97] hover:shadow-xl placeholder-gray-400"
                  placeholder="e.g., Pediatric Dentistry"
                  value={otherSpeciality}
                  onChange={(e) => setOtherSpeciality(e.target.value)}
                />
              </div>
            </div>
          </form>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008E97]"></div>
                <span className="text-lg font-medium text-gray-600">
                  Finding specialists...
                </span>
              </div>
            </div>
          )}

          {/* Matching Doctors */}
          {(speciality || otherSpeciality) && !isLoading && (
            <div className="w-full">
              <div className="mb-8 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#008E97] to-[#2C73D2] mb-2">
                  Available Specialists
                </h3>
                <p className="text-gray-600">
                  Expert dentists in your chosen field
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {doctorCards}
              </div>
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

export default SpecialityForm;
