import type { FieldWrapperProps } from '@/features/cards/components/todo-create-modal/components/field-wrapper/fieldWrapper.types';

/**
 * 폼 필드의 레이블과 입력 요소를 감싸는 래퍼입니다.
 *
 * @example
 * ```tsx
 * <FieldWrapper>
 *   <FieldLabel>마감일</FieldLabel>
 *   <DateInputField name="dueDate" value={dueDate} onChange={setDueDate} />
 * </FieldWrapper>
 * ```
 */
function FieldWrapper({ children }: FieldWrapperProps) {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
}

export default FieldWrapper;
