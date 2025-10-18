"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import allStatesAndUTs from "../data/allStatesAndUTs";

interface FormData {
  name: string;
  location: string;
  state: string;
  rating: number;
  bookUrl: string;
  website: string;
  whatsapp: string;
  mapUrl: string;
  img: File | null;
}

const AddDiagnosticLab: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    state: "",
    rating: 0,
    bookUrl: "",
    website: "",
    whatsapp: "",
    mapUrl: "",
    img: null,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // ✅ Handle text input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, img: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.state || !formData.img) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) body.append(key, value);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/diagnostic-labs`,
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body,
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Diagnostic Lab added successfully!");
        setFormData({
          name: "",
          location: "",
          state: "",
          rating: 0,
          bookUrl: "",
          website: "",
          whatsapp: "",
          mapUrl: "",
          img: null,
        });
        setPreview(null);
      } else {
        toast.error(data.message || "Failed to add lab");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-2xl p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 text-[#6548ee] text-center">
          Add Diagnostic Lab
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Lab Name<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter lab name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              City / Location<span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              type="text"
              placeholder="Enter city or location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              State<span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
              required
            >
              <option value="">Select a state</option>
              {allStatesAndUTs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Rating (0–5)
            </label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
            />
          </div>

          {/* Book URL */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Book URL
            </label>
            <input
              name="bookUrl"
              type="url"
              placeholder="Enter booking link"
              value={formData.bookUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Website
            </label>
            <input
              name="website"
              type="url"
              placeholder="Enter website URL"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              WhatsApp Number
            </label>
            <input
              name="whatsapp"
              type="text"
              placeholder="e.g. 918888888888"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
            />
          </div>

          {/* Map URL */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Google Map URL
            </label>
            <input
              name="mapUrl"
              type="url"
              placeholder="Paste Google Maps link"
              value={formData.mapUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#6548ee] outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upload Image<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-32 h-32 mt-3 border rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6548ee] text-white py-3 rounded-lg font-semibold hover:bg-[#5638e0] transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add Diagnostic Lab"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDiagnosticLab;
