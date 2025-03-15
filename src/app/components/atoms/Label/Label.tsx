import React from "react";
import "./label.scss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  error?: boolean;
}

const Label: React.FC<LabelProps> = ({ htmlFor, error, children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`label ${error ? "label--error" : ""}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
