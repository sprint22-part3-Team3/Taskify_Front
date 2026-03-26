import InputField from '@/shared/components/input/input-field';
import type { TagInputProps } from '@/features/cards/components/tag-input/tagInput.types';

/**
 * 카드 생성 폼에서 사용하는 태그 입력 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <TagInput value={tagInput} onChange={handleChange} onKeyDown={handleKeyDown} />
 * ```
 */
function TagInput({
  value,
  onChange,
  onKeyDown,
  placeholder = '입력 후 Enter',
}: TagInputProps) {
  return (
    <div className="flex min-h-12.5 flex-wrap items-center gap-2 rounded-lg border border-gray-200 px-4 py-2">
      <InputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="typo-md-regular md:typo-lg-regular min-w-0 flex-1 border-0 p-0 outline-none focus:border-0"
      />
    </div>
  );
}

export default TagInput;
