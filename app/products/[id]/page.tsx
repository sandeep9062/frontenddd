"use client";
import { useGetProductByIdQuery } from "@/services/productsApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product, ProductImage } from "../../types";

const Page = () => {
  const { id } = useParams();
  console.log(id, "check-product-id");
  const [selectedImage, setSelectedImage] = useState("");
  const { data, error, isLoading } = useGetProductByIdQuery(id as string);

  console.log(data, "check-product-details");

  const product = data as Product;

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product</div>;
  }

  return (
    <div className="container p-8 mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="mb-4">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product?.name}
                className="w-full rounded-lg"
              />
            )}
          </div>
          <div className="flex space-x-2">
            {product?.images?.map((image: ProductImage) => (
              <img
                key={image.url}
                src={image.url}
                alt={product?.name}
                className={`w-20 h-20 rounded-lg cursor-pointer ${
                  selectedImage === image.url ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 md:w-1/2 md:mt-0 md:ml-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <p className="mt-2 text-xl text-gray-600">{product?.brand}</p>
            <p className="mt-4 text-lg">{product?.description}</p>
            <div className="flex items-center mt-4">
              <p className="text-2xl font-bold">₹{product?.price}</p>
              {product?.discountPrice && (
                <p className="ml-4 text-xl text-gray-500 line-through">
                  ₹{product?.discountPrice}
                </p>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Product Details</h2>
              <div className="grid grid-cols-1 mt-4 gap-y-2 sm:grid-cols-2">
                <p>
                  <span className="font-bold">Category:</span>{" "}
                  {product?.category}
                </p>
                {product?.subcategory && (
                  <p>
                    <span className="font-bold">Subcategory:</span>{" "}
                    {product?.subcategory}
                  </p>
                )}
                <p>
                  <span className="font-bold">Composition:</span>{" "}
                  {product?.composition}
                </p>
                <p>
                  <span className="font-bold">Dosage:</span> {product?.dosage}
                </p>
                <p>
                  <span className="font-bold">Prescription Required:</span>{" "}
                  {product?.prescriptionRequired ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-bold">In Stock:</span>{" "}
                  {product?.stockCount}
                </p>
                <p>
                  <span className="font-bold">Expiry Date:</span>{" "}
                  {product?.expiryDate}
                </p>
                <p>
                  <span className="font-bold">Manufacturing Date:</span>{" "}
                  {product?.manufacturingDate}
                </p>
                <p>
                  <span className="font-bold">Manufacturer:</span>{" "}
                  {product?.manufacturer}
                </p>
                <p>
                  <span className="font-bold">Storage Conditions:</span>{" "}
                  {product?.storageConditions}
                </p>
                <p>
                  <span className="font-bold">Weight:</span> {product?.weight}
                </p>
                <p>
                  <span className="font-bold">Rating:</span> {product?.rating} (
                  {product?.numReviews} reviews)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
