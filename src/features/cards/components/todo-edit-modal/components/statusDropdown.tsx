import { useRef, useEffect } from 'react';
import { IcArrowBottom, IcCheck } from '@/shared/assets/icons';
import { StatusBadge } from '@/shared/components/status-badge';
import { STATUS_OPTIONS } from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';
import type { StatusOption } from '@/features/cards/components/todo-edit-modal/todoEditModal.constants';

interface StatusDropdownProps {
  status: StatusOption;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (status: StatusOption) => void;
}

function StatusDropdown({
  status,
  isOpen,
  onToggle,
  onSelect,
}: StatusDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className="typo-lg-regular focus:border-primary-500 text-black-200 flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 outline-0"
      >
        <StatusBadge label={status} />
        <IcArrowBottom
          className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
