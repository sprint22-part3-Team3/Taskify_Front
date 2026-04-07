import { useEffect, useMemo, useRef, useState } from 'react';
import { IcSearch } from '@/shared/assets/icons';
import InputField from '@/shared/components/input/input-field';
import Label from '@/shared/components/input/label';
import UserProfile from '@/shared/components/user-profile';
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import type { AvatarUser } from '@/shared/types/user.types';
import { cn } from '@/shared/utils/cn';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type { AssigneeSelectProps } from '@/features/cards/components/assignee-select/assigneeSelect.types';

const getAssigneeQuery = (selectedAssignee: AvatarUser | null): string =>
  selectedAssignee ? `@${selectedAssignee.nickname}` : '';

const parseAssigneeQuery = (value: string) => {
  const trimmedValue = value.trim();

  return {
    hasMentionTrigger: trimmedValue.startsWith('@'),
    normalizedQuery: trimmedValue.replace(/^@/, '').toLowerCase(),
  };
};

const isSameAssigneeQuery = (query: string, selectedAssigneeQuery: string) => {
  return selectedAssigneeQuery !== '' && query === selectedAssigneeQuery;
};

const isOnlyMentionTrigger = (query: string) => {
  return query.trim() === '@';
};

function AssigneeSelect({
  label,
  selectedAssignee,
  assigneeOptions,
  onSelect,
  required = false,
  placeholder = '@이름을 입력해 주세요',
}: AssigneeSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldSkipNextBlurValidationRef = useRef(false);
  const [query, setQuery] = useState<string>(
    getAssigneeQuery(selectedAssignee)
  );
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showManualInvalidMentionError, setShowManualInvalidMentionError] =
    useState(false);
  const selectedAssigneeQuery = getAssigneeQuery(selectedAssignee);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const highlightedItemRef = useRef<HTMLButtonElement | null>(null);

  const resetHighlight = () => {
    setHighlightedIndex(-1);
    highlightedItemRef.current = null;
  };

  const closeDropdown = () => {
    setIsOpen(false);
    resetHighlight();
  };

  useEffect(() => {
    setQuery(selectedAssigneeQuery);
  }, [selectedAssigneeQuery]);

  useOnClickOutside(containerRef, closeDropdown, isOpen);

  const { hasMentionTrigger, normalizedQuery } = parseAssigneeQuery(query);
  const hasSelectedAssigneeQuery = isSameAssigneeQuery(
    query,
    selectedAssigneeQuery
  );
  const shouldShowSelectedAssignee = hasSelectedAssigneeQuery && !isOpen;
  const debouncedNormalizedQuery = useDebounce(normalizedQuery);
  const filteredAssignees = useMemo(() => {
    if (!debouncedNormalizedQuery) {
      return assigneeOptions;
    }

    return assigneeOptions.filter((assignee: AvatarUser) =>
      assignee.nickname.toLowerCase().includes(debouncedNormalizedQuery)
    );
  }, [assigneeOptions, debouncedNormalizedQuery]);

  useEffect(() => {
    if (!isOpen || filteredAssignees.length === 0) {
      resetHighlight();
      return;
    }

    setHighlightedIndex((currentIndex) =>
      currentIndex >= 0 && currentIndex < filteredAssignees.length
        ? currentIndex
        : 0
    );
  }, [filteredAssignees, isOpen]);

  useEffect(() => {
    if (highlightedIndex < 0 || !isOpen) {
      return;
    }

    highlightedItemRef.current?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, isOpen]);

  const handleSelect = (assignee: AvatarUser) => {
    shouldSkipNextBlurValidationRef.current = true;
    onSelect(assignee);
    setQuery(getAssigneeQuery(assignee));
    closeDropdown();
    setShowManualInvalidMentionError(false);
    inputRef.current?.blur();
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    const { hasMentionTrigger: hasNextMentionTrigger } =
      parseAssigneeQuery(nextQuery);

    setQuery(nextQuery);

    if (!nextQuery.trim()) {
      if (selectedAssignee) {
        onSelect(null);
      }
      setIsOpen(false);
      setShowManualInvalidMentionError(false);
      return;
    }

    if (showManualInvalidMentionError) {
      setShowManualInvalidMentionError(false);
    }

    setIsOpen(hasNextMentionTrigger);
  };

  const moveHighlight = (delta: number) => {
    if (filteredAssignees.length === 0) {
      return;
    }

    setHighlightedIndex((currentIndex) => {
      const baseIndex =
        currentIndex >= 0 && currentIndex < filteredAssignees.length
          ? currentIndex
          : 0;
      const nextIndex = baseIndex + delta;

      if (nextIndex >= filteredAssignees.length) {
        return 0;
      }

      if (nextIndex < 0) {
        return filteredAssignees.length - 1;
      }

      return nextIndex;
    });
  };

  const selectHighlighted = () => {
    if (
      highlightedIndex < 0 ||
      highlightedIndex >= filteredAssignees.length ||
      filteredAssignees.length === 0
    ) {
      return;
    }

    handleSelect(filteredAssignees[highlightedIndex]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredAssignees.length === 0) {
      return;
    }

    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveHighlight(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveHighlight(-1);
        break;
      case 'Enter':
        event.preventDefault();
        selectHighlighted();
        break;
      case 'Escape':
        event.preventDefault();
        closeDropdown();
        break;
      default:
        break;
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      nextFocusedElement instanceof Node &&
      containerRef.current?.contains(nextFocusedElement)
    ) {
      return;
    }

    closeDropdown();

    if (shouldSkipNextBlurValidationRef.current) {
      shouldSkipNextBlurValidationRef.current = false;
      setShowManualInvalidMentionError(false);
      return;
    }

    if (selectedAssignee && isOnlyMentionTrigger(query)) {
      setQuery(selectedAssigneeQuery);
      setShowManualInvalidMentionError(false);
      return;
    }

    if (query.trim() && !shouldShowSelectedAssignee) {
      setShowManualInvalidMentionError(true);
      return;
    }
    setShowManualInvalidMentionError(false);
  };

  const handleFocus = () => {
    if (hasSelectedAssigneeQuery) {
      setQuery('@');
      setIsOpen(true);
      return;
    }

    setIsOpen(hasMentionTrigger);
  };

  const shouldShowInvalidMentionError =
    (hasMentionTrigger &&
      !!normalizedQuery &&
      !shouldShowSelectedAssignee &&
      !isOpen) ||
    showManualInvalidMentionError;

  return (
    <div
      className="flex w-full flex-col gap-2"
      ref={containerRef}
      onBlur={handleBlur}
    >
      <Label
        required={required}
        className="typo-md-regular md:typo-2lg-regular"
      >
        {label}
      </Label>

      <div className="relative">
        <div className="relative">
          {!shouldShowSelectedAssignee && (
            <IcSearch className="absolute top-1/2 left-4 w-5.5 -translate-y-1/2 text-gray-300 md:w-6" />
          )}
          {shouldShowSelectedAssignee && selectedAssignee && (
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <UserProfile
                user={selectedAssignee}
                size="md"
                nicknameClassName="typo-md-regular md:typo-lg-regular"
                className="gap-2"
              />
            </div>
          )}
          <InputField
            ref={inputRef}
            type="text"
            value={query}
            placeholder={placeholder}
            onFocus={handleFocus}
            onChange={handleChangeQuery}
            onKeyDown={handleKeyDown}
            className={cn(
              'typo-md-regular md:typo-lg-regular focus:border-primary-500 text-black-200 h-12 bg-white py-0 pr-4 pl-11 md:pl-12',
              shouldShowSelectedAssignee && 'text-transparent caret-transparent'
            )}
          />
        </div>

        {isOpen && (
          <div className="z-dropdown absolute mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            {filteredAssignees.length > 0 ? (
              <ul className="max-h-52 overflow-y-auto">
                {filteredAssignees.map((assignee, index) => {
                  const isHighlighted = index === highlightedIndex;
                  const isSelected = selectedAssignee?.id === assignee.id;

                  return (
                    <li key={assignee.id}>
                      <button
                        type="button"
                        ref={isHighlighted ? highlightedItemRef : null}
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                        onClick={() => handleSelect(assignee)}
                        className={cn(
                          'text-black-200 flex h-12 w-full items-center px-4 text-left hover:bg-gray-50',
                          isHighlighted && 'bg-gray-100',
                          !isHighlighted && isSelected && 'bg-gray-50'
                        )}
                        aria-selected={isHighlighted}
                      >
                        <UserProfile
                          user={assignee}
                          size="md"
                          nicknameClassName="typo-md-regular md:typo-lg-regular"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="typo-md-regular px-4 py-3 text-gray-400">
                검색 결과가 없어요
              </p>
            )}
          </div>
        )}
      </div>
      {shouldShowInvalidMentionError && (
        <p className="typo-md-regular text-error mt-1">
          드롭다운에서 멤버를 선택해 주세요.
        </p>
      )}
    </div>
  );
}

export default AssigneeSelect;
