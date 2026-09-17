import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Meta } from "@/types/response";
import { Select } from "../Select/Select";

import styles from "./Pagination.module.css";

const limitOptions = [
  { label: "10", value: "10" },
  { label: "25", value: "25" },
  { label: "50", value: "50" },
];

type PaginationProps = {
  meta: Meta;
  onChangeLimit: (limit: number) => void;
  onChangePage: (page: number) => void;
};

export const Pagination = ({
  meta,
  onChangeLimit,
  onChangePage,
}: PaginationProps) => {
  const pagesPerGroup = 5;

  const currentGroup = Math.ceil(meta.page / pagesPerGroup);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, meta.totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.selectWrapper}>
        <Select
          options={limitOptions}
          value={String(meta.limit)}
          onChange={(event) => onChangeLimit(Number(event.target.value))}
        />
      </div>

      <div className={styles.pageButtonsWrapper}>
        {meta.hasPrev && startPage !== 1 && (
          <button
            className={styles.pagePrevNextButton}
            onClick={() => onChangePage(startPage - 1)}
          >
            <ChevronLeft />
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              meta.page === page ? styles.active : ""
            }`}
            type="button"
            onClick={() => onChangePage(page)}
          >
            {page}
          </button>
        ))}

        {meta.hasNext && endPage !== meta.totalPages && (
          <button
            className={styles.pagePrevNextButton}
            onClick={() => onChangePage(endPage + 1)}
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};
