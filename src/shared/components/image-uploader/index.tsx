import type {
  ChangeEvent,
  ImageUploadBoxProps,
} from '@/shared/components/image-uploader/imageUploder.types';
import { useRef, useState } from 'react';
import { IcAdd } from '@/shared/assets/icons';
import { VARIANT_STYLE } from '@/shared/components/image-uploader/imageUploder.constants';

/**
 * 이미지 업로드 박스 컴포넌트
 *
 * @remarks
 * - 사용자가 이미지를 업로드할 수 있는 박스 컴포넌트입니다.
 * - 클릭 시 파일 선택 창이 열리며, 선택한 이미지는 박스 안에 미리보기로 표시됩니다.
 * - `variant` prop을 통해 기본(default)과 모달(modal) 스타일을 선택할 수 있습니다.
 * - 마이페이지에서는 default, 모달에서는 modal 스타일이 적용됩니다.
 *
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
}: ImageUploadBoxProps) {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 박스 클릭 → 파일 선택 열기
  const handleClick = () => {
    inputRef.current?.click();
  };

  // 이미지 선택
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-primary-500/10 flex ${VARIANT_STYLE[variant].size} cursor-pointer items-center justify-center overflow-hidden rounded-lg`}
    >
      {/* 이미지 없을 때 */}
      {!image && (
        <IcAdd className={`position-relative ${VARIANT_STYLE[variant].icon}`} />
      )}

      {/* 이미지 있을 때 */}
      {image && (
        <img src={image} alt="preview" className="h-full w-full object-cover" />
      )}

      {/* 숨겨진 input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}
