"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

interface Dentist {
  name: string;
  image: string;
  title?: string;
  speciality?: string;
}

const ConsultForm: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get dentist info from query params (passed as ?name=...&image=... etc.)
  const dentist: Dentist | null = searchParams.get("name")
    ? {
        name: searchParams.get("name") || "",
        image: searchParams.get("image") || "/default-dentist.png",
        title: searchParams.get("title") || "",
        speciality: searchParams.get("speciality") || "",
      }
    : null;

  if (!dentist) {
    return (
      <div className="p-8 text-center">
        No dentist selected.{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative flex flex-col w-full max-w-xl p-6 bg-white shadow-lg rounded-xl md:flex-row">
        {/* Dentist Info */}
        <div className="flex flex-col items-center justify-center w-full p-4 md:w-1/2">
          <img
            src={dentist.image}
            alt={dentist.name}
            className="object-cover w-24 h-24 mb-2 border-2 border-blue-200 rounded-full"
          />
          <div className="font-bold text-lg text-[#15396A] text-center mb-1">
            {dentist.name}
          </div>
          <div className="mb-2 text-sm text-center text-gray-600 whitespace-pre-line">
            {dentist.title || dentist.speciality}
          </div>
        </div>

        {/* Consultation Form */}
        <div className="flex flex-col justify-center w-full p-4 md:w-1/2">
          <h3 className="text-xl font-bold text-[#2C73D2] mb-2">
            Confirm & Pay
          </h3>

          <div className="flex items-center gap-2 mb-2 text-green-600">
            <span className="text-lg">●</span>
            Verified Dentist online now
          </div>
          <div className="mb-2 text-sm text-gray-700">
            One of them will speak to you shortly.
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <span className="text-green-500">&#x1F4A1;</span>
            93% of users found online consultation helpful
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <span className="text-green-500">&#x1F4F1;</span>
            Consultation will happen only on mobile app
          </div>

          <form className="flex flex-col gap-2 mt-2">
            <label htmlFor="patientName" className="text-sm font-semibold">
              {t("forms.patientName")}
            </label>
            <input
              id="patientName"
              type="text"
              className="px-3 py-2 border rounded"
              defaultValue="User"
              required
            />

            <label htmlFor="phoneNumber" className="text-sm font-semibold">
              {t("forms.phoneNumber")}
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className="px-3 py-2 border rounded"
              placeholder={t("forms.enterPhoneNumber")}
              required
            />

            <a href="#" className="text-xs text-blue-500">
              {t("forms.haveCouponCode")}
            </a>

            {/* Disclaimer Checkbox */}
            <div className="flex items-start gap-2 p-3 mt-3 border border-blue-200 rounded-lg bg-blue-50">
              <input
                type="checkbox"
                id="patientDisclaimer"
                className="mt-1 text-[#2C73D2] focus:ring-[#2C73D2]"
                required
              />
              <label
                htmlFor="patientDisclaimer"
                className="text-xs leading-relaxed text-gray-700"
              >
                <span className="font-semibold text-[#2C73D2]">
                  {t("forms.disclaimer")}
                </span>{" "}
                {t("forms.disclaimerText")}
              </label>
            </div>

            <div className="mt-2 text-xs text-gray-600">
              {t("forms.finalFee")}
            </div>
            <div className="text-2xl font-bold text-[#2C73D2]">₹449</div>

            <button
              type="submit"
              className="bg-[#2C73D2] text-white font-semibold px-4 py-2 rounded-lg shadow mt-4 hover:bg-[#1f5fb8] transition"
            >
              Continue to payment
            </button>
          </form>

          <div className="mt-4 text-xs text-gray-500">
            Dental Tourism Clinics India Guarantee: 100% Money back if no
            response
            <br />
            Not for emergency use
            <br />
            The contents of your consultations are private and confidential.
            Dental Tourism Clinics India's team of doctors may carry out routine
            anonymised audits to improve service quality. T&C apply
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultForm;
