"use client";
import { useState, useEffect } from 'react';

const getInitialCookieSettings = () => {
  if (typeof window !== 'undefined') {
    const savedSettings = localStorage.getItem('cookieSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  }
  return {
    analytics: true,
    marketing: true,
    preferences: true,
  };
};

export const useCookies = () => {
  const [cookieSettings, setCookieSettings] = useState(getInitialCookieSettings);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    }
  }, [cookieSettings]);

  const updateCookieSettings = (newSettings) => {
    setCookieSettings(newSettings);
  };

  return { cookieSettings, updateCookieSettings };
};
