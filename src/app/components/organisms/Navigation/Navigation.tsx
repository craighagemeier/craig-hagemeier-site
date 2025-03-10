"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Palette } from "lucide-react";
import MobileNavMenu from "../../molecules/Menus/MobileNavMenu";
import ThemeMenu from "../../molecules/Menus/ThemeMenu";
import styles from "./navigation.module.scss";

const linkLabels: Record<string, string> = {
  "/": "Home",
  "/photography": "Photography",
  "/endurance-quests": "Endurance Quests",
  "/contact": "Contact",
};

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {["/", "/photography", "/endurance-quests", "/contact"].map((path, index) => (
          <li key={index} className={`${styles.navigation__item} ${pathname === path ? styles.active : ""}`}>
            <Link href={path}>{linkLabels[path]}</Link>
          </li>
        ))}
      </ul>

      <button
        className={styles.navigation__themeButton}
        onClick={() => setThemeMenuOpen(!themeMenuOpen)}
        aria-expanded={themeMenuOpen}
        aria-label="Toggle theme menu"
      >
        {themeMenuOpen ? <X size={24} /> : <Palette size={24} />}
      </button>

      <button
        className={styles.navigation__menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <MobileNavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} pathname={pathname} linkLabels={linkLabels} />
      <ThemeMenu themeMenuOpen={themeMenuOpen} setThemeMenuOpen={setThemeMenuOpen} />
    </nav>
  );
}
