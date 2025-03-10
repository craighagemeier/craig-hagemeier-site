import React from "react";
import "./link.scss";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  target?: "_blank" | "_self";
  rel?: string;
  className?: string;
}

export default function Link({
  href,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
}: LinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={"link"}
    >
      {children}
    </a>
  );
}
