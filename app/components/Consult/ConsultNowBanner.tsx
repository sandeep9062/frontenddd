"use client";

import React from "react";

const ConsultNowBanner: React.FC = () => {
  return (
    <div className="w-full py-20 bg-gradient-to-r from-[#2C73D2] via-[#1E5BA8] to-[#15396A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-[#F4A300] to-[#FF6B35] rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute w-16 h-16 bg-white rounded-full bottom-10 right-10 opacity-10 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-[#008E97] to-[#2C73D2] rounded-full opacity-15 animate-bounce"></div>

      <div className="relative max-w-6xl px-4 mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 mb-8 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
          <span className="text-sm font-semibold text-white">
            🚀 Ready to Get Started?
          </span>
        </div>

        {/* Main Content */}
        <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
          Why wait? Your smile deserves care!
        </h2>

        <p className="max-w-3xl mx-auto mb-10 text-lg leading-relaxed text-blue-100 sm:text-xl lg:text-2xl">
          Connect with India's top dentists online and get expert dental care
          from the comfort of your home
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12 sm:flex-row">
          <a
            href="#problem-form"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#F4A300] to-[#FF6B35] text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-none"
          >
            <span>Consult Now</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          {/* <button className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-[#2C73D2] transition-all duration-300 transform hover:scale-105">
            <span>Learn More</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button> */}
        </div>

        {/* Trust Indicators */}
        <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-3xl">🛡️</div>
            <div className="text-sm font-semibold text-white">100% Secure</div>
            <div className="text-xs text-blue-200">HIPAA Compliant</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-3xl">⚡</div>
            <div className="text-sm font-semibold text-white">
              Instant Access
            </div>
            <div className="text-xs text-blue-200">Available 24/7</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-3xl">💯</div>
            <div className="text-sm font-semibold text-white">Satisfaction</div>
            <div className="text-xs text-blue-200">30,000+ Happy Patients</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultNowBanner;
