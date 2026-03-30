import { ApiError } from '@/shared/apis/apiError';
import { useCallback, useEffect, useState } from 'react';

type UseGetMoreDataProps<TItem, TResponse> = {
  initialResult: { cursorId?: number | null } | null | undefined;
  fetchMoreFn: (cursorId: number) => Promise<TResponse>;
  extractData: (res: TResponse) => TItem[];
};

/**
 * 초기 데이터를 기반으로 추가 데이터를 불러오는 훅
 */
export const useGetMoreData = <
  TItem,
  TResponse extends { cursorId?: number | null },
>({
  initialResult,
  fetchMoreFn,
  extractData,
}: UseGetMoreDataProps<TItem, TResponse>) => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [additionalData, setAdditionalData] = useState<TItem[]>([]);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setCursorId(initialResult?.cursorId ?? null);
    setAdditionalData([]);
    setAddErrorMessage(null);
  }, [initialResult]);

  const loadMore = useCallback(async () => {
    if (cursorId === null || isAddLoading) return;

    try {
      setIsAddLoading(true);
      const data = await fetchMoreFn(cursorId);

      setAdditionalData((prev) => [...prev, ...extractData(data)]);
      setCursorId(data.cursorId ?? null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setAddErrorMessage('추가 데이터를 찾을 수 없습니다.');
      } else if (err instanceof Error) {
        setAddErrorMessage(err.message);
      } else {
        setAddErrorMessage('알 수 없는 에러가 발생했습니다.');
      }
    } finally {
      setIsAddLoading(false);
    }
  }, [cursorId, fetchMoreFn, extractData, isAddLoading]);

  return {
    additionalData,
    cursorId,
    isAddLoading,
    addErrorMessage,
    loadMore,
  };
};
