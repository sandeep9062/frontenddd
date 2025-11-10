"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Phone, MessageSquare, Mail, AlertTriangle } from "lucide-react";

interface ContactOption {
  icon: React.ElementType;
  title: string;
  description: string;
  actionText: string;
  href?: string;
  onClick?: () => void;
}

const ContactOptions: React.FC = () => {
  const { t } = useTranslation();

  const contactOptions: ContactOption[] = [
    {
      icon: Phone,
      title: t("common.phoneSupport"),
      description: t("common.speakDirectly"),
      actionText: "+91 7087117423",
      href: "tel:+917087117423",
    },
    {
      icon: MessageSquare,
      title: t("common.liveChat"),
      description: t("common.getInstantHelp"),
      actionText: t("common.startChat"),
      onClick: () => alert("Chat support coming soon!"),
    },
    {
      icon: Mail,
      title: t("common.emailSupport"),
      description: t("common.sendQuestions"),
      actionText: "info@dentaltourismclinicsindia.com",
      href: "mailto:info@dentaltourismclinicsindia.com",
    },
    {
      icon: AlertTriangle,
      title: t("common.emergencyCare"),
      description: t("common.emergencySupport"),
      actionText: t("common.emergencyLine"),
      href: "tel:emergency",
    },
  ];

  return (
    <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {contactOptions.map((option, index) => (
        <div
          key={index}
          className="flex flex-col p-8 text-center transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-3xl hover:shadow-xl hover:-translate-y-1"
        >
          {/* ICON */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
            <option.icon className="w-8 h-8 text-blue-600" />
          </div>

          {/* TITLE */}
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {option.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="mb-8 text-sm leading-relaxed text-gray-500">
            {option.description}
          </p>

          {/* ACTION BUTTON */}
          {option.href ? (
            <a
              href={option.href}
              className="inline-block px-6 py-3 mt-auto text-[8px] font-medium text-blue-600 transition border border-blue-300 rounded-xl hover:bg-blue-600 hover:text-white"
            >
              {option.actionText}
            </a>
          ) : (
            <button
              onClick={option.onClick}
              className="inline-block px-6 py-3 mt-auto text-[8px] font-medium text-blue-600 transition border border-blue-300 rounded-xl hover:bg-blue-600 hover:text-white"
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
