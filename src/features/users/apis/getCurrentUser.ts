import { get } from '@/shared/apis/fetchInstance';
import type { UserMe } from '@/shared/types/userMe.types';

export const getCurrentUser = () => get<UserMe>('users/me');
