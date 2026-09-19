import type { IdNameResponse } from "@/types/response";
import { formatDate } from "@/utilities/formatDate";

import styles from "./AuditInfo.module.css";

type AuditInfoProps = {
  user: IdNameResponse | null;
  date: string;
};

export const AuditInfo = ({ user, date }: AuditInfoProps) => {
  return user && date ? (
    <>
      <p>{user?.name}</p>

      <p className={styles.dateText}>{formatDate(date)}</p>
    </>
  ) : (
    "-"
  );
};
