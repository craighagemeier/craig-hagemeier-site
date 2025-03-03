"use client";

import React, { createContext, useState, useEffect } from "react";

interface ThemeContextType {
  theme: string;
  colorMode: string;
  setTheme: (theme: string) => void;
  setColorMode: (mode: string) => void;
  isLoaded: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedTheme") || "base";
  }
  return "base";
};

const getInitialColorMode = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedColorMode") || "auto";
  }
  return "auto";
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>(getInitialTheme);
  const [colorMode, setColorMode] = useState<string>(getInitialColorMode);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [systemPreference, setSystemPreference] = useState<string>("light");

  // Detect system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check initial system preference
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPreference(darkModeMediaQuery.matches ? "dark" : "light");

    // Listen for changes in system preference
    const handler = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };

    darkModeMediaQuery.addEventListener("change", handler);
    return () => darkModeMediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoaded(true);
    }
  }, []);

  // Function to apply theme-specific transformations
  const applyThemeTransformations = (currentTheme: string) => {
    if (typeof window === "undefined") return;

    const headings = document.querySelectorAll("h1, h2, h3, h4");
    const textElements = document.querySelectorAll("h1, h2, h3, h4, p");

    // First, clean up all theme-specific transformations
    headings.forEach((heading) => {
      heading.classList.remove("theme-box");
      // Restore original content without special formatting
      heading.innerHTML = heading.textContent || "";
    });

    textElements.forEach((el) => {
      el.innerHTML = el.innerHTML
        .replace(/<span class="theme-box">(.*?)<\/span>/gi, "$1")
        .replace(/<span class="theme-box theme-ticker">(.*?)<\/span>/gi, "$1")
        .replace(/<span class='theme-first-letter'>(.*?)<\/span>/gi, "$1");
    });

    // Then apply the current theme's transformations
    if (currentTheme === "base") {
      // Apply base theme transformations
      headings.forEach((heading) => {
        heading.innerHTML = heading.textContent?.replace(/\b(\w)/g, "<span class='theme-first-letter'>$1</span>") || "";
      });
    } else if (currentTheme === "kruger") {
      // Apply Kruger theme transformations
      textElements.forEach((el) => {
        el.innerHTML = el.innerHTML.replace(
          /\b(consume|control|desire|buy)\b/gi,
          '<span class="theme-box">$1</span>'
        );
      });

      headings.forEach((heading) => {
        if (!heading.classList.contains("theme-box")) {
          heading.classList.add("theme-box");
        }
      });

      textElements.forEach((el) => {
        el.innerHTML = el.innerHTML.replace(
          /\b(BUY|CONSUME|OBEY|YOU|YOUR|I|WE|THEY)\b/gi,
          '<span class="theme-box theme-ticker">$1</span>'
        );
      });
    }
  };

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    localStorage.setItem("selectedTheme", theme);
    localStorage.setItem("selectedColorMode", colorMode);

    // Remove all theme classes
    document.body.classList.remove("theme-base", "theme-kruger");

    // Add theme class
    document.body.classList.add(`theme-${theme}`);

    // Apply the theme transformations
    applyThemeTransformations(theme);

    // Determine which color mode to actually apply
    const effectiveColorMode = colorMode === "auto" ? systemPreference : colorMode;

    // If color mode is specified, override the system preference
    if (effectiveColorMode === "light") {
      document.documentElement.style.setProperty("color-scheme", "light");
    } else if (effectiveColorMode === "dark") {
      document.documentElement.style.setProperty("color-scheme", "dark");
    } else {
      // This should not happen with our logic, but just in case
      document.documentElement.style.removeProperty("color-scheme");
    }
  }, [theme, colorMode, systemPreference, isLoaded]);

  // Prevent render until the theme is loaded
  if (!isLoaded) return null;

  // Determine effective color mode for UI display
  const effectiveColorMode = colorMode === "auto" ? systemPreference : colorMode;

  return (
    <ThemeContext.Provider value={{
      theme,
      colorMode,
      setTheme,
      setColorMode,
      isLoaded
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;