"use client";

import axios from "axios";

const axiosClientInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API!,
  withCredentials: true,
});

axiosClientInstance.interceptors.request.use((config) => {
  const clientInfo = {
    // Browser
    userAgent: navigator.userAgent,

    // Language
    language: navigator.language,
    languages: [...navigator.languages],

    // Time
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    // Platform
    platform: navigator.platform,

    // Screen
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio,
      colorDepth: window.screen.colorDepth,
    },

    // Browser state
    browser: {
      online: navigator.onLine,
      cookiesEnabled: navigator.cookieEnabled,
    },

    // Navigation
    page: {
      pathname: window.location.pathname,
      referrer: document.referrer || null,
    },
  };

  config.headers.set("X-Client-Info", JSON.stringify(clientInfo));

  return config;
});

export default axiosClientInstance;
