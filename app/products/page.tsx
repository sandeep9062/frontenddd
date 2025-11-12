"use client";
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/product/ProductFilter";
import ProductSort from "../components/product/ProductSort";
import ProductListPage from "../components/product/ProductListPage";
import ProductComparison from "../components/product/ProductComparison";
import { useGetProductsQuery } from "@/services/productsApi";
import { Product } from "../types";
import { categories } from "../data/categories";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
  const [selectedForComparison, setSelectedForComparison] = useState<Product[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCompareChange = (product: Product) => {
    setSelectedForComparison((prevSelected) => {
      const isSelected = prevSelected.some((p) => p._id === product._id);
      if (isSelected) {
        return prevSelected.filter((p) => p._id !== product._id);
      } else {
        if (prevSelected.length < 2) {
          return [...prevSelected, product];
        } else {
          alert("You can only select up to 2 products for comparison.");
          return prevSelected;
        }
      }
    });
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
  };

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const products = data?.products || [];

  const searchedProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.brand && product.brand.toLowerCase().includes(query)) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(query))
    );
  });

  const filteredProducts =
    selectedFilters.length > 0
      ? searchedProducts.filter((product: Product) => {
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
      : searchedProducts;

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
      {/* Hero Section */}
      <section className="py-16 text-center bg-white shadow-sm">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <h1 
          
           style={{
              background:
                "linear-gradient(135deg, #FF9933 0%, #00529B 50%, #138808 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
            }}
          
          
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
         Explore India's Trusted Oral Care Essentials
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
            Learn about the latest tools, materials, and technologies used in
            modern dentistry — their uses, benefits, and limitations. Empowering
            patients and clinics with informed choices.
          </p>
          <div className="max-w-md mx-auto mt-8">
            <input
              type="search"
              placeholder="Search dental product or category…"
              className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </section>

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
                <ProductListPage
                  products={sortedProducts}
                  onCompare={handleCompareChange}
                  selectedForComparison={selectedForComparison}
                />
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
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      {selectedForComparison.length === 2 && (
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <ProductComparison
            product1={selectedForComparison[0]}
            product2={selectedForComparison[1]}
          />
        </div>
      )}

      
    </div>
  );
};

export default Page;
