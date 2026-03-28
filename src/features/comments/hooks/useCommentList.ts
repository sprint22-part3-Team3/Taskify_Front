import type { Comment } from '@/features/comments/types/comment.types';
import { useEffect, useState } from 'react';
import { getComments } from '@/features/comments/apis/comments';
import { ApiError } from '@/shared/apis/apiError';

const NOT_FOUND_OR_FORBIDDEN_ERROR =
  '코멘트를 찾을 수 없거나 접근 권한이 없습니다';

/**
 * 코멘트 목록을 조회하는 훅
 */
export const useCommentList = (cardId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(cardId)) return;

    const fetchComments = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const res = await getComments({ cardId });
        setComments(res?.comments || []);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setErrorMessage(NOT_FOUND_OR_FORBIDDEN_ERROR);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [cardId]);

  return { comments, isLoading, errorMessage };
};
