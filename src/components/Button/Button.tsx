import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${props.disabled && styles.disabled}`}
      {...props}
    >
      {children}
    </button>
  );
};
