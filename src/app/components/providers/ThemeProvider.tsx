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
  const pathname = usePathname();
  const [theme, setTheme] = useState<string>(getInitialTheme);
  const [colorMode, setColorMode] = useState<string>(getInitialColorMode);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [systemPreference, setSystemPreference] = useState<string>("light");

  // Detect system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPreference(darkModeMediaQuery.matches ? "dark" : "light");

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

    headings.forEach((heading) => {
      heading.classList.remove("theme-box");
      heading.innerHTML = heading.textContent || "";
    });

    textElements.forEach((el) => {
      el.innerHTML = el.innerHTML
        .replace(/<span class="theme-box">(.*?)<\/span>/gi, "$1")
        .replace(/<span class="theme-box theme-ticker">(.*?)<\/span>/gi, "$1")
        .replace(/<span class='theme-first-letter'>(.*?)<\/span>/gi, "$1");
    });

    if (currentTheme === "monochrome") {
      headings.forEach((heading) => {
        heading.innerHTML = heading.textContent?.replace(/\b(\w)/g, "<span class='theme-first-letter'>$1</span>") || "";
      });
    }

    if (currentTheme === "kruger") {
      textElements.forEach((el) => {
        let content = el.innerHTML;
        content = content.replace(
          /\b(YOU|ARE|BEAUTIFUL|AMAZING|EPIC|EXTRAORDINARY|LIMITLESS|ENOUGH|WONDERFUL|PERFECT)\b/gi,
          '<span class="theme-box theme-ticker">$1</span>'
        );
        el.innerHTML = content;
      });

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

    document.body.classList.remove("theme-monochrome", "theme-kruger", "theme-rogue-coast", "theme-dieter-rams");
    document.body.classList.add(`theme-${theme}`);

    const applyThemeWithRetries = (retries = 3, delay = 200) => {
      applyThemeTransformations(theme);

      if (retries > 0) {
        setTimeout(() => {
          applyThemeTransformations(theme);
          applyThemeWithRetries(retries - 1, delay);
        }, delay);
      }
    };

    applyThemeWithRetries();

    const effectiveColorMode = colorMode === "auto" ? systemPreference : colorMode;

    if (effectiveColorMode === "light") {
      document.documentElement.style.setProperty("color-scheme", "light");
    } else if (effectiveColorMode === "dark") {
      document.documentElement.style.setProperty("color-scheme", "dark");
    } else {
      document.documentElement.style.removeProperty("color-scheme");
    }
  }, [theme, colorMode, systemPreference, isLoaded]);

  // Listen for page transition completion
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    const handleTransitionComplete = () => {
      applyThemeTransformations(theme);
    };

    window.addEventListener('pageTransitionComplete', handleTransitionComplete);

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

    const timer = setTimeout(() => {
      applyThemeTransformations(theme);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, isLoaded, theme]);

  // Render children hidden until theme is loaded to avoid hydration mismatch
  return (
    <ThemeContext.Provider value={{
      theme,
      colorMode,
      setTheme,
      setColorMode,
      isLoaded
    }}>
      <div style={{ visibility: isLoaded ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;