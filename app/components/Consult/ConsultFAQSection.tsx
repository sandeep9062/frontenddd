"use client";

import React from "react";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "What is an online dental consultation?",
    a: "An online dental consultation allows you to discuss your dental concerns with a qualified dentist through video call, chat, or phone without visiting a clinic.",
  },
  {
    q: "Is online dental consultation safe and effective?",
    a: "Yes, it is safe and effective for initial assessments, second opinions, follow-ups, and minor dental issues. However, severe problems may require a physical examination.",
  },
  {
    q: "How does the online consultation process work?",
    a: "You can book an appointment, connect with a dentist via video or chat, discuss your symptoms, and receive advice, prescriptions, or recommendations for further treatment.",
  },
  {
    q: "How do I book an online dental consultation?",
    a: "You can book an appointment through our website by selecting a dentist, choosing a time slot, and making a payment.",
  },
  {
    q: "Can a dentist diagnose my problem accurately online?",
    a: "While dentists can assess symptoms and provide guidance, certain issues may require an in-person visit for a complete diagnosis and treatment.",
  },
  {
    q: "What are the consultation fees?",
    a: "Fees vary depending on the dentist and type of consultation. You can check the pricing details before booking.",
  },
];

const ConsultFAQSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full px-2 bg-white py-14">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2C73D2] text-center mb-10">
        FAQs
      </h2>
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {faqs.map((faq) => (
          <div key={faq.q} className="flex flex-col w-full">
            <span className="font-bold text-[#2C73D2] text-lg md:text-xl mb-1">
              {faq.q}
            </span>
            <span className="text-[#444] text-base md:text-lg font-normal mb-2">
              {faq.a}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultFAQSection;
