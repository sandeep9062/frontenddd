// app/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: { language: "Language", home: "Home" },
      },
    },
    hi: {
      translation: {
        nav: { language: "भाषा", home: "होम" },
      },
    },
    fr: {
      translation: {
        nav: { language: "Langue", home: "Accueil" },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
