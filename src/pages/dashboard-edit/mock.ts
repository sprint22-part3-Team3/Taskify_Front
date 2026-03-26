import type { AvatarUser } from '@/shared/types/user.types';

// TODO: API 연동 후에는 삭제
export const MOCK_MEMBERS: AvatarUser[] = [
  { id: 1, nickname: '최승철', profileImageUrl: '' },
  { id: 2, nickname: '윤정한', profileImageUrl: '' },
  { id: 3, nickname: '홍지수', profileImageUrl: '' },
  { id: 4, nickname: '문준휘', profileImageUrl: '' },
];

// TODO: API 연동 후에는 삭제
export const MOCK_INVITATIONS = [
  'codeitA@codeit.com',
  'codeitB@codeit.com',
  'codeitC@codeit.com',
  'codeitD@codeit.com',
  'codeitE@codeit.com',
];
