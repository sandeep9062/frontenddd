"use client";

import React, { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import Image from "next/image";
import { registerDiagnosticLab } from "../../services/diagnosticLabApi";


interface DiagnosticLabForm {
  labName: string;
  ownerName: string;
  email: string;
  phone: string;
  altPhone: string;
  website: string;
  address: string;
  servicesOffered: string;
  agreeDisclaimer: boolean;
  image?: File | null;
}

interface PlanFeature {
  label: string;
  value: string;
}

interface DiagnosticLabPlan {
  name: string;
  price: string;
  features: PlanFeature[];
  button: string;
  highlight: boolean;
}

const diagnosticLabPlans: DiagnosticLabPlan[] = [
  {
    name: "Basic Plan",
    price: "₹3,999/year",
    features: [
      { label: "Visibility", value: "1 Lab" },
      { label: "Banner / Photos", value: "❌" },
      { label: "Services Listing", value: "Up to 5 services" },
      { label: "Social Media Exposure", value: "❌" },
      { label: "Priority in Search Results", value: "❌" },
    ],
    button: "Pay Now",
    highlight: false,
  },
  {
    name: "Featured Plan",
    price: "₹7,999/year",
    features: [
      { label: "Visibility", value: "1 Lab" },
      { label: "Banner / Photos", value: "✅" },
      { label: "Services Listing", value: "Up to 15 services" },
      { label: "Social Media Exposure", value: "1 Instagram & Facebook post/Month" },
      { label: "Priority in Search Results", value: "Medium" },
    ],
    button: "Pay Now",
    highlight: true,
  },
  {
    name: "Premium Plan",
    price: "₹19,999/year",
    features: [
      { label: "Visibility", value: "Up to 3 Labs" },
      { label: "Banner / Photos", value: "✅" },
      { label: "Services Listing", value: "Unlimited" },
      { label: "Social Media Exposure", value: "2 Instagram, Facebook, YouTube post/Month" },
      { label: "Priority in Search Results", value: "Top Rank" },
    ],
    button: "Pay Now",
    highlight: false,
  },
];

const DiagnosticLabRegistrationForm: React.FC = () => {
  const [form, setForm] = useState<DiagnosticLabForm>({
    labName: "",
    ownerName: "",
    email: "",
    phone: "",
    altPhone: "",
    website: "",
    address: "",
    servicesOffered: "",
    agreeDisclaimer: false,
    image: null,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // ✅ Input Change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Drag & Drop Image Upload
  const handleImageUpload = (file: File) => {
    setForm({ ...form, image: file });
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  // ✅ Form Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerDiagnosticLab(form);
      if (response?.success) {
        setSubmitted(true);
      } else {
        alert(response?.message || "Submission failed.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  // ✅ Thank You Screen
  if (submitted) {
    return (
      <div className="bg-[#F6FAFF] min-h-screen w-full flex flex-col items-center pt-8">
        <div className="flex flex-col items-center w-full max-w-xl p-8 mt-8 mb-6 bg-white shadow-2xl bg-opacity-95 rounded-2xl">
          <h2 className="text-2xl font-bold text-[#2C73D2] mb-4 text-center">
            Thank you for registering!
          </h2>
          <p className="text-[#2C73D2] text-center mb-2">
            We have received your details and will contact you soon.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="flex flex-col items-center w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-[#2C73D2] mb-6 text-center">
            Choose Your Plan
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {diagnosticLabPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl shadow-xl bg-white p-6 flex flex-col items-center border-2 transition-transform duration-200 hover:scale-105 hover:shadow-2xl ${
                  plan.highlight
                    ? "border-[#F4A300] ring-2 ring-[#F4A300]"
                    : "border-[#2C73D2]"
                }`}
              >
                <h3 className="text-xl font-bold text-[#2C73D2] mb-2 text-center">
                  {plan.name}
                </h3>
                <div className="text-2xl font-bold text-[#F4A300] mb-4">
                  {plan.price}
                </div>
                <ul className="w-full mb-4">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex justify-between text-[#2C73D2] py-1 border-b border-dashed border-[#E0E7FF] last:border-0"
                    >
                      <span className="font-medium">{f.label}</span>
                      <span className="font-semibold">{f.value}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-bold text-lg transition ${
                    plan.highlight
                      ? "bg-[#F4A300] text-white hover:bg-[#2C73D2] hover:text-[#F4A300]"
                      : "bg-[#2C73D2] text-white hover:bg-[#F4A300] hover:text-[#2C73D2]"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Main Form
  return (
    <div className="bg-[#F6FAFF] min-h-screen w-full flex flex-col items-center pt-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-xl gap-6 p-8 mt-4 bg-white shadow-2xl rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-[#2C73D2] mb-2 text-center drop-shadow">
          Diagnostic Lab Registration
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="labName"
            value={form.labName}
            onChange={handleChange}
            placeholder="Lab Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            placeholder="Owner/Manager Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="altPhone"
            value={form.altPhone}
            onChange={handleChange}
            placeholder="Alternate Mobile Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website URL"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          ></textarea>
          <textarea
            name="servicesOffered"
            value={form.servicesOffered}
            onChange={handleChange}
            placeholder="Services Offered (comma-separated)"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          ></textarea>
        </div>

        {/* ✅ Drag & Drop Upload */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
            dragActive ? "border-[#F4A300] bg-yellow-50" : "border-[#2C73D2]"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer text-[#2C73D2] font-semibold"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={150}
                height={150}
                className="mx-auto rounded-xl"
              />
            ) : (
              <>
                Drag & drop lab logo/photo here or{" "}
                <span className="text-[#F4A300] underline">browse</span>
              </>
            )}
          </label>
        </div>

        <div className="flex items-start gap-3 mt-4 p-4 bg-[#F6FAFF] rounded-xl border border-[#2C73D2]/20">
          <input
            type="checkbox"
            name="agreeDisclaimer"
            checked={form.agreeDisclaimer}
            onChange={handleChange}
            id="diagnosticLabDisclaimer"
            className="mt-1 text-[#2C73D2]"
            required
          />
          <label
            htmlFor="diagnosticLabDisclaimer"
            className="text-sm text-[#2C73D2] leading-relaxed"
          >
            <span className="font-semibold">Disclaimer:</span> I hereby declare
            that all the information provided above is true and accurate to the
            best of my knowledge. I understand that any false information may
            lead to the rejection of my registration. I agree to the terms and
            conditions of the platform and consent to the use of my data for
            verification and communication purposes.
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DiagnosticLabRegistrationForm;
