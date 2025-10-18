"use client";

import React, { useEffect, useState } from "react";


const RefundPolicy: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return;
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Non-Refundable Fee & Refund Policy for Clinics
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2C73D2] to-[#F4A300] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600">
            <strong>Applicable To:</strong> All dental clinics, hospitals, or
            service providers registered with Dental Tourism Clinics India.
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. Non-Refundable Nature of Fees */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              1. Non-Refundable Nature of Fees
            </h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              All payments made to Dental Tourism Clinics India for services
              such as:
            </p>
            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>Registration or onboarding fees</li>
              <li>Listing or visibility charges</li>
              <li>Marketing or promotional packages</li>
              <li>Lead generation or inquiry handling</li>
              <li>Featured placement or ad spots</li>
              <li>Annual or monthly subscription plans</li>
            </ul>
            <p className="mt-3 font-semibold leading-relaxed text-gray-700">
              ...are strictly non-refundable under any circumstances.
            </p>
          </section>

          {/* 2. Acknowledgment by Clinic */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              2. Acknowledgment by Clinic
            </h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              By making payment, the clinic/service provider acknowledges that:
            </p>
            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>
                The platform offers digital services that begin immediately upon
                payment (such as listing, promotion, SEO placement, etc.), and
                therefore, the fees are not eligible for cancellation or refund
                under consumer protection or contract laws.
              </li>
              <li>
                No refunds shall be issued for dissatisfaction with lead volume,
                patient response, or results of any promotional campaign, unless
                specifically guaranteed in writing.
              </li>
            </ul>
          </section>

          {/* 3. Cancellation by Clinic */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              3. Cancellation by Clinic
            </h2>
            <p className="leading-relaxed text-gray-700">
              If a clinic decides to cancel, suspend, or discontinue its
              participation with the platform for any reason, no part of the
              payment will be refunded, and no pro-rata refund will be
              applicable.
            </p>
          </section>

          {/* 4. Termination by Platform */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              4. Termination by Platform
            </h2>
            <p className="leading-relaxed text-gray-700">
              If a clinic is found violating the platform&apos;s ethics,
              guidelines, or service agreement (e.g., patient complaints,
              malpractice, false advertising), the platform reserves the right
              to terminate the clinic&apos;s access or listing without any
              refund.
            </p>
          </section>

          {/* 5. Attestation & Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              5. Attestation & Acceptance
            </h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              The undersigned clinic agrees to and accepts the above refund
              policy. The clinic understands that no payment shall be refunded
              once received by Dental Tourism Clinics India.
            </p>

            {/* Signature Section */}
            <div className="p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
              <h3 className="mb-4 text-lg font-semibold text-center text-gray-800">
                Signed on Behalf of Clinic:
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <div className="border-b-2 border-gray-300 pb-1 mb-4 min-h-[30px]" />

                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Clinic Name:
                  </label>
                  <div className="border-b-2 border-gray-300 pb-1 mb-4 min-h-[30px]" />

                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Designation:
                  </label>
                  <div className="border-b-2 border-gray-300 pb-1 min-h-[30px]" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date:
                  </label>
                  <div className="border-b-2 border-gray-300 pb-1 mb-4 min-h-[30px]" />

                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Signature:
                  </label>
                  <div className="border-b-2 border-gray-300 pb-1 min-h-[60px]" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Important Notice */}
        <div className="p-6 mt-12 border-l-4 border-red-500 rounded-lg bg-red-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Important Notice
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  This refund policy is legally binding and applies to all
                  clinic registrations and payments made to Dental Tourism
                  Clinics India. Please read carefully before making any
                  payments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 mt-12 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">Last updated: July 30, 2025</p>
          <div className="mt-4">
            <span className="text-xs text-gray-400">
              For billing disputes or payment processing issues, please{" "}
              <a
                href="/admin/login"
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                contact our billing department
              </a>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
