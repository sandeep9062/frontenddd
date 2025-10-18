"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import instagramIcon from "@/public/instagram.png";
import youtubeIcon from "@/public/youtube.png";

interface Plan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Basic Plan",
    priceMonthly: 1100,
    priceYearly: 12999,
    features: [
      "✓ 1 Clinic",
      "❌ Verified Badge",
      "❌ Priority in Search Results",
      "❌ Google Reviews",
      "❌ Email Newsletter to Patients",
      "❌ All Posting Done on DTCI Platform",
      "✓ 1 Instagram Feed Post/Month",
      "❌ Instagram Stories & Highlights",
      "❌ Instagram Ad Boost",
      "❌ YouTube Clinic Video Listing",
      "❌ Homepage Banner",
      "❌ Clinic Video Editing",
      "❌ Poster Design by DTCI",
      "❌ Google Business SEO",
      "❌ Doctor Introduction Video",
      "❌ Video Consultation",
    ],
  },
  {
    name: "Growth Plan",
    priceMonthly: 2200,
    priceYearly: 26999,
    features: [
      "✓ 1 Clinic",
      "✓ Verified Badge",
      "❌ Priority in Search Results",
      "✓ Google Reviews",
      "1 Email/Month to Patients",
      "❌ All Posting Done on DTCI Platform",
      "2 Instagram Feed Posts/Month",
      "4 Instagram Stories/Highlights/Month",
      "❌ Instagram Ad Boost",
      "3 YouTube Clinic Videos/Month",
      "✓ Homepage Banner",
      "❌ Clinic Video Editing",
      "❌ Poster Design by DTCI",
      "❌ Google Business SEO",
      "❌ Doctor Introduction Video",
      "❌ Video Consultation",
    ],
  },
  {
    name: "Premium Plan",
    priceMonthly: 3200,
    priceYearly: 38999,
    features: [
      "✓ 2 Clinics",
      "✓ Verified Badge",
      "✓ Priority in Search Results",
      "✓ Google Reviews",
      "2 Emails/Month to Patients",
      "✓ All Posting Done on DTCI Platform",
      "6 Instagram Feed Posts/Month",
      "6 Instagram Stories/Highlights/Month",
      "✓ Instagram Ad Boost",
      "5 YouTube Clinic Videos/Month",
      "✓ Homepage Banner",
      "✓ Clinic Video Editing",
      "✓ 1 Poster Design/Quarter by DTCI",
      "✓ Google Business SEO",
      "✓ Doctor Introduction Video",
      "✓ Video Consultation",
    ],
  },
];

const featuresList = [
  "Clinic Listing",
  "Verified Badge",
  "Priority in Search Results",
  "Google Reviews",
  "Email Newsletter to Patients",
  "All Posting Done on DTCI Platform",
  "Instagram Feed Post",
  "Instagram Stories & Highlights",
  "Instagram Ad Boost",
  "YouTube Clinic Video Listing",
  "Homepage Banner",
  "Clinic Video Editing",
  "Poster Design by DTCI",
  "Google Business SEO",
  "Doctor Introduction Video",
  "Video Consultation",
];

const PricingPlansPage: React.FC = () => {
  const [billing, setBilling] = useState<"month" | "year">("month");
  const router = useRouter();

  const getPrice = (plan: Plan) =>
    billing === "month"
      ? `₹${plan.priceMonthly}/Month`
      : `₹${plan.priceYearly}/Year`;

  const handlePay = (plan: Plan) => {
    alert(
      `Proceed to pay for ${plan.name} (${
        billing === "month" ? "Monthly" : "Yearly"
      })`
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center pb-32 justify-center bg-gradient-to-br from-[#2C73D2] via-[#F5F8FF] to-[#F4A300] px-2 py-6">
      <div className="flex flex-col items-center w-full gap-0 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="w-full pb-0 mb-0 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C73D2] mb-1 drop-shadow">
            Pricing on your terms
          </h1>
          <p className="text-lg text-[#15396A] mb-2">
            Whichever plan you pick, it's free until you love your listing. That’s
            our promise.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="relative flex items-center justify-center w-full max-w-xs gap-0 mx-auto mb-8">
          <div
            className="absolute top-0 left-0 z-0 w-1/2 h-full transition-all duration-300"
            style={{
              transform: billing === "month" ? "translateX(0%)" : "translateX(100%)",
              background: "#fff",
              borderRadius: "9999px",
              boxShadow: "0 2px 16px 0 rgba(44,115,210,0.10)",
            }}
          />
          <button
            className={`relative flex-1 px-8 py-3 rounded-full text-base font-semibold z-10 transition-all duration-200 ${
              billing === "month"
                ? "text-[#2C73D2]"
                : "text-[#2C73D2] hover:text-[#15396A]"
            }`}
            onClick={() => setBilling("month")}
          >
            Monthly Plan
          </button>
          <button
            className={`relative flex-1 px-8 py-3 rounded-full text-base font-semibold z-10 transition-all duration-200 ${
              billing === "year"
                ? "text-[#2C73D2]"
                : "text-[#2C73D2] hover:text-[#15396A]"
            }`}
            onClick={() => setBilling("year")}
          >
            Yearly Plan
          </button>
        </div>

        {/* Plans */}
        <div className="flex flex-col items-stretch justify-center w-full gap-4 pt-0 mt-0 md:flex-row">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`flex-1 min-w-[290px] max-w-sm bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-[#2C73D2]/10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-[#2C73D2]/30 ${
                idx === 1 ? "ring-2 ring-[#2C73D2] scale-105 z-10" : ""
              }`}
            >
              <div className="flex flex-col items-center mb-3">
                <span className="text-xl font-bold text-[#2C73D2] mb-1">
                  {plan.name}
                </span>
                <span className="font-bold text-[#F4A300] text-2xl mb-1">
                  {getPrice(plan)}
                </span>
                {idx === 1 && (
                  <span className="px-3 py-1 rounded-full bg-[#2C73D2] text-white text-xs font-semibold mb-2">
                    Most Popular
                  </span>
                )}
              </div>

              {/* Feature List */}
              <ul className="text-[#15396A] text-sm flex-1 w-full mb-4 space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-block w-4 text-lg">
                      {f.startsWith("✓") ? "✔️" : f.startsWith("❌") ? "✖️" : ""}
                    </span>
                    <span
                      className={
                        f.startsWith("✓")
                          ? "text-[#2C73D2]"
                          : f.startsWith("❌")
                          ? "text-gray-300 line-through"
                          : "text-[#15396A]"
                      }
                    >
                      {featuresList[i]}:{" "}
                      <span className="flex items-center gap-1 font-semibold">
                        {featuresList[i].toLowerCase().includes("instagram") && (
                          <Image
                            src={instagramIcon}
                            alt="Instagram"
                            width={20}
                            height={20}
                            className="inline-block"
                          />
                        )}
                        {featuresList[i].toLowerCase().includes("youtube") && (
                          <Image
                            src={youtubeIcon}
                            alt="YouTube"
                            width={20}
                            height={20}
                            className="inline-block"
                          />
                        )}
                        {f.replace("✓ ", "").replace("❌ ", "")}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pay Button */}
              <button
                className="w-full py-3 rounded-lg border-2 border-[#2C73D2] text-[#2C73D2] font-semibold text-lg hover:bg-[#2C73D2] hover:text-white transition mt-2 bg-white"
                onClick={() => handlePay(plan)}
              >
                Pay for {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlansPage;
