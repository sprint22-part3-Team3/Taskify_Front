import { Button } from '@/shared/components/button';
import type { InfiniteScrollIndicatorProps } from '@/shared/components/infinite-scroll-indicator/infiniteScrollIndicator.types';
import { LoadingFallback } from '@/shared/components/loading/loading-fallback';

/**
 * 무한 스크롤 하단부의 로딩, 에러(재시도), 그리고 스크롤 감지 센서를 렌더링하는 공통 컴포넌트입니다.
 */
export function InfiniteScrollIndicator({
  isAddLoading,
  addErrorMessage,
  hasMore,
  loadMoreRef,
  onRetry,
}: InfiniteScrollIndicatorProps) {
  if (!hasMore && !isAddLoading && !addErrorMessage) return null;

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-2 py-2">
      {isAddLoading && <LoadingFallback variant="part" />}

      {!isAddLoading && addErrorMessage && (
        <div className="flex flex-col items-center gap-2">
          <p className="typo-sm-medium text-error">⚠️ {addErrorMessage}</p>
          <Button type="button" theme="outlined" size="sm" onClick={onRetry}>
            다시 시도
          </Button>
        </div>
      )}

      {!isAddLoading && !addErrorMessage && hasMore && (
        <div ref={loadMoreRef} className="h-4 w-full" />
      )}
    </div>
  );
}
