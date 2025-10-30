"use client";
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/product/ProductFilter";
import ProductSort from "../components/product/ProductSort";
import ProductListPage from "../components/product/ProductListPage";
import { useGetProductsQuery } from "@/services/productsApi";
import { Product } from "../types";
import { categories } from "../data/categories";
import { motion, AnimatePresence } from "framer-motion";

const SkeletonCard = () => (
  <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
    <div className="mt-4">
      <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-1/2 h-4 mt-2 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-1/4 h-8 mt-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const Page = () => {
  const { data, error, isLoading } = useGetProductsQuery({});
  const [sortValue, setSortValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSortChange = (value: string) => {
    setSortValue(value);
  };

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const products = data?.products || [];

  const filteredProducts =
    selectedFilters.length > 0
      ? products.filter((product: Product) => {
          const productCategory = product.category.toLowerCase();
          const productSubcategory = product.subcategory
            ? product.subcategory.toLowerCase()
            : "";

          return selectedFilters.some((filter) => {
            const filterLower = filter.toLowerCase();

            if (productSubcategory === filterLower) {
              return true;
            }

            const mainCategory = categories.find(
              (cat) => cat.name.toLowerCase() === filterLower
            );

            if (mainCategory) {
              if (productCategory === filterLower) {
                return true;
              }
              return mainCategory.items.some(
                (item) => item.toLowerCase() === productSubcategory
              );
            }

            return false;
          });
        })
      : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortValue === "priceLowHigh") {
      return a.price - b.price;
    }
    if (sortValue === "priceHighLow") {
      return b.price - a.price;
    }
    if (sortValue === "nameAZ") {
      return a.name.localeCompare(b.name);
    }
    if (sortValue === "nameZA") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white rounded-lg shadow-md top-24">
              <ProductFilter onFilterChange={handleFilterChange} />
            </div>
          </div>
          <div className="w-full lg:col-span-3">
            <div className="flex flex-col items-center justify-between mb-8 sm:flex-row">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:mb-0">
                Our Products
              </h2>
              <ProductSort sortValue={sortValue} onChange={handleSortChange} />
            </div>
            <AnimatePresence>
              {isLoading ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-64 p-8 text-center bg-white rounded-lg shadow-md"
                >
                  <h3 className="text-2xl font-semibold text-red-600">
                    Something went wrong
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We couldn't load the products. Please try again later.
                  </p>
                </motion.div>
              ) : sortedProducts.length > 0 ? (
                <ProductListPage products={sortedProducts} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-64 p-8 text-center bg-white rounded-lg shadow-md"
                >
                  <h3 className="text-2xl font-semibold text-gray-800">
                    No products found
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Try adjusting your filters to find what you're looking
                    for.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
