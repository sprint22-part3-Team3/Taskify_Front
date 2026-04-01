import type {
  ChangeEvent,
  ImageUploadBoxProps,
} from '@/shared/components/image-uploader/imageUploader.types';
import { useState, useEffect } from 'react';
import { IcAdd, IcClose } from '@/shared/assets/icons';
import { VARIANT_STYLE } from '@/shared/components/image-uploader/imageUploader.constants';
import { cn } from '@/shared/utils/cn';

/**
 * 이미지 업로드 박스 컴포넌트
 *
 * @remarks
 * - 사용자가 이미지를 업로드할 수 있는 박스 컴포넌트입니다.
 * - 클릭 시 파일 선택 창이 열리며, 선택한 이미지는 박스 안에 미리보기로 표시됩니다.
 * - 마이페이지에서는 default, 모달에서는 modal 스타일이 적용됩니다.
 *
 * @example 기본 사용 예시
 * ```tsx
 * <ImageUploadBox variant="default" /> 
 * 
 * // 또는
 * <ImageUploadBox variant="modal" />
 * ```
 
 */
export default function ImageUploadBox({
  variant = 'default',
  imageUrl,
  onFileSelect,
}: ImageUploadBoxProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  // 이미지 선택
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nextObjectUrl = URL.createObjectURL(file);
    setObjectUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return nextObjectUrl;
    });

    e.target.value = '';
    onFileSelect?.(file);
  };

  useEffect(() => {
    // cleanup: 이전 image URL 제거
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const previewImage = imageUrl ?? objectUrl;

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    setObjectUrl(null);
    onFileSelect?.(null);
  };

  return (
    <label
      aria-label="이미지 업로드"
      className={`bg-primary-500/10 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg ${VARIANT_STYLE[variant].size} `}
    >
      {/* 실제 input */}
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />

      {/* 이미지 없을 때 */}
      {!previewImage && <IcAdd className={VARIANT_STYLE[variant].icon} />}

      {/* 이미지 있을 때 */}
      {previewImage && (
        <div className="relative h-full w-full">
          <img
            src={previewImage}
            alt="업로드 이미지 미리보기"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            aria-label="이미지 삭제"
            className={cn(
              'absolute flex cursor-pointer items-center justify-center rounded-full bg-black/70 transition-colors hover:bg-black',
              variant === 'default'
                ? 'top-2 right-2 h-6 w-6'
                : 'top-1 right-1 h-5 w-5'
            )}
            onClick={handleRemove}
          >
            <IcClose
              className={cn(
                'text-gray-300 text-white',
                variant === 'default' ? 'h-4 w-4' : 'h-3.5 w-3.5'
              )}
            />
          </button>
        </div>
      )}
    </label>
  );
}
