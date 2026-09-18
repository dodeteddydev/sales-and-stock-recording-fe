import { Input } from "@/components/Input/Input";

import styles from "./ProductFilters.module.css";

type ProductFiltersProps = {
  search: string;
  onSearch: (search: string) => void;
};

export const ProductFilters = ({ search, onSearch }: ProductFiltersProps) => {
  return (
    <section className={styles.productFilters}>
      <Input
        label="Search"
        placeholder="e.g. johndoe"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </section>
  );
};
