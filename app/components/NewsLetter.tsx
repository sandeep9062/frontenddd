"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9000/api/v1/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(data.message);
      setEmail(""); 
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full transition-colors duration-300">
      <div className="w-full max-w-full px-2 pb-10 mx-0 mt-4 sm:max-w-5xl sm:mx-auto sm:px-4">
        <div className="w-full bg-[#2C73D2] rounded-2xl shadow-lg py-8 sm:py-12 px-2 sm:px-4 md:px-10 mb-12 flex flex-col items-center">
          <h2 className="mb-4 text-xl font-extrabold text-center text-white sm:text-2xl md:text-4xl sm:mb-6">
            Join Our Mailing List
          </h2>

          <p className="mb-4 text-base text-center text-white sm:text-lg sm:mb-8">
            Subscribe to get the latest updates on dental care tips, clinic
            openings, and special offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col items-center w-full max-w-2xl gap-3 md:flex-row sm:gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-[220px] px-6 py-3 rounded-lg border-2 border-white text-white text-base focus:outline-none focus:border-[#F4A300] bg-[#2C73D2] placeholder-gray-200"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="flex-1 min-w-[120px] px-6 py-3 rounded-lg bg-gradient-to-r from-[#F4A300] to-[#2C73D2] text-white font-semibold text-lg shadow drop-shadow-md hover:from-[#2C73D2] hover:to-[#F4A300] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
