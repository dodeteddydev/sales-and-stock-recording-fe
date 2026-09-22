import type {
  CashFlowCategory,
  CashFlowParams,
  CashFlowType,
} from "../types/cashflow";

import { Select } from "@/components/Select/Select";
import styles from "./CashFlowFilters.module.css";

type CashFlowFiltersProps = {
  filter: CashFlowParams;
  onChangeFilter: <K extends keyof CashFlowParams>(
    key: K,
    value: CashFlowParams[K],
  ) => void;
};

export const CashFlowFilters = ({
  filter,
  onChangeFilter,
}: CashFlowFiltersProps) => {
  const optionTypes = [
    {
      label: "All",
      value: "",
    },
    {
      label: "IN",
      value: "IN",
    },
    {
      label: "OUT",
      value: "OUT",
    },
  ];

  const optionCategory = [
    {
      label: "All",
      value: "",
    },
    {
      label: "SALE",
      value: "SALE",
    },
    {
      label: "RESTOCK",
      value: "RESTOCK",
    },
    {
      label: "LOAN",
      value: "LOAN",
    },
    {
      label: "RETURN",
      value: "RETURN",
    },
  ];

  return (
    <section className={styles.cashFlowFilter}>
      <div className={styles.fieldWrapper}>
        <Select
          id="type"
          label="Type"
          options={optionTypes}
          value={filter.type}
          onChange={(event) =>
            onChangeFilter("type", event.target.value as CashFlowType)
          }
        />
      </div>

      <div className={styles.fieldWrapper}>
        <Select
          id="category"
          label="Category"
          options={optionCategory}
          value={filter.category}
          onChange={(event) =>
            onChangeFilter("category", event.target.value as CashFlowCategory)
          }
        />
      </div>
    </section>
  );
};
