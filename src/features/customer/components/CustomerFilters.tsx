import { Input } from "@/components/Input/Input";

import styles from "./CustomerFilters.module.css";

type CustomerFiltersProps = {
  search: string;
  onSearch: (search: string) => void;
};

export const CustomerFilters = ({ search, onSearch }: CustomerFiltersProps) => {
  return (
    <section className={styles.customerFilters}>
      <Input
        label="Search"
        placeholder="e.g. johndoe"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </section>
  );
};
