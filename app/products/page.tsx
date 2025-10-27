"use client";
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/product/ProductFilter";
import ProductSort from "../components/product/ProductSort";
import ProductListPage from "../components/product/ProductListPage";
import { useGetProductsQuery } from "@/services/productsApi";
import { Product } from "../types";

const Page = () => {
  const { data, error, isLoading } = useGetProductsQuery({});
  const [sortValue, setSortValue] = useState("");

  const handleSortChange = (value: string) => {
    setSortValue(value);
  };

  const products = data?.products || [];

  const sortedProducts = [...products].sort((a, b) => {
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
    <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ProductFilter />
        </div>
        <div className="lg:col-span-3">
          <ProductSort sortValue={sortValue} onChange={handleSortChange} />
          {isLoading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>Error fetching products.</p>
          ) : (
            <ProductListPage products={sortedProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
