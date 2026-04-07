import { ApiError } from '@/shared/apis/apiError';
import { ENV } from '@/shared/apis/env.ts';
import { getAccessToken, removeAccessToken } from '@/shared/utils/token';

const REQUEST_TIMEOUT = 5000;
export const IMAGE_UPLOAD_TIMEOUT = 15000;
const JSON_CONTENT_TYPE = 'application/json';
const UNAUTHORIZED_STATUS = 401;

type FetchRequestOptions = RequestInit & {
  auth?: boolean;
  isFormData?: boolean;
  timeout?: number;
};

type RequestConfig = {
  endpoint: string;
  method: RequestInit['method'];
  body?: unknown;
  query?: string;
} & Omit<FetchRequestOptions, 'body'>;

const buildRequestUrl = (endpoint: string, query = '') =>
  new URL(
    [endpoint.replace(/^\//, ''), query].filter(Boolean).join('/'),
    ENV.API_BASE_URL
  ).toString();

const requestBodyWithContentType = (
  body: unknown,
  isFormData: boolean
): { body?: BodyInit; headers?: Record<string, string> } => {
  if (body === undefined) {
    return {};
  }

  if (isFormData) {
    return { body: body as BodyInit };
  }

  return {
    body: JSON.stringify(body),
    headers: { 'Content-Type': JSON_CONTENT_TYPE },
  };
};

/**
 * API 요청/응답을 한 곳에서 처리하는 공통 helper 모듈입니다.
 *
 * GET/POST/PUT/DELETE는 일반 JSON 요청, postFormData는 multipart/form-data로 사용할 수 있고,
 * 인증 헤더와 timeout 처리를 포함합니다.
 *
 * @example
 * ```tsx
 * import { get, post, del } from '@/shared/apis/fetchInstance';
 *
 * GET
 *   const users = await get<User[]>('users');
 *
 * POST
 *   const result = await post<Response>('login', { id, pw });
 *
 * DELETE
 *   await del('users/123');
 *
 * FormData POST
 * await postFormData<{ profileImageUrl: string }>('users/me/image', formData);
 * ```
 */
export async function fetchInstance<T>(
  endpoint: string,
  options: FetchRequestOptions = {},
  query: string = '',
  body?: unknown
): Promise<T | null> {
  const url = buildRequestUrl(endpoint, query);
  const {
    auth = true,
    isFormData = false,
    timeout = REQUEST_TIMEOUT,
    ...requestOptions
  } = options;
  const accessToken = auth ? getAccessToken() : null;
  const defaultHeaders = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  try {
    const { body: requestBody, headers: extraHeaders } =
      requestBodyWithContentType(body, isFormData);

    const res = await fetch(url, {
      ...requestOptions,
      headers: {
        ...defaultHeaders,
        ...extraHeaders,
        ...requestOptions.headers,
      },
      signal,
      ...(requestBody !== undefined ? { body: requestBody } : {}),
    });

    const text = await res.text();
    const isJsonResponse = res.headers
      .get('content-type')
      ?.includes('application/json');
    const data = text && isJsonResponse ? JSON.parse(text) : null;

    if (!res.ok) {
      if (res.status === UNAUTHORIZED_STATUS) {
        removeAccessToken();
      }

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

const request = <T>({
  endpoint,
  method,
  body,
  query = '',
  ...options
}: RequestConfig) =>
  fetchInstance<T>(endpoint, { ...options, method }, query, body);

export function get<T>(endpoint: string, options?: FetchRequestOptions) {
  return request<T>({ endpoint, method: 'GET', ...options });
}

/**
 * POST 요청을 수행하는 헬퍼입니다.
 *
 * @example
 * ```tsx
 * await post('cards', { title: '새 카드' });
 * ```
 */
export function post<T>(
  endpoint: string,
  body: unknown,
  options?: FetchRequestOptions
) {
  return request<T>({ endpoint, method: 'POST', body, ...options });
}

/**
 * PUT 요청을 수행하는 헬퍼입니다.
 */
export function put<T>(
  endpoint: string,
  body: unknown,
  options?: FetchRequestOptions
) {
  return request<T>({ endpoint, method: 'PUT', body, ...options });
}

/**
 * DELETE 요청을 수행하는 헬퍼입니다.
 */
export function del<T>(endpoint: string, options?: FetchRequestOptions) {
  return request<T>({ endpoint, method: 'DELETE', ...options });
}

export function postFormData<T>(
  endpoint: string,
  formData: FormData,
  options?: FetchRequestOptions
) {
  return request<T>({
    ...options,
    endpoint,
    method: 'POST',
    body: formData,
    isFormData: true,
  });
}
