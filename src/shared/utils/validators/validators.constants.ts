/**
 * 이메일 유효성 검사 관련 상수입니다.
 */
export const EMAIL_RULES = {
  /** 이메일 형식 정규식 */
  REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/**
 * 비밀번호 유효성 검사 관련 상수입니다.
 */
export const PASSWORD_RULES = {
  /** 최소 글자 수 */
  MIN_LENGTH: 8,
  /** 영문자 포함 여부 정규식 */
  LETTER_REGEX: /[a-zA-Z]/,
  /** 숫자 포함 여부 정규식 */
  NUMBER_REGEX: /[0-9]/,
  /** 특수문자 포함 여부 정규식 */
  SPECIAL_REGEX: /[!@#$%^&*()_+\-={}[\];':"\\|,.<>/?]/,
} as const;

/**
 * 닉네임 유효성 검사 관련 상수입니다.
 */
export const NICKNAME_RULES = {
  /** 최대 글자 수 */
  MAX_LENGTH: 5,
  /** 한글 자모 단독 입력 감지 정규식 */
  INCOMPLETE_KOREAN_REGEX: /[ㄱ-ㅎㅏ-ㅣ]/,
  /** 한글(완성형) + 영문만 허용 정규식 */
  REGEX: /^[가-힣a-zA-Z]+$/,
} as const;

/**
 * 칼럼 이름 유효성 검사 관련 상수입니다.
 */
export const COLUMN_NAME_RULES = {
  /** 최대 글자 수 */
  MAX_LENGTH: 15,
} as const;
