// src/components/PageStructure.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageStructureProps {
  children: React.ReactNode;
}

const PageStructure: React.FC<PageStructureProps> = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageStructure;
