"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAddProductMutation } from "@/services/productsApi";
import { motion } from "framer-motion";
import { Upload, PlusCircle, X } from "lucide-react";
import { categories } from "../data/categories";

const AddProductPage = () => {
  const [addProduct, { isLoading, isError, isSuccess }] =
    useAddProductMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/pharma-brand/profile");
    }
  }, [isSuccess, router]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    description: "",
    composition: "",
    dosage: "",
    prescriptionRequired: false,
    price: "",
    discountPrice: "",
    stockCount: "",
    expiryDate: "",
    manufacturingDate: "",
    manufacturer: "",
    storageConditions: "Store in a cool, dry place away from sunlight",
    weight: "",
    tags: "",
  });

  const [images, setImages] = useState<File[]>([]);

  // 🧠 Filter subcategories based on main category
  const selectedCategory =
    categories.find((cat) => cat.name === formData.category) || null;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
      return;
    }

    // Reset subcategory when main category changes
    if (name === "category") {
      setFormData({ ...formData, category: value, subcategory: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const remainingSlots = 3 - images.length;

      if (newImages.length > remainingSlots) {
        alert(
          `You can only upload up to 3 images. ${
            remainingSlots > 0
              ? `The first ${remainingSlots} images have been added.`
              : "No more images can be added."
          }`
        );
      }

      const imagesToAdd = newImages.slice(0, remainingSlots);
      setImages((prevImages) => [...prevImages, ...imagesToAdd]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const productData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Handle boolean conversion for checkboxes
      if (key === "prescriptionRequired" || key === "isActive") {
        productData.append(key, String(value));
      } else if (key === "tags") {
        // Split tags string into an array
        const tagsArray = (value as string).split(",").map((tag) => tag.trim());
        // Append each tag separately if your backend expects an array
        tagsArray.forEach((tag) => {
          if (tag) {
            productData.append("tags", tag);
          }
        });
      } else {
        productData.append(key, value as string);
      }
    });
    images.forEach((image) => productData.append("images", image));
    await addProduct(productData);
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <motion.div
        className="max-w-3xl p-10 mx-auto border border-blue-100 shadow-2xl bg-white/80 backdrop-blur-md rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Product
          </div>
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
            Add a New Product
          </h1>
          <p className="text-gray-500">
            Fill in the details below to create a new product listing.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="e.g., Electric Toothbrush"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="e.g., Oral-B"
              />
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="e.g., P&G"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {selectedCategory && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                required
              >
                <option value="">Select Subcategory</option>
                {selectedCategory.items.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter a short product description..."
            />
          </div>

          {/* Composition */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Composition
            </label>
            <textarea
              name="composition"
              value={formData.composition}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g., Sodium Fluoride, Triclosan"
            />
          </div>

          {/* Dosage */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Dosage
            </label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g., Twice a day"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="e.g., 499"
                required
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Discount Price (₹)
              </label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="e.g., 399"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Stock Count
              </label>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="e.g., 100"
                required
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Weight (grams)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="e.g., 150"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Manufacturing Date */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Manufacturing Date
              </label>
              <input
                type="date"
                name="manufacturingDate"
                value={formData.manufacturingDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          {/* Storage Conditions */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Storage Conditions
            </label>
            <input
              type="text"
              name="storageConditions"
              value={formData.storageConditions}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g., dental, whitening, kids"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="prescriptionRequired"
                id="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleInputChange}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="prescriptionRequired"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Prescription Required?
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Product Images
            </label>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview ${index}`}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <div className="relative flex items-center justify-center w-full h-32 transition border-2 border-gray-300 border-dashed cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100">
                  <input
                    type="file"
                    name="images"
                    id="images"
                    onChange={handleImageChange}
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="text-center text-gray-500">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                    <p className="text-sm font-medium">Add more images</p>
                    <p className="text-xs text-gray-400">
                      ({3 - images.length} remaining)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 font-semibold text-white transition shadow-lg rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </motion.button>

          {/* Status Messages */}
          {isError && (
            <p className="text-sm font-medium text-center text-red-600">
              ❌ Error adding product. Please try again.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductPage;
