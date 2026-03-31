import { post } from '@/shared/apis/fetchInstance';
import type { SignupRequest } from '@/features/auth/apis/auth.types';

export async function signup({
  email,
  nickname,
  password,
}: SignupRequest): Promise<void> {
  const response = await post<unknown>(
    `/users`,
    {
      email,
      nickname,
      password,
    },
    { auth: false }
  );

  if (!response) {
    throw new Error('회원가입에 실패했습니다.');
  }
}
