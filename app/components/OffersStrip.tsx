"use client";

import React from "react";
import Link from "next/link";

const OffersStrip: React.FC = () => {
  return (
    <div
      className="w-full top-0 z-50 shadow-md transition-all duration-300 font-[Poppins]"
      style={{
        background: "linear-gradient(90deg, #2C73D2 0%, #F4A300 100%)",
        borderTop: "3px solid #F4A300",
        borderBottom: "3px solid #F4A300",
      }}
    >
      <div className="flex items-center w-full px-2 sm:px-4 py-1.5 justify-between">
        {/* Offers Marquee Section */}
        <div className="flex items-center flex-1 min-w-0">
          {/* Latest Offers Label (Hidden on small screens) */}
          <span
            className="text-[#F4A300] text-lg sm:text-xl font-extrabold mr-3 sm:mr-4 hidden sm:block flex-shrink-0"
            style={{ textShadow: "0 2px 8px #2056AE44" }}
          >
            Latest Offers:
          </span>

          {/* Marquee Content */}
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="8"
            className="w-full text-sm font-semibold text-white sm:text-lg"
            style={{ whiteSpace: "nowrap" }}
          >
            <span
              className="inline-block mr-10"
              style={{ animation: "pulseOffer 1.2s infinite alternate" }}
            >
              <span className="text-[#F4A300] mr-1">★</span>
              <span className="text-white">10% off on first visit</span>
            </span>

            <span
              className="inline-block mr-10"
              style={{ animation: "pulseOffer 1.2s infinite alternate" }}
            >
              <span className="text-[#F4A300] mr-1">★</span>
              <span className="text-white">
                Free consultation for new patients
              </span>
            </span>

            <span
              className="inline-block mr-10"
              style={{ animation: "pulseOffer 1.2s infinite alternate" }}
            >
              <span className="text-[#F4A300] mr-1">★</span>
              <span className="text-white">Complimentary dental checkup</span>
            </span>
          </marquee>
        </div>

        {/* Download App Button */}
        <div className="flex-shrink-0 pl-2 sm:pl-4">
          <Link
            href="#"
            className="flex items-center gap-1 sm:gap-2 font-bold whitespace-nowrap text-[#2C73D2] border-2 border-[#2C73D2] transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #FFD700 0%, #F4A300 50%, #FF8C00 100%)",
              padding: "0.4rem 0.8rem",
              borderRadius: "25px",
              textDecoration: "none",
              fontSize: "0.8rem",
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)",
            }}
          >
            <span className="text-base sm:text-lg">📱</span>
            <span className="hidden sm:inline">App Coming Soon...</span>
            <span className="inline sm:hidden">App</span>
          </Link>
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulseOffer {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default OffersStrip;
