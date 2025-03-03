"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Palette } from "lucide-react";
import ThemeToggler from "./ThemeToggler";
import styles from "../styles/navigation.module.scss";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const willBeOpen = !prev;

      if (willBeOpen) {
        setTimeout(() => {
          const firstItem = menuRef.current?.querySelector("a, button");
          if (firstItem) (firstItem as HTMLElement).focus();
        }, 10);
      } else {
        (
          document.querySelector(
            '[aria-label="Toggle navigation menu"]'
          ) as HTMLElement
        )?.focus();
      }

      return willBeOpen;
    });
  };

  const toggleThemeMenu = () => {
    setThemeMenuOpen((prev) => {
      const willBeOpen = !prev;

      if (willBeOpen) {
        setTimeout(() => {
          const firstItem = themeRef.current?.querySelector("a, button");
          if (firstItem) (firstItem as HTMLElement).focus();
        }, 10);
      } else {
        (
          document.querySelector(
            '[aria-label="Toggle theme menu"]'
          ) as HTMLElement
        )?.focus();
      }

      return willBeOpen;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
      if (
        themeMenuOpen &&
        themeRef.current &&
        !themeRef.current.contains(event.target as Node)
      ) {
        setThemeMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setThemeMenuOpen(false);
      }
    };

    const handleTabKey = (event: KeyboardEvent) => {
      if (!menuOpen && !themeMenuOpen) return;

      const menu = menuOpen ? menuRef.current : themeRef.current;
      if (!menu) return;

      const focusableItems = Array.from(
        menu.querySelectorAll<HTMLElement>("a, button")
      );
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [menuOpen, themeMenuOpen]);

  const linkLabels: Record<string, string> = {
    "/": "Home",
    "/photography": "Photography",
    "/endurance-quests": "Endurance Quests",
    "/contact": "Contact",
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {["/", "/photography", "/endurance-quests", "/contact"].map(
          (path, index) => (
            <li
              key={index}
              className={`${styles.navigation__item} ${
                pathname === path ? styles.active : ""
              }`}
            >
              <Link href={path}>{linkLabels[path]}</Link>
            </li>
          )
        )}
      </ul>

      <button
        className={styles.navigation__themeButton}
        onClick={toggleThemeMenu}
        aria-expanded={themeMenuOpen}
        aria-label="Toggle theme menu"
      >
        {themeMenuOpen ? <X size={24} /> : <Palette size={24} />}
      </button>

      <button
        className={styles.navigation__menuButton}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <nav
          ref={menuRef}
          className={`${styles.navigation__mobileMenu} ${
            menuOpen ? styles.open : ""
          }`}
          tabIndex={menuOpen ? 0 : -1}
          role="dialog"
          aria-label="Mobile Navigation"
          aria-modal="true"
          aria-hidden={!menuOpen}
        >
          <ul>
            {["/", "/photography", "/endurance-quests", "/contact"].map(
              (path, index) => (
                <li
                  key={index}
                  className={`${styles.navigation__item} ${
                    pathname === path ? styles.active : ""
                  }`}
                >
                  <Link href={path} onClick={() => setMenuOpen(false)}>
                    {linkLabels[path]}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      )}

      {themeMenuOpen && (
        <div
          ref={themeRef}
          className={`${styles.navigation__themeMenu} ${
            themeMenuOpen ? styles.open : ""
          }`}
          tabIndex={-1}
          role="menu"
          aria-labelledby="theme-menu-label"
          aria-hidden={!themeMenuOpen}
        >
          <h4
            id="theme-menu-label"
            className={styles.navigation__themeMenuLabel}
          >
            Themes
          </h4>
          <ThemeToggler isMenuOpen={themeMenuOpen} />
        </div>
      )}
    </nav>
  );
}
