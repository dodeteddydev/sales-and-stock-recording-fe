import type { GroupBase, StylesConfig } from "react-select";
import type { AsyncPaginateProps } from "react-select-async-paginate";
import { AsyncPaginate } from "react-select-async-paginate";
import styles from "./SelectOption.module.css";

export type SelectOptionType = {
  label: string;
  value: string;
};

type SelectOptionProps = AsyncPaginateProps<
  SelectOptionType,
  GroupBase<SelectOptionType>,
  { page: number },
  false
> & {
  label?: string;
  id?: string;
};

const selectStyles: StylesConfig<SelectOptionType, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: "auto",
    border: `1px solid ${
      state.isFocused ? "var(--color-primary)" : "var(--color-border)"
    }`,
    borderRadius: "var(--radius-sm)",
    boxShadow: state.isFocused ? "0 0 0 0.5px var(--color-primary)" : "none",
    fontSize: "var(--font-size-sm)",
    "&:hover": {
      borderColor: state.isFocused
        ? "var(--color-primary)"
        : "var(--color-border)",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "var(--space-2)",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "var(--font-size-sm)",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "var(--font-size-sm)",
  }),
  input: (base) => ({
    ...base,
    fontSize: "var(--font-size-sm)",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--font-size-sm)",
    zIndex: 10,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "var(--font-size-sm)",
    cursor: "pointer",
    backgroundColor:
      state.isSelected || state.isFocused
        ? "var(--color-primary)"
        : "transparent",
    color:
      state.isSelected || state.isFocused
        ? "var(--color-surface)"
        : "var(--color-text-primary)",
    ":active": {
      backgroundColor: "var(--color-primary)",
    },
  }),
};

export const SelectOption = ({ label, id, ...props }: SelectOptionProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <AsyncPaginate {...props} inputId={id} styles={selectStyles} />
    </div>
  );
};
