"use client";

import React from "react";

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: string[];
  clinicName: string;
}

const OffersModal: React.FC<OffersModalProps> = ({ isOpen, onClose, offers, clinicName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Offers at {clinicName}</h2>
          <button onClick={onClose} className="text-3xl leading-none text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <ul className="space-y-2">
          {offers.map((offer, index) => (
            <li key={index} className="p-3 text-gray-700 bg-gray-100 rounded-md">
              {offer}
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersModal;
