"use client";

import React, { useEffect, useState } from "react";


const PatientRefundPolicy: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return ;

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Patient Refund Policy
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2C73D2] to-[#F4A300] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600">
            <strong>Applies To:</strong> All bookings and payments made through
            Dental Tourism Clinics India and associated dental clinics.
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. No Refund After Payment */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              1. No Refund After Payment
            </h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              Once payment is successfully made, it is considered full and
              final. We do not offer refunds under any circumstances, including
              but not limited to:
            </p>
            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>Change of mind by the patient.</li>
              <li>Patient no longer able to travel.</li>
              <li>Visa denial or travel issues.</li>
              <li>Dissatisfaction with treatment results.</li>
              <li>
                Delay, rescheduling, or change in the treatment plan after
                consultation.
              </li>
              <li>
                Dental procedures deemed unsuitable upon clinical examination.
              </li>
            </ul>
          </section>

          {/* 2. Medical Assessment Clause */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              2. Medical Assessment Clause
            </h2>
            <p className="leading-relaxed text-gray-700">
              Please note that treatment plans and prices shared online or
              through consultation are preliminary and subject to clinical
              evaluation upon arrival. If a procedure is changed or cancelled
              due to medical reasons (e.g., bone loss, infection, or
              contraindication), no refund will be issued, but an alternative
              treatment option may be offered at the discretion of the clinic.
            </p>
          </section>

          {/* 3. Rescheduling Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              3. Rescheduling Policy
            </h2>
            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>
                Patients may request to reschedule their appointment up to 7
                days in advance, subject to clinic availability.
              </li>
              <li>
                No rescheduling or adjustments will be allowed for no-shows or
                last-minute cancellations.
              </li>
            </ul>
          </section>

          {/* 4. Non-Transferable */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              4. Non-Transferable
            </h2>
            <p className="leading-relaxed text-gray-700">
              All payments made are non-transferable. Bookings cannot be
              transferred to another patient or person.
            </p>
          </section>

          {/* 5. Exception Clause */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              5. Exception Clause
            </h2>
            <div className="p-4 border-l-4 border-blue-500 rounded-lg bg-blue-50">
              <p className="leading-relaxed text-gray-700">
                <strong>Optional Clause:</strong> In rare, exceptional cases
                (such as a verified emergency or clinic cancellation), refund
                requests may be considered at the sole discretion of Dental
                Tourism Clinics India, but there is no guarantee of approval.
              </p>
            </div>
          </section>

          {/* 6. Legal Binding */}
          <section>
            <h2 className="text-2xl font-semibold text-[#2C73D2] mb-4">
              6. Legal Binding
            </h2>
            <p className="leading-relaxed text-gray-700">
              By completing the booking and payment, you confirm that you have
              read, understood, and accepted this refund policy. You waive all
              rights to dispute or reverse payments via payment gateways or
              credit card chargebacks.
            </p>
          </section>
        </div>

        {/* Important Notice for Patients */}
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
                Important Notice for Patients
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Please read this refund policy carefully before making any
                  payment. Once payment is completed, you agree to all terms and
                  conditions outlined above. Consider purchasing travel
                  insurance for coverage of unforeseen circumstances.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-6 mt-8 border-l-4 border-green-500 rounded-lg bg-green-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Recommendations
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <ul className="space-y-1 list-disc list-inside">
                  <li>
                    Ensure your visa application is complete before making
                    payment.
                  </li>
                  <li>
                    Consider travel insurance to cover unforeseen circumstances.
                  </li>
                  <li>
                    Confirm your treatment plan details with the clinic before
                    payment.
                  </li>
                  <li>Review clinic reviews and credentials thoroughly.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 mt-12 text-center border-t border-gray-200">
          <p className="text-sm text-gray-500">Last updated: July 30, 2025</p>
          <div className="mt-4">
            <span className="text-xs text-gray-400">
              For payment disputes or refund inquiries, please{" "}
              <a
                href="/admin/login"
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                contact our payments team
              </a>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRefundPolicy;
