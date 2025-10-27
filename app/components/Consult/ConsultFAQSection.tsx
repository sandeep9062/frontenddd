"use client";

import React, { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "What is an online dental consultation?",
    a: "An online dental consultation allows you to discuss your dental concerns with a qualified dentist through video call, chat, or phone without visiting a clinic. It's a convenient way to get professional dental advice from the comfort of your home.",
  },
  {
    q: "Is online dental consultation safe and effective?",
    a: "Yes, it is safe and effective for initial assessments, second opinions, follow-ups, and minor dental issues. However, severe problems may require a physical examination. All our dentists are verified and licensed professionals.",
  },
  {
    q: "How does the online consultation process work?",
    a: "You can book an appointment, connect with a dentist via video or chat, discuss your symptoms, and receive advice, prescriptions, or recommendations for further treatment. The entire process is secure and confidential.",
  },
  {
    q: "How do I book an online dental consultation?",
    a: "You can book an appointment through our website by selecting a dentist, choosing a time slot, and making a payment. You'll receive confirmation details and meeting links via email.",
  },
  {
    q: "Can a dentist diagnose my problem accurately online?",
    a: "While dentists can assess symptoms and provide guidance, certain issues may require an in-person visit for a complete diagnosis and treatment. Our dentists will advise you if a physical examination is needed.",
  },
  {
    q: "What are the consultation fees?",
    a: "Fees vary depending on the dentist and type of consultation. You can check the pricing details before booking. We offer competitive rates starting from ₹299 for basic consultations.",
  },
];

const ConsultFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="max-w-6xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2C73D2] to-[#008E97] text-white rounded-full text-sm font-semibold mb-6">
            ❓ FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2C73D2] to-[#008E97] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Get answers to common questions about our online dental consultation
            service
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-xl"
            >
              {/* Question */}
              <button
                className="flex items-center justify-between w-full px-8 py-6 text-left transition-colors duration-200 hover:bg-gray-50"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#15396A] group-hover:text-[#2C73D2] transition-colors pr-4">
                  {faq.q}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#2C73D2] to-[#008E97] rounded-2xl p-8 shadow-xl">
            <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              Still have questions?
            </h3>
            <p className="mb-6 text-lg text-blue-100">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="px-8 py-3 bg-white text-[#2C73D2] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                Contact Support
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#2C73D2] transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ConsultFAQSection;
