"use client";

import React, { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
    return localStorage.getItem("selectedTheme") || "monochrome";
  }
  return "monochrome";
};

const getInitialColorMode = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedColorMode") || "auto";
  }
  return "auto";
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname(); // Use pathname inside the component
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

    // Apply transformations for monochrome theme (first letter effect for all headings)
    if (currentTheme === "monochrome") {
      headings.forEach((heading) => {
        heading.innerHTML = heading.textContent?.replace(/\b(\w)/g, "<span class='theme-first-letter'>$1</span>") || "";
      });
    }

    // Apply transformations for Kruger theme
    if (currentTheme === "kruger") {
      // Apply Kruger theme transformations to text elements
      textElements.forEach((el) => {
        let content = el.innerHTML;
        // Process keywords for ticker effect
        content = content.replace(
          /\b(YOU|ARE|BEAUTIFUL|AMAZING|EPIC|EXTRAORDINARY|LIMITLESS|ENOUGH)\b/gi,
          '<span class="theme-box theme-ticker">$1</span>'
        );

        el.innerHTML = content;
      });

      // Ensure the theme-box class is not applied to H1 in Kruger theme
      headings.forEach((heading) => {
        if (heading.tagName !== "H1") {
          heading.classList.add("theme-box");
        }
      });
    }
  };

  // Main theme effect
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    localStorage.setItem("selectedTheme", theme);
    localStorage.setItem("selectedColorMode", colorMode);

    // Remove all theme classes
    document.body.classList.remove("theme-monochrome", "theme-kruger", "theme-rogue-coast");

    // Add theme class
    document.body.classList.add(`theme-${theme}`);

    // Function to apply theme with retries
    const applyThemeWithRetries = (retries = 3, delay = 200) => {
      // Apply the theme transformations
      applyThemeTransformations(theme);

      if (retries > 0) {
        setTimeout(() => {
          applyThemeTransformations(theme);
          applyThemeWithRetries(retries - 1, delay);
        }, delay);
      }
    };

    // Start applying theme with retries
    applyThemeWithRetries();

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

  // Listen for page transition completion
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    // Listen for page transition completion
    const handleTransitionComplete = () => {
      // Reapply theme transformations
      applyThemeTransformations(theme);
    };

    window.addEventListener('pageTransitionComplete', handleTransitionComplete);

    // Apply theme on initial load
    setTimeout(() => {
      applyThemeTransformations(theme);
    }, 100);

    return () => {
      window.removeEventListener('pageTransitionComplete', handleTransitionComplete);
    };
  }, [isLoaded, theme]);

  // Effect to reapply theme on route changes
  useEffect(() => {
    if (!isLoaded) return;

    // When route changes, wait for animation to complete
    const timer = setTimeout(() => {
      applyThemeTransformations(theme);
    }, 500); // slightly longer than the page transition duration

    return () => clearTimeout(timer);
  }, [pathname, isLoaded, theme]);

  // Prevent render until the theme is loaded
  if (!isLoaded) return null;

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