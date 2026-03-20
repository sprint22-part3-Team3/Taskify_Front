import { ENV } from '@/shared/apis/env.ts';

// API 요청을 보내는 공통 함수
// <T>는 응답 데이터의 타입을 호출할 때 지정할 수 있게 해주는 문법
export async function fetchApi<T>(
  endpoint: string, // API 경로 ex) 'users', 'posts'
  options: RequestInit = {}, // fetch 옵션 (method, headers, body 등), 안 넘기면 빈 객체
  query: string = '' // URL 뒤에 붙는 추가 값 ex) 사용자 id '123'
): Promise<T | null> {
  // 최종 URL 조합: BASE_URL/endpoint/query / ex) 'https://api.example.com/users/123'
  const res = await fetch(
    `${[ENV.API_TEAM_BASE_URL, endpoint, query].filter(Boolean).join('/')}`,
    options
  );

  // res.ok === false면 서버가 에러를 보낸 것
  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  // 204: 서버가 "성공했지만 돌려줄 데이터 없음"이라고 응답한 경우, JSON 파싱하면 에러나니까 null을 반환
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }

  // 서버 응답을 JSON으로 변환해서 반환
  return res.json();
}
