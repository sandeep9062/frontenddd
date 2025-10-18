"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import specialities from "../../data/specialities";
import Image from "next/image";

interface Dentist {
  _id: string;
  user: { name: string };
  image: string;
  specialization: string[];
  clinicName?: string;
  clinicAddress?: string;
  experienceYears?: number;
}

const SpecialityForm: React.FC = () => {
  const router = useRouter();
  const [speciality, setSpeciality] = useState<string>("");
  const [otherSpeciality, setOtherSpeciality] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [dentists, setDentists] = useState<Dentist[]>([]);

  // ✅ Handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!speciality && !otherSpeciality) {
      setError("Please select or enter a speciality.");
      return;
    }

    const finalSpeciality = speciality || otherSpeciality;
    setError("");
    router.push(`/dentist-list?speciality=${encodeURIComponent(finalSpeciality)}`);
  };

  // ✅ Fetch dentists from backend
  useEffect(() => {
    const fetchDentists = async () => {
      const finalSpeciality = speciality || otherSpeciality;
      if (!finalSpeciality) {
        setDentists([]);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!apiUrl) {
        console.error("❌ Critical Error: NEXT_PUBLIC_API_BASE_URL is not set.");
        setError("Configuration error: Unable to fetch dentists.");
        return;
      }

      try {
        console.log(`Fetching dentists from ${apiUrl}/api/v1/dentists?speciality=${finalSpeciality}`);
        const { data } = await axios.get(`${apiUrl}/api/v1/dentists?speciality=${finalSpeciality}`);

        if (Array.isArray(data)) {
          setDentists(data);
        } else if (Array.isArray(data?.dentists)) {
          setDentists(data.dentists);
        } else {
          console.warn("⚠️ Unexpected dentist data format:", data);
          setDentists([]);
        }
      } catch (err) {
        console.error("❌ Error fetching dentists:", err);
        setError("Could not fetch dentist data. Please try again later.");
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
          className="flex flex-col items-center px-6 py-5 font-semibold text-center transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl hover:scale-105"
        >
          <Image
            src={doctor.image || "/default-doctor.png"}
            alt={doctor.user?.name || "Dentist"}
            width={90}
            height={90}
            className="object-cover mb-4 border-4 border-blue-200 rounded-full shadow-md"
          />
          <div className="mb-2 text-xl font-bold text-gray-800">
            {doctor.user?.name}
          </div>
          <div className="mb-3 text-sm text-center text-gray-600">
            {doctor.specialization?.join(", ")}
          </div>
          <div className="text-sm font-medium text-gray-700">
            {doctor.clinicName || "Online Consultation"}
          </div>
          {doctor.clinicAddress && (
            <div className="mt-1 text-xs text-gray-500">
              {doctor.clinicAddress}
            </div>
          )}
          {doctor.experienceYears && (
            <div className="mt-1 text-xs text-gray-500">
              {doctor.experienceYears} years experience
            </div>
          )}
          <button
            onClick={() => router.push(`/consult/${doctor._id}`)}
            className="w-full px-4 py-2 mt-4 text-sm font-bold text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Consult Now
          </button>
        </div>
      ))
    ) : (
      <p className="w-full mt-6 text-lg text-center text-gray-600">
        No matching dentists found.
      </p>
    );

  return (
    <div className="w-full max-w-4xl px-4 pt-8 pb-10 mx-auto mt-8 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-center mb-6 drop-shadow-lg">
          Find a Specialist Dentist
        </h2>

        <form
          className="flex flex-col items-center justify-center w-full gap-4 sm:flex-row"
          onSubmit={handleSubmit}
        >
          <select
            className="w-full sm:flex-1 px-5 py-4 rounded-xl border-2 border-blue-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#15396A] font-semibold bg-white transition-all duration-300"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option value="">Choose your Speciality</option>
            {specialities.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="w-full sm:flex-1 px-5 py-4 rounded-xl border-2 border-blue-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#15396A] font-semibold bg-white transition-all duration-300"
            placeholder="Any other speciality"
            value={otherSpeciality}
            onChange={(e) => setOtherSpeciality(e.target.value)}
          />

          {/* <button
            type="submit"
            className="w-full px-10 py-4 font-bold text-white transition-all duration-300 transform shadow-lg sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl hover:shadow-xl hover:scale-105"
          >
            Submit
          </button> */}
        </form>

        {(speciality || otherSpeciality) && (
          <div className="w-full mt-8">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-4 text-center">
              Matching Doctors
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {doctorCards}
            </div>
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

export default SpecialityForm;
