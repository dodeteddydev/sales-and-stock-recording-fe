import { DatePicker } from "@/components/DatePicker/DatePicker";
import type { DashboardParams } from "../types/dashboard";

import styles from "./DashboardFilters.module.css";

type DashboardFiltersProps = {
  filter: DashboardParams;
  onChangeFilter: <K extends keyof DashboardParams>(
    key: K,
    value: DashboardParams[K],
  ) => void;
};

const getOneMonthAgo = (date: string) => {
  const endDate = new Date(`${date}T00:00:00`);

  endDate.setMonth(endDate.getMonth() - 1);

  const year = endDate.getFullYear();
  const month = String(endDate.getMonth() + 1).padStart(2, "0");
  const day = String(endDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const DashboardFilters = ({
  filter,
  onChangeFilter,
}: DashboardFiltersProps) => {
  const handleEndDateChange = (value: string) => {
    onChangeFilter("startDate", value);
    onChangeFilter("endDate", getOneMonthAgo(value));
  };

  return (
    <section className={styles.dashboardFilter}>
      <div className={styles.fieldWrapper}>
        <DatePicker
          id="startDate"
          label="Start Date"
          value={filter.startDate}
          onChange={(e) => onChangeFilter("startDate", e.target.value)}
        />
      </div>

      <div className={styles.fieldWrapper}>
        <DatePicker
          id="endDate"
          label="End Date"
          value={filter.endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
      </div>
    </section>
  );
};
