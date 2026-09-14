import type { TdHTMLAttributes } from "react";

import styles from "./Table.module.css";

type TdProps = TdHTMLAttributes<HTMLTableCellElement> & {
  textEnd?: boolean;
};

export const Td = ({ textEnd, className, ...props }: TdProps) => {
  return (
    <td
      {...props}
      className={`${styles.td} ${textEnd ? styles.textEnd : ""} ${className ?? ""}`}
    />
  );
};
