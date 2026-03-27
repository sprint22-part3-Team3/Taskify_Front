import { ApiError } from '@/shared/apis/apiError';

/**
 * API 에러가 전달한 메시지를 우선 사용하고,
 * 없으면 호출부에서 넘긴 기본 메시지를 반환합니다.
 *
 * @example
 * ```ts
 * const dashboardErrorMessage = getApiErrorMessage(
 *   error,
 *   '내 대시보드 목록을 불러오지 못했어요.'
 * );
 * ```
 */
export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
