"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import "./menu.scss";

interface MobileNavMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  pathname: string;
  linkLabels: Record<string, string>;
}

export default function MobileNavMenu({ menuOpen, setMenuOpen, pathname, linkLabels }: MobileNavMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathKeys = Object.keys(linkLabels);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setMenuOpen]);

  // Focus management when menu opens
  useEffect(() => {
    if (menuOpen && firstLinkRef.current) {
      // Small delay to ensure DOM is updated before focusing
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 50);
    }
  }, [menuOpen]);

  // Handle tab trap and close on tab out
  useEffect(() => {
    if (!menuOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (!menuRef.current || e.key !== "Tab") return;

      // Get all focusable elements in the menu
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Close the menu if tabbing beyond the last element
      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        setMenuOpen(false);
        // Focus the menu button after closing
        const menuButton = document.querySelector('[aria-label="Toggle navigation menu"]') as HTMLElement;
        menuButton?.focus();
      }

      // Close the menu if shift+tabbing before the first element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        setMenuOpen(false);
        // Focus the menu button after closing
        const menuButton = document.querySelector('[aria-label="Toggle navigation menu"]') as HTMLElement;
        menuButton?.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <nav
      ref={menuRef}
      className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
      tabIndex={-1}
      role="dialog"
      aria-label="Mobile Navigation"
      aria-modal="true"
      aria-hidden={!menuOpen}
    >
      <ul className="mobile-menu__list">
        {pathKeys.map((path, index) => (
          <li
            key={index}
            className={`mobile-menu__item ${pathname === path ? 'mobile-menu__item--active' : ''}`}
          >
            <Link
              href={path}
              onClick={() => setMenuOpen(false)}
              ref={index === 0 ? firstLinkRef : null}
              tabIndex={menuOpen ? 0 : -1}
              className="mobile-menu__link"
            >
              {linkLabels[path]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}