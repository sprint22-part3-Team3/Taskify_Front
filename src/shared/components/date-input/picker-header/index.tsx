import { format } from 'date-fns';
import { IcArrowLeft, IcArrowRight } from '@/shared/assets/icons';
import { NAVIGATION_BUTTON_CLASS_NAME } from './pickerHeader.constants';
import type { PickerHeaderProps } from './pickerHeader.types';

function DatePickerHeader({
  date,
  decreaseMonth,
  increaseMonth,
}: PickerHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <button
        type="button"
        onClick={decreaseMonth}
        className={NAVIGATION_BUTTON_CLASS_NAME}
      >
        <IcArrowLeft className="text-black-200 h-4 w-4" />
      </button>
      <span className="text-black-300 typo-sm-semibold">
        {format(date, 'yyyy.MM')}
      </span>
      <button
        type="button"
        onClick={increaseMonth}
        className={NAVIGATION_BUTTON_CLASS_NAME}
      >
        <IcArrowRight className="text-black-200 h-4 w-4" />
      </button>
    </div>
  );
}

export default DatePickerHeader;
