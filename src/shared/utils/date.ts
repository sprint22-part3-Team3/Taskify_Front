import { format, isValid, parse, parseISO } from 'date-fns';

export function parseDateTimeValue(value: string) {
  if (!value) return null;

  const normalized = value.replace('T', ' ');
  const parsedDate = parse(normalized, 'yyyy-MM-dd HH:mm', new Date(0));

  return isValid(parsedDate) ? parsedDate : null;
}

/**
 * 서버에서 받은 ISO 형식의 날짜 문자열을 파싱합니다.
 * 타임존 오프셋에 의한 시간 변동을 방지하고 서버의 시간 수치를 그대로 표시하기 위해 'Z' 접미사를 제거하고 로컬 시간으로 처리합니다.
 * ※ ISO 날짜 문자열 (예: '2023-10-27T10:00:00Z')
 *
 * @returns 파싱된 Date 객체 또는 null
 */
export function parseServerDateTime(value: string) {
  if (!value) return null;

  const normalizedValue = value.replace(/Z$/, '');
  const parsedDate = parseISO(normalizedValue);

  return isValid(parsedDate) ? parsedDate : null;
}

export function formatDateTimeValue(value: Date | null) {
  if (!value) return '';
  return format(value, 'yyyy-MM-dd HH:mm');
}

export function getDefaultDateTimeValue() {
  return new Date();
}
