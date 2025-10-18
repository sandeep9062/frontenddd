"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Clinic } from "@/types/clinic";

interface ClinicCardProps {
  clinic: Clinic;
  type?: string;
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic, type = "clinic" }) => {
  const router = useRouter();
  const [showContact, setShowContact] = useState(false);

  const name = clinic.name || "N/A";
  const location = clinic.location || "N/A";
  const rating = clinic.rating || 0;
  const website = clinic.website || "";
  const image =
    clinic.img ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=300&q=80";
  const whatsapp = clinic.whatsapp || "";
  const bookUrl = clinic.bookUrl || "";
  const mapUrl = clinic.mapUrl || "";

  return (
    <li className="flex flex-col overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-sm font-semibold text-[#2C73D2]">
          {rating} ★
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-2xl font-bold text-[#2056AE] mb-2 truncate">{name}</h3>
        <div className="flex items-center mb-4 text-gray-600">
          <img
            src="/location.png"
            alt="Location"
            className="w-5 h-5 mr-2"
          />
          <span className="font-semibold text-[#2056AE]">{location}</span>
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex gap-3">
            <button
              className="w-full bg-[#2C73D2] text-white px-4 py-2 rounded-lg font-bold text-center hover:bg-[#2056AE] transition-colors duration-300"
              onClick={() => router.push(bookUrl)}
            >
              Book Now
            </button>
            <button className="w-full bg-gray-200 text-[#2C73D2] px-4 py-2 rounded-lg font-bold text-center hover:bg-gray-300 transition-colors duration-300">
              View Offers
            </button>
          </div>
          <button
            className="w-full bg-[#F4A300] text-white px-4 py-2 rounded-lg font-bold text-center hover:bg-[#d98e00] transition-colors duration-300"
            onClick={() => setShowContact(!showContact)}
          >
            Contact
          </button>
          {showContact && (
            <div className="flex justify-center gap-4 mt-3">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <img src="/whatsapp_icon.png" alt="WhatsApp" className="w-8 h-8" />
                </a>
              )}
              {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  <img src="/location.png" alt="Directions" className="w-8 h-8" />
                </a>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                  <img src="/website_icon.png" alt="Website" className="w-8 h-8" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ClinicCard;
