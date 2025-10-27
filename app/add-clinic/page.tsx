"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useAddClinicMutation } from "@/services/clinicApi";
import problems from "../data/problems";
import allStatesAndUTs from "../data/allStatesAndUTs";
import { MultiSelect } from "@/components/ui/MultiSelect";
import offers from "../data/offers";

const AddClinicPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    state: "",
    problems: [] as string[],
    offers: [] as string[],
    rating: "",
    appointmentCharges: "",
    website: "",
    whatsapp: "",
    mapUrl: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [addClinic, { isLoading }] = useAddClinicMutation();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProblemsChange = (selected: string[]) => {
    setFormData({ ...formData, problems: selected });
  };

  const handleOffersChange = (selected: string[]) => {
    setFormData({ ...formData, offers: selected });
  };

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const clinicFormData = new FormData();
    clinicFormData.append("image", image);
    Object.entries(formData).forEach(([key, value]) => {
      if ((key === "problems" || key === "offers") && Array.isArray(value)) {
        value.forEach((item) => {
          clinicFormData.append(key, item);
        });
      } else {
        clinicFormData.append(key, value as string);
      }
    });

    try {
      await addClinic(clinicFormData).unwrap();
      toast.success("Clinic added successfully!");
      setFormData({
        name: "",
        location: "",
        state: "",
        problems: [],
        offers: [],
        rating: "",
        appointmentCharges: "",
        website: "",
        whatsapp: "",
        mapUrl: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data &&
        typeof error.data.message === "string"
      ) {
        errorMessage = error.data.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-2xl md:p-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Add New Clinic
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* Drag and Drop Image Upload */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Clinic Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <Image
                  src={preview}
                  alt="Uploaded clinic"
                  width={192}
                  height={192}
                  className="object-cover w-48 h-48 rounded-md"
                />
              ) : (
                <p className="text-sm text-gray-500">
                  Drag & drop an image here, or click to select
                </p>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Clinic Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Urja Multispeciality Dental Clinic"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Mohali, Punjab"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a state
              </option>
              {allStatesAndUTs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://medivistahospital.com"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              WhatsApp Link
            </label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="https://wa.me/918626070298"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Map URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Google Map URL
            </label>
            <input
              type="text"
              name="mapUrl"
              value={formData.mapUrl}
              onChange={handleChange}
              placeholder="https://maps.google.com/?q=..."
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Appointment Charges */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Appointment Charges
            </label>
            <input
              type="number"
              name="appointmentCharges"
              value={formData.appointmentCharges}
              onChange={handleChange}
              placeholder="500"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Problems */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Problems Treated
            </label>
            <MultiSelect
              options={problems.map((p) => ({ label: p, value: p }))}
              onValueChange={handleProblemsChange}
              defaultValue={formData.problems}
              placeholder="Select problems"
              className="mt-1"
            />
          </div>

          {/* Offers */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Offers
            </label>
            <MultiSelect
              options={offers.map((o) => ({ label: o, value: o }))}
              onValueChange={handleOffersChange}
              defaultValue={formData.offers}
              placeholder="Select offers"
              className="mt-1"
            />
          </div>

          {/* Submit */}
          <div className="mt-4 md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white transition-all duration-300 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? "Adding Clinic..." : "Add Clinic"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddClinicPage;
