"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import allStatesAndUTs from "../data/allStatesAndUTs";
const AddCbctOpgLabs: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    state: "",
    rating: "",
    bookUrl: "",
    website: "",
    whatsapp: "",
    mapUrl: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.state || !image) {
      toast.error("Please fill all required fields and upload an image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      if (image) {
        data.append("img", image);
      }
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof typeof formData];
        if (value) {
          data.append(key, value);
        }
      });

      const token = localStorage.getItem("token"); // if auth protected
      const response = await axios.post("/api/v1/cbct-opg-labs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (response.status === 201) {
        toast.success("CBCT & OPG Lab added successfully!");
        setTimeout(() => router.push("/cbct-opg-lab"), 2000);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error adding lab.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#fffaf0] flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#6548ee]">
          Add CBCT & OPG Lab
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Clinic Name *"
            value={formData.name}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
          />

          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
          >
            <option value="" disabled>
              Select State *
            </option>
            {allStatesAndUTs.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location *"
            value={formData.location}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            value={formData.rating}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
            min="0"
            max="5"
          />

          <input
            type="url"
            name="bookUrl"
            placeholder="Booking URL"
            value={formData.bookUrl}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
          />

          <input
            type="url"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
          />

          <input
            type="url"
            name="whatsapp"
            placeholder="WhatsApp Link"
            value={formData.whatsapp}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
          />

          <input
            type="url"
            name="mapUrl"
            placeholder="Google Map URL"
            value={formData.mapUrl}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:border-[#6548ee] focus:outline-none"
          />

          {/* Drag-and-Drop Upload */}
          <div
            onClick={() => document.getElementById("fileInput")?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="col-span-2 border-2 border-dashed border-[#6548ee] p-6 text-center rounded-lg hover:bg-[#f9f6ff] cursor-pointer"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="object-cover h-40 mx-auto rounded-lg"
              />
            ) : (
              <div>
                <FaCloudUploadAlt className="text-4xl mx-auto text-[#6548ee]" />
                <p className="mt-2 text-gray-600">
                  Drag & drop or click to upload an image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="fileInput"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-gradient-to-r from-[#6548ee] to-[#ff9800] text-white py-3 rounded-lg font-semibold mt-4 hover:from-[#ff9800] hover:to-[#6548ee] transition"
          >
            {loading ? "Submitting..." : "Add Lab"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCbctOpgLabs;
