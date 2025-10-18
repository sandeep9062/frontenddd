"use client";

import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast"; // ✅ Use react-hot-toast for professional alerts
import { useAddContactMutation } from "../../services/contactApi"; // ✅ Import the API hook

export default function PopupFormModal() {
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [addContact, { isLoading }] = useAddContactMutation();

  useEffect(() => {
    const hasShown = localStorage.getItem("popupShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem("popupShown", "true");
      }, 3000); // delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verified || !recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const payload = {
        ...form,
        recaptchaToken,
      };

      await addContact(payload).unwrap();

      toast.success("Message sent successfully!");
      setSubmitted(true);
      setTimeout(() => setShow(false), 2000); // ✅ Hide modal after 2 seconds
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleClose = () => {
    setShow(false);
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setVerified(false);
    setRecaptchaToken(null);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-[#1e1e1f] text-white rounded-xl shadow-2xl p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-400 transition"
              onClick={handleClose}
            >
              <X className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 text-center text-white p-4 rounded-md"
                >
                  <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
                  <p>Your message has been sent successfully.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="formContent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-center text-gold">
                    Request a Free Quote
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-b border-gray-400 py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-b border-gray-400 py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition"
                      />
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-b border-gray-400 py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition"
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-b border-gray-400 py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition"
                      />
                    </div>

                    {/* Message */}
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-transparent border-b border-gray-400 py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition"
                    />

                    {/* reCAPTCHA */}
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={(token) => {
                        setRecaptchaToken(token);
                        setVerified(!!token);
                      }}
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-6 bg-gold text-black py-3 font-semibold rounded hover:bg-yellow-500 transition disabled:opacity-50"
                    >
                      {isLoading ? "Sending..." : "Request a Free Quote"}
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
