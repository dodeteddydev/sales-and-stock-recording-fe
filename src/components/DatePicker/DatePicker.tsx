import type { InputHTMLAttributes } from "react";
import styles from "./DatePicker.module.css";

type DatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const DatePicker = ({ label, id, ...props }: DatePickerProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input id={id} className={styles.input} type="date" {...props} />
      </div>
    </div>
  );
};
