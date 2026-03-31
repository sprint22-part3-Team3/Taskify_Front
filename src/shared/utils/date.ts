import { format, isValid, parse } from 'date-fns';

export function parseDateTimeValue(value: string) {
  if (!value) return null;

  const normalized = value.replace('T', ' ');
  const parsedDate = parse(normalized, 'yyyy-MM-dd HH:mm', new Date(0));

  return isValid(parsedDate) ? parsedDate : null;
}

export function formatDateTimeValue(value: Date | null) {
  if (!value) return '';
  return format(value, 'yyyy-MM-dd HH:mm');
}

export function getDefaultDateTimeValue() {
  return new Date();
}
