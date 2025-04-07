"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "../components/atoms/Link/Link";

export default function Inspiration() {
  const links = [
    { href: "https://geoapa.com/", label: "George Apazidis" },
    { href: "https://www.joshmbell.com/", label: "Josh Bell" },
    { href: "https://metatronstudios.com/", label: "Metatron Studios" },
    {
      href: "https://www.carlos-otero.com/press#/world-of-interiors/",
      label: "Carlos Otero",
    },
    { href: "https://www.fitzcreative.com/", label: "FITZ CREATIVE" },
    { href: "https://you-are-beautiful.com/", label: "You Are Beautiful" },
    {
      href: "https://en.wikipedia.org/wiki/Barbara_Kruger",
      label: "Barbara Kruger",
    },
    {
      href: "https://www.thrivehaircollective.com/",
      label: "Thrive Hair Collective",
    },
    { href: "https://bradfrost.com/", label: "Brad Frost" },
    { href: "https://illapiano.com", label: "Illapiano" },
    { href: "https://colornamer.robertcooper.me/", label: " Color Namer" },
    { href: "https://austinkleon.com/steal/", label: "Steal Like An Artist" },
    {
      href: "https://austinkleon.com/show-your-work/",
      label: "Show Your Work",
    },
    {
      href: "https://www.goodreads.com/en/book/show/17740626-go",
      label: "Go: A Kidd's Guide to Graphic Design",
    },
    {
      href: "https://www.simongarfield.com/books/just-my-type/",
      label: "Just My Type",
    },
    {
      href: "https://www.californiabeaches.com/beach/glass-beach/",
      label: "Glass Beach",
    },
    {
      href: "https://blog.stackademic.com/css-advanced-glassmorphism-login-a9f88bbf4847",
      label: "CSS Advanced: Glassmorphism",
    },
    {
      href: "https://blog.prototypr.io/glassmorphic-visual-hierarchy-4-practical-tips-76196a1cac03",
      label: "Glassmorphic Visual Hierarchy",
    },
    {
      href: "https://medium.com/design-bootcamp/glassmorphism-in-web-design-2867f39fcf35",
      label: "How to implement glassmorphism in web design",
    },
    {
      href: "https://intunewellnesscb.com/",
      label: "Intune Wellness",
    }
  ];

  const [shuffledLinks, setShuffledLinks] = useState(links);

  useEffect(() => {
    const shuffled = [...links].sort(() => Math.random() - 0.5);
    setShuffledLinks(shuffled);
  }, []);

  return (
    <section className="ch-container">
      <div className="ch-row">
        <div className="ch-col">
          <h2>Inspiration</h2>
        </div>
      </div>
      <div className="ch-row">
        <div className="ch-col">
          <p>Inspiration is everywhere. This is a small slice of the people and things that are sparking new ideas for me. No rankings, no favorites. Just pure inspiration, shuffled fresh every time you load the page. If that's not enough, go ahead &mdash; hit refresh.</p>
        </div>
      </div>
      <div className="ch-row">
        <div className="ch-col">
          <ul>
            <AnimatePresence>
              {shuffledLinks.map(({ href, label }) => (
                <motion.li
                  key={href}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={href} target="_blank" aria-label={label}>
                    {label}
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  );
}