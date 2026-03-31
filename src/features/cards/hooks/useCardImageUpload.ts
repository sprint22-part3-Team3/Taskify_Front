import { useCallback, useState } from 'react';
import { uploadCardImage } from '@/features/cards/apis/cards';

export type UseCardImageUploadOptions = {
  teamId?: string;
  initialImageUrl?: string | null;
};

/**
 * 카드 이미지 업로드를 처리하고 관련 상태를 관리하는 훅입니다.
 * 이미지 업로드 상태, 성공/실패 처리, 상태 초기화 로직을 제공합니다.
 */
export function useCardImageUpload({
  teamId,
  initialImageUrl,
}: UseCardImageUploadOptions) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl ?? null
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const handleImageSelect = useCallback(
    async (file: File | null, columnId: number) => {
      if (file === null) {
        setImageUrl(null);
        return;
      }
      if (!teamId) {
        setImageUploadError('팀 정보를 찾을 수 없습니다.');
        return;
      }

      setIsUploadingImage(true);
      setImageUploadError(null);

      try {
        const response = await uploadCardImage({ teamId, columnId }, file);
        setImageUrl(response?.imageUrl ?? null);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '이미지 업로드에 실패했습니다. 다시 시도해 주세요.';
        setImageUploadError(message);
        setImageUrl(null);
      } finally {
        setIsUploadingImage(false);
      }
    },
    [teamId]
  );

  const resetImageState = useCallback(
    (nextImageUrl?: string | null) => {
      setImageUrl(nextImageUrl ?? initialImageUrl ?? null);
      setImageUploadError(null);
      setIsUploadingImage(false);
    },
    [initialImageUrl]
  );

  return {
    imageUrl,
    isUploadingImage,
    imageUploadError,
    handleImageSelect,
    resetImageState,
  } as const;
}
