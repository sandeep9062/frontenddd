"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);

  // ✅ Load saved language on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("selectedLanguage");
      const foundLang =
        languages.find((lang) => lang.code === storedLang) || languages[0];
      i18n.changeLanguage(foundLang.code);
      setCurrentLanguage(foundLang);
    } else {
      // Set default language for SSR
      setCurrentLanguage(languages[0]);
    }
  }, [i18n]);

  // ✅ Change language handler
  const changeLanguage = (langCode: string) => {
    const selected = languages.find((lang) => lang.code === langCode);
    if (!selected) return;
    i18n.changeLanguage(langCode);
    setCurrentLanguage(selected);
    localStorage.setItem("selectedLanguage", langCode);
    setIsOpen(false);
  };

  // ✅ Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Current flag */}
        <span className="mr-2 text-lg">
          {currentLanguage ? currentLanguage.flag : "🌐"}
        </span>
        <span className="font-medium">
          {currentLanguage ? currentLanguage.name : t("nav.language")}
        </span>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
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
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-50 w-64 mt-2 overflow-y-auto origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="menu">
            <div className="px-4 py-2 text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200">
              {t("nav.language")}
            </div>

            <div className="grid grid-cols-1 gap-1 p-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`flex items-center w-full px-3 py-2 text-sm text-left rounded-md transition-colors duration-150 ${
                    i18n.language === language.code
                      ? "bg-orange-100 text-orange-800 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  <span className="mr-3 text-lg">{language.flag}</span>
                  <span className="flex-1">{language.name}</span>

                  {i18n.language === language.code && (
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageSwitcher;
