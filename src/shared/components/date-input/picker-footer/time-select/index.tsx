import { useRef, useState } from 'react';
import { IcArrowBottom } from '@/shared/assets/icons';
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { cn } from '@/shared/utils/cn';
import type { TimeSelectProps } from './timeSelect.types';

function TimeSelect({ value, options, disabled, onSelect }: TimeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canOpen = !disabled;

  useOnClickOutside(containerRef, () => setIsOpen(false), isOpen);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'typo-lg-semibold flex w-full items-center justify-center gap-1 rounded-lg bg-transparent px-2 py-1 text-center outline-0 transition-colors',
          disabled && 'cursor-not-allowed text-gray-300',
          !disabled && 'text-black-200 hover:bg-gray-50'
        )}
      >
        {value}
        <IcArrowBottom
          className={cn(
            'h-3 w-3 transition-transform',
            isOpen && 'rotate-180',
            disabled && 'text-gray-300',
            !disabled && 'text-gray-400'
          )}
        />
      </button>

      {canOpen && isOpen && (
        <div className="z-dropdown absolute bottom-full left-1/2 mb-2 max-h-36 w-18 -translate-x-1/2 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={cn(
                'typo-sm-medium flex h-8 w-full items-center justify-center rounded-lg transition-colors',
                value === option
                  ? 'bg-primary-500 text-white'
                  : 'text-black-200 hover:bg-primary-100 hover:text-primary-500'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimeSelect;
