import { useRef } from 'react';
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { IcArrowBottom, IcCheck } from '@/shared/assets/icons';
import { StatusBadge } from '@/shared/components/status-badge';
import type { StatusDropdownProps } from '@/features/cards/components/todo-edit-modal/components/status-dropdown/statusDropdown.types';
import { STATUS_DROPDOWN_TEXT } from '@/features/cards/components/todo-edit-modal/components/status-dropdown/statusDropdown.constants';
import { cn } from '@/shared/utils/cn';

/**
 * 할 일의 상태를 선택하는 드롭다운 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <StatusDropdown
 *   columns={columns}
 *   selectedColumnId={selectedColumnId}
 *   isOpen={isDropdownOpen}
 *   onToggle={() => setIsDropdownOpen((prev) => !prev)}
 *   onSelect={(columnId) => {
 *     setSelectedColumnId(columnId);
 *     setIsDropdownOpen(false);
 *   }}
 *   isLoading={isColumnsLoading}
 * />
 * ```
 */
function StatusDropdown({
  columns,
  selectedColumnId,
  isOpen,
  onToggle,
  onSelect,
  isLoading,
}: StatusDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    dropdownRef,
    () => {
      if (isOpen) onToggle();
    },
    isOpen
  );

  const selectedColumn = columns.find(
    (column) => column.id === selectedColumnId
  );
  const buttonLabel = selectedColumn?.title ?? '';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className="typo-lg-regular focus:border-primary-500 text-black-200 flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 outline-0"
        aria-busy={isLoading}
      >
        <StatusBadge label={buttonLabel} />
        <IcArrowBottom
          className={cn(
            'h-3 w-3 text-gray-400 transition-transform duration-200',
            { 'rotate-180': isOpen }
          )}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {isLoading && (
            <li className="typo-lg-regular flex h-12 items-center px-4 text-gray-500">
              {STATUS_DROPDOWN_TEXT.LOADING}
            </li>
          )}
          {!isLoading &&
            columns.map((column) => (
              <li key={column.id}>
                <button
                  type="button"
                  onClick={() => onSelect(column.id)}
                  className="typo-lg-regular text-black-200 flex h-12 w-full items-center gap-3 px-4 hover:bg-gray-50"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {selectedColumnId === column.id && (
                      <IcCheck className="text-primary-500 h-4 w-4" />
                    )}
                  </span>
                  <StatusBadge label={column.title} />
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default StatusDropdown;
