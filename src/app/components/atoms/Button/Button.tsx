import React from "react";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: "default" | "primary";
}

export default function Button({ isActive, variant = "default", className = "", ...props }: ButtonProps) {
  const buttonClasses = [
    "button",
    isActive ? "button--active" : "",
    variant === "primary" ? "button--primary" : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      className={buttonClasses}
      {...props}
    />
  );
}