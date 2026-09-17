import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  isLoading?: boolean;
};

export const EmptyState = ({ isLoading }: EmptyStateProps) => {
  return (
    <div className={styles.emptyState}>
      {isLoading ? "Loading..." : "No Data Available"}
    </div>
  );
};
