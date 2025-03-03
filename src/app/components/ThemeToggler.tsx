"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";
import styles from "../styles/navigation.module.scss";

interface ThemeTogglerProps {
  isMenuOpen: boolean;
}

export default function ThemeToggler({ isMenuOpen }: ThemeTogglerProps) {
  const themeContext = useContext(ThemeContext);
  const [systemPreference, setSystemPreference] = useState<string>("light");

  // Detect system preference for UI display
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

  if (!themeContext) return null; // Safety check

  const { setTheme, setColorMode, isLoaded, theme, colorMode } = themeContext;
  const themeOptions = [
    { value: "base", label: "Base theme" },
    { value: "kruger", label: "Barbara Kruger" },
  ];

  if (!isLoaded) return null; // Wait until loaded to prevent flashing

  // Determine which button should appear active
  const effectiveColorMode = colorMode === "auto" ? systemPreference : colorMode;

  return (
    <div>
      <ul>
        {themeOptions.map((themeOption) => (
          <li
            key={themeOption.value}
            className={`${styles.navigation__item} ${theme === themeOption.value ? styles.active : ""}`}
          >
            <button
              type="button"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                setTheme(themeOption.value);
              }}
            >
              {themeOption.label}
            </button>
          </li>
        ))}
      </ul>
      <div className={`${styles.navigation__lightDarkToggle}`}>
        <button
          type="button"
          aria-label="Enable Light Mode"
          onClick={() => setColorMode("light")}
          className={`${styles.navigation__lightDarkButton} ${effectiveColorMode === "light" && colorMode !== "auto" ? styles.active : ""}`}
        >
          <Sun size={20} />
        </button>
        <button
          type="button"
          aria-label="Enable Dark Mode"
          onClick={() => setColorMode("dark")}
          className={`${styles.navigation__lightDarkButton} ${effectiveColorMode === "dark" && colorMode !== "auto" ? styles.active : ""}`}
        >
          <Moon size={20} />
        </button>
        <button
          type="button"
          aria-label="Use System Preference"
          onClick={() => setColorMode("auto")}
          className={`${styles.navigation__lightDarkButton} ${colorMode === "auto" ? styles.active : ""}`}
        >
          <Monitor size={20} />
        </button>
      </div>
    </div>
  );
}