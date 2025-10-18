"use client";

import { motion } from "framer-motion";

const ContactInfoSection = () => {
  const bgImage = "/images/ingotslocation.jpg";

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-28"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 " />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Us on the Map
        </h1>

        <p className="mb-12 max-w-2xl mx-auto text-base md:text-lg text-gray-200">
          Scan the QR code or use the interactive map below to locate our office.
        </p>

        <div className="items-center">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 h-[400px] w-full"
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83719739492!2d77.0688998!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26c05305c47%3A0x5e3f22f8ed8f86c2!2sDelhi%20NCR%2C%20India!5e0!3m2!1sen!2sin!4v1691071442409!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* QR Code */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="m-10 p-6 bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md border border-gray-300 dark:border-gray-700 text-center"
          >
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maps.google.com/?q=Delhi+NCR+India"
              alt="QR Code to location"
              className="w-58 h-48 object-contain mx-auto"
            />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Scan to open location in Google Maps
            </p>
          </motion.div> */}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactInfoSection;
