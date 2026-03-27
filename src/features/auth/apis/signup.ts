import { post } from '@/shared/apis/fetchInstance';

type SignupRequest = {
  email: string;
  nickname: string;
  password: string;
};

type SignupResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function signup({
  email,
  nickname,
  password,
}: SignupRequest): Promise<SignupResponse> {
  const response = await post<SignupResponse>(`/users`, {
    email,
    nickname,
    password,
  });

  if (!response) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return response;
}
