"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";
import "../Menus/menu.scss";

interface ThemeTogglerProps {
  isMenuOpen: boolean;
}

export default function ThemeToggler({ isMenuOpen }: ThemeTogglerProps) {
  const themeContext = useContext(ThemeContext);
  const [systemPreference, setSystemPreference] = useState<string>("light");
  const firstButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (isMenuOpen && firstButtonRef.current) {
      // Small delay to ensure DOM is updated before focusing
      setTimeout(() => {
        firstButtonRef.current?.focus();
      }, 50);
    }
  }, [isMenuOpen]);

  if (!themeContext) return null; // Safety check

  const { setTheme, setColorMode, isLoaded, theme, colorMode } = themeContext;
  const themeOptions = [
    { value: "monochrome", label: "Monochrome" },
    { value: "kruger", label: "Barbara Kruger" },
    { value: "rogue-coast", label: "Rogue Coast" },
  ];

  if (!isLoaded) return null; // Wait until loaded to prevent flashing

  // Determine which button should appear active
  const effectiveColorMode = colorMode === "auto" ? systemPreference : colorMode;

  return (
    <div className="theme-menu__content">
      <ul className="theme-menu__list">
        {themeOptions.map((themeOption, index) => (
          <li
            key={themeOption.value}
            className={`mobile-menu__item ${theme === themeOption.value ? 'mobile-menu__item--active' : ''}`}
          >
            <button
              type="button"
              tabIndex={isMenuOpen ? 0 : -1}
              ref={index === 0 ? firstButtonRef : null}
              onClick={(e) => {
                e.preventDefault();
                setTheme(themeOption.value);
              }}
              className="mobile-menu__link"
            >
              {themeOption.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="theme-menu__toggle-container">
        <button
          type="button"
          aria-label="Enable Light Mode"
          onClick={() => setColorMode("light")}
          className={`theme-menu__button ${effectiveColorMode === "light" && colorMode !== "auto" ? 'theme-menu__button--selected' : ''}`}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <Sun size={20} />
        </button>
        <button
          type="button"
          aria-label="Enable Dark Mode"
          onClick={() => setColorMode("dark")}
          className={`theme-menu__button ${effectiveColorMode === "dark" && colorMode !== "auto" ? 'theme-menu__button--selected' : ''}`}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <Moon size={20} />
        </button>
        <button
          type="button"
          aria-label="Use System Preference"
          onClick={() => setColorMode("auto")}
          className={`theme-menu__button ${colorMode === "auto" ? 'theme-menu__button--selected' : ''}`}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <Monitor size={20} />
        </button>
      </div>
    </div>
  );
}