import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  onLoadMore: () => void;
  hasCursorId: boolean;
  isFetching: boolean;
};

/**
 * IntersectionObserver를 활용한 무한 스크롤 공통 훅
 */
export const useInfiniteScroll = ({
  onLoadMore,
  hasCursorId,
  isFetching,
}: UseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasCursorId && !isFetching) {
        onLoadMore();
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
  }, [onLoadMore, hasCursorId, isFetching]);

  return { loadMoreRef };
};
