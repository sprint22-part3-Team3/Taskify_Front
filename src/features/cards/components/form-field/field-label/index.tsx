import type { FieldLabelProps } from '@/features/cards/components/form-field/field-label/fieldLabel.types';

/**
 * 카드 폼 필드의 레이블을 렌더링합니다.
 *
 * @example
 * ```tsx
 * <FieldLabel required>제목</FieldLabel>
 * ```
 */
function FieldLabel({ children, required = false }: FieldLabelProps) {
  return (
    <span className="typo-md-regular md:typo-lg-regular text-black-200">
      {children}
      {required && (
        <>
          &nbsp;<span className="text-primary-500">*</span>
        </>
      )}
    </span>
  );
}

export default FieldLabel;
