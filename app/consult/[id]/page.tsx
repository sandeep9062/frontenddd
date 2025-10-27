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
  about?: string;
  consultationCharges?: number;
  certifications?: string[];
  clinicAddress?: string;
  gradCollege?: string;
  gradYear?: string;
  postCollege?: string;
  postYear?: string;
  postSpec?: string;
}

const ConsultNowPage: React.FC = () => {
  const { id } = useParams();
  const [dentist, setDentist] = useState<Dentist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchDentist = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not set.");
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
    <div className="w-full min-h-screen py-12 bg-blue-50">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column: Dentist Info */}
          <div className="md:col-span-2">
            <div className="p-8 bg-white shadow-xl rounded-2xl">
              <div className="flex flex-col items-center sm:flex-row">
                <Image
                  src={dentist.image}
                  alt={dentist.user?.name || "Dentist"}
                  width={180}
                  height={180}
                  className="object-cover border-4 border-blue-200 rounded-full shadow-lg"
                />
                <div className="mt-6 text-center sm:mt-0 sm:ml-8 sm:text-left">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                    {dentist.user?.name}
                  </h1>
                  <div className="mt-4">
                    <span className="inline-block px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-full shadow-md">
                      {dentist.specialization?.join(", ")}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2 text-gray-600">
                    {dentist.clinicName && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"></path></svg>
                        <span>{dentist.clinicName}</span>
                      </div>
                    )}
                    {dentist.experienceYears && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"></path></svg>
                        <span>{dentist.experienceYears} years of experience</span>
                      </div>
                    )}
                    {dentist.clinicAddress && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"></path></svg>
                        <span>{dentist.clinicAddress}</span>
                      </div>
                    )}
                    {dentist.consultationCharges && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"></path></svg>
                        <span className="font-bold text-green-600">₹{dentist.consultationCharges}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {dentist.about && (
                <div className="p-8 bg-white shadow-xl rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900">About</h3>
                  <p className="mt-4 leading-relaxed text-gray-600">{dentist.about}</p>
                </div>
              )}
              {(dentist.gradCollege || dentist.postCollege) && (
                <div className="p-8 bg-white shadow-xl rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    {dentist.gradCollege && (
                      <li className="flex items-start">
                        <svg className="flex-shrink-0 w-6 h-6 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"></path></svg>
                        <div>
                          <span className="font-semibold text-gray-800">{dentist.gradCollege}</span>, {dentist.gradYear}
                        </div>
                      </li>
                    )}
                    {dentist.postCollege && (
                      <li className="flex items-start">
                        <svg className="flex-shrink-0 w-6 h-6 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"></path></svg>
                        <div>
                          <span className="font-semibold text-gray-800">{dentist.postCollege}</span>, {dentist.postYear} ({dentist.postSpec})
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {dentist.certifications && dentist.certifications.length > 0 && (
                <div className="p-8 bg-white shadow-xl rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    {dentist.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="flex-shrink-0 w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="md:col-span-1">
            <div className="sticky p-8 bg-white shadow-xl rounded-2xl top-8">
              <h2 className="text-3xl font-bold text-center text-gray-900">Book a Consultation</h2>
              <form className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" className="block w-full px-4 py-3 mt-1 bg-gray-100 border-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" className="block w-full px-4 py-3 mt-1 bg-gray-100 border-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                  <input type="date" id="date" className="block w-full px-4 py-3 mt-1 bg-gray-100 border-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows={4} className="block w-full px-4 py-3 mt-1 bg-gray-100 border-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full px-6 py-4 text-lg font-semibold text-white transition-transform transform bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:scale-105">
                    Request Consultation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultNowPage;
