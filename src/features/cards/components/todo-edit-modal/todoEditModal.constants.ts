import type { AvatarUser } from '@/shared/types/user.types';

/**
 * 확인을 위한 임시 데이터 구현시 지우고 사용하세요
 */

export type StatusOption = 'To Do' | 'In Progress' | 'Done';

export const STATUS_OPTIONS: StatusOption[] = ['To Do', 'In Progress', 'Done'];

export const MOCK_ASSIGNEE: AvatarUser = {
  id: 1,
  nickname: '배유철',
  profileImageUrl: '',
};

export const INITIAL_FORM_VALUES = {
  title: '스프린트 12',
  description: '스프린트 12의 아젠다 논의',
  dueDate: '2024. 07. 31 14:30',
  status: 'To Do' as StatusOption,
};
