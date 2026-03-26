import type { FieldWrapperProps } from '@/features/cards/components/form-field/field-wrapper/fieldWrapper.types';

/**
 * 카드 폼 필드의 레이블과 입력 요소를 감싸는 래퍼입니다.
 *
 * @example
 * ```tsx
 * <FieldWrapper>
 *   <Label className="typo-md-regular md:typo-2lg-regular">마감일</Label>
 *   <DateInputField name="dueDate" value={dueDate} onChange={setDueDate} />
 * </FieldWrapper>
 * ```
 */
function FieldWrapper({ children }: FieldWrapperProps) {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
}

export default FieldWrapper;
