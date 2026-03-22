"use client";

import React, { createContext, useState, useEffect, useLayoutEffect } from "react";
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
    return localStorage.getItem("selectedTheme") || "dieter-rams";
  }
  return "dieter-rams";
};

const getInitialColorMode = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedColorMode") || "auto";
  }
  return "auto";
};

// Blocking script to inject into <head> via your layout.tsx.
// This runs before React hydrates, preventing any flash of wrong color scheme in production.
// Add this to your root layout:
//
//   <head>
//     <script dangerouslySetInnerHTML={{ __html: colorModeScript }} />
//   </head>
//
export const colorModeScript = `
(function() {
  try {
    var mode = localStorage.getItem('selectedColorMode') || 'auto';
    var effective = mode;
    if (mode === 'auto') {
      effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-color-mode', effective);
    document.documentElement.style.setProperty('color-scheme', effective);
  } catch(e) {}
})();
`;

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
  useLayoutEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    localStorage.setItem("selectedTheme", theme);
    localStorage.setItem("selectedColorMode", colorMode);

    document.body.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        document.body.classList.remove(cls);
      }
    });
    document.body.classList.add(`theme-${theme}`);

    const applyThemeWithRetries = (retries = 1, delay = 100) => {
      applyThemeTransformations(theme);

      if (retries > 0) {
        setTimeout(() => {
          applyThemeTransformations(theme);
          applyThemeWithRetries(retries - 1, delay);
        }, delay);
      }
    };

    setTimeout(() => {
      applyThemeWithRetries();
    }, 0);

    // Determine effective color mode and apply it.
    // The blocking script (colorModeScript) handles the initial paint in production;
    // this effect keeps things in sync whenever the user toggles.
    const effectiveColorMode = colorMode === "auto" ? systemPreference : colorMode;
    document.documentElement.setAttribute("data-color-mode", effectiveColorMode);
    document.documentElement.style.setProperty("color-scheme", effectiveColorMode);
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