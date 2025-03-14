import React from "react";
import "./spinner.scss";

interface SpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  text,
  size = 'medium',
  color = 'primary',
  className
}) => {
  return (
    <div className={`spinner__container ${className || ''}`}>
      <div className={`spinner__loader spinner__loader--${size} spinner__loader--${color}`} />
      {text && <p className="spinner__text">{text}</p>}
    </div>
  );
};

export default Spinner;