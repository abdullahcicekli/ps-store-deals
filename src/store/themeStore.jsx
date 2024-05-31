import React, { createElement } from "react";
import { create } from "zustand";

// localStorage'a güvenli erişim için fonksiyon
const getLocalStorageItem = (key, defaultValue) => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

const useThemeStore = create((set) => ({
  theme: getLocalStorageItem("theme", "dark"),
  setTheme: (theme) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", theme);
    }
    set({ theme });
  },
}));


export default useThemeStore;
