import React from "react";
import "./spinner.scss";

interface SpinnerProps {
  text?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  text,
  className
}) => {
  return (
    <div className={`spinner__container ${className || ''}`}>
      <div className={`spinner__loader`} />
      {text && <p className="spinner__text">{text}</p>}
    </div>
  );
};

export default Spinner;