"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface ContactOption {
  icon: string;
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
      icon: "📞",
      title: t("common.phoneSupport"),
      description: t("common.speakDirectly"),
      actionText: "+91 7087117423",
      href: "tel:+917087117423",
    },
    {
      icon: "💬",
      title: t("common.liveChat"),
      description: t("common.getInstantHelp"),
      actionText: t("common.startChat"),
      onClick: () => alert("Chat support coming soon!"),
    },
    {
      icon: "📧",
      title: t("common.emailSupport"),
      description: t("common.sendQuestions"),
      actionText: "info@dentaltourismclinicsindia.com",
      href: "mailto:info@dentaltourismclinicsindia.com",
    },
    {
      icon: "🦷",
      title: t("common.emergencyCare"),
      description: t("common.emergencySupport"),
      actionText: t("common.emergencyLine"),
      href: "tel:emergency",
    },
  ];
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
