import { ENV } from '@/shared/apis/env.ts';
/**
 * @example
 * import { get, post, del } from '@/shared/apis/fetchInstance';
 * GET
 *   const users = await get<User[]>('users');
 * POST
 *   const result = await post<Response>('login', { id, pw });
 * DELETE
 *   await del('users/123');
 */
export async function fetchInstance<T>(
  endpoint: string,
  options: RequestInit = {},
  query: string = ''
): Promise<T | null> {
  // new URL() 적용
  const url = new URL(
    [endpoint, query].filter(Boolean).join('/'),
    ENV.API_TEAM_BASE_URL
  ).toString();

  // 5초 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    if (res.status === 204) {
      return null;
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// HTTP 메서드별 편의 함수
export function get<T>(path: string, options?: RequestInit) {
  return fetchInstance<T>(path, {
    ...options,
    method: 'GET',
  });
}

export function post<T>(path: string, body: unknown, options?: RequestInit) {
  return fetchInstance<T>(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function put<T>(path: string, body: unknown, options?: RequestInit) {
  return fetchInstance<T>(path, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function del<T>(path: string, options?: RequestInit) {
  return fetchInstance<T>(path, {
    ...options,
    method: 'DELETE',
  });
}
