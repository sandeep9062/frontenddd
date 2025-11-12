"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAddConsultationMutation } from "@/services/consultationApi";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

const timeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const ConsultNowPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [dentist, setDentist] = useState<Dentist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consultationFee, setConsultationFee] = useState<number | undefined>(
    undefined
  );

  const [
    addConsultation,
    { isLoading: isBooking, isSuccess, isError, error: bookingError },
  ] = useAddConsultationMutation();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      setPatientName(user.name || "");
      setPatientEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !id ||
      !selectedDate ||
      !selectedSlot ||
      !patientName ||
      !patientEmail
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await addConsultation({
        dentist: id as string,
        patientName,
        patientEmail,
        selectedDate: selectedDate.toISOString(),
        selectedSlot,
        message,
        consultationFee,
      }).unwrap();
      toast.success("Consultation booked successfully!");
      router.push("/"); // Redirect to a confirmation page or dashboard
    } catch (err) {
      console.error("Failed to book consultation:", err);
      toast.error("Failed to book consultation. Please try again.");
    }
  };

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
        setConsultationFee(data.consultationCharges);
      } catch (error) {
        console.error("Error fetching dentist:", error);
        setError("Could not fetch dentist data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDentist();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="px-4 py-2 font-semibold text-red-600 bg-red-100 rounded-lg">
          {error}
        </div>
      </div>
    );

  if (!dentist)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-lg font-semibold text-gray-700">
          Dentist not found.
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen py-12 bg-blue-50">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* ---------- LEFT: Dentist Info ---------- */}
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
                    <span className="inline-block px-4 py-2 text-lg font-bold text-white   bg-gradient-to-r from-[#2C73D2] to-[#008F9B] group-hover:from-[#008F9B] group-hover:to-[#2C73D2] rounded-full shadow-md">
                      {dentist.specialization?.join(", ")}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-gray-600">
                    {dentist.clinicName && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.5 10a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.5 1h3a1 1 0 100-2H10V6a1 1 0 10-2 0v3H5a1 1 0 100 2h3v3a1 1 0 102 0v-3z" />
                        </svg>
                        <span>{dentist.clinicName}</span>
                      </div>
                    )}

                    {dentist.experienceYears && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 2a1 1 0 00-1 1v14a1 1 0 001.447.894l7-3.5A1 1 0 0014 14V6a1 1 0 00-.553-.894l-7-3.5A1 1 0 006 2z" />
                        </svg>
                        <span>
                          {dentist.experienceYears} years of experience
                        </span>
                      </div>
                    )}

                    {dentist.clinicAddress && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{dentist.clinicAddress}</span>
                      </div>
                    )}

                    {dentist.consultationCharges && (
                      <div className="flex items-center justify-center sm:justify-start">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v3H7a1 1 0 100 2h2v3a1 1 0 102 0v-3h2a1 1 0 100-2h-2V6z" />
                        </svg>
                        <span className="font-bold text-green-600">
                          ₹{dentist.consultationCharges}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- About / Education / Certifications ---------- */}
            <div className="mt-8 space-y-8">
              {dentist.about && (
                <div className="p-8 bg-white shadow-xl rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900">About</h3>
                  <p className="mt-4 leading-relaxed text-gray-600">
                    {dentist.about}
                  </p>
                </div>
              )}

              {(dentist.gradCollege || dentist.postCollege) && (
                <div className="p-8 bg-white shadow-xl rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Education
                  </h3>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    {dentist.gradCollege && (
                      <li className="flex items-start">
                        <svg
                          className="flex-shrink-0 w-6 h-6 mr-3 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-gray-800">
                            {dentist.gradCollege}
                          </span>
                          , {dentist.gradYear}
                        </div>
                      </li>
                    )}
                    {dentist.postCollege && (
                      <li className="flex items-start">
                        <svg
                          className="flex-shrink-0 w-6 h-6 mr-3 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-gray-800">
                            {dentist.postCollege}
                          </span>
                          , {dentist.postYear} ({dentist.postSpec})
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {dentist.certifications && dentist.certifications.length > 0 && (
                <div className="p-8 bg-white shadow-xl rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Certifications
                  </h3>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    {dentist.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="flex-shrink-0 w-5 h-5 mr-3 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          />
                        </svg>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ---------- RIGHT: Booking Form ---------- */}
          <div className="md:col-span-1">
            <div className="sticky p-8 bg-white shadow-xl rounded-2xl top-8">
              <h2 className="text-3xl font-bold text-center text-gray-900">
                Book a Consultation
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="block w-full px-4 py-3 mt-1 bg-gray-100 border-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    required
                    className="block w-full px-4 py-3 mt-1 bg-gray-100 border-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* ---------- Date & Time Picker ---------- */}
                <div>
                  <h3 className="text-lg font-semibold text-[#2056AE] mb-2">
                    Select Date
                  </h3>
                  <div className="bg-[#F8FAFF] p-4 rounded-xl border border-gray-200 mb-4">
                    <div className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                      <CalendarDays className="text-[#2056AE]" /> Choose Date
                    </div>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2056AE]"
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-[#2056AE] mb-2">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-lg text-sm font-medium border transition ${
                          selectedSlot === slot
                            ? " text-white  bg-gradient-to-r from-[#2C73D2] to-[#008F9B] group-hover:from-[#008F9B] group-hover:to-[#2C73D2] border-[#2056AE]"
                            : "border-gray-300 hover:bg-[#F0F5FF]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 bg-gray-100 border-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full px-6 py-4 text-lg font-semibold text-white transition-transform transform border border-transparent rounded-lg shadow-sm   bg-gradient-to-r from-[#2C73D2] to-[#008F9B] group-hover:from-[#008F9B] group-hover:to-[#2C73D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isBooking ? "Booking..." : "Request Consultation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultNowPage;
