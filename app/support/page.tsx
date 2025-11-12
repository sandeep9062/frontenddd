"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { submitContactUs } from "@/services/supportApi";

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const HelpSupport: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Sending your message...");

    try {
      const response: ApiResponse = await submitContactUs({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });

      if (response.success) {
        toast.success("Message sent successfully!", { id: toastId });
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        throw new Error(response.message || "An unknown error occurred.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";
      toast.error(message, {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C73D2] mb-4">
            Help & Support
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Need assistance? We're here to help! Fill out the form below and our
            support team will get back to you within 24 hours.
          </p>
        </div>

        {/* Support Form */}
        <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Contact Our Support Team
            </h2>
            <p className="text-gray-600">
              Tell us how we can help you. Whether you have questions about our
              services, need technical support, or want to provide feedback,
              we're here for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C73D2] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C73D2] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Phone and Subject Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C73D2] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C73D2] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="appointment-help">Appointment Help</option>
                  <option value="billing-question">Payment Query</option>
                  <option value="clinic-information">Clinic Information</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="other">Other</option>
                  <option value="technical-support">Technical Support</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C73D2] focus:border-transparent transition-all duration-300"
                placeholder="Please describe your question or issue in detail..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#2C73D2] to-[#F4A300] text-white px-12 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        className="opacity-75"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
              <p className="mt-3 text-sm text-gray-500">
                We'll respond to your inquiry within 24 hours during business
                days.
              </p>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 text-center bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <svg
                className="w-8 h-8 text-[#2C73D2]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Email Support
            </h3>
            <p className="mb-3 text-sm text-gray-600">Get help via email</p>
            <a
              href="mailto:info@dentaltourismclinicsindia.com"
              className="text-[#2C73D2] font-medium hover:underline break-words text-[15px]"
            >
              info@dentaltourismclinicsindia.com
            </a>
          </div>

          <div className="p-6 text-center bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Phone Support
            </h3>
            <p className="mb-3 text-sm text-gray-600">Call us directly</p>
            <a
              href="tel:+911234567890"
              className=" text-[15px] text-green-600 hover:underline"
            >
              +91 7087117423
            </a>
          </div>

          <div className="p-6 text-center bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Response Time
            </h3>
            <p className="mb-3 text-sm text-gray-600">How quickly we respond</p>
            <p className="text-[15px] text-purple-600">Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
