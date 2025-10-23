"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAddPopUpFormMutation } from "./popUpFormApi";

export default function PopupFormModal() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    country: "",
    email: "",
    contactNumber: "",
    preferredContactMethod: "",
    treatmentRequired: "",
    description: "",
    preferredCity: "",
    travelDate: "",
    budgetRange: "",
    comments: "",
  });

  const [addPopUpForm, { isLoading }] = useAddPopUpFormMutation();

  // Show popup once per session
  useEffect(() => {
    const hasShown = localStorage.getItem("popupShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem("popupShown", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) formData.append("file", file);

      await addPopUpForm(formData).unwrap();

      toast.success("Your enquiry has been submitted!");
      setSubmitted(true);
      setTimeout(() => setShow(false), 2000);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong!");
    }
  };

  const handleClose = () => {
    setShow(false);
    setSubmitted(false);
    setForm({
      fullName: "",
      country: "",
      email: "",
      contactNumber: "",
      preferredContactMethod: "",
      treatmentRequired: "",
      description: "",
      preferredCity: "",
      travelDate: "",
      budgetRange: "",
      comments: "",
    });
    setFile(null);
  };

  const countries = [
    "India",
    "USA",
    "UK",
    "Canada",
    "Australia",
    "UAE",
    "Other",
  ];
  const contactMethods = ["Email", "WhatsApp", "Phone"];
  const treatments = [
    "Dental Implants",
    "Root Canal",
    "Smile Design",
    "Braces / Invisalign",
    "Full Mouth Rehabilitation",
    "Teeth Whitening",
    "Other",
  ];
  const cities = [
    "Delhi",
    "Mumbai",
    "Chandigarh",
    "Bangalore",
    "Hyderabad",
    "Goa",
  ];
  const budgets = ["$500 - $1000", "$1000 - $2000", "$2000 - $5000", "$5000+"];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl bg-[#1e1e1f] text-white rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              className="absolute text-white top-4 right-4 hover:text-gray-400"
              onClick={handleClose}
            >
              <X className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thankyou"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 text-center"
                >
                  <h2 className="mb-2 text-2xl font-bold">Thank You!</h2>
                  <p>Your dental enquiry has been sent successfully.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="mb-6 text-2xl font-bold text-center text-gold">
                    Plan Your Dental Trip to India
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name, Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 placeholder:text-gray-300 focus:outline-none focus:border-gold"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 placeholder:text-gray-300 focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Country, Contact */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gold"
                      >
                        <option value="">Country of Residence</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        name="contactNumber"
                        placeholder="Contact Number (+country code)"
                        value={form.contactNumber}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 placeholder:text-gray-300 focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Contact Method & Treatment */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <select
                        name="preferredContactMethod"
                        value={form.preferredContactMethod}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gold"
                      >
                        <option value="">Preferred Contact Method</option>
                        {contactMethods.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>

                      <select
                        name="treatmentRequired"
                        value={form.treatmentRequired}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gold"
                      >
                        <option value="">Treatment Required</option>
                        {treatments.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <textarea
                      name="description"
                      placeholder="Description of Dental Concern (optional)"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full py-2 bg-transparent border-b border-gray-400 placeholder:text-gray-300 focus:outline-none focus:border-gold"
                    />

                    {/* File Upload */}
                    <div>
                      <label className="text-sm text-gray-300">
                        Upload Dental Reports / X-rays (optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*, .pdf"
                        onChange={handleFileChange}
                        className="mt-1 text-sm"
                      />
                    </div>

                    {/* Preferred City & Travel Date */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <select
                        name="preferredCity"
                        value={form.preferredCity}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gold"
                      >
                        <option value="">Preferred City in India</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>

                      <input
                        type="date"
                        name="travelDate"
                        value={form.travelDate}
                        onChange={handleChange}
                        required
                        className="py-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Budget Range */}
                    <select
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={handleChange}
                      className="w-full py-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gold"
                    >
                      <option value="">Budget Range (optional)</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>

                    {/* Additional Comments */}
                    <textarea
                      name="comments"
                      placeholder="Additional Comments (optional)"
                      value={form.comments}
                      onChange={handleChange}
                      rows={2}
                      className="w-full py-2 bg-transparent border-b border-gray-400 placeholder:text-gray-300 focus:outline-none focus:border-gold"
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 font-semibold text-black transition rounded bg-gold hover:bg-yellow-500 disabled:opacity-50"
                    >
                      {isLoading ? "Sending..." : "Submit Enquiry"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
