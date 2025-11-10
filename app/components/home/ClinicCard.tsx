"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaGlobe,
  FaBook,
  FaInstagram,
} from "react-icons/fa";
import { Clinic } from "../../../types/clinic";
import OffersModal from "../OffersModal"; // Assuming this component will be created
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

interface ClinicCardProps {
  clinic: Clinic;
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic }) => {
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const whatsappNumber = clinic.whatsapp?.replace(/\D/g, "") || "";




  console.log(clinic,"clinic-datat")

  return (
    <div className="flex-shrink-0 w-full max-w-sm p-4 overflow-hidden transition-transform duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-48 mb-4 group">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="h-full mySwiper"
        >
          {clinic.images?.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <Image
                src={image}
                alt={clinic.name || "Clinic"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col">
        <h3 className="mb-1 text-xl font-bold text-gray-800 truncate">
          {clinic.name || "N/A"}
        </h3>
        <p className="mb-3 text-base text-gray-500">
          {clinic.location || "N/A"}, {clinic.state || "N/A"}
        </p>
        <p className="h-10 mb-3 overflow-hidden text-sm text-gray-600 text-ellipsis">
          {clinic.description || "No description available."}
        </p>

        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800">
            Appointment Charges:{" "}
            <span className="font-bold text-green-600">
              ₹{clinic.appointmentCharges?.toLocaleString() || "N/A"}
            </span>
          </p>
        </div>

        {clinic.offers && clinic.offers.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setIsOffersModalOpen(true)}
              className="w-full px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
            >
              View Offers
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5"
                fill={
                  i < Math.round(clinic.rating || 0) ? "currentColor" : "none"
                }
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
          <span className="text-sm text-gray-500">({clinic.rating || 0})</span>
        </div>

        <a
          href={`/book-appointment?clinicId=${clinic._id}`}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 mb-3 font-semibold text-center text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <FaBook />
          <span>Book Appointment</span>
        </a>

        <div className="flex w-full gap-2">
          <a
            href={clinic.website || "#"}
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
            href={clinic.mapUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center flex-1 py-2 text-center text-gray-600 transition-colors duration-300 bg-gray-100 rounded-lg hover:bg-gray-200"
            aria-label="Location"
          >
            <FaMapMarkerAlt size={20} />
          </a>
          <a
            href={clinic.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center flex-1 py-2 text-center text-white transition-colors duration-300 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
      {clinic.offers && clinic.offers.length > 0 && (
        <OffersModal
          isOpen={isOffersModalOpen}
          onClose={() => setIsOffersModalOpen(false)}
          offers={clinic.offers}
          clinicName={clinic.name || "Clinic"}
        />
      )}
    </div>
  );
};

export default ClinicCard;
