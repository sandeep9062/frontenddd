"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Products data
const products = [
  { name: "Tooth Paste", img: "/Tooth Paste.png" },
  { name: "Tooth Brush", img: "/Tooth Brush.png" },
  { name: "Gum Paints", img: "/Gum Paints.png" },
  { name: "Mouth Wash", img: "/Mouth Wash.png" },
  { name: "Flossers", img: "/Flossers.png" },
  { name: "Tooth Whitening", img: "/Tooth Whitening.png" },
  { name: "Lip & Oral care", img: "/Lip & Oral care.png" },
  { name: "Ayurvedic Dental", img: "/Ayurvedic Dental.png" },
  { name: "Denture & Retainer", img: "/Denture & Retainer.png" },
  { name: "Tongue Cleaner", img: "/Tongue Cleaner.png" },
  { name: "Interdental Brushes", img: "/Interdental Brushes.png" },
  { name: "Travel Kits", img: "/Travel Kits.png" },
];

const ExploreDentalEssential = () => {
  const [productSliderIndex, setProductSliderIndex] = useState(0);

  // Number of products visible per slide
  const productsPerSlide = 4;
  const productMaxIndex = Math.ceil(products.length / productsPerSlide) - 1;

  return (
    <section className="w-full max-w-full px-2 pb-10 mx-0 mt-4 mb-4 overflow-x-hidden sm:max-w-7xl sm:mx-auto sm:px-4">
      {/* Header */}
      <div className="mb-4 text-center sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2C73D2] mb-1 sm:mb-2 font-[Poppins]">
          Explore Dental Essentials
        </h2>
        <p className="text-base text-gray-700 sm:text-lg md:text-lg">
          Quality dental products for your oral health needs.
        </p>
      </div>

      {/* Slider */}
      <div className="flex items-center justify-center w-full">
        {/* Previous Button */}
        <button
          onClick={() =>
            setProductSliderIndex((prev) => Math.max(prev - 1, 0))
          }
          className="p-2 rounded-full bg-white shadow-lg hover:bg-[#2C73D2] hover:text-white transition border-2 border-[#2C73D2] z-10 mx-2 disabled:opacity-50"
          disabled={productSliderIndex === 0}
          aria-label="Previous Product"
        >
          <FaChevronLeft />
        </button>

        {/* Slider Container */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${
                productSliderIndex * (100 / productsPerSlide)
              }%)`,
            }}
          >
            {products.map((product, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full p-2"
                style={{
                  width: `${100 / productsPerSlide}%`,
                  minWidth: `${100 / productsPerSlide}%`,
                }}
              >
                <div className="flex flex-col items-center bg-[#f7f7f7] rounded-2xl shadow-lg p-4 border border-[#2C73D2]/10 min-h-[240px] justify-between">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={112}
                    height={112}
                    className="object-contain mb-2"
                  />
                  <div className="text-base font-semibold text-[#2C73D2] mb-2 text-center">
                    {product.name}
                  </div>
                  <Link
                    href="#"
                    className="px-3 py-1 mt-auto rounded-lg bg-gradient-to-r from-[#2C73D2] to-[#F4A300] text-white font-semibold shadow-lg hover:from-[#F4A300] hover:to-[#2C73D2] transition text-center w-full text-sm"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() =>
            setProductSliderIndex((prev) =>
              Math.min(prev + 1, productMaxIndex)
            )
          }
          className="p-2 rounded-full bg-white shadow-lg hover:bg-[#2C73D2] hover:text-white transition border-2 border-[#2C73D2] z-10 mx-2 disabled:opacity-50"
          disabled={productSliderIndex >= productMaxIndex}
          aria-label="Next Product"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: productMaxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setProductSliderIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              productSliderIndex === idx ? "bg-[#2C73D2]" : "bg-gray-300"
            } transition`}
            aria-label={`Go to product slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreDentalEssential;
