"use client";

import React from "react";

interface ContactOption {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  href?: string;
  onClick?: () => void;
}

const contactOptions: ContactOption[] = [
  {
    icon: "📞",
    title: "Phone Support",
    description: "Speak directly with our support team",
    actionText: "+91 7087117423",
    href: "tel:+917087117423",
  },
  {
    icon: "💬",
    title: "Live Chat",
    description: "Get instant help from our team",
    actionText: "Start Chat",
    onClick: () => alert("Chat support coming soon!"),
  },
  {
    icon: "📧",
    title: "Email Support",
    description: "Send us your questions",
    actionText: "info@dentaltourismclinicsindia.com",
    href: "mailto:info@dentaltourismclinicsindia.com",
  },
  {
    icon: "🦷",
    title: "Emergency Care",
    description: "24/7 dental emergency support",
    actionText: "Emergency Line",
    href: "tel:emergency",
  },
];

const ContactOptions: React.FC = () => {
  return (
    <section className="grid gap-6 md:grid-cols-4">
      {contactOptions.map((option, index) => (
        <div
          key={index}
          className="p-6 text-center transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
        >
          <div className="mb-4 text-4xl">{option.icon}</div>
          <h3 className="mb-2 text-lg font-bold text-gray-800">
            {option.title}
          </h3>
          <p className="mb-4 text-gray-600">{option.description}</p>

          {option.href ? (
            <a
              href={option.href}
              className="text-[#2C73D2] font-semibold hover:underline break-words text-sm leading-tight"
            >
              {option.actionText}
            </a>
          ) : (
            <button
              onClick={option.onClick}
              className="text-[#2C73D2] font-semibold hover:underline text-sm leading-tight"
            >
              {option.actionText}
            </button>
          )}
        </div>
      ))}
    </section>
  );
};

export default ContactOptions;
