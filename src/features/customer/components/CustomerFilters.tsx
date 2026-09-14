import { Input } from "@/components/Input/Input";

import styles from "./CustomerFilters.module.css";
import type { Params } from "@/types/request";

type CustomerFiltersProps = {
  value: Params;
  onChange: <K extends keyof Params>(name: K, value: Params[K]) => void;
};

export const CustomerFilters = ({ value, onChange }: CustomerFiltersProps) => {
  return (
    <section className={styles.customerFilters}>
      <Input
        label="Search"
        placeholder="e.g. johndoe"
        value={value.search}
        onChange={(e) => onChange("search", e.target.value)}
      />
    </section>
  );
};
