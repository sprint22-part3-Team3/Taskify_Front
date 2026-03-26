import type { AvatarUser } from '@/shared/types/user.types';

export type StatusOption = 'To Do' | 'In Progress' | 'Done';

export const STATUS_OPTIONS: StatusOption[] = ['To Do', 'In Progress', 'Done'];

// TODO: API 연결 후 실제 담당자 데이터로 교체
export const ASSIGNEE_OPTIONS: AvatarUser[] = [
  {
    id: 1,
    nickname: '배유철',
    profileImageUrl: '',
  },
  {
    id: 2,
    nickname: '이서정',
    profileImageUrl: '',
  },
  {
    id: 3,
    nickname: '김예지',
    profileImageUrl: '',
  },
];

export const MOCK_ASSIGNEE: AvatarUser = {
  ...ASSIGNEE_OPTIONS[0],
};

export const INITIAL_FORM_VALUES = {
  title: '스프린트 12',
  description: '스프린트 12의 아젠다 논의',
  dueDate: '2024. 07. 31 14:30',
  status: 'To Do' as StatusOption,
};
