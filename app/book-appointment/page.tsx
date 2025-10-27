"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Clock,
  Phone,
  Globe,
  MapPin,
  Star,
  Loader2,
  User,
  Mail,
  MessageCircle,
  ExternalLink,
  Award,
  Clock3,
  Shield,
} from "lucide-react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "next/navigation";
import { Clinic } from "@/types/clinic";

export default function BookAppointmentPage() {
  const searchParams = useSearchParams();
  const clinicId = searchParams.get("clinicId");

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [clinicLoading, setClinicLoading] = useState(true);

  // Default clinic data as fallback
  const defaultClinic = {
    _id: "default",
    name: "All Care Dental Centre",
    location: "MG Road, Basavanagudi, Bangalore",
    state: "Karnataka",
    rating: 4.7,
    problems: ["Root Canal", "Braces", "Dental Implants", "Cosmetic Dentistry"],
    bookUrl: "",
    website: "https://allcaredental.in",
    whatsapp: "+91 98765 43210",
    mapUrl: "https://maps.google.com/?q=MG+Road+Basavanagudi+Bangalore",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=300&q=80",
    user: {
      _id: "default",
      name: "Dr. Default",
      email: "default@clinic.com",
      phone: "+91 98765 43210",
      role: "dentist",
      profile: { problems: [] },
    },
    // Additional fields for display
    phone: "+91 98765 43210",
    email: "default@clinic.com",
    reviews: 156,
    fee: 300,
    offers: [
      "Get 10% off on first dental cleaning",
      "Free consultation for new patients",
    ],
    specialties: [
      "Root Canal",
      "Braces",
      "Dental Implants",
      "Cosmetic Dentistry",
    ],
    isActive: true,
    createdAt: "2020-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

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

  // Fetch clinic details by ID
  useEffect(() => {
    const fetchClinicDetails = async () => {
      if (!clinicId) {
        setClinicLoading(false);
        return;
      }

      try {
        setClinicLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clinics/${clinicId}`);

        if (response.data?.success) {
          setClinic(response.data.data);
        } else {
          toast.error("Failed to fetch clinic details");
        }
      } catch (error) {
        console.error("Error fetching clinic details:", error);
        toast.error("Failed to fetch clinic details");
      } finally {
        setClinicLoading(false);
      }
    };

    fetchClinicDetails();
  }, [clinicId]);

  // Use fetched clinic data or fallback to default
  const currentClinic = clinic
    ? {
        ...clinic,
        // Add additional fields for display if not present
        phone: clinic.user?.phone || clinic.whatsapp || "+91 98765 43210",
        email: clinic.user?.email || "contact@clinic.com",
        reviews: 156, // Default reviews count
        fee: clinic.appointmentCharges,
        offers: clinic.offers || ["Get 10% off on first dental cleaning"], // Use actual offers or default
        specialties: clinic.problems || ["General Dentistry"], // Use problems as specialties
        isActive: clinic.isActive !== undefined ? clinic.isActive : true,
        createdAt: clinic.createdAt || new Date().toISOString(),
        updatedAt: clinic.updatedAt || new Date().toISOString(),
      }
    : defaultClinic;

  async function handleBooking() {
    if (!selectedDate || !selectedSlot)
      return toast.error("Please select a date and time slot.");
    if (!patientName || !patientPhone)
      return toast.error("Please enter your full name and phone number.");
    if (!/^\d{10}$/.test(patientPhone))
      return toast.error("Enter a valid 10-digit phone number.");

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointments`,
        {
          clinicName: currentClinic.name,
          clinicId: clinicId,
          fullName: patientName,
          mobileNumber: patientPhone,
          appointmentDate: selectedDate,
          timeSlot: selectedSlot,
          clinicSpecialities: currentClinic.specialties,
          clinicLocation: currentClinic.location,
        }
      );

      if (res.data?.success) {
        toast.success("Appointment booked successfully!");
        setPatientName("");
        setPatientPhone("");
        setSelectedSlot("");
      } else {
        toast.error(res.data?.message || "Failed to book appointment.");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  // Show loading state while fetching clinic details
  if (clinicLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E8F0FF] to-[#F7FAFF] py-10 px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8 border border-[#E0E7FF] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#2056AE]" />
            <p className="text-[#2056AE] font-semibold">
              Loading clinic details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F0FF] to-[#F7FAFF] py-10 px-4 flex justify-center">
      <motion.div
        className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8 border border-[#E0E7FF]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2056AE] mb-3 sm:mb-0">
            Book an Appointment
          </h1>
          <div className="text-sm text-gray-500">
            Call us:{" "}
            <a
              href={`tel:${currentClinic.phone}`}
              className="text-[#2056AE] font-semibold"
            >
              {currentClinic.phone}
            </a>
          </div>
        </div>

        {/* Comprehensive Clinic Info */}
        <div className="bg-[#F8FAFF] p-6 rounded-xl shadow mb-8">
          {/* Clinic Image */}
          {currentClinic.img && (
            <div className="mb-6">
              <img
                src={currentClinic.img}
                alt={currentClinic.name}
                className="object-cover w-full h-48 rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Header with Clinic Name and Status */}
          <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-[#2056AE]">
                  {currentClinic.name}
                </h2>
                {currentClinic.isActive && (
                  <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    <Shield size={12} />
                    Active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin size={16} className="text-[#2056AE]" />
                <span className="font-medium">
                  {currentClinic.location}, {currentClinic.state}
                </span>
              </div>
            </div>

            {/* Rating and Fee */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.round(currentClinic.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-700">
                  {currentClinic.rating} ({currentClinic.reviews} reviews)
                </span>
              </div>
              <div className="text-2xl font-bold text-[#2056AE]">
                ₹ {currentClinic.fee}
              </div>
              <div className="text-sm text-gray-500">Consultation Fee</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#2056AE] mb-3">
                Contact Information
              </h3>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#2056AE]" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a
                    href={`tel:${currentClinic.phone}`}
                    className="font-semibold text-[#2056AE] hover:underline"
                  >
                    {currentClinic.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#2056AE]" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a
                    href={`mailto:${currentClinic.email}`}
                    className="font-semibold text-[#2056AE] hover:underline"
                  >
                    {currentClinic.email}
                  </a>
                </div>
              </div>

              {currentClinic.whatsapp && (
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <a
                      href={`https://wa.me/${currentClinic.whatsapp.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-green-600 hover:underline"
                    >
                      {currentClinic.whatsapp}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#2056AE] mb-3">
                Online Presence
              </h3>

              {currentClinic.website && (
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-[#2056AE]" />
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a
                      href={currentClinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-semibold text-[#2056AE] hover:underline"
                    >
                      Visit Website
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}

              {currentClinic.mapUrl && (
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <a
                      href={currentClinic.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-semibold text-red-600 hover:underline"
                    >
                      View on Map
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}

              {currentClinic.bookUrl && currentClinic.bookUrl !== "#" && (
                <div className="flex items-center gap-3">
                  <CalendarDays size={18} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Direct Booking</p>
                    <a
                      href={currentClinic.bookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                    >
                      Book Online
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specialties and Services */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#2056AE] mb-3">
              Specialties & Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentClinic.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium text-[#2056AE] bg-blue-100 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Offers and Promotions */}
          {currentClinic.offers && currentClinic.offers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#2056AE] mb-3">
                Current Offers
              </h3>
              <div className="space-y-2">
                {Array.isArray(currentClinic.offers) ? (
                  currentClinic.offers.map((offer, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 text-sm font-medium text-green-700 rounded-lg bg-green-50"
                    >
                      <Award size={16} className="text-green-600" />
                      {offer}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 p-3 text-sm font-medium text-green-700 rounded-lg bg-green-50">
                    <Award size={16} className="text-green-600" />
                    {currentClinic.offers}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clinic Information */}
          <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <User size={16} className="text-[#2056AE]" />
                <span className="text-sm font-semibold text-gray-700">
                  Doctor
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {currentClinic.user?.name || "Dr. Available"}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock3 size={16} className="text-[#2056AE]" />
                <span className="text-sm font-semibold text-gray-700">
                  Established
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(currentClinic.createdAt).getFullYear()}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Shield size={16} className="text-[#2056AE]" />
                <span className="text-sm font-semibold text-gray-700">
                  Status
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {currentClinic.isActive
                  ? "Accepting Patients"
                  : "Currently Closed"}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Date & Time */}
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
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-lg text-sm font-medium border transition ${
                    selectedSlot === slot
                      ? "bg-[#2056AE] text-white border-[#2056AE]"
                      : "border-gray-300 hover:bg-[#F0F5FF]"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#2056AE] mb-4">
              Patient Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2056AE]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2056AE]"
                />
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="mt-6 w-full bg-[#2056AE] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#184a9b] disabled:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
