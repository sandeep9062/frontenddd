"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Star } from "lucide-react";

import instagramIcon from "@/public/instagram.png";
import youtubeIcon from "@/public/youtube.png";
import RazorpayCheckout from "@/app/components/RazorpayCheckout";
interface Plan {
  _id: string;
  type: string;
  name: string;
  pricing: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  highlight?: boolean;
}

export default function PlansByTypePage() {
  const { type } = useParams();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<"month" | "year">("month");

  useEffect(() => {
    if (!type) return;
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get(`/api/plans`);
        const filtered = data.filter(
          (plan: Plan) => plan.type.toLowerCase() === String(type).toLowerCase()
        );
        setPlans(filtered);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [type]);

  const getPrice = (plan: Plan) =>
    billing === "month"
      ? `₹${plan.pricing.monthly}/Month`
      : `₹${plan.pricing.yearly}/Year`;

  const handlePay = (plan: Plan) => {
    alert(
      `Proceed to pay for ${plan.name} (${
        billing === "month" ? "Monthly" : "Yearly"
      })`
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500 bg-gray-50">
        Loading plans...
      </div>
    );

  if (plans.length === 0)
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500 bg-gray-50">
        No plans found for “{type}”
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-800 capitalize">
            {type} Pricing Plans
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Choose the perfect plan for your needs. Save up to 20% with our
            yearly billing option.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative flex items-center p-1 bg-gray-200 rounded-full">
            <button
              className={`relative z-10 w-28 py-2 text-sm font-semibold transition-colors duration-300 ${
                billing === "month" ? "text-white" : "text-gray-600"
              }`}
              onClick={() => setBilling("month")}
            >
              Monthly
            </button>
            <button
              className={`relative z-10 w-28 py-2 text-sm font-semibold transition-colors duration-300 ${
                billing === "year" ? "text-white" : "text-gray-600"
              }`}
              onClick={() => setBilling("year")}
            >
              Yearly
            </button>
            <div
              className="absolute top-1 left-1 h-[calc(100%-8px)] w-28 bg-blue-600 rounded-full transition-transform duration-300"
              style={{
                transform:
                  billing === "month" ? "translateX(0)" : "translateX(100%)",
              }}
            />
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative w-full bg-white rounded-2xl p-8 shadow-lg border transition-all duration-300 ${
                plan.highlight
                  ? "border-blue-600 ring-4 ring-blue-100"
                  : "border-gray-200 hover:shadow-2xl"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-8 -mt-4 px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                    {plan.name}
                  </h2>
                  <p className="mb-2 text-4xl font-bold text-gray-900">
                    {getPrice(plan)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Billed {billing === "month" ? "monthly" : "annually"}
                  </p>
                </div>
                <div className="flex-grow mb-8 text-gray-600">
                  {plan.features.map((feature, i) =>
                    feature
                      .split(",")
                      .map((item, j) => <p key={j}>{item.trim()}</p>)
                  )}
                </div>
                {/* <button
                  className={`w-full mt-auto py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => handlePay(plan)}
                >
                  Choose {plan.name}
                </button> */}
                <RazorpayCheckout
                  planId={plan._id}
                  planName={plan.name}
                  amount={
                    billing === "month"
                      ? plan.pricing.monthly
                      : plan.pricing.yearly
                  }
                  billingCycle={billing}
                  type={plan.type}
                  userId={null} // (if logged in, otherwise remove)
                />{" "}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
