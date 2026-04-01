/** 태그 전용 색상 목록 */
export const TAG_COLORS = [
  'purple',
  'blue',
  'yellow',
  'orange',
  'pink',
  'red',
  'green',
  'teal',
  'indigo',
  'brown',
] as const;

export type TagColorName = (typeof TAG_COLORS)[number];

/** 태그 전용 색상 hex 맵 */
export const TAG_COLOR_HEX: Record<TagColorName, string> = {
  purple: '#a932ff',
  blue: '#01b4bb',
  yellow: '#f5d51e',
  orange: '#fb8926',
  pink: '#fc7b8f',
  red: '#e53e3e',
  green: '#38a169',
  teal: '#319795',
  indigo: '#5a67d8',
  brown: '#a0522d',
};

export const TAG_TEXT_DEFAULT_COLOR: TagColorName = 'blue';
export const TAG_BACKGROUND_OPACITY_PERCENT = 10;
