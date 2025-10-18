"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Dentist {
  _id: string;
  user: { name: string };
  image: string;
  specialization: string[];
  clinicName?: string;
  experienceYears?: number;
}

const ConsultNowPage: React.FC = () => {
  const { id } = useParams();
  const [dentist, setDentist] = useState<Dentist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchDentist = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not set.");
        setError("Application is not configured correctly.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/dentists/${id}`);
        setDentist(data);
      } catch (error) {
        console.error("Error fetching dentist:", error);
        setError("Could not fetch dentist data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDentist();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="px-4 py-2 font-semibold text-red-600 bg-red-100 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!dentist) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-lg font-semibold text-gray-700">
          Dentist not found.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-center">
            <Image
              src={dentist.image}
              alt={dentist.user?.name || "Dentist"}
              width={150}
              height={150}
              className="object-cover rounded-full"
            />
            <div className="ml-6">
              <h1 className="text-4xl font-bold text-gray-800">
                {dentist.user?.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {dentist.specialization?.join(", ")}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {dentist.clinicName}
              </p>
              {dentist.experienceYears && (
                <p className="mt-1 text-sm text-gray-500">
                  {dentist.experienceYears} years of experience
                </p>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Book a Consultation
            </h2>
            <form className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full px-4 py-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full px-4 py-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="block w-full px-4 py-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block w-full px-4 py-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Request Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultNowPage;
