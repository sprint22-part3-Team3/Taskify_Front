import { useEffect, useState } from 'react';
import type { DashboardColorName } from '@/features/dashboards/types/dashboardColor.types';
import { Tag } from '@/shared/components/tag';
import { COLORS } from '@/shared/constants/color.constants';
import type { TagInputProps } from '@/features/cards/components/tag-input/tagInput.types';

type TagColorMap = Record<string, DashboardColorName>;

const normalizeTag = (tag: string) => tag.trim().toLowerCase();

const getRandomColor = (
  availableColors: readonly DashboardColorName[]
): DashboardColorName | undefined => {
  if (availableColors.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * availableColors.length);

  return availableColors[randomIndex];
};

const pickRandomTagColor = (
  usedColors: ReadonlySet<DashboardColorName>
): DashboardColorName | undefined => {
  const availableColors = COLORS.filter((color) => !usedColors.has(color));
  const colorPool = availableColors.length > 0 ? availableColors : COLORS;

  return getRandomColor(colorPool);
};

const getUsedTagColors = (tagColors: TagColorMap) =>
  new Set<DashboardColorName>(Object.values(tagColors));

const createTagColorMap = (tags: string[]): TagColorMap => {
  const nextTagColors: TagColorMap = {};
  const usedColors = new Set<DashboardColorName>();

  tags.forEach((tag) => {
    const randomColor = pickRandomTagColor(usedColors);

    if (!randomColor) return;

    nextTagColors[tag] = randomColor;
    usedColors.add(randomColor);
  });

  return nextTagColors;
};

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
  const [tagColors, setTagColors] = useState<TagColorMap>(() =>
    createTagColorMap(tags)
  );
  const isMaxTagsReached = tags.length >= maxTags;
  const shouldShowPlaceholder =
    !isMaxTagsReached && (isFocused || tags.length === 0);

  useEffect(() => {
    if (import.meta.env.DEV && maxTags > COLORS.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `TagInput: maxTags(${maxTags})가 사용 가능한 색상 수(${COLORS.length})를 초과합니다.`
      );
    }
  }, [maxTags]);

  const handleDeleteTag = (targetTag: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== targetTag));
    setTagColors((prevTagColors) => {
      const nextTagColors = { ...prevTagColors };
      delete nextTagColors[targetTag];
      return nextTagColors;
    });
    setError('');
  };

  const handleAddTag = () => {
    const nextTag = inputValue.trim();

    if (!nextTag) {
      return;
    }

    const hasDuplicateTag = tags.some(
      (tag) => normalizeTag(tag) === normalizeTag(nextTag)
    );

    if (hasDuplicateTag) {
      setError('이미 포함된 태그입니다.');
      return;
    }

    if (tags.length >= maxTags) {
      setError(`태그는 ${maxTags}개까지 입력할 수 있습니다.`);
      return;
    }

    setTagColors((prevTagColors) => {
      const usedColors = getUsedTagColors(prevTagColors);
      const randomColor = pickRandomTagColor(usedColors);

      if (!randomColor) {
        return prevTagColors;
      }

      return {
        ...prevTagColors,
        [nextTag]: randomColor,
      };
    });
    setTags((prevTags) => [...prevTags, nextTag]);
    setInputValue('');
    setError('');
  };

  const handleTagKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    tag: string
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    handleDeleteTag(tag);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError('');
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="focus-within:border-primary-500 flex min-h-12.5 w-full flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2">
        {tags.map((tag) => (
          <Tag
            key={tag}
            color={tagColors[tag] ?? COLORS[0]}
            onClick={() => handleDeleteTag(tag)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => handleTagKeyDown(event, tag)}
            aria-label={`${tag} 태그 삭제`}
          >
            {tag}
          </Tag>
        ))}

        <input
          type="text"
          placeholder={shouldShowPlaceholder ? placeholder : ''}
          className="typo-md-regular md:typo-lg-regular min-w-0 flex-1 outline-0 placeholder:text-gray-300"
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && <span className="typo-md-medium text-error">{error}</span>}
    </div>
  );
}

export default TagInput;
