"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaMapMarkerAlt, FaGlobe, FaBook } from "react-icons/fa";
import { CbctOpgLab } from "../../../types/cbctOpgLab";

interface CbctOpgLabCardProps {
  lab: CbctOpgLab;
}

const CbctOpgLabCard: React.FC<CbctOpgLabCardProps> = ({ lab }) => {
  const whatsappNumber = lab.whatsapp?.replace(/\D/g, "") || "";

  return (
    <div className="flex-shrink-0 w-full max-w-sm p-4 overflow-hidden transition-transform duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={lab.img || "/placeholder.png"}
          alt={lab.name || "Lab"}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="mb-1 text-xl font-bold text-gray-800 truncate">
          {lab.name || "N/A"}
        </h3>
        <p className="mb-3 text-base text-gray-500">
          {lab.location || "N/A"}, {lab.state || "N/A"}
        </p>

        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800">
            Appointment Charges:{" "}
            <span className="font-bold text-green-600">
              ₹{lab.appointmentCharges?.toLocaleString() || "N/A"}
            </span>
          </p>
        </div>

        {lab.offers && lab.offers.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-800">
              Available Offers:
            </h4>
            <ul className="space-y-1 list-disc list-inside">
              {lab.offers.map((offer, index) => (
                <li key={index} className="text-xs text-gray-600">
                  {offer}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5"
                fill={i < Math.round(lab.rating || 0) ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.05 9.101c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ))}
          </span>
          <span className="text-sm text-gray-500">({lab.rating || 0})</span>
        </div>

        <a
          href={`/book-appointment?labId=${lab._id}&type=cbct-opg-lab`}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-3 font-semibold text-center text-white transition-colors duration-300 rounded-lg bg-gradient-to-r from-[#F4A300] to-[#2C73D2] hover:from-[#2C73D2] hover:to-[#F4A300] "
        >
          <FaBook />
          <span>Book Appointment</span>
        </a>

        <div className="flex w-full gap-2">
          <a
            href={lab.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center flex-1 py-2 text-center text-gray-600 transition-colors duration-300 bg-gray-100 rounded-lg hover:bg-gray-200"
            aria-label="Website"
          >
            <FaGlobe size={20} />
          </a>
          <a
            href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center flex-1 py-2 text-center text-white transition-colors duration-300 bg-green-500 rounded-lg hover:bg-green-600"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href={lab.mapUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center flex-1 py-2 text-center text-gray-600 transition-colors duration-300 bg-gray-100 rounded-lg hover:bg-gray-200"
            aria-label="Location"
          >
            <FaMapMarkerAlt size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CbctOpgLabCard;
