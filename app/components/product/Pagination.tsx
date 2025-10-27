"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalProducts: number;
  productsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage = 12,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-12 select-none">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 text-base font-medium transition-colors duration-200 rounded-lg
          ${currentPage === 1
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          }`}
      >
        <ChevronLeft size={20} />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200
              ${num === currentPage
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-4 py-2 text-base font-medium transition-colors duration-200 rounded-lg
          ${currentPage === totalPages
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          }`}
      >
        <span>Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
