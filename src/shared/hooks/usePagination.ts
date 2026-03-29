import { useCallback, useState } from 'react';

/**
 * 페이지네이션 상태와 이동 로직을 공통으로 관리합니다.
 *
 * @example
 * ```tsx
 * const {
 *   currentPage,
 *   totalPages,
 *   syncTotalCount,
 *   handlePrevPage,
 *   handleNextPage,
 * } = usePagination();
 * ```
 */
export function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const syncTotalCount = useCallback((totalCount: number, pageSize: number) => {
    const nextTotalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    setTotalPages(nextTotalPages);
    setCurrentPage((previousPage) => Math.min(previousPage, nextTotalPages));

    return nextTotalPages;
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((previousPage) => Math.max(previousPage - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((previousPage) => Math.min(previousPage + 1, totalPages));
  }, [totalPages]);

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
    setTotalPages(1);
  }, [initialPage]);

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    syncTotalCount,
    handlePrevPage,
    handleNextPage,
    resetPagination,
  };
}
