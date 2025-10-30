"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/productsApi";
import { useGetMyProfileQuery } from "@/services/userApi";
import { Product } from "@/app/types";

interface UserProfile {
  user: {
    _id: string;
    // Add other user properties as needed
  };
}

const PharmaBrandProfilePage = () => {
  const router = useRouter();
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({});

  const { data: userProfile, isLoading: userLoading } = useGetMyProfileQuery(
    {}
  );

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (productsLoading || userLoading) {
    return <div>Loading...</div>;
  }

  const filteredProducts = productsData?.products.filter(
    (product: Product) => product.user === (userProfile as UserProfile)?.user?._id
  );

  return (
    <div className="container p-4 mx-auto">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => router.push("/add-products")}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add a Pharma Product
        </button>
        <button
          onClick={() => router.push("/plans/pharmabrands/")}
          className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          Choose a Pharma & Brand Plan
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Your Products</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product: Product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.brand}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">{product.stockCount}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => router.push(`/products/${product._id}`)}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmaBrandProfilePage;
