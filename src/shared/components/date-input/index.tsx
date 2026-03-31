import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, setHours, setMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '@/shared/components/date-input/dateInput.css';
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import {
  formatDateTimeValue,
  getDefaultDateTimeValue,
  parseDateTimeValue,
} from '@/shared/utils/date';
import { HOUR_OPTIONS, MINUTE_OPTIONS } from './dateInput.constants';
import PickerFooter from './picker-footer';
import DateInputFieldTrigger from './picker-trigger';
import DatePickerHeader from './picker-header';
import type { DateInputFieldProps } from './dateInput.types';

/**
 * 날짜와 시간을 함께 선택할 수 있는 공용 DateInputField 컴포넌트입니다.
 *
 * `react-datepicker` 기반의 인라인 캘린더와 커스텀 시간 선택 UI를 함께 렌더링하며,
 * 선택된 값은 `yyyy-MM-dd HH:mm` 형식의 문자열로 관리됩니다.
 *
 * 값이 비어 있는 상태에서 필드를 열면 오늘 날짜가 기본 선택됩니다.
 * 실제 폼 제출값은 숨겨진 `input`을 통해 전달됩니다.
 *
 * @example
 * ```tsx
 * <DateInputField
 *   name="dueDate"
 *   value={dateTime}
 *   onChange={setDateTime}
 * />
 * ```
 */
function DateInputField({
  className,
  disabled,
  value,
  defaultValue,
  onChange,
  id,
  name,
  ...props
}: DateInputFieldProps) {
  const isControlled = value !== undefined;
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    parseDateTimeValue(defaultValue ?? '')
  );
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedDate = isControlled
    ? parseDateTimeValue(value ?? '')
    : internalSelectedDate;

  useOnClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const displayValue = formatDateTimeValue(selectedDate);
  const selectedHour = selectedDate ? format(selectedDate, 'HH') : '00';
  const selectedMinute = selectedDate ? format(selectedDate, 'mm') : '00';

  const emitChange = (nextDate: Date | null) => {
    const nextValue = formatDateTimeValue(nextDate);

    if (!isControlled) {
      setInternalSelectedDate(nextDate);
    }

    onChange?.(nextValue);
  };

  const updateSelectedTime = (nextHour: string, nextMinute: string) => {
    if (!selectedDate) return;

    emitChange(
      setMinutes(setHours(selectedDate, Number(nextHour)), Number(nextMinute))
    );
  };

  const handleDateChange = (nextDate: Date | null) => {
    if (!nextDate) {
      emitChange(null);
      return;
    }

    if (selectedDate) {
      emitChange(
        setMinutes(
          setHours(nextDate, selectedDate.getHours()),
          selectedDate.getMinutes()
        )
      );
      return;
    }

    emitChange(nextDate);
  };

  const handleToggleOpen = () => {
    if (!isOpen && !selectedDate) {
      emitChange(getDefaultDateTimeValue());
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <DateInputFieldTrigger
        id={id}
        value={displayValue}
        disabled={disabled}
        isOpen={isOpen}
        onClick={handleToggleOpen}
        className={className}
      />
      <input
        type="hidden"
        name={name}
        value={displayValue}
        disabled={disabled}
        {...props}
      />

      {isOpen && (
        <div className="absolute left-0 mt-2 w-73.75 max-w-full rounded-2xl border border-gray-200 bg-white px-1 py-1.5">
          <DatePicker
            inline
            locale={ko}
            selected={selectedDate}
            onChange={handleDateChange}
            calendarClassName="datepicker"
            formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 1)}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <DatePickerHeader
                date={date}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
              />
            )}
          />

          <PickerFooter
            hour={selectedHour}
            minute={selectedMinute}
            hourOptions={HOUR_OPTIONS}
            minuteOptions={MINUTE_OPTIONS}
            isEnabled={Boolean(selectedDate)}
            onChangeHour={(nextHour) =>
              updateSelectedTime(nextHour, selectedMinute)
            }
            onChangeMinute={(nextMinute) =>
              updateSelectedTime(selectedHour, nextMinute)
            }
          />
        </div>
      )}
    </div>
  );
}

export default DateInputField;
