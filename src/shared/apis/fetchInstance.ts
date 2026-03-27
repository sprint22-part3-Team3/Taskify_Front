import { ApiError } from '@/shared/apis/apiError';
import { ENV } from '@/shared/apis/env.ts';

const REQUEST_TIMEOUT = 5000;
const JSON_CONTENT_TYPE = 'application/json';

const buildRequestUrl = (endpoint: string, query = '') =>
  new URL(
    [endpoint.replace(/^\//, ''), query].filter(Boolean).join('/'),
    ENV.API_BASE_URL
  ).toString();

const request = <T>(
  path: string,
  method: RequestInit['method'],
  options?: RequestInit,
  body?: unknown
) => {
  return fetchInstance<T>(path, {
    ...options,
    method,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
};
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
  const url = buildRequestUrl(endpoint, query);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': JSON_CONTENT_TYPE,
        ...options.headers,
      },
      signal: controller.signal,
    });

    const text = await res.text();
    const isJsonResponse = res.headers
      .get('content-type')
      ?.includes('application/json');
    const data = text && isJsonResponse ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new ApiError(
        res.status,
        data?.message || text || `API 요청 실패: ${res.status}`
      );
    }
    if (res.status === 204) {
      return null;
    }

    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

// HTTP 메서드별 편의 함수
export function get<T>(path: string, options?: RequestInit) {
  return request<T>(path, 'GET', options);
}

export function post<T>(path: string, body: unknown, options?: RequestInit) {
  return request<T>(path, 'POST', options, body);
}

export function put<T>(path: string, body: unknown, options?: RequestInit) {
  return request<T>(path, 'PUT', options, body);
}

export function del<T>(path: string, options?: RequestInit) {
  return request<T>(path, 'DELETE', options);
}
