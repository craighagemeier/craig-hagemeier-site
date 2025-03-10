import React from "react";
import styles from "./spinner.module.scss";

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
    <div className={`${styles.container} ${className || ''}`}>
      <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Spinner;