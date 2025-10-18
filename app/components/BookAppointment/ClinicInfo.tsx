"use client";
import React from "react";
import { Clinic } from "./types";

const ClinicInfo: React.FC<{ clinic: Clinic }> = ({ clinic }) => {
  return (
    <div className="flex flex-col items-center flex-1 p-8 bg-white shadow-xl rounded-2xl">
      <img
        src={clinic.Image || clinic.image || "/placeholder-clinic.png"}
        alt={clinic.Name || clinic.name || "Clinic"}
        className="h-32 w-32 object-cover rounded-full border-4 border-[#2C73D2] shadow-lg mb-4"
      />
      <div className="font-bold text-2xl mb-1 text-[#2056AE]">
        {clinic.Name || clinic.name}
      </div>
      <div
        className="flex items-center justify-center mb-1 text-base font-medium text-gray-600"
        style={{ lineHeight: "1.5" }}
      >
        <span className="align-middle" style={{ fontSize: "1.1rem" }}>
          {clinic.City || clinic.city}, {clinic.State || clinic.state}
        </span>
      </div>
      <div className="text-[#2056AE] mb-1 text-base font-semibold flex items-center justify-center">
        <span
          className="align-middle font-bold text-[#2056AE] underline"
          style={{ fontSize: "1.1rem" }}
        >
          {clinic.Address || clinic.address}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#F4A300] font-bold text-lg">
          {clinic.Rating || clinic.rating}
        </span>
        <span className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < Math.round(Number(clinic.Rating || clinic.rating || 4))
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
            </svg>
          ))}
        </span>
      </div>
      <div className="mt-2 mb-1 font-semibold text-green-600">
        Dental Registration Verified
      </div>
      <div className="text-[#1BC47D] font-bold mb-2">
        87% <span className="font-normal text-gray-600">(53 patients)</span>
      </div>
      <div className="mb-2 text-base text-gray-700">
        {clinic.Description || "No description available."}
      </div>
      <div className="flex flex-wrap gap-2 mt-2 mb-4">
        <span className="bg-[#2056AE] text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          Trusted Care. Lasting Smiles.
        </span>
        <span className="bg-[#F4A300] text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          Dental Tourism Clinics India
        </span>
      </div>
      <div className="mb-2 text-[#2056AE] font-semibold text-base">
        {clinic.City || clinic.city}, {clinic.State || clinic.state}
      </div>
    </div>
  );
};

export default ClinicInfo;
