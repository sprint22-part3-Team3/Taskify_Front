import { COLORS } from '@/shared/constants/color.constants';
import type { AvatarUser } from '@/shared/types/user.types';

/**
 * getMonogram
 * 유저 닉네임 첫번째 글자를 리턴하는 함수입니다.
 */
export const getMonogram = (nickname: string) => {
  if (!nickname) {
    return '';
  }

  return nickname[0];
};

/**
 * getProfileColorForId
 * 유저 id값을 기준으로 프로필 배경 컬러값을 결정하는 함수입니다.
 * purple, blue, yellow, orange, pink 문자열이 리턴됩니다.
 */
export const getProfileColorForId = (userId: number) => {
  const idx = userId % COLORS.length;
  return COLORS[idx];
};

/**
 * AvatarUser는 도메인별로 id 필드명이 달라서, 아바타 식별자를 하나로 맞추기위해 사용합니다.
 */
export const getAvatarUserId = (user?: AvatarUser | null) => {
  if (!user) {
    return 0;
  }

  return user.userId ?? user.id;
};
