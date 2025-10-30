"use client";

import React from "react";
import { ShieldCheck, Lock, FileText, Users, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

const HipaaCompliancePage = () => {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl px-6 mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 font-semibold text-blue-700 bg-blue-100 rounded-full">
            <ShieldCheck className="w-5 h-5 mr-2" />
            HIPAA Compliance
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Your Privacy, Our Priority
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            At <span className="font-semibold text-blue-600">Dental Tourism Clinics India</span>, 
            we are fully committed to protecting your personal health information 
            in accordance with HIPAA regulations.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Data Protection */}
          <motion.div
            className="p-8 bg-white border border-blue-100 shadow-lg rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <Lock className="w-10 h-10 mb-4 text-blue-600" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Data Security
            </h2>
            <p className="leading-relaxed text-gray-600">
              All your dental records, consultation notes, and appointment data 
              are encrypted both in transit and at rest. We use advanced security 
              measures to ensure your information is always protected.
            </p>
          </motion.div>

          {/* Patient Confidentiality */}
          <motion.div
            className="p-8 bg-white border border-blue-100 shadow-lg rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <Users className="w-10 h-10 mb-4 text-blue-600" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Patient Confidentiality
            </h2>
            <p className="leading-relaxed text-gray-600">
              Only authorized dental professionals and staff members can access 
              your health information. We never share your details without your 
              explicit consent.
            </p>
          </motion.div>

          {/* Electronic Records */}
          <motion.div
            className="p-8 bg-white border border-blue-100 shadow-lg rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <FileText className="w-10 h-10 mb-4 text-blue-600" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Secure Electronic Records
            </h2>
            <p className="leading-relaxed text-gray-600">
              Our systems are built on HIPAA-compliant infrastructure, ensuring 
              secure management of all digital patient forms, x-rays, and treatment 
              notes.
            </p>
          </motion.div>

          {/* Staff Training */}
          <motion.div
            className="p-8 bg-white border border-blue-100 shadow-lg rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <HeartPulse className="w-10 h-10 mb-4 text-blue-600" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Staff Training & Awareness
            </h2>
            <p className="leading-relaxed text-gray-600">
              Every member of our dental team undergoes HIPAA compliance training 
              to understand patient privacy, data security, and ethical handling 
              of health information.
            </p>
          </motion.div>
        </div>

        {/* Final Note */}
        <motion.div
          className="p-10 mt-16 text-center bg-blue-100 border border-blue-200 shadow-inner rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            Your Trust Means Everything to Us
          </h3>
          <p className="max-w-3xl mx-auto mb-6 text-gray-700">
            If you have any questions about our HIPAA policies or how we handle 
            your medical information, please don’t hesitate to contact our 
            Privacy Officer at{" "}
            <a
              href="mailto:privacy@[yourclinic].com"
              className="font-semibold text-blue-700 underline"
            >
              privacy@[yourclinic].com
            </a>
            .
          </p>
          <div className="inline-flex items-center px-6 py-3 font-semibold text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:scale-105">
            <ShieldCheck className="w-5 h-5 mr-2" /> HIPAA Certified Practice
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HipaaCompliancePage;
