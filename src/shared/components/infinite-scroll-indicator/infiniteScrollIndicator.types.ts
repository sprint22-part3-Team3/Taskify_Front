export type InfiniteScrollIndicatorProps = {
  isAddLoading: boolean;
  addErrorMessage: string | null;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onRetry: () => void;
};
