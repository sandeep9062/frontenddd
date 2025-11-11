"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetProductsQuery } from "../../../services/productsApi";
import { Product } from "../../types";

const ExploreDentalEssential = () => {
  const { data: productsData, isLoading, isError } = useGetProductsQuery({});
  const products = productsData?.products || [];
  const [productSliderIndex, setProductSliderIndex] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState(4);

  useEffect(() => {
    const updateProductsPerSlide = () => {
      if (window.innerWidth < 640) {
        setProductsPerSlide(1);
      } else if (window.innerWidth < 768) {
        setProductsPerSlide(2);
      } else if (window.innerWidth < 1024) {
        setProductsPerSlide(3);
      } else {
        setProductsPerSlide(4);
      }
    };

    updateProductsPerSlide();
    window.addEventListener("resize", updateProductsPerSlide);
    return () => window.removeEventListener("resize", updateProductsPerSlide);
  }, []);

  const productMaxIndex =
    products.length > 0 ? Math.ceil(products.length / productsPerSlide) - 1 : 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <section className="w-full px-2 py-6 pb-10 mx-0 mt-6 mb-4 overflow-x-hidden bg-gradient-to-r from-green-50 to-green-100 rounded-2xl max-w-y-50full sm:max-w-7xl sm:mx-auto sm:px-4">
      {/* Header */}
      <div className="mb-4 text-center sm:mb-6">
        <h2 className="text-4xl sm:text-2xl md:text-4xl font-bold text-[#2C73D2] mb-1 sm:mb-2 font-[Poppins]">
          Explore India’s Trusted Oral Care Essentials
        </h2>
        <p className="text-base text-gray-700 sm:text-lg md:text-lg">
          Quality dental products for your oral health needs.
        </p>
      </div>

      {/* Slider */}
      <div className="flex items-center justify-center w-full">
        {/* Previous Button */}
        <button
          onClick={() => setProductSliderIndex((prev) => Math.max(prev - 1, 0))}
          className="p-2 rounded-full bg-white shadow-lg hover:bg-[#2C73D2] hover:text-white transition border-2 border-[#2C73D2] z-10 mx-2 disabled:opacity-50 hidden sm:block"
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
            {products.map((product: Product, idx: number) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full p-2"
                style={{
                  width: `${100 / productsPerSlide}%`,
                  minWidth: `${100 / productsPerSlide}%`,
                }}
              >
                <div className="flex flex-col bg-white rounded-lg shadow-md p-4 border border-gray-200 h-[400px] transition-transform transform hover:scale-105">
                  <div className="w-full text-left">
                    <p className="h-5 text-sm text-gray-500 truncate">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-center flex-grow my-4">
                    <Image
                      src={
                        product.images[0]?.url || "/default-product-image.png"
                      }
                      alt={product.name}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                  <div className="h-16 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                  </div>
                  {/* <div className="text-center text-xl font-bold text-[#2C73D2] my-2">
                    ₹{product.price}
                  </div> */}
                  <Link
                    href={`/products/${product._id}`}
                    className="w-full px-4 py-2 mt-auto text-base font-semibold text-center text-white transition rounded-lg shadow-lg bg-gradient-to-r from-[#F4A300] to-[#2C73D2] hover:from-[#2C73D2] hover:to-[#F4A300]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() =>
            setProductSliderIndex((prev) => Math.min(prev + 1, productMaxIndex))
          }
          className="p-2 rounded-full bg-white shadow-lg hover:bg-[#2C73D2] hover:text-white transition border-2 border-[#2C73D2] z-10 mx-2 disabled:opacity-50 hidden sm:block"
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
