"use client";

import React from "react";

interface SortByProps {
  sortValue: string;
  onChange: (value: string) => void;
}

const ProductSort: React.FC<SortByProps> = ({ sortValue, onChange }) => {
  const options = [
    { label: "Sort by", value: "" },
    { label: "Newest", value: "newest" },
    // { label: "Price (low to high)", value: "priceLowHigh" },
    // { label: "Price (high to low)", value: "priceHighLow" },
    { label: "Name A-Z", value: "nameAZ" },
    { label: "Name Z-A", value: "nameZA" },
  ];

  return (
    <div className="relative w-48 mb-6">
      <select
        value={sortValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProductSort;
