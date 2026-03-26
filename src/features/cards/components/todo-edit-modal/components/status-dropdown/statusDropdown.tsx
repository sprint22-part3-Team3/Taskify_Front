import { useRef } from 'react';
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { IcArrowBottom, IcCheck } from '@/shared/assets/icons';
import { StatusBadge } from '@/shared/components/status-badge';
import { STATUS_OPTIONS } from '@/features/cards/components/todo-edit-modal/todoEditModal.mock';
import type { StatusDropdownProps } from '@/features/cards/components/todo-edit-modal/components/status-dropdown/statusDropdown.types';
import { cn } from '@/shared/utils/cn';

/**
 * 할 일의 상태를 선택하는 드롭다운 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <StatusDropdown
 *   status={status}
 *   isOpen={isDropdownOpen}
 *   onToggle={() => setIsDropdownOpen((prev) => !prev)}
 *   onSelect={(status) => {
 *     setStatus(status);
 *     setIsDropdownOpen(false);
 *   }}
 * />
 * ```
 */
function StatusDropdown({
  status,
  isOpen,
  onToggle,
  onSelect,
}: StatusDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    dropdownRef,
    () => {
      if (isOpen) onToggle();
    },
    isOpen
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className="typo-lg-regular focus:border-primary-500 text-black-200 flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 outline-0"
      >
        <StatusBadge label={status} />
        <IcArrowBottom
          className={cn(
            'h-3 w-3 text-gray-400 transition-transform duration-200',
            { 'rotate-180': isOpen }
          )}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {STATUS_OPTIONS.map((statusOption) => (
            <li key={statusOption}>
              <button
                type="button"
                onClick={() => onSelect(statusOption)}
                className="typo-lg-regular text-black-200 flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {status === statusOption && (
                    <IcCheck className="text-primary-500 h-4 w-4" />
                  )}
                </span>
                <StatusBadge label={statusOption} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StatusDropdown;
