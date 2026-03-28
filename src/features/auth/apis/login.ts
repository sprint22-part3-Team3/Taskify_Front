import { post } from '@/shared/apis/fetchInstance';
import type {
  LoginRequest,
  LoginResponse,
} from '@/features/auth/apis/auth.types';

export async function login({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  const response = await post<LoginResponse>(
    '/auth/login',
    {
      email,
      password,
    },
    { auth: false }
  );

  if (!response) {
    throw new Error('로그인에 실패했습니다.');
  }

  return response;
}
