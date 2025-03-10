"use client";

import { useRef, useEffect } from "react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import "./menu.scss";

interface ThemeMenuProps {
  themeMenuOpen: boolean;
  setThemeMenuOpen: (open: boolean) => void;
}

export default function ThemeMenu({ themeMenuOpen, setThemeMenuOpen }: ThemeMenuProps) {
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setThemeMenuOpen]);

  // Handle tab trap and close on tab out
  useEffect(() => {
    if (!themeMenuOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (!themeRef.current || e.key !== "Tab") return;

      // Get all focusable elements in the menu
      const focusableElements = themeRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Close the menu if tabbing beyond the last element
      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        setThemeMenuOpen(false);
        // Focus the theme button after closing
        const themeButton = document.querySelector('[aria-label="Toggle theme menu"]') as HTMLElement;
        themeButton?.focus();
      }

      // Close the menu if shift+tabbing before the first element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        setThemeMenuOpen(false);
        // Focus the theme button after closing
        const themeButton = document.querySelector('[aria-label="Toggle theme menu"]') as HTMLElement;
        themeButton?.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [themeMenuOpen, setThemeMenuOpen]);

  return (
    <div
      ref={themeRef}
      className={`theme-menu ${themeMenuOpen ? 'theme-menu--open' : ''}`}
      tabIndex={-1}
      role="menu"
      aria-labelledby="theme-menu-label"
      aria-hidden={!themeMenuOpen}
    >
      <h4 id="theme-menu-label" className="theme-menu__label">Themes</h4>
      <ThemeToggler isMenuOpen={themeMenuOpen} />
    </div>
  );
}