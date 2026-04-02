import { useCallback, useState } from 'react';
import type { CreateCardRequest } from '@/features/cards/apis/cards.types';
import { createCard } from '@/features/cards/apis/cards';
import { useCardRefetchContext } from '@/features/cards/hooks/useCardRefetchContext';
import { useCardImageUpload } from '@/features/cards/hooks/useCardImageUpload';
import { useToast } from '@/shared/hooks/useToast';

type UseTodoCreateFormParams = {
  dashboardId?: number;
  columnId: number;
  teamId: string;
};

type CreateTodoPayload = {
  title: string;
  description: string;
  assigneeUserId?: number | null;
  dueDate?: string;
  tags?: string[];
};

export function useTodoCreateForm({
  dashboardId,
  columnId,
  teamId,
}: UseTodoCreateFormParams) {
  const { refetch } = useCardRefetchContext();
  const {
    imageUrl,
    isUploadingImage,
    imageUploadError,
    handleImageSelect,
    resetImageState,
  } = useCardImageUpload({ teamId, initialImageUrl: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleCreateTodo = useCallback(
    async ({
      title,
      description,
      assigneeUserId,
      dueDate,
      tags,
    }: CreateTodoPayload) => {
      if (!dashboardId) {
        setSubmissionError('대시보드를 찾을 수 없습니다.');
        return false;
      }

      const payload: CreateCardRequest = {
        dashboardId,
        columnId,
        title,
        description,
        assigneeUserId: assigneeUserId ?? undefined,
        dueDate: dueDate || undefined,
        tags,
        imageUrl: imageUrl ?? undefined,
      };

      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        await createCard(payload);
        showToast({
          theme: 'success',
          title: '할 일 생성 완료',
          message: '새로운 할 일이 목록에 추가되었습니다.',
        });
        refetch();
        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '할 일 생성에 실패했습니다. 다시 시도해 주세요.';
        setSubmissionError(message);
        showToast({
          theme: 'error',
          title: '할 일 생성 실패',
          message,
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [columnId, dashboardId, imageUrl, refetch, showToast]
  );

  const resetTodoCreateState = useCallback(() => {
    resetImageState();
    setSubmissionError(null);
  }, [resetImageState]);

  return {
    imageUrl,
    isUploadingImage,
    imageUploadError,
    isSubmitting,
    submissionError,
    handleImageSelect,
    handleCreateTodo,
    resetTodoCreateState,
  };
}
