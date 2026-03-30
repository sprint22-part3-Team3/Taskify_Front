import { ApiError } from '@/shared/apis/apiError';
import { useCallback, useEffect, useRef, useState } from 'react';

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

  const loading = useRef(false);
  const requestToken = useRef(0);

  useEffect(() => {
    requestToken.current += 1;
    setCursorId(initialResult?.cursorId ?? null);
    setAdditionalData([]);
    setAddErrorMessage(null);
    loading.current = false;
  }, [initialResult]);

  const loadMore = useCallback(async () => {
    if (cursorId === null || loading.current) return;

    loading.current = true;
    setIsAddLoading(true);
    const currentToken = requestToken.current;

    try {
      const data = await fetchMoreFn(cursorId);

      if (currentToken === requestToken.current) {
        setAdditionalData((prev) => [...prev, ...extractData(data)]);
        setCursorId(data.cursorId ?? null);
      }
    } catch (err) {
      if (currentToken === requestToken.current) {
        if (err instanceof ApiError && err.status === 404) {
          setAddErrorMessage('추가 데이터를 찾을 수 없습니다.');
        } else if (err instanceof Error) {
          setAddErrorMessage(err.message);
        } else {
          setAddErrorMessage('알 수 없는 에러가 발생했습니다.');
        }
      }
    } finally {
      if (currentToken === requestToken.current) {
        loading.current = false;
        setIsAddLoading(false);
      }
    }
  }, [cursorId, fetchMoreFn, extractData]);

  return {
    additionalData,
    cursorId,
    isAddLoading,
    addErrorMessage,
    loadMore,
  };
};
