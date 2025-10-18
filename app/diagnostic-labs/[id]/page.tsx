"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FiGlobe, FiMapPin, FiPhone, FiStar } from "react-icons/fi";

interface Lab {
  _id: string;
  name: string;
  location: string;
  state: string;
  rating: number;
  img: string;
  bookUrl?: string;
  website?: string;
  whatsapp?: string;
  mapUrl?: string;
}

const LabDetailsPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const [lab, setLab] = useState<Lab | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchLabDetails = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/diagnostic-labs/${id}`
          );
          if (res.data.success) {
            setLab(res.data.data);
          } else {
            setError(res.data.message || "Lab not found");
          }
        } catch (err) {
          console.error("Failed to fetch lab details", err);
          setError("Failed to load lab details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchLabDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container p-8 mx-auto animate-pulse">
        <div className="w-full bg-gray-300 rounded-lg h-80"></div>
        <div className="mt-6">
          <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-6 mt-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-6 mt-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  if (!lab) {
    return <div className="p-10 text-center">Lab not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container p-4 mx-auto md:p-8">
        <div className="overflow-hidden bg-white shadow-xl rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src={lab.img}
              alt={lab.name}
              className="object-cover w-full h-full"
            />
            <div className="p-6 md:p-8">
              <h1 className="text-4xl font-extrabold mb-2 text-[#6548ee]">
                {lab.name}
              </h1>
              <div className="flex items-center mb-4 text-gray-600">
                <FiMapPin className="mr-2" />
                <p className="text-lg">
                  {lab.location}, {lab.state}
                </p>
              </div>
              <div className="flex items-center mb-6">
                <FiStar className="mr-2 text-yellow-500" />
                <span className="text-xl font-bold">{lab.rating}</span>
              </div>

              <div className="space-y-4">
                {lab.website && (
                  <a
                    href={lab.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <FiGlobe className="mr-2" /> Visit Website
                  </a>
                )}
                {lab.whatsapp && (
                  <a
                    href={`https://wa.me/${lab.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-600 hover:underline"
                  >
                    <FiPhone className="mr-2" /> WhatsApp
                  </a>
                )}
                {lab.mapUrl && (
                  <a
                    href={lab.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-red-600 hover:underline"
                  >
                    <FiMapPin className="mr-2" /> View on Map
                  </a>
                )}
              </div>

              {lab.bookUrl && lab.bookUrl !== "#" && (
                <div className="mt-8">
                  <Link
                    href={lab.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-[#ff9800] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#6548ee] transition shadow-md"
                  >
                    Book an Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDetailsPage;
