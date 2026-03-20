import { ENV } from '@/shared/apis/env.ts';

/**
 * API 요청을 보내는 공통 함수
 * @param endpoint API 경로 (e.g., 'users', 'posts')
 * @param options fetch 옵션 (method, headers, body 등)
 * @param query URL 경로에 추가될 파라미터 (e.g., '123')
 * @returns fetch 응답을 JSON으로 파싱한 객체. 응답이 없으면 null을 반환합니다.
 * @template T 응답 데이터의 타입
 */

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  query: string = ''
): Promise<T | null> {
  const res = await fetch(
    `${[ENV.API_TEAM_BASE_URL.replace(/\/$/, ''), endpoint, query].filter(Boolean).join('/')}`,
    options
  );
  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }
  return res.json();
}
