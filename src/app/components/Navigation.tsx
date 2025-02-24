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
  const pathname = usePathname(); // Get current path

  const menuRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleThemeMenu = () => setThemeMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (themeMenuOpen && themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setThemeMenuOpen(false);

        requestAnimationFrame(() => {
          if (menuOpen) {
            (document.querySelector(`.${styles.navigation__menuButton}`) as HTMLElement)?.blur();
          }
          if (themeMenuOpen) {
            (document.querySelector(`.${styles.navigation__themeButton}`) as HTMLElement)?.blur();
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
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
        {["/", "/photography", "/endurance-quests", "/contact"].map((path, index) => (
          <li key={index} className={`${styles.navigation__item} ${pathname === path ? styles.active : ""}`}>
            <Link href={path}>{linkLabels[path]}</Link>
          </li>
        ))}
      </ul>

      <button className={styles.navigation__themeButton} onClick={toggleThemeMenu}>
        <Palette size={24} />
      </button>

      <button className={styles.navigation__menuButton} onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div ref={menuRef} className={`${styles.navigation__mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <ul>
          {["/", "/photography", "/endurance-quests", "/contact"].map((path, index) => (
            <li key={index} className={`${styles.navigation__item} ${pathname === path ? styles.active : ""}`}>
              <Link href={path} onClick={() => setMenuOpen(false)}>
                {linkLabels[path]}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div ref={themeRef} className={`${styles.navigation__themeMenu} ${themeMenuOpen ? styles.open : ""}`}>
        <ThemeToggler />
        <p>Theme Options (To be added)</p>
      </div>
    </nav>
  );
}
