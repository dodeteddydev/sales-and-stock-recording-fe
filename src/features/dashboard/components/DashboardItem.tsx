import { ArrowUpRight, type LucideIcon } from "lucide-react";

import styles from "./DashboardItem.module.css";
import { formatRupiah } from "@/utilities/formatRupiah";

type DashboardItemProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  isLoading: boolean;
  isClickable?: boolean;
  onClick?: () => void;
};

export const DashboardItem = ({
  title,
  value,
  icon: Icon,
  isLoading,
  isClickable,
  onClick,
}: DashboardItemProps) => {
  return (
    <div
      className={`${styles.wrapper} ${isClickable && styles.clickable}`}
      onClick={isClickable ? onClick : () => {}}
    >
      <div className={styles.wrapperContent}>
        <div className={styles.icon}>
          <Icon size={24} />
        </div>

        <div>
          <p className={styles.title}>
            {isLoading ? "Loading..." : title.slice(5)}
          </p>
          <h3 className={styles.value}>
            {isLoading ? "Loading..." : formatRupiah(value)}
          </h3>
        </div>
      </div>

      {isClickable && <ArrowUpRight size={24} />}
    </div>
  );
};
