import { ENV } from '@/shared/apis/env.ts';

// baseURL을 받아서 해당 서버로 요청하는 클라이언트를 만들어주는 함수
function createApiClient(baseURL: string) {
  // 5초 안에 응답 없으면 요청 자동 취소
  const DEFAULT_TIMEOUT = 5000;

  // 실제 API 요청을 보내는 함수
  // <T>는 응답 데이터 타입을 밖에서 지정할 수 있게 해주는 TypeScript 문법
  async function request<T>(
    endpoint: string, // 세부 경로 ex) '/login', '/users'
    options: RequestInit = {} // GET/POST 여부, body 등 요청 옵션
  ): Promise<T> {
    // fetch는 timeout 기능이 없어서 직접 구현
    // AbortController: 요청을 강제로 취소
    const controller = new AbortController();

    // 5초 후에 자동으로 요청 취소
    const timeoutId = setTimeout(function () {
      controller.abort();
    }, DEFAULT_TIMEOUT);

    // 실제 API 요청 발송
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        ...options, // 밖에서 넘긴 옵션들 그대로 펼쳐서 넣기
        headers: {
          'Content-Type': 'application/json', // json 형식으로 보낸다고 서버에 알려주는 것
          ...options.headers, // 밖에서 넘긴 헤더가 있으면 추가
        },
        signal: controller.signal, // 취소 장치 연결
      });

      // response.ok가 false면 에러를 던짐
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      // 서버 응답을 JSON으로 변환해서 반환 (axios는 자동이지만 fetch는 직접 해야함)
      return response.json() as Promise<T>;
    } finally {
      // 응답이 오면 5초 타이머 취소
      clearTimeout(timeoutId);
    }
  }
  // request 함수를 객체로 묶어서 반환
  return { request };
}
// 함수로 클라이언트 두 개 찍어내기
export const apiClient = createApiClient(ENV.API_BASE_URL);
export const teamClient = createApiClient(ENV.API_TEAM_BASE_URL);
