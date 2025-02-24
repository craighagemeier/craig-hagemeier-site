"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageStructureProps {
  children: React.ReactNode;
}

const PageStructure: React.FC<PageStructureProps> = ({ children }) => {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Header isShrunk={isShrunk} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageStructure;
