"use client"


import React, { useState } from "react";
import Pagination from "../product/Pagination";
import { Product } from "@/app/types";

const ProductListPage = ({ products }: { products: Product[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product, index) => (
          <div
            key={index}
            className="p-4 transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1"
          >
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="object-cover w-full h-48 rounded-md"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xl font-bold text-blue-600">₹{product.price}</p>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalProducts={products.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductListPage;
