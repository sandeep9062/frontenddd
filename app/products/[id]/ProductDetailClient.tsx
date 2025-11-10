"use client";
import { useGetProductByIdQuery } from "@/services/productsApi";
import React, { useEffect, useState } from "react";
import { Product, ProductImage } from "../../types";

const ProductDetailClient = ({ id }: { id: string }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const { data, error, isLoading } = useGetProductByIdQuery(id);

  const product = data as Product;

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="container p-8 mx-auto text-center">
        <p className="text-lg text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-8 mx-auto text-center">
        <p className="text-lg text-red-600">Error loading product. Please try again later.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container p-8 mx-auto text-center">
        <p className="text-lg text-gray-800">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container p-8 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <div className="mb-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="object-cover w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                />
              )}
            </div>
            <div className="flex space-x-2">
              {product.images?.map((image: ProductImage) => (
                <img
                  key={image.url}
                  src={image.url}
                  alt={product.name}
                  className={`w-20 h-20 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedImage === image.url
                      ? "border-4 border-blue-500 shadow-md"
                      : "border-2 border-transparent hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            <p className="mt-2 text-lg text-gray-500">{product.category}</p>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">📋 Overview</h2>
                <p className="mt-3 text-gray-600">{product.description || "No overview available."}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">🔍 Uses in Dentistry</h2>
                <p className="mt-3 text-gray-600">{product.uses || "Information on uses is not available."}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">✅ Advantages</h2>
                <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside">
                  {product.advantages?.map((adv, index) => <li key={index}>{adv}</li>) || <li>No advantages listed.</li>}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">⚠️ Disadvantages / Limitations</h2>
                <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside">
                  {product.disadvantages?.map((dis, index) => <li key={index}>{dis}</li>) || <li>No disadvantages listed.</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
