"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useAddContactMutation } from "../../services/contactApi";

const CTAWithForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [addContact, { isLoading }] = useAddContactMutation();

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
      // ✅ Send JSON instead of FormData
      const payload = {
        ...form,
        recaptchaToken,
      };

      await addContact(payload).unwrap();

      toast.success("Message sent successfully!");
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setVerified(false);
      setRecaptchaToken(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="relative py-16 bg-[var(--color-gold)] text-center text-black dark:text-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl px-4 mx-auto"
      >
        <h2 className="text-2xl font-semibold md:text-4xl">
          Let’s Build Something Golden
        </h2>
        <p className="mt-2 text-gray-800">
          Have a project idea? Contact us to start your custom project today.
        </p>

        <AnimatePresence>
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 mt-6 bg-white rounded-md shadow-md text-navy"
            >
              Thank you! Your message has been sent.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-8 space-y-4 text-left"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 text-black placeholder-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 text-black placeholder-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 text-black placeholder-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 text-black placeholder-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full px-4 py-3 text-black placeholder-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <div className="mt-4">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={(token) => {
                    setRecaptchaToken(token);
                    setVerified(!!token);
                  }}
                />
              </div>

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className="px-6 py-3 text-white transition rounded bg-darkbg1 hover:bg-darkbg2 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default CTAWithForm;
