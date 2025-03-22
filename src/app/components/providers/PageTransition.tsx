"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./page-transition.scss";

// Define the order of pages in navigation
const pageOrder = ["/", "/photography", "/endurance-quests", "/contact", "/inspiration"];

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const prevIndex = pageOrder.indexOf(prevPathname.current);
    const currentIndex = pageOrder.indexOf(pathname);

    setDirection(currentIndex > prevIndex ? 1 : -1);
    prevPathname.current = pathname;

    // Prevent initial render until animation is ready
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);

      // Add this: Trigger a custom event when transition completes
      window.dispatchEvent(new CustomEvent('pageTransitionComplete'));
    }, 400); // Matches transition duration

    return () => clearTimeout(timer);
  }, [pathname]);

  // Instead of returning null during transition, render an empty div with same height
  if (isTransitioning) {
    return (
      <div className="page-transition" />
    );
  }

  return (
    <div className="page-transition">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 100 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 * direction }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ flex: "1 0 auto", width: "100%" }} // Ensures content takes up remaining space
          onAnimationComplete={() => {
            // Add this: Trigger a custom event when animation completes
            window.dispatchEvent(new CustomEvent('pageTransitionComplete'));
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;