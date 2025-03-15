import React, { useRef, useEffect } from "react";
import Label from "../Label/Label";
import "./text-area.scss";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, name, error, value, onChange, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto first to get the correct scrollHeight
    textarea.style.height = 'auto';

    // Set the height to scrollHeight + 2px for borders
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Adjust height on value change
  useEffect(() => {
    adjustHeight();
  }, [value]);

  // Handle change event to resize and pass to parent
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    adjustHeight();
  };

  return (
    <div className={`text-area ${error ? "text-area--error" : ""}`}>
      <Label htmlFor={id} error={!!error}>{label}</Label>
      <textarea
        id={id}
        name={name}
        className="text-area__input"
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <div className="text-area__error-container">
        {error ? <p className="text-area__error">{error}</p> : <span className="text-area__error-placeholder"></span>}
      </div>
    </div>
  );
};

export default TextArea;