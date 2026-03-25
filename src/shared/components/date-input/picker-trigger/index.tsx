import { IcCalendar } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';
import { PLACEHOLDER_TEXT } from './pickerTrigger.constants';
import type { PickerTriggerProps } from './pickerTrigger.types';

function DateInputFieldTrigger({
  id,
  value,
  disabled,
  isOpen,
  className,
  onClick,
}: PickerTriggerProps) {
  const displayValue = value || PLACEHOLDER_TEXT;

  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn(
        'focus:border-primary-500 typo-lg-regular relative w-full rounded-lg border border-gray-200 px-4 py-3 text-left outline-0',
        disabled && 'cursor-not-allowed',
        className
      )}
    >
      <span
        className={cn('block pl-8', value ? 'text-black-200' : 'text-gray-300')}
      >
        {displayValue}
      </span>
      <IcCalendar
        aria-hidden="true"
        className={cn(
          'absolute top-1/2 left-4 -translate-y-1/2',
          disabled && 'text-gray-300',
          !disabled && (value ? 'text-black-200' : 'text-gray-300')
        )}
      />
    </button>
  );
}

export default DateInputFieldTrigger;
