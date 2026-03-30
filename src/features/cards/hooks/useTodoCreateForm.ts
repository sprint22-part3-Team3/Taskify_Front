import { useCallback, useState } from 'react';
import type { CreateCardRequest } from '@/features/cards/apis/cards.types';
import { createCard, uploadCardImage } from '@/features/cards/apis/cards';
import { useCardRefetchContext } from '@/features/cards/hooks/useCardRefetchContext';

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleImageSelect = useCallback(
    async (file: File) => {
      if (!dashboardId) {
        setImageUploadError('대시보드를 찾을 수 없습니다.');
        return;
      }

      setIsUploadingImage(true);
      setImageUploadError(null);

      try {
        const response = await uploadCardImage({ teamId, columnId }, file);
        setImageUrl(response?.imageUrl ?? null);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '이미지 업로드에 실패했습니다. 다시 시도해 주세요.';
        setImageUploadError(errorMessage);
        setImageUrl(null);
      } finally {
        setIsUploadingImage(false);
      }
    },
    [columnId, dashboardId, teamId]
  );

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
        refetch();
        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '할 일 생성에 실패했습니다. 다시 시도해 주세요.';
        setSubmissionError(message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [columnId, dashboardId, imageUrl, refetch]
  );

  const resetTodoCreateState = useCallback(() => {
    setImageUrl(null);
    setImageUploadError(null);
    setIsUploadingImage(false);
    setSubmissionError(null);
  }, []);

  const resetSubmissionError = useCallback(() => {
    setSubmissionError(null);
  }, []);

  return {
    imageUrl,
    isUploadingImage,
    imageUploadError,
    isSubmitting,
    submissionError,
    handleImageSelect,
    handleCreateTodo,
    resetTodoCreateState,
    resetSubmissionError,
  };
}
