import { useState } from 'react';
import { Tag } from '@/shared/components/tag';
import { getTagColor } from '@/shared/utils/getTagColor';
import type { TagInputProps } from '@/features/cards/components/tag-input/tagInput.types';

/**
 * 카드 생성 폼에서 사용하는 태그 입력 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <TagInput tags={tags} setTags={setTags} />
 * ```
 */
function TagInput({
  tags,
  setTags,
  maxTags = 5,
  placeholder = '입력 후 Enter',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const isMaxTagsReached = tags.length >= maxTags;

  const handleDeleteTag = (targetTag: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== targetTag));
    setError('');
  };

  const handleAddTag = () => {
    const nextTag = inputValue.trim();

    if (!nextTag) {
      return;
    }

    const hasDuplicateTag = tags.some(
      (tag) => tag.toLowerCase() === nextTag.toLowerCase()
    );

    if (hasDuplicateTag) {
      setError('이미 포함된 태그입니다.');
      return;
    }

    if (tags.length >= maxTags) {
      setError(`태그는 ${maxTags}개까지 입력할 수 있습니다.`);
      return;
    }

    setTags((prevTags) => [...prevTags, nextTag]);
    setInputValue('');
    setError('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      !event.nativeEvent.isComposing &&
      inputValue.trim()
    ) {
      event.preventDefault();
      handleAddTag();
    }

    if (event.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      handleDeleteTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="focus-within:border-primary-500 flex min-h-12.5 w-full flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2">
        {tags
          .filter((tag) => tag.trim() !== '')
          .map((tag) => (
            <Tag
              key={tag}
              color={getTagColor(tag)}
              onClick={() => handleDeleteTag(tag)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleDeleteTag(tag);
                }
              }}
              aria-label={`${tag} 태그 삭제`}
            >
              {tag}
            </Tag>
          ))}

        <input
          type="text"
          placeholder={
            !isMaxTagsReached && (isFocused || tags.length === 0)
              ? placeholder
              : ''
          }
          className="typo-md-regular md:typo-lg-regular min-w-0 flex-1 outline-0 placeholder:text-gray-300"
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(event) => {
            setInputValue(event.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && <span className="typo-md-medium text-error">{error}</span>}
    </div>
  );
}

export default TagInput;
