import React from "react";

const TermsConditionsPage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="min-h-screen py-8 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="container max-w-4xl px-4 mx-auto">
          {/* Header Section */}
          <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F4A300] to-[#2C73D2] rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-[#2C73D2] mb-2">
                Terms & Conditions
              </h1>
              <p className="text-lg text-gray-600">
                Rules and guidelines for using our platform
              </p>
              <div className="flex flex-col items-center justify-center gap-4 mt-4 text-sm text-gray-500 sm:flex-row">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v6m6-6v6M5 7h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                  </svg>
                  <span>Platform: Dental Tourism Clinics India</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                  <span>Governed by Indian Law</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9v2a2 2 0 002 2h4a2 2 0 002-2v-2m-6 0V9a2 2 0 012-2h4a2 2 0 012 2v6m-6 0h6"
                    />
                  </svg>
                  <span>Last Updated: {lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="p-8 mb-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full">
                <span className="text-[#F4A300] font-bold text-lg">1</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Introduction
                </h2>
                <div className="leading-relaxed prose prose-lg text-gray-700">
                  <p className="mb-4">
                    Welcome to{" "}
                    <span className="font-semibold text-[#2C73D2]">
                      Dental Tourism Clinics India
                    </span>
                    , a platform connecting international patients with reputed
                    dental clinics across India for affordable and high-quality
                    dental care.
                  </p>
                  <div className="bg-orange-50 border-l-4 border-[#F4A300] p-4 rounded-r-lg">
                    <p className="font-semibold text-orange-800">
                      By using this website/platform, you agree to the following
                      Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scope of Services */}
          <div className="p-8 mb-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full">
                <span className="text-lg font-bold text-blue-600">2</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Scope of Services
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border-l-4 border-blue-500 rounded-lg bg-blue-50">
                    <svg
                      className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>
                      We provide a platform to list, promote, and connect
                      patients with dental clinics offering dental tourism
                      services in India.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 border-l-4 border-red-500 rounded-lg bg-red-50">
                    <svg
                      className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span>
                      <strong>Important:</strong> We are not a medical/dental
                      service provider. We do not perform any medical/dental
                      procedures and do not interfere with the clinic-patient
                      relationship.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 border-l-4 border-green-500 rounded-lg bg-green-50">
                    <svg
                      className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>
                      All consultations, treatments, and decisions are solely
                      between the patient and the dental clinic.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Eligibility & Booking */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* User Eligibility */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                  <span className="font-bold text-purple-600">3</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  User Eligibility
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Users must be 18 years or older or be accompanied by a legal
                    guardian.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Users must provide accurate, truthful information during
                    bookings or inquiries.
                  </span>
                </div>
              </div>
            </div>

            {/* Booking & Payments */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                  <span className="font-bold text-green-600">4</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Booking & Payments
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  <span>
                    Some clinics may require advance payment for appointment
                    confirmation.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>
                    All payment terms are governed by the individual clinics.
                    The platform may facilitate payment gateways but is not
                    responsible for disputes.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                    />
                  </svg>
                  <span>
                    Cancellation and refund policies will vary by clinic and
                    should be reviewed before booking.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities & Disclaimer */}
          <div className="p-8 mb-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
                <span className="text-lg font-bold text-red-600">5</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Responsibilities & Disclaimer
                </h2>
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="font-semibold text-red-800">
                        Important Disclaimers:
                      </span>
                    </div>
                    <ul className="space-y-2 text-red-700">
                      <li>
                        • We do not guarantee outcomes of any dental treatment.
                      </li>
                      <li>
                        • We do not take responsibility for medical negligence,
                        complications, or dissatisfaction with treatment.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <h3 className="mb-3 font-semibold text-blue-800">
                      It is the patient's responsibility to:
                    </h3>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4"
                          />
                        </svg>
                        <span className="text-sm">
                          Research the clinic and doctor qualifications.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                        <span className="text-sm">
                          Understand the procedure, costs, and recovery
                          expectations.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="text-sm">
                          Ensure they are medically fit to travel and undergo
                          dental treatment.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue with remaining sections... */}

          {/* Liability Limitation */}
          <div className="p-8 mb-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full">
                <span className="text-lg font-bold text-yellow-600">6</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Liability Limitation
                </h2>
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <p className="mb-3 font-semibold text-yellow-800">
                    To the fullest extent permissible under law:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span>
                        We shall not be liable for any direct, indirect,
                        incidental, special or consequential damages arising
                        from the use of our platform or the clinics listed on
                        it.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>
                        All transactions, treatments, and communications are
                        solely between the user and the clinic.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clinic Information & Travel */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Clinic Information Accuracy */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full">
                  <span className="font-bold text-indigo-600">7</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Clinic Information Accuracy
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    We strive to ensure all information listed by clinics is
                    accurate.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span>
                    However, we do not warrant that clinic listings, pricing, or
                    qualifications are always accurate or up-to-date.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>
                    Clinics are solely responsible for maintaining and updating
                    their information.
                  </span>
                </div>
              </div>
            </div>

            {/* Travel & Visa */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full">
                  <span className="font-bold text-teal-600">8</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Travel & Visa
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Patients are responsible for obtaining the necessary visas,
                    insurance, and travel documents.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span>
                    We are not responsible for travel delays, visa rejections,
                    or immigration issues.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="p-8 mb-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full">
                <span className="text-lg font-bold text-purple-600">9</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Intellectual Property
                </h2>
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-purple-800">
                      All content on this platform (logos, texts, images,
                      videos) is the property of{" "}
                      <strong>Dental Tourism Clinics India</strong> and cannot
                      be reproduced or distributed without written permission.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy & Governing Law */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Privacy Policy */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100">
                  <span className="font-bold text-cyan-600">10</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Privacy Policy
                </h2>
              </div>
              <p className="mb-3 text-sm text-gray-700">
                By using this platform, you consent to our Privacy Policy which
                outlines how we collect, use, and protect your personal data.
              </p>
              <a
                href="/privacy-policy"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Read Privacy Policy
              </a>
            </div>

            {/* Governing Law */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100">
                  <span className="font-bold text-rose-600">11</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Governing Law & Jurisdiction
                </h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                  <span>
                    These Terms and Conditions are governed by the laws of
                    India.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-1 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span>
                    Any disputes arising shall be subject to the jurisdiction of
                    courts in <strong>Mohali, Punjab, India</strong>.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modification & Contact */}
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            {/* Modification */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                  <span className="font-bold text-amber-600">12</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Modification of Terms
                </h2>
              </div>
              <p className="text-sm text-gray-700">
                We reserve the right to modify or update these Terms at any
                time. Continued use of the platform implies acceptance of any
                changes.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-[#2C73D2] to-[#F4A300] rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full bg-opacity-20">
                  <span className="font-bold text-white">13</span>
                </div>
                <h2 className="text-xl font-bold">Contact Information</h2>
              </div>
              <p className="mb-4 text-sm">
                For any questions or concerns, contact us at:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">
                    info@dentaltourismclinicsindia.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">+91-7087117423</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="p-6 text-center bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800">
                Agreement Confirmation
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              These Terms and Conditions are effective as of {lastUpdated} and
              apply to all users of the Dental Tourism Clinics India platform.
              <br />
              <span className="font-semibold">
                By using our platform, you acknowledge that you have read,
                understood, and agree to be bound by these terms.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditionsPage;
