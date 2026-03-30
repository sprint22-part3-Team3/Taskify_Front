import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  onLoadMore: () => void;
  hasCursorId: boolean;
  isFetching: boolean;
};

/**
 * IntersectionObserver를 활용한 무한 스크롤 공통 훅
 *
 * @example
 * ```tsx
 * const { loadMoreRef } = useInfiniteScroll({
 *   onLoadMore: loadMore,
 *   hasCursorId: cursorId !== null,
 *   isFetching: isAddLoading,
 * });
 *
 * return (
 *   <div>
 *     <ul>
 *       {items.map(item => <li key={item.id}>{item.name}</li>)}
 *     </ul>
 *     {!addErrorMessage && <div ref={loadMoreRef} />}
 *   </div>
 * );
 * ```
 */
export const useInfiniteScroll = ({
  onLoadMore,
  hasCursorId,
  isFetching,
}: UseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const stableOnLoadMore = useRef(onLoadMore);

  useEffect(() => {
    stableOnLoadMore.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasCursorId && !isFetching) {
        stableOnLoadMore.current();
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasCursorId, isFetching]);

  return { loadMoreRef };
};
