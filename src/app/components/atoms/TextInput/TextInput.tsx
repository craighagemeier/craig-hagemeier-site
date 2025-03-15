import React from "react";
import Label from "../Label/Label";
import "./text-input.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, name, error, ...props }) => {
  return (
    <div className={`text-input ${error ? "text-input--error" : ""}`}>
      <Label htmlFor={id} error={!!error}>{label}</Label>
      <input id={id} name={name} className="text-input__input" {...props} />
      <div className="text-input__error-container">
        {error ? <p className="text-input__error">{error}</p> : <span className="text-input__error-placeholder"></span>}
      </div>
    </div>
  );
};

export default TextInput;
