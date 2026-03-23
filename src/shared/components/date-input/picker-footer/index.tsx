import TimeSelect from './time-select';
import type { PickerFooterProps } from './pickerFooter.types';

function PickerFooter({
  hour,
  minute,
  hourOptions,
  minuteOptions,
  isEnabled,
  onChangeHour,
  onChangeMinute,
}: PickerFooterProps) {
  const isDisabled = !isEnabled;

  return (
    <div className="border-t border-gray-100">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-1.5 py-1.5">
        <TimeSelect
          value={hour}
          disabled={isDisabled}
          options={hourOptions}
          onSelect={onChangeHour}
        />
        <span className="text-black-200 typo-sm-bold px-2">:</span>
        <TimeSelect
          value={minute}
          disabled={isDisabled}
          options={minuteOptions}
          onSelect={onChangeMinute}
        />
      </div>
    </div>
  );
}

export default PickerFooter;
