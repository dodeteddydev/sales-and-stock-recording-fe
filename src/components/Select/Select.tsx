import type { SelectHTMLAttributes } from "react";

import styles from "./Select.module.css";

type Option = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
  error?: string;
};

export const Select = ({ label, options, error, ...props }: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select {...props} className={styles.select}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
