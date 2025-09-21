"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage,
  lastPage,
}: {
  currentPage: number;
  lastPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  }

  function getPages() {
    const pages: (number | string)[] = [];

    if (lastPage <= 7) {
      // If only a few pages, show all
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("…");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < lastPage - 2) {
        pages.push("…");
      }

      pages.push(lastPage);
    }

    return pages;
  }

  const visiblePages = getPages();

  return (
    <div className={styles.pagination}>
      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={styles.button}
      >
        &lt;
      </button>

      {/* Page numbers */}
      <div className={styles.pageNumbersContainer}>
        {visiblePages.map((page, idx) =>
          page === "…" ? (
            <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => goToPage(page as number)}
              className={`${styles.pageNumbers} ${
                page === currentPage ? styles.activeButton : ""
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className={styles.button}
      >
        &gt;
      </button>
    </div>
  );
}
