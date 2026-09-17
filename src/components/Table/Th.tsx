import type { ThHTMLAttributes } from "react";

import styles from "./Table.module.css";

type ThProps = ThHTMLAttributes<HTMLTableCellElement> & {
  textEnd?: boolean;
};

export const Th = ({ textEnd, className, ...props }: ThProps) => {
  return (
    <th
      {...props}
      className={`${styles.th} ${textEnd ? styles.textEnd : ""} ${className ?? ""}`}
    />
  );
};
